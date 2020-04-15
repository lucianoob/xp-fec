import React, {Component} from 'react';
import Img from 'react-image';
import queryString from 'query-string';
import moment from 'moment';

import Header from './components/header.jsx';
import Loader from './components/loader.jsx';
import Player from './components/player.jsx';
import SoundWave from './components/sound_wave.jsx';

import '../scss/album.scss';

class Album extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            items: [],
            album: null,
            artists: '',
            is_play: false,
            sample: ''
        };
    }

    componentDidMount() {
        let query = queryString.parse(this.props.location.search);
        this.setState({loading: true});
        fetch('/api/v1/albums/'+query.id).then(res => res.json())
        .then((result) => {
                let artists = [];
                result.artists.forEach((artist) => {
                    artists.push(artist.name);
                });
                let tracks = [];
                result.tracks.items.forEach((track) => {
                    if(!tracks[track.disc_number-1]) {
                        tracks[track.disc_number-1] = [];
                    }
                    tracks[track.disc_number-1].push(track);
                });
                console.log("tracks", tracks);
                console.log("result", result);
                this.setState({ loading: false, atists: artists.join(' & '), album: result, items: tracks });
            },
            (error) => {
                console.log("Error: ", error);
                this.setState({ loading: false, album: null, items: null });
            }
        );

    }

    componentDidUpdate(prevProps, prevState, _snapshot) {}

    clickPlay(sample) {
        if(sample) {
            if(this.state.sample === sample) {
                if(this.state.is_play) {
                    this.setState({is_play: false});
                } else {
                    this.setState({is_play: true});
                }
            } else {
                this.setState({sample: sample, is_play: false});
                setTimeout(() => {
                    this.setState({is_play: true});
                }, 500);
            }
        }
    }

    render(){
        return(
            <React.Fragment>
                <Header logged={true}/>
                <div className="div-container">
                    <a className="p-title" href="/">{'< Voltar'}</a>
                    { this.state.loading &&
                        <p >Carregando...</p>                
                    }
                    <div className="d-flex flex-column-sm flex-column-xs flex-column-xt">
                        { this.state.album &&
                            <div className="div-artist">
                                { this.state.album.images.length > 0 ? 
                                    <div className="div-image div-artist-image" style={{backgroundImage: 'url("'+this.state.album.images[1].url+'")'}}/>
                                :
                                    <Img className="div-image div-artist-image" src="/images/track.png"/>
                                }
                                <div className="div-artist-data">
                                    <p className="p-result-title" title={this.state.album.name}>{this.state.album.name}</p>
                                    <div className="div-artist-details">
                                        <p className="p-result-subtitle" title={this.state.atists}>{this.state.atists}</p>
                                        <p className="p-result-subtitle" title={this.state.album.genres.join(' ')}>{this.state.album.genres.join(' ')}</p>
                                        <p className="p-result-subtitle"><b>popularidade:</b> {this.state.album.popularity}</p>
                                        <p className="p-result-subtitle"><b>gravadora:</b> {this.state.album.label}</p>
                                        <p className="p-result-subtitle"><b>lançamento:</b> {moment(this.state.album.release_date, "YYYY-MM-DD").format('DD/MM/YYYY')}</p>
                                    </div>
                                    <button type="button" className="btn mt-16-n" onClick={() => window.open(this.state.album.external_urls.spotify, '_blank')}
                                        title="Ver no Spotify">
                                        <Img src="/images/spotify-logo.png" height="20px"/> Spotify
                                    </button>
                                </div>
                            </div>
                        }
                        <div className="w-100">
                            { this.state.items.map((disco, index) =>
                                <React.Fragment>
                                    { this.state.items.length > 1 &&
                                        <p className="w-100 py-16-n px-48-n">Disco {index+1}</p>
                                    }
                                    <div className="div-tracks py-16-n px-32-n">
                                        { disco.map((item) =>
                                            <div className="div-track px-16-n py-16-n" onClick={() => this.clickPlay(item.preview_url)} 
                                                title={item.preview_url ? 'Clique para ouvir o preview da faixa.' : 'Esta faixa não possui preview disponível.'}>
                                                <div className="div-track-number pr-16-n">{item.track_number}.</div>
                                                <div className="div-track-name w-100">
                                                    {item.name}
                                                    { (this.state.sample === item.preview_url && item.preview_url) &&
                                                        <SoundWave is_play={this.state.is_play}/>
                                                    }
                                                </div>
                                                <div className="div-track-duration">{moment.utc(item.duration_ms).format('mm:ss')}</div>
                                            </div>
                                        )}
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    </div>
                </div>    
                <Player is_play={this.state.is_play} setPlay={(is_play) => this.setState({is_play: is_play})} sample={this.state.sample}/>           
            </React.Fragment>
        )
    }
}

export default Album;

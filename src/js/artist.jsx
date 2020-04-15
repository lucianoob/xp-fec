import React, {Component} from 'react';
import Img from 'react-image';

import Header from './components/header.jsx';
import Loader from './components/loader.jsx';
import Items from './components/items.jsx';

import '../scss/artist.scss';

class Artist extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            limit: 10,
            range: 10,
            total: 0,
            items: null,
            artist: null
        };
    }

    componentDidMount() {
        this.getArtistData();
    }

    componentDidUpdate(prevProps, prevState, _snapshot) {
        if(prevState.limit !== this.state.limit) {
            this.getArtistData();
        }
    }

    getArtistData() {
        const { match: { params } } = this.props;
        this.setState({loading: true});
        fetch('/api/v1/artists/'+params.key+'/albums?limit='+this.state.limit).then(res => res.json())
        .then((result) => {
                console.log("result", result);
                this.setState({ loading: false, artist: result.artist, items: result.albums.items, total: result.albums.total });
            },
            (error) => {
                console.log("Error: ", error);
                this.setState({ loading: false, artist: null, items: null });
            }
        );
    }

    clickMore() {
        if(this.state.limit < this.state.total) {
            this.setState({limit: this.state.limit+this.state.range});
        }
    }

    render(){
        return(
            <React.Fragment>
                <Header logged={true}/>
                <div className="div-container">
                    <a className="p-title" href="/">{'< Voltar'}</a>
                    <div className="d-flex flex-column-xt div-container-artist">
                        { this.state.artist &&
                            <div className="div-artist">
                                { this.state.artist.images.length > 0 ? 
                                    <div className="div-image div-artist-image" style={{backgroundImage: 'url("'+this.state.artist.images[1].url+'")'}}/>
                                :
                                    <Img className="div-image div-artist-image" src="/images/track.png"/>
                                }
                                <p className="p-result-title" title={this.state.artist.name}>{this.state.artist.name}</p>
                                <p className="p-result-subtitle" title={this.state.artist.genres.join(' ')}>{this.state.artist.genres.join(' ')}</p>
                                <p className="p-result-subtitle"><b>popularidade:</b> {this.state.artist.popularity}</p>
                                <p className="p-result-subtitle"><b>followers:</b> {this.state.artist.followers.total}</p>
                                <button type="button" className="btn mt-16-n" onClick={() => window.open(this.state.artist.external_urls.spotify, '_blank')}
                                    title="Ver no Spotify">
                                    <Img src="/images/spotify-logo.png" height="20px"/> Spotify
                                </button>
                            </div>
                        }
                        <div>
                            { this.state.loading &&
                                <Loader />                
                            }
                            <Items results={this.state.items} loading={this.state.loading}/>
                            { (this.state.limit < this.state.total && !this.state.loading) &&
                                <button type="button" className="btn mt-16-n mx-16-n" onClick={() => this.clickMore()}> Ver mais</button>
                            }
                        </div>
                    </div>
                </div>                
            </React.Fragment>
        )
    }
}

export default Artist;

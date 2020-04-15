import React, {Component} from 'react';
import Img from 'react-image';

import SoundWave from './sound_wave.jsx';

class Result extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: ''
        }
    }

    componentDidUpdate(prevProps, prevState, _snapshot) {
        if(prevProps.item !== this.props.item) {
            if(this.props.item.type === 'artist') {
                this.setState({title: 'Clique para abrir a página do artista.'});
            } else if(this.props.item.type === 'album') {
                this.setState({title: 'Clique para abrir a página do album.'});
            } else if(this.props.item.type === 'track') {
                if(this.props.item.preview_url) {
                    this.setState({title: 'Clique para ouvir o preview da faixa.'});
                } else {
                    this.setState({title: 'Esta faixa não possui preview disponível.'});
                }
            }
        }
    }

    clickOpen(item) {
        if(item.type === 'artist') {
            window.location = '/albums/'+item.chave;
        } else if(item.type === 'album') {
            window.location = '/album/'+item.chave+'?id='+item.id;
        } else if(item.type === 'track') {
            if(item.preview_url) {
                this.props.clickPlay(item.preview_url);
            }
        }
    }

    render(){
        return(
            <div key={this.props.index} className="div-result" onClick={() => this.clickOpen(this.props.item)} title={this.state.title}>
                { this.props.item.type === 'track' ? 
                    <div>
                        <Img src="/images/track.png" className="div-image"/>
                        { (this.props.sample === this.props.item.preview_url && this.props.item.preview_url) &&
                            <SoundWave custom_class="sound_bars-home" is_play={this.props.is_play}/>
                        }
                    </div>
                : this.props.item.images.length > 0 ? 
                    <div className="div-image" style={{backgroundImage: 'url("'+this.props.item.images[1].url+'")'}}/>
                :
                    <Img src="/images/track.png" className="div-image"/>
                }
                <p className="p-result-title" title={this.props.item.name}>{this.props.item.name}</p>
                { this.props.item.type === 'artist' ?
                    <p className="p-result-subtitle" title={this.props.item.genres.join(' ')}>{this.props.item.genres.join(' ')}</p>
                : this.props.item.type === 'album' ?
                    <p className="p-result-subtitle" title={this.props.item.artists[0].name}>{this.props.item.artists[0].name}</p>
                : this.props.item.type === 'track' &&
                    <React.Fragment>
                        <p className="p-result-subtitle" title={this.props.item.artists[0].name}>{this.props.item.artists[0].name}</p>
                        <p className="p-result-subtitle" title={this.props.item.album.name}>{this.props.item.album.name}</p>
                    </React.Fragment>
                }
            </div>
        )
    }
}

export default Result;

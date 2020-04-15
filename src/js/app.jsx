import React, {Component} from 'react';
import Img from 'react-image';
import {connect as ReduxConnect} from 'react-redux';
import ReduxActions from '../actions';

import Header from './components/header.jsx';
import Loader from './components/loader.jsx';
import Results from './components/results.jsx';
import Recents from './components/recents.jsx';
import Player from './components/player.jsx';

import '../scss/app.scss';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            search: '',
            items: null,
            recents: null,
            sample: '',
            is_play: false
        };
    }

    componentDidMount() {
        this.setState({loading: true});
        fetch('/api/v1/search/recents').then(res => res.json())
        .then((result) => {
                console.log("recents", result);
                this.setState({ loading: false, recents: result });
            },
            (error) => {
                console.log("Error: ", error);
                this.setState({ loading: false, recents: null });
            }
        );
    }

    componentDidUpdate(prevProps, prevState, _snapshot) {}

    keySearch(text) {
        if(text.length >= 3) {
            this.setState({loading: true, search: text, recents: null});
            fetch('/api/v1/search/'+text).then(res => res.json())
            .then((result) => {
                console.log("result", result);
                    this.setState({ loading: false, items: result });
                },
                (error) => {
                    console.log("Error: ", error);
                    this.setState({ loading: false, items: {} });
                }
            );
        }
    }

    clickPlay(sample) {
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

    render(){
        return(
            <React.Fragment>
                <Header logged={true}/>
                <div className="div-container">
                    <p className="p-title">Busque por artistas, álbuns ou músicas</p>
                    <input type="text" name="search" placeholder="Comece a escrever..." className="txt-search" onKeyUp={(e) => this.keySearch(e.target.value)}/>
                    { this.state.loading &&
                        <Loader />               
                    }
                    <Recents recents={this.state.recents} loading={this.state.loading} clickPlay={(sample) => this.clickPlay(sample)} 
                        is_play={this.state.is_play} sample={this.state.sample}/>
                    <Results results={this.state.items} search={this.state.search} loading={this.state.loading} 
                        clickPlay={(sample) => this.clickPlay(sample)} is_play={this.state.is_play} sample={this.state.sample}/>
                </div>  
                <Player is_play={this.state.is_play} setPlay={(is_play) => this.setState({is_play: is_play})} sample={this.state.sample}/>  
            </React.Fragment>
        )
    }
}

const mapStateToProps = store => ({
  
});

export default ReduxConnect(mapStateToProps)(App);

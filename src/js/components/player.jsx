import React, {Component} from 'react';

class Player extends Component {
    constructor(props){
        super(props);
        this.state = {
            is_play: false
        }
    }

    componentDidMount() {
        this.setPlayer();
    }

    componentDidUpdate(prevProps, prevState, _snapshot) {
        if(prevProps.is_play !== this.props.is_play && this.props.is_play) {
            document.getElementById("plSample").play();
        } else if(prevProps.is_play !== this.props.is_play && !this.props.is_play) {
            document.getElementById("plSample").pause();
        }
    }

    setPlayer() {
        let plSample = document.getElementById("plSample");
        plSample.onplay = () => {
            this.props.setPlay(true);
        };
        plSample.onpause = () => {
            this.props.setPlay(false);
        };
        plSample.onended = () => {
            this.props.setPlay(false);
        };
    }

    render(){
        return(
            <div className={'div-player'+(this.props.sample ? '' : ' d-none')}>
                <audio id="plSample" src={this.props.sample} controls></audio>
            </div> 
        )
    }
}

export default Player;

import React, {Component} from 'react';

class SoundWave extends Component {
    constructor(props){
        super(props);
    }

    componentDidUpdate(prevProps, prevState, _snapshot) {
        if(prevProps.is_play !== this.props.is_play && this.props.is_play) {
            let bars = document.getElementsByClassName("bar");
            for(let i=0; i<bars.length; i++) {
              bars[i].style.animationPlayState = "running";  
            }
        } else if(prevProps.is_play !== this.props.is_play && !this.props.is_play) {
            let bars = document.getElementsByClassName("bar");
            for(let i=0; i<bars.length; i++) {
              bars[i].style.animationPlayState = "paused";  
            }
        }
    }

    render(){
        return(
            <div id='sound_bars' className={this.props.custom_class}>
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
            </div>
        )
    }
}

export default SoundWave;

import React, {Component} from 'react';

class Loader extends Component {
    constructor(props){
        super(props);
    }

    render(){
        let loader = [];
        for (let i = 0; i < 10; i++) {
          loader.push(
            <div key={i} className="div-result">
                <div className="div-image"></div>
                <p className="p-result-title">xxxx xxxxx xxxxx</p>
                <p className="p-result-subtitle">xxxx xxxxx xxxxx</p>
            </div>)
        }

        return(
            <div className="div-results div-loader">{loader}</div>
        )
    }
}

export default Loader;

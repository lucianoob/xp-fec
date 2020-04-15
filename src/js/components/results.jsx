import React, {Component} from 'react';

import Result from './result.jsx';

class Recents extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <React.Fragment>
                { (this.props.results !== null && this.props.results !== undefined) &&
                    <React.Fragment>
                        { (this.props.results.artists && !this.props.loading) &&
                            <React.Fragment>
                                <p>Resultados em artistas encontrados para "{this.props.search}"</p>
                                <div className="div-results-home"> 
                                    { this.props.results.artists.items.map((item, index) => 
                                        <Result index={index} item={item} />
                                    )}
                                </div>   
                            </React.Fragment>             
                        }
                        { (this.props.results.albums && !this.props.loading) &&
                            <React.Fragment>
                                <p>Resultados em albuns encontrados para "{this.props.search}"</p>
                                <div className="div-results-home"> 
                                    { this.props.results.albums.items.map((item, index) => 
                                        <Result index={index} item={item} />
                                    )}
                                </div>   
                            </React.Fragment>             
                        }
                        { (this.props.results.tracks && !this.props.loading) &&
                            <React.Fragment>
                                <p>Resultados em músicas encontrados para "{this.props.search}"</p>
                                <div className="div-results-home"> 
                                    { this.props.results.tracks.items.map((item, index) => 
                                        <Result index={index} item={item}  clickPlay={(sample) => this.props.clickPlay(sample)} 
                                            is_play={this.props.is_play} sample={this.props.sample}/>
                                    )}
                                </div>   
                            </React.Fragment>             
                        }
                    </React.Fragment>
                }                
            </React.Fragment>
        )
    }
}

export default Recents;

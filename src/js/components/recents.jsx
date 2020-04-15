import React, {Component} from 'react';

import Result from './result.jsx';

class Recents extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <React.Fragment>
            { (this.props.recents !== null && this.props.recents !== undefined) &&
                <React.Fragment>
                    { (this.props.recents.artists && !this.props.loading) &&
                        <React.Fragment>
                            <p>Artistas buscados recentemente</p>
                            <div className="div-results-home"> 
                                { this.props.recents.artists.items.map((item, index) => 
                                    <Result index={index} item={item} />
                                )}
                            </div>   
                        </React.Fragment>             
                    }
                    { (this.props.recents.albums && !this.props.loading) &&
                        <React.Fragment>
                            <p>Albums buscados recentemente</p>
                            <div className="div-results-home"> 
                                { this.props.recents.albums.items.map((item, index) => 
                                    <Result index={index} item={item} />
                                )}
                            </div>   
                        </React.Fragment>             
                    }
                    { (this.props.recents.tracks && !this.props.loading) &&
                        <React.Fragment>
                            <p>Músicas buscadas recentemente</p>
                            <div className="div-results-home"> 
                                { this.props.recents.tracks.items.map((item, index) => 
                                    <Result index={index} item={item} clickPlay={(sample) => this.props.clickPlay(sample)} 
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

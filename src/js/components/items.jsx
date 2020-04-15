import React, {Component} from 'react';

import Result from './result.jsx';

class Items extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <React.Fragment>
            { (this.props.results !== null && this.props.results !== undefined && !this.props.loading) &&
                <React.Fragment>
                    <div className="div-results-artist"> 
                        { this.props.results.map((item, index) => 
                            <Result index={index} item={item} />
                        )}
                    </div>   
                </React.Fragment>
            }
            </React.Fragment>
        )
    }
}

export default Items;

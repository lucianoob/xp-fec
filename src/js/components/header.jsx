import React, {Component} from 'react';
import Img from 'react-image';

class Header extends Component {
    constructor(props){
        super(props);
    }

    clickLogoff() {
        window.location = '/logoff';
    }
    render(){
        return(
            <React.Fragment>
                <div className="div-header">
                    <div className="div-header-logo w-100" onClick={() => window.location = '/'}><h1 className="h1-title"><Img src='../images/spotify-logo.png' className="logo"/>XP FEC</h1></div>
                    <Img title="Sair" src='../images/logoff.png' className={(this.props.logged ? '' : 'd-none')+' logoff'} onClick={() => this.clickLogoff()}/>
                </div>
                <hr/>
            </React.Fragment>
        )
    }
}

export default Header;

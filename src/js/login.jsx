import React, {Component} from 'react';
import Img from 'react-image';
import queryString from 'query-string';

import Header from './components/header.jsx';

import '../scss/login.scss';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_type: 'app',
            redirect: ''
        };
    }

    componentDidMount() {
        let query = queryString.parse(this.props.location.search);
        this.setState({redirect: query.redirect});
    }

    render(){
        return(
            <React.Fragment>
                <Header />
                <div className="div-center">
                    <h2>Acesso Restrito</h2>
                    <p>Para acessar o app escolha a forma de login:</p>
                    <form className="frm-login" method="post" action="/api/v1/auth">
                        <div className="my-8-n">
                            <input type="radio" id="app" name="login_type" value="app" onClick={(e) => this.setState({login_type: e.target.value})} 
                                checked={this.state.login_type === 'app'}/>
                            <label forHtml="app">Via credenciais do app</label>
                        </div>
                        <div className="my-8-n">
                            <input type="radio" id="client_id" name="login_type" value="client_id" onClick={(e) => this.setState({login_type: e.target.value})} 
                                checked={this.state.login_type === 'client_id'}/>
                            <label forHtml="client_id">Via minhas credenciais</label>
                        </div>
                        <div className="my-8-n">
                            <input type="radio" id="hash" name="login_type" value="hash" onClick={(e) => this.setState({login_type: e.target.value})} 
                                checked={this.state.login_type === 'hash'}/>
                            <label forHtml="hash">Via hash das minhas credenciais (base64)</label>
                        </div>
                        <div className="mt-8-n mb-16-n">
                            <input type="radio" id="token" name="login_type" value="token" onClick={(e) => this.setState({login_type: e.target.value})} 
                                checked={this.state.login_type === 'token'}/>
                            <label forHtml="token">Via token</label>
                        </div>
                        <input type="text" name="client_id" placeholder="Entre com o seu Client ID"  
                            required={this.state.login_type === 'client_id'} className={this.state.login_type === 'client_id' ? '' : 'd-none'}/>
                        <input type="text" name="client_secret" placeholder="Entre com o seu Client Secret" 
                            required={this.state.login_type === 'client_id'} className={this.state.login_type === 'client_id' ? '' : 'd-none'}/>
                        <input type="text" name="hash" placeholder="Entre com o seu hash (client_id+client_secret/base64)" 
                            required={this.state.login_type === 'hash'} className={this.state.login_type === 'hash' ? '' : 'd-none'}/>
                        <input type="text" name="token" placeholder="Entre com o seu token" 
                            required={this.state.login_type === 'token'} className={this.state.login_type === 'token' ? '' : 'd-none'}/>
                        <input type="hidden" name="redirect" value={this.state.redirect}/>
                        <button type="submit" className="btn mt-16-n">Login</button>
                    </form>                    
                </div>
            </React.Fragment>
        )
    }
}

export default Login;

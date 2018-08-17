import React, { Component } from 'react';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mail: '',
            password: ''
        };

        this.handleChangeMail = this.handleChangeMail.bind(this);
        this.handleChangePass = this.handleChangePass.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.register = this.register.bind(this);
    }

    handleChangeMail(event) {
        this.setState({ mail: event.target.value });
    }

    handleChangePass(event) {
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {

        let data = {
            mail: this.state.mail,
            password: this.state.password
        }

        fetch('http://172.24.42.59:8080/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {

                if (response.success  && response.data) {
                    fetch('http://172.24.42.59:8080/user/' + response.data.user_id + '/events').then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response2 => {

                            if (response2.success) {

                                this.props.stateF.setState({
                                    events: response2.data,
                                    user_id: response.data.user_id,
                                    view: 'home'
                                })
                            } else {
                                alert('Error');
                            }
                        });
                } else {
                    alert('Credentials does not match');
                }
            });
        event.preventDefault();
    }

    register(event) {
        this.props.stateF.setState({
            view: 'register'
        })
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Mail:
          <input type="text" value={this.state.mail} onChange={this.handleChangeMail} />
                    </label>
                    <label>
                        Password:
          <input type="password" value={this.state.password} onChange={this.handleChangePass} />
                    </label>
                    <input type="submit" value="Login" />
                </form>
                <input type="submit" value="register" onClick={this.register} />
            </div>
        );
    }
}

export default Login;

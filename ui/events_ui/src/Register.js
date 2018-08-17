import React, { Component } from 'react';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            mail: '',
            password: ''
        }
    };



    render() {

        return (
            <div>
                <form onSubmit={(e) => {

                    let data = {
                        name: this.state.name,
                        mail: this.state.mail,
                        password: this.state.password
                    }

                    fetch('http://172.24.42.59:8080/user', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }).then(res => res.json())
                        .catch(error => console.error('Error:', error))
                        .then(response => {

                            this.props.con.setState({
                                view: 'login'
                            })
                            alert('User registered !');
                        });

                    e.preventDefault();
                }}>
                    <label>
                        Name:
      <input type="text" value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value }) }} />
                    </label>
                    <label>
                        Mail:
      <input type="text" value={this.state.mail} onChange={(e) => { this.setState({ mail: e.target.value }) }} />
                    </label>
                    <label>
                        Password:
      <input type="password" value={this.state.password} onChange={(e) => { this.setState({ password: e.target.value }) }} />
                    </label>

                    <input type="submit" value="Create" />
                </form>
            </div>
        );
    }

}
export default Register;
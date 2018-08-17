import React, { Component } from 'react';
import Login from './Login';
import Events from './Events.js';
import Event from './Event.js';
import NewEvent from './NewEvent.js';
import Register from './Register.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      event: {
        name: 'Hey',
        event_id: 123,
        category: 'congress',
        place: 'places',
        address: 'cra 12',
        start: '2018-12-12 10:10:10',
        end: '2018-12-12 12:00:00',
        virt: true
      }, showEvent: false,
      events: [], user_id: -1,
      view: 'login'
    };

    this.handleChangeMail = this.handleChangeMail.bind(this);
    this.refresh = this.refresh.bind(this);
    this.refreshHome = this.refreshHome.bind(this);
  }

  handleChangeMail(event) {
    this.setState({ mail: event.target.value });
  }

  refresh() {
    fetch('http://172.24.42.59:8080/user/' + this.state.user_id + '/events').then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (response.success) {

          this.setState({ events: response.data })
        } else {
          alert('Error');
        }
      });
  }

  refreshHome() {
    fetch('http://172.24.42.59:8080/user/' + this.state.user_id + '/events').then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        if (response.success) {

          this.setState({
            events: response.data,
            view: 'home'
          })
        } else {
          alert('Error');
        }
      });
  }

  render() {

    let Ren = () => {
      if (this.state.view === 'login') {
        return <Login stateF={this} />
      } else if (this.state.view === 'home') {
        return <Events con={this} items={this.state.events} />
      } else if (this.state.view === 'detail') {
        return <Event item={this.state.event} update={(item)=>{
          fetch('http://172.24.42.59:8080/event/' + this.state.event.event_id, {
            method: 'PUT',
            body: JSON.stringify(item),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
              if (response.success) {
                this.refreshHome();
              } else {
                alert('Error !');
              }

            });
        }}/>
      } else if (this.state.view === 'new') {
        return <NewEvent create={(item) => {



          fetch('http://172.24.42.59:8080/user/' + this.state.user_id + '/events', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
              if (response.success) {
                this.refreshHome();
              } else {
                alert('Error !');
              }

            });
        }} />
      } else if (this.state.view === 'register') {
        return <Register con={this}/>
      }
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Events app</h1>
        </header>
        <Ren />
      </div>
    );
  }
}

export default App;

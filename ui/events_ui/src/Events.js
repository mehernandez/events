import React, { Component } from 'react';

class Events extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: props.items
    };

  }

  render() {

    function ListItem(props) {

      const start = new Date(props.item.start);

      return (<div>
        <li>{props.item.name}</li>
        <li>{start.getFullYear() + '-' + start.getMonth() + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes()}</li>
        <button onClick={() => props.con.props.con.setState({view: 'detail', event: props.item})} > Detail </button>
        <button onClick={() => {

          fetch('http://172.24.42.59:8080/event/' + props.item.event_id, {
            method: 'DELETE',
            body: JSON.stringify({}),
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
              console.log('Success:', response);
              if (response.success) {
                props.con.props.con.refresh();
                //alert('Event deleted !');
              } else {
                alert('Error !');
              }

            });
        }}  > Delete </button>
      </div>);
    }


    function List(props) {
      const listItems = props.items.map((item) =>
        <ListItem key={item.event_id}
          item={item} con={props.con} />

      );
      return (
        <ul>
          {listItems}
        </ul>
      );
    }

    return (
      <div>
      <button onClick={()=> this.props.con.setState({view: 'new'})}>New event</button>
      <List items={this.state.items} con={this} />
      </div>
    );
  }
}

export default Events;

import React, { Component } from 'react';

class Event extends Component {

    constructor(props) {
        super(props);
        const start = new Date(props.item.start);
        const end = new Date(props.item.end);
        this.state = {
            name: props.item.name,
            event_id: props.item.event_id,
            category: props.item.category,
            place: props.item.place,
            address: props.item.address,
            start: start.getFullYear() + '-' + start.getMonth() + '-' + start.getDate() + ' ' + start.getHours() + ':' + start.getMinutes(),
            end: end.getFullYear() + '-' + end.getMonth() + '-' + end.getDate() + ' ' + end.getHours() + ':' + end.getMinutes(),
            virt: props.item.virt
        }};

    

    render() {

        return (
            <div>
            <form onSubmit={(e)=>{this.props.update({
                    name: this.state.name,
                    category: this.state.category,
                    place: this.state.place,
                    address: this.state.address,
                    start: this.state.start,
                    end: this.state.end,
                    virt: this.state.virt.toString().toUpperCase()
                })
                
                e.preventDefault();
                
                }}>
                <label>
                    Name:
      <input type="text" value={this.state.name} onChange={(e)=>{this.setState({name: e.target.value})}} />
                </label>
                <label>
                    category:
                    <select value={this.state.category} onChange={(e)=>{this.setState({category: e.target.value})}}>
            <option value="conference">Conference</option>
            <option value="seminar">Seminar</option>
            <option value="congress">Congress</option>
            <option value="course">Course</option>
          </select>
                </label>
                <label>
                    Place:
      <input type="text" value={this.state.place} onChange={(e)=>{this.setState({place: e.target.value})}} />
                </label>
                <label>
                    Address:
      <input type="text" value={this.state.address} onChange={(e)=>{this.setState({address: e.target.value})}} />
                </label>
                <label>
                    Start:
      <input type="text" value={this.state.start} onChange={(e)=>{this.setState({start: e.target.value})}} />
                </label>
                <label>
                    End:
      <input type="text" value={this.state.end} onChange={(e)=>{this.setState({end: e.target.value})}} />
                </label>
                <label>
                    Virtual:
      <input type="checkbox" value={this.state.virt} onChange={(e)=>{this.setState({virt: e.target.checked})}} />
                </label>
                <input type="submit" value="Save" />
            </form>
        </div>
        );
    }

}
export default Event;
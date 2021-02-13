import React, { Component } from "react";
import axios from "axios";
import './App.css'
import { Header, Icon, List } from "semantic-ui-react";

class App extends Component {
  state = {
    values: [],
  };

  componentDidMount() {
    axios.get("https://localhost:5001/api/values").then((response) => {
      this.setState({
        values: response.data,
      });
    });
  }
  render() {
    return (
      <div>
        <Header as='h2'>
          <Icon name='users' circular />
          <Header.Content>Activities</Header.Content>
        </Header>
        <List>
          {this.state.values.map((value: any) => (
            <List.Item key = {value.id}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    );
  }
}

export default App;

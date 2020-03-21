import React, { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prefixes: []
    };
  }
  getAwsIpRanges() {
    axios
      .get("https://ip-ranges.amazonaws.com/ip-ranges.json")
      .then(response => {
        console.log(response);
        const { data } = response;
        console.log(data);

        this.setState({
          syncToken: data.syncToken,
          createDate: data.createDate,
          prefixes: data.prefixes
        });
      })
      .catch(e => {
        console.log(`ERROR: ${e}`);
      });
  }

  render() {
    return (
      <div className="app">
        <h1 className="app-title">AWS IP Ranges</h1>
        <p> syncToken: {this.state.syncToken}</p>
        <p> createDate: {this.state.createDate}</p>
        <p> prefixes: </p>
        <ul>
          {this.state.prefixes.map(p => (
            <li key={p.service + p.ip_prefix}>
              {p.service} {p.ip_prefix}
            </li>
          ))}
        </ul>
        <input
          type="button"
          value="Get Now"
          onClick={() => this.getAwsIpRanges()}
        />
      </div>
    );
  }
}

export default App;

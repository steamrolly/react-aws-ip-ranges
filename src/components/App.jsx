import React, { Component } from "react";
import { Table } from "react-bootstrap";
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
        <h2 className="app-title">AWS IP Ranges</h2>
        <p> syncToken: {this.state.syncToken}</p>
        <p> createDate: {this.state.createDate}</p>
        <input
          type="button"
          value="Get Now"
          onClick={() => this.getAwsIpRanges()}
        />
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Service</th>
              <th>IP Prefix</th>
            </tr>
          </thead>
          <tbody>
            {this.state.prefixes.map(p => (
              <tr key={p.service + p.ip_prefix}>
                <td>{p.service}</td>
                <td>{p.ip_prefix}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
      loaded: false
    }
  }

  componentDidMount() {
    this.callApi()
      .then(body => {
        console.log(body)
        this.setState({ data: body.data, loaded: true })
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    var response = await fetch('/cotizaciones/USD');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    console.log(body)
    return body;
  };

  render() {
    if(this.state.loaded){
      return (
        <div className="App">
          <p>Fecha : {this.state.data.result.updated}</p>
          <p>Moneda : {this.state.data.result.source}</p>
          <p>Valor : {this.state.data.result.value}</p>
        </div>
      );
    }
    else {
      return(
        <div className="App">

        </div>
      )

    }

  }
}

export default App;

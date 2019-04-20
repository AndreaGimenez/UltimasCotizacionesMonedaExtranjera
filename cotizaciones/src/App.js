import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      cotizaciones: [],
      loaded: false
    }
  }

  componentDidMount() {
    this.callApi()
      .then(body => {
        console.log(body)
        this.setState({ cotizaciones: body.data, loaded: true })
      })
      .catch(err => console.log(err));
  }

  callApi = async () => {
    var response = await fetch('/cotizaciones/USD');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    var cotizacionesList = this.state.cotizaciones.map(function(cot){
      return (
        <div className="card">
          <div className="card-header">
              <p className="font-weight-bold">{cot.result.source}</p>
          </div>
          <div className="card-header">
              <p>{cot.result.value}</p>
          </div>
        </div>
      );
    })
    return  (
      <div className = "App">
        <h1>COTIZACIONES</h1>
        <ul>{ cotizacionesList }</ul>
        <button onClick={()=> this.componentDidMount()}> Refresh </button>
      </div>
    )
  }
}

export default App;

import React, { Component } from 'react';
import Refresh from './components/Refresh'

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
                    return <li>
                    {cot.result.source} - {cot.result.value}
                    </li>;
                  })

    return  <ul>{ cotizacionesList }</ul>
      }
}

export default App;

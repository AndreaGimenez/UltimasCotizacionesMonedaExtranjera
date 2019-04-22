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

  refresh(){
    this.setState({ cotizaciones: [], loaded: false});
    this.componentDidMount();
  }

  render() {
    var cotizacionesList = this.state.cotizaciones.map((cot, i) =>
    {
        return (
          <div className="card" id="caja" key={i}>
            <div className="card-header">
                <p className="font-weight-bold">{cot.result.source}</p>
            </div>
            <div className="card-body">
                <p><span className="font-italic">ARS</span> {cot.result.value.toFixed(5)}</p>
            </div>
          </div>
        )
      }
    );

    var loading = (<div id="posicion-spinner"><i className="fa fa-spinner fa-spin fa-10x"></i></div>);

    return  (
      <div className = "App">
        <div className="container">
          <h3 className="jumbotron jumbotron-fluid text-center prueba" id="titular">Cotización de Divisas Extranjeras</h3>
          <div>
              <button className="btn btn-primary btn-lg btn-block" id="boton" onClick={()=> this.refresh()}> Refresh </button>
          </div>
          <div>
            { this.state.loaded ? cotizacionesList : loading}
          </div>
        </div>
      </div>
    )
  }
}

export default App;

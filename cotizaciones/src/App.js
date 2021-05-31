import React, { Component } from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      exchangeRate: [],
      loaded: false
    }
    this.renderExchange = this.renderExchange.bind(this)
  }

  componentDidMount() {
    this.getExchangeRate();
  }

  getExchangeRate = async () => {
    this.setState({exchangeRate: [], loaded: false });
    let response = await fetch('/exchange');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    this.setState({ exchangeRate: body.data, loaded: true })
  }

  renderExchange = () => {

  }

  render() {
    let exchangeRates = this.state.exchangeRate.map((cot, i) => {
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
    });

    const spinner = (<div id="posicion-spinner"><i className="fa fa-spinner fa-spin fa-10x"></i></div>);

    return  (
      <div className = "App">
        <div className="container">
          <h3 className="jumbotron jumbotron-fluid text-center" id="titular">Exchange rates</h3>
          <div>
              <button className="btn btn-primary btn-lg btn-block" id="boton" onClick={this.getExchangeRate}> Refresh </button>
          </div>
          <div>
            {this.state.loaded && (
              this.state.exchangeRate.map((cot, i) => {
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
              })
            )}
            {!this.state.loadad && spinner}
          </div>
        </div>
      </div>
    )
  }
}

export default App;

import React from 'react';

const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <div className="container py-2">
        <fieldset className="text-left">
          <label>Enter temperature in {scaleNames[scale]}:</label>
          <input className="form-control" value={temperature} onChange={this.handleChange} />
        </fieldset>
      </div>
    );
  }
}

export default TemperatureInput
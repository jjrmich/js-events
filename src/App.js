import React from 'react';
import logo from './logo.svg';
import OnOffButton from './OnOffButton';
import CardContainer from './CardContainer';
import Calculator from './Calculator';
import TicTacToe from './TicTacToe';
import './App.css';

function App() {
  return (
    <div className="App">

      <div className="App-header container-fluid">
        <div className="row">
          <div className="col-sm-3">
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="col-sm-9">
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a> 
          </div>
        </div>
      </div>
      <div className="py-3">
        <OnOffButton />
      </div>
      <div className="py-3">
        <CardContainer
          containerName="sampleContainer"
        />
      </div>
      <div className="container py-3">
        <div className="row">
          <div className="col-md-6">
            <Calculator />
          </div>
          <div className="col-md-6">
            <TicTacToe />
          </div> 
        </div>
      </div>

      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

    </div>
  );
}

export default App;

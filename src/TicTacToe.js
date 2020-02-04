import React, {Component} from 'react';
import './TicTacToe.css';
import { createSecureContext } from 'tls';

function Square(props) {
  if (props.winningSquare) {
    return (
      <button className="square winner" onClick={props.onClick} disabled>
        {props.value}
      </button>
    );
  }
  else if (props.winner) {
    return (
      <button className="square" onClick={props.onClick} disabled>
        {props.value}
      </button>
    );
  }
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends Component {

  renderSquare(i) {
    let winningSquare = this.props.winner && this.props.winningThree.includes(i);
    return (
      <Square 
        value = {this.props.squares[i]}
        onClick = {() => this.props.onClick(i)}
        winner = {this.props.winner}
        winningSquare = {winningSquare}
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class TicTacToe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      xIsNext: true,
      winner: false,
      winningThree: [],
      stepNumber: 0
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (this.state.winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
    this.calculateWinner(squares);
  }

  jumpTo(step) {

    const history = this.state.history;
    const current = history[step];
    const squares = current.squares.slice();

    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      winner: false,
      winningThree: []
    });

    this.calculateWinner(squares);
  }

  calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        this.setState({
          winningThree: lines[i],
          winner: true
        });
      }
    }
    return null;
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.state.xIsNext ? 'O' : 'X';

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <div className="py-1" key={move}>
          <button 
            onClick={() => this.jumpTo(move)}
            className="time-warp btn btn-outline-secondary"
          >
          {desc}
          </button>
        </div>
      );
    });

    let status;

    if (this.state.winner) {
      status = 'Winner: ' + winner;
      // this.setState({winner: true});
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="status">
          <div>{status}</div>
        </div>
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winner={this.state.winner}
            winningThree={this.state.winningThree}
          />
        </div>
        <div className="game-info">
          <div className="w-50 py-1 mx-auto">{moves}</div>
        </div>
      </div>
    );
  }
}

export default TicTacToe;
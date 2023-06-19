import React, { Component } from "react";

import "./tic.css";

class Square extends Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xNext: true,
      isWinner: false,
    };
  }
  checkWinner() {
    const xods = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let xod of xods) {
      const [x, y, z] = xod;
     
      if (
        this.state.squares[x] &&
        this.state.squares[x] === this.state.squares[y] &&
        this.state.squares[x] === this.state.squares[z]
      )
      
        return this.state.squares[x] ;
    }

    return null;
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.checkWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xNext ? "X" : "O";
    this.setState({
      squares: squares,
      xNext: !this.state.xNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  reset() {
    this.setState({
      squares: Array(9).fill(null),
    });
  }
  
  render() {
    const winner = this.checkWinner(this.state.squares);
    let status;
    if (winner) {
      status = "Winner : " + winner;
    } else {
      status = "Next : " + (this.state.xNext ? "X" : "O");
    }

    return (
      <div>
        <div className="status">{status}</div>
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

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <button
            className="reset-btn"
            onClick={this.reset}
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

export default Game;

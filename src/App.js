import {useState} from 'react';
import React from 'react';
function Square({value,onSquareClick}){
 
  return <button className="square" onClick={onSquareClick}>{value}</button>
}
 function Board({xIsNext,squares,status,onPlay}) {
  //const[xIsNext,setXIsNext]=useState(true)
  //  const [squares, setSquares] = useState(Array(9).fill(null));
  function handleClick(i){
    const nextSquares = squares.slice();
    if(squares[i]||calculateWinner(squares)){
      return ;
    }
   
    if(xIsNext)
    {
      nextSquares[i] = "X";
      //setXIsNext(false);
    }
    else
    {
      nextSquares[i] = "O";
     // setXIsNext(true);
    }
  
   // setSquares(nextSquares);
    onPlay(nextSquares);
  }
    const winner=calculateWinner(squares);
    let game_status;
    if(winner){
     game_status='Winner: '+winner;
    }else if(status==='Draw') {
        game_status = 'Game Draw';
    }else{
      game_status='Next player: '+(xIsNext?'X':'O');
    }
  return (
  <div>
  <div className="staus">{game_status}</div>
  <div className="board-row">
  <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
  <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
  <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
  </div>
  <div className="board-row">
  <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
  <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
  <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
  </div>
  <div className="board-row">
  <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
  <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
  <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
  </div>
  </div>
  );
}

export default function Game(){
  
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove,setCurrentMove]=useState(0);
  const currentSquares = history[currentMove];
  const xIsNext=currentMove % 2 === 0;
  function handlePlay(nextSquares){
 //setHistory([...history,nextSquares]);
  console.log("history",history);
 const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
 console.log("currentMove",currentMove);
 console.log("nextHistory",nextHistory);
  setHistory(nextHistory);
  //setXIsNext(!xIsNext);
  setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move){
    setCurrentMove(move);
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  let status;
    if(currentMove===9 && !calculateWinner(currentSquares)){
        status='Draw';
    }
  return(
      <div className='game'>
          <div className="game-board">
              <Board xIsNext={xIsNext} squares={currentSquares} status={status} onPlay={handlePlay}></Board>
          </div>
          <div className='game-info'>
              <ol>{moves}</ol>
          </div>
      </div>
);
  
}
function calculateWinner(squares) {
  const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
      }
  }
  return null;
}

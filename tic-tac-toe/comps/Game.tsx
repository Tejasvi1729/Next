import React from "react";
import rdom from "react-dom";
import '../styles/styling.css';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { arrayBuffer } from "stream/consumers";
interface i1 {
  value: string,
  clicked: () => void,
};

interface i2 {
  arr: string[],
  helper: (i: number) => void,
};
const xisnext=atom({
  key:"key1",default:true,
}
)
const turns=atom({
  key:"key1",default:0,
}
)
const aaa=atom({
  key:"key1",default:[Array(9).fill(null)],
}
)
function Square(props: i1) {
  return (
    <button
      className="square"
      onClick={() => { props.clicked() }}
    >
      {props.value}
    </button>
  );
}
function Board(props: i2) {

  return (
    <div>
      <div className="board-row">
        <Square
          value={props.arr[0]} 
          clicked={() => { props.helper(0) }}
        />
        <Square
          value={props.arr[1]}
          clicked={() => { props.helper(1) }}
        />
        <Square
          value={props.arr[2]}
          clicked={() => { props.helper(2) }}
        />
      </div>
      <div className="board-row">
        <Square
          value={props.arr[3]}
          clicked={() => { props.helper(3) }}
        />
        <Square
          value={props.arr[4]}
          clicked={() => { props.helper(4) }}
        />
        <Square
          value={props.arr[5]}
          clicked={() => { props.helper(5) }}
        />
      </div>
      <div className="board-row">
        <Square
          value={props.arr[6]}
          clicked={() => { props.helper(6) }}
        />
        <Square
          value={props.arr[7]}
          clicked={() => { props.helper(7) }}
        />
        <Square
          value={props.arr[8]}
          clicked={() => { props.helper(8) }}
        />
      </div>
    </div>
  );
}

function Game() {

  const [xnext, setXnext] = useRecoilState(xisnext);

  function setterX() {
    setXnext((!xnext));
  }

  const [stepnum, setStep] = useRecoilState(turns);

  const [history, setHistory] = useRecoilState(aaa);
  function handleclick(i: number) {
    const temp = history.slice(0, stepnum + 1);
    const current = temp[temp.length - 1];
    const squares = current.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xnext ? 'X' : 'O';
    setterX();
    setStep(history.length);
    temp.push(squares);
    setHistory(temp);
  }

  function mover(num: number) {
    setStep(num);
    if ((num % 2) === 1) {
      setXnext(false);
    }
  }

  const temp = history;
  const curr = temp[stepnum];
  const winner = calculateWinner(curr);
  let status;
  if (winner) {
    status = 'Winner : ' + winner;
  }
  else {
    status = 'Next Player : ' + (xnext ? 'X' : 'O');
  }
  const moves = history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li>
        <button onClick={() => mover(move)}>{desc}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="game-board">
        <Board arr={curr} helper={(i) => handleclick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}


function calculateWinner(squares: string[]) {

  if (
    squares[0] &&
    squares[0] === squares[1] &&
    squares[0] === squares[2] &&
    squares[2] === squares[1]
  ) {
    return squares[0];
  } else if (
    squares[3] &&
    squares[3] === squares[4] &&
    squares[4] === squares[5] &&
    squares[5] === squares[3]
  ) {
    return squares[3];
  } else if (
    squares[6] &&
    squares[6] === squares[7] &&
    squares[8] === squares[7] &&
    squares[8] === squares[6]
  ) {
    return squares[6];
  } else if (
    squares[0] &&
    squares[0] === squares[3] &&
    squares[0] === squares[6] &&
    squares[3] === squares[6]
  ) {
    return squares[0];
  } else if (
    squares[1] &&
    squares[1] === squares[4] &&
    squares[1] === squares[7] &&
    squares[4] === squares[7]
  ) {
    return squares[1];
  } else if (
    squares[2] &&
    squares[2] === squares[5] &&
    squares[2] === squares[8] &&
    squares[5] === squares[8]
  ) {
    return squares[2];
  } else if (
    squares[0] &&
    squares[0] === squares[4] &&
    squares[0] === squares[8] &&
    squares[8] === squares[4]
  ) {
    return squares[0];
  } else if (
    squares[2] &&
    squares[2] === squares[4] &&
    squares[6] === squares[2] &&
    squares[6] === squares[4]
  ) {
    return squares[2];
  } else {
    return null;
  }
}
// ========================================
export default Game
// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Game />);
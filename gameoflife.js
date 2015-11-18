import { Board } from './board';

const SIZE = 5;
const express = require('express');

const app = express();

let board = new Board(SIZE);
board.setCellValue(2, 1, true);
board.setCellValue(2, 2, true);
board.setCellValue(2, 3, true);

function* steps(firstBoard) {
  let currBoard = firstBoard;

  while (true) {
    let newBoard = new Board(SIZE);
    newBoard.nextStep(currBoard);
    currBoard = newBoard;
    yield newBoard;
  }
}

function printify(board) {
  let string = '<html><body style="font-family: monospace; font-size: 40px;">';
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      string += (board.getCellValue(i, j) ? 'X' : '_');
    }

    string += '<br>';
  }
  string += '</body></html>'
  return string;
}

let firstBoardSteps = steps(board);

app.get('/', (req, res) => {
  let nextObj = firstBoardSteps.next();
  if (!nextObj.done) {
    res.send(printify(nextObj.value));
  } else {
    res.send('done');
  }
});

app.listen(2020, () => console.log('Listening on 2020'));

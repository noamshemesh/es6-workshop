import { Board } from './board';

const SIZE = 10;
const express = require('express');

const app = express();

let board = new Board(SIZE);

board.setCellValue(5, 1, true);
board.setCellValue(5, 2, true);
board.setCellValue(5, 3, true);
board.setCellValue(5, 4, true);
board.setCellValue(5, 5, true);
board.setCellValue(5, 6, true);
board.setCellValue(5, 7, true);
board.setCellValue(5, 8, true);

function* steps(firstBoard) {
  let currBoard = firstBoard;
  yield currBoard;
  while (!currBoard.isEmpty()) {
    let newBoard = new Board(SIZE);
    newBoard.nextStep(currBoard);
    currBoard = newBoard;
    yield newBoard;
  }
}

let firstBoardSteps = steps(board);

app.get('/reset', (req, res) => {
  firstBoardSteps = steps(board);
  res.send('done');
});

app.get('/', (req, res) => {
  let nextObj = firstBoardSteps.next();
  if (!nextObj.done) {
    res.send(printify(nextObj.value));
  } else {
    res.send('done');
  }
});

app.listen(2020, () => console.log('Listening on 2020'));




// Helpers

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

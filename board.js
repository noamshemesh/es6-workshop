export class Board {
  constructor(size) {
    this.size = size;
    this.cells = [];
    for (let i = 0; i < size; i++) {
      this.cells[i] = [];
    }
  }

  getCellValue(row, col) {
    return this.cells[row][col];
  }

  setCellValue(row, col, value) {
    this.cells[row][col] = value;
  }

  countLiveNeighbours(row, col) {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i >= 0 && j >= 0 && i < this.size && j < this.size && (i != row || j != col) && this.getCellValue(i, j)) {
          count++;
        }
      }
    }

    return count;
  }

  shouldCellLiveNextRound(row, col) {
    let count = this.countLiveNeighbours(row, col);
    let currValue = this.cells[row][col];
    if ((count == 2 && currValue) || count == 3) {
      return true;
    }

    return false;
  }

  nextStep(board) {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.setCellValue(i, j, board.shouldCellLiveNextRound(i, j))
      }
    }
  }
}

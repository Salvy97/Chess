class Cell {
    constructor(i, j, size, piece, bg) {
        this.i = i;
        this.j = j;
        this.size = size;
        this.x = j * size;
        this.y = i * size;
        this.piece = piece;
        this.bg = bg;
    }

    clone() {
        if (this.piece)
            return new Cell(this.i, this.j, this.size, this.piece.clone(), this.bg);
        return new Cell(this.i, this.j, this.size, undefined, this.bg);
    }

    draw() {
        fill(this.bg);
        rect(this.x, this.y, this.size, this.size);
    }

    contains(y, x) {
        return x > this.x && x < this.x + this.size && y > this.y && y < this.y + this.size; 
    }

    changePiece(piece) {
        this.piece = piece;
        this.piece.i = this.i;
        this.piece.j = this.j;
    }

    highlightPossibleMoves(grid) {
        let possibleMoves = this.piece.getPossibleMoves(grid);
        for (let i = 0; i < possibleMoves.length; i++) {
            fill(0, 255, 0, 70);
            rect(possibleMoves[i].cell.x, possibleMoves[i].cell.y, possibleMoves[i].cell.size, possibleMoves[i].cell.size);
        }
    }
}
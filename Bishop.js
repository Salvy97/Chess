class Bishop extends Piece {
    constructor(i, j, size, faction, needsToBeDrawn) {
        super(i, j, size, faction);
        if (needsToBeDrawn)
            this.img = loadImage("pieces/" + faction + "_bishop.png"); 
    }

    clone() {
        return new Bishop(this.i, this.j, this.size, this.faction, false);
    }

    getPossibleMoves(grid) {
        let possibleMoves = [];
        let cont = - 1;
        for (let i = this.i + 1; i < 8; i++) {
            if (grid[i][this.j + cont] && grid[i][this.j + cont].piece) {
                if (grid[i][this.j + cont].piece.faction !== this.faction)
                    this.addMove(possibleMoves, grid, i, this.j + cont);
                break;
            }
            this.addMove(possibleMoves, grid, i, this.j + cont);
            cont--;
        }
        cont = 1;
        for (let i = this.i + 1; i < 8; i++) {
            if (grid[i][this.j + cont] && grid[i][this.j + cont].piece) {
                if (grid[i][this.j + cont].piece.faction !== this.faction)
                    this.addMove(possibleMoves, grid, i, this.j + cont);
                break;
            }
            this.addMove(possibleMoves, grid, i, this.j + cont);
            cont++;
        }
        cont = 1;
        for (let i = this.i - 1; i >= 0; i--) {
            if (grid[i][this.j + cont] && grid[i][this.j + cont].piece) {
                if (grid[i][this.j + cont].piece.faction !== this.faction)
                    this.addMove(possibleMoves, grid, i, this.j + cont);
                break;
            }
            this.addMove(possibleMoves, grid, i, this.j + cont);
            cont++;
        }
        cont = -1;
        for (let i = this.i - 1; i >= 0; i--) {
            if (grid[i][this.j + cont] && grid[i][this.j + cont].piece) {
                if (grid[i][this.j + cont].piece.faction !== this.faction)
                    this.addMove(possibleMoves, grid, i, this.j + cont);
                break;
            }
            this.addMove(possibleMoves, grid, i, this.j + cont);
            cont--;
        }
        return possibleMoves;
    }
}
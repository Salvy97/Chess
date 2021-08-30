class Queen extends Piece {
    constructor(i, j, size, faction, needsToBeDrawn) {
        super(i, j, size, faction);
        if (needsToBeDrawn)
            this.img = loadImage("pieces/" + faction + "_queen.png"); 
    }

    clone() {
        return new Queen(this.i, this.j, this.size, this.faction, false);
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
        for (let i = this.i + 1; i < 8; i++) {
            if (grid[i][this.j] && grid[i][this.j].piece) {
                if (grid[i][this.j].piece.faction !== this.faction)
                    this.addMove(possibleMoves, grid, i, this.j);
                break;
            }
            this.addMove(possibleMoves, grid, i, this.j);
        }
        for (let i = this.i - 1; i >= 0; i--) {
            if (grid[i][this.j] && grid[i][this.j].piece) {
                if (grid[i][this.j].piece.faction !== this.faction)
                    this.addMove(possibleMoves, grid, i, this.j);
                break;
            }
            this.addMove(possibleMoves, grid, i, this.j);
        }
        for (let j = this.j + 1; j < 8; j++){
            if (grid[this.i][j] && grid[this.i][j].piece) {
                if (grid[this.i][j].piece.faction !== this.faction)
                    this.addMove(possibleMoves, grid, this.i, j);
                break;
            }
            this.addMove(possibleMoves, grid, this.i, j);
        }
        for (let j = this.j - 1; j >= 0; j--){
            if (grid[this.i][j] && grid[this.i][j].piece) {
                if (grid[this.i][j].piece.faction !== this.faction)
                    this.addMove(possibleMoves, grid, this.i, j);
                break;
            }
            this.addMove(possibleMoves, grid, this.i, j);
        }
        this.addMove(possibleMoves, grid, this.i + 1, this.j);
        this.addMove(possibleMoves, grid, this.i - 1, this.j);
        this.addMove(possibleMoves, grid, this.i, this.j + 1);
        this.addMove(possibleMoves, grid, this.i, this.j - 1);
        return possibleMoves;
    }
}
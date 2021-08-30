class King extends Piece {
    constructor(i, j, size, faction, needsToBeDrawn, canCastle) {
        super(i, j, size, faction);
        this.canCastle = canCastle;
        if (needsToBeDrawn)
            this.img = loadImage("pieces/" + faction + "_king.png"); 
    }

    clone() {
        return new King(this.i, this.j, this.size, this.faction, false, this.canCastle);
    }

    getPossibleMoves(grid) {
        let possibleMoves = [];
        this.addMove(possibleMoves, grid, this.i + 1, this.j);
        this.addMove(possibleMoves, grid, this.i - 1, this.j);
        this.addMove(possibleMoves, grid, this.i, this.j + 1);
        this.addMove(possibleMoves, grid, this.i, this.j - 1);
        this.addMove(possibleMoves, grid, this.i + 1, this.j + 1);
        this.addMove(possibleMoves, grid, this.i - 1, this.j + 1);
        this.addMove(possibleMoves, grid, this.i + 1, this.j - 1);
        this.addMove(possibleMoves, grid, this.i - 1, this.j - 1);
        console.log(this.canCastle);
        if (this.canCastle && !grid[this.i][this.j - 1].piece && !grid[this.i][this.j - 2].piece && !grid[this.i][this.j - 1].piece && !grid[this.i][this.j - 2].piece && !grid[this.i][this.j - 3].piece && grid[this.i][this.j - 4].piece && grid[this.i][this.j - 4].piece instanceof Rook)
            this.addMove(possibleMoves, grid, this.i, this.j - 2, true, "left");
        else if (this.canCastle && !grid[this.i][this.j + 1].piece && !grid[this.i][this.j + 2].piece && !grid[this.i][this.j + 1].piece && !grid[this.i][this.j + 2].piece && grid[this.i][this.j + 3].piece && grid[this.i][this.j + 3].piece instanceof Rook)
            this.addMove(possibleMoves, grid, this.i, this.j + 2, true, "right");
        return possibleMoves;
    }

    finalizeMove() {
        this.canCastle = false;
    }
}
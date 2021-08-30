class King extends Piece {
    constructor(i, j, size, faction, needsToBeDrawn) {
        super(i, j, size, faction);
        if (needsToBeDrawn)
            this.img = loadImage("pieces/" + faction + "_king.png"); 
    }

    clone() {
        return new King(this.i, this.j, this.size, this.faction, false);
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
        return possibleMoves;
    }
}
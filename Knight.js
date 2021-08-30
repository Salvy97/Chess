class Knight extends Piece {
    constructor(i, j, size, faction, needsToBeDrawn) {
        super(i, j, size, faction);
        if (needsToBeDrawn)
            this.img = loadImage("pieces/" + faction + "_knight.png"); 
    }

    clone() {
        return new Knight(this.i, this.j, this.size, this.faction, false);
    }

    getPossibleMoves(grid) {
        let possibleMoves = [];
        this.addMove(possibleMoves, grid, this.i - 2, this.j - 1);
        this.addMove(possibleMoves, grid, this.i - 2, this.j + 1);
        this.addMove(possibleMoves, grid, this.i - 1, this.j - 2);
        this.addMove(possibleMoves, grid, this.i + 1, this.j - 2);
        this.addMove(possibleMoves, grid, this.i + 2, this.j - 1);
        this.addMove(possibleMoves, grid, this.i + 2, this.j + 1);
        this.addMove(possibleMoves, grid, this.i - 1, this.j + 2);
        this.addMove(possibleMoves, grid, this.i + 1, this.j + 2);
        return possibleMoves;
    }
}
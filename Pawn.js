class Pawn extends Piece {
    constructor(i, j, size, faction, needsToBeDrawn) {
        super(i, j, size, faction);
        if (needsToBeDrawn)
            this.img = loadImage("pieces/" + faction + "_pawn.png"); 
        this.alreadyMoved = false;
    }

    clone() {
        return new Pawn(this.i, this.j, this.size, this.faction, false);
    }

    getPossibleMoves(grid) {
        let possibleMoves = [];
        let blocked = false;
        if (this.faction === Faction.WHITE) {
            if (grid[this.i - 1][this.j] && !grid[this.i - 1][this.j].piece)
                this.addMove(possibleMoves, grid, this.i - 1, this.j);
            else if (grid[this.i - 1][this.j].piece) blocked = true;
            if (!this.alreadyMoved && !blocked && grid[this.i - 2][this.j] && !grid[this.i - 2][this.j].piece)
                this.addMove(possibleMoves, grid, this.i - 2, this.j);
            if (grid[this.i - 1][this.j - 1] && grid[this.i - 1][this.j - 1].piece && grid[this.i - 1][this.j - 1].piece.faction !== this.faction)
                this.addMove(possibleMoves, grid, this.i - 1, this.j - 1);
            if (grid[this.i - 1][this.j + 1] && grid[this.i - 1][this.j + 1].piece && grid[this.i - 1][this.j + 1].piece.faction !== this.faction)
                this.addMove(possibleMoves, grid, this.i - 1, this.j + 1);
        } else {
            if (grid[this.i + 1][this.j] && !grid[this.i + 1][this.j].piece)
                this.addMove(possibleMoves, grid, this.i + 1, this.j);
            else if (grid[this.i + 1][this.j].piece) blocked = true;
            if (!this.alreadyMoved && !blocked && grid[this.i + 2][this.j] && !grid[this.i + 2][this.j].piece)
                this.addMove(possibleMoves, grid, this.i + 2, this.j);
            if (grid[this.i + 1][this.j + 1] && grid[this.i + 1][this.j + 1].piece && grid[this.i + 1][this.j + 1].piece.faction !== this.faction)
                this.addMove(possibleMoves, grid, this.i + 1, this.j + 1);
            if (grid[this.i + 1][this.j - 1] && grid[this.i + 1][this.j - 1].piece && grid[this.i + 1][this.j - 1].piece.faction !== this.faction)
                this.addMove(possibleMoves, grid, this.i + 1, this.j - 1);
        }
        return possibleMoves;
    }

    finalizeMove(i, j) {
        if (this.i !== i || this.j !== j)
            this.alreadyMoved = true;
        if ((this.faction === Faction.WHITE && this.i === 0) || this.faction === Faction.BLACK && this.i === 7)
            return true;
        return false;
    }
}
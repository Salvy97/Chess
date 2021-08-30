const Faction = {
    WHITE: "white",
    BLACK: "black"
}

class Piece {
    constructor(i, j, size, faction) {
        this.i = i;
        this.j = j;
        this.x = j * size;
        this.y = i * size;
        this.size = size;
        this.faction = faction;
    }

    draw() {
        if (this.img)
            image(this.img, this.x, this.y, this.size, this.size);
    }

    move(x, y, centered) {
        this.x = x - (this.size / 2) * centered;
        this.y = y - (this.size / 2) * centered;
    }

    addMove(possibleMoves, grid, i, j, isCastling, direction) {
        if (i >= 0 && i < 8 && j >= 0 && j < 8)
            if (!grid[i][j].piece || (grid[i][j].piece && grid[i][j].piece.faction !== this.faction))
                possibleMoves.push({ cell: grid[i][j], castle: { isCastling: isCastling, direction: direction } });
    }

    finalizeMove() {}
}
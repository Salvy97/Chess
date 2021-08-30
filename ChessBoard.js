class ChessBoard {
    constructor() {
        this.board = this.createNewGrid(8, 8);
        this.currMovingCell = undefined;
        this.currentPlayer = "white";
        this.engine = new Engine(this, "black");
        this.initializeGame();
    }

    createNewGrid(rows, cols) {
        var m = new Array(rows);
        for (var i = 0; i < m.length; i++)
            m[i] = new Array(cols);
        return m;
    }

    initializeGame() {
        // CREATE THE GRID
        const firstBgColor = color(255, 255, 204);
        const secondBgColor = color(102, 0, 0);
        let invert = true;
        for (let i = 0; i < 8; i++) {
            invert = !invert;
            for (let j = 0; j < 8; j++) {
                let bgColor = firstBgColor;
                if (invert)
                    bgColor = secondBgColor;
                if (j % 2 != 0) {
                    if (bgColor === firstBgColor)
                        bgColor = secondBgColor;
                    else
                        bgColor = firstBgColor;
                }
                this.board[i][j] = new Cell(i, j, floor(width / 8), undefined, bgColor);
            }
        }
    
        // ADD PIECES
        this.board[0][0].piece = new Rook(0, 0, width / 8, Faction.BLACK, true);
        this.board[0][1].piece = new Knight(0, 1, width / 8, Faction.BLACK, true);
        this.board[0][2].piece = new Bishop(0, 2, width / 8, Faction.BLACK, true);
        this.board[0][3].piece = new Queen(0, 3, width / 8, Faction.BLACK, true);
        this.board[0][4].piece = new King(0, 4, width / 8, Faction.BLACK, true, true);
        this.board[0][5].piece = new Bishop(0, 5, width / 8, Faction.BLACK, true);
        this.board[0][6].piece = new Knight(0, 6, width / 8, Faction.BLACK, true);
        this.board[0][7].piece = new Rook(0, 7, width / 8, Faction.BLACK, true);
        for (let j = 0; j < 8; j++)
            this.board[1][j].piece = new Pawn(1, j, width / 8, Faction.BLACK, true);
    
        this.board[7][0].piece = new Rook(7, 0, width / 8, Faction.WHITE, true);
        this.board[7][1].piece = new Knight(7, 1, width / 8, Faction.WHITE, true);
        this.board[7][2].piece = new Bishop(7, 2, width / 8, Faction.WHITE, true);
        this.board[7][3].piece = new Queen(7, 3, width / 8, Faction.WHITE, true);
        this.board[7][4].piece = new King(7, 4, width / 8, Faction.WHITE, true, true);
        this.board[7][5].piece = new Bishop(7, 5, width / 8, Faction.WHITE, true);
        this.board[7][6].piece = new Knight(7, 6, width / 8, Faction.WHITE, true);
        this.board[7][7].piece = new Rook(7, 7, width / 8, Faction.WHITE, true);
        for (let j = 0; j < 8; j++)
            this.board[6][j].piece = new Pawn(6, j, width / 8, Faction.WHITE, true);
    }

    canMoveTo(mouseX, mouseY, faction) {
        for (let i = 0; i < 8; i++)
            for (let j = 0; j < 8; j++)
                if (this.board[i][j].contains(mouseY, mouseX) && (!this.board[i][j].piece || (this.board[i][j].piece && this.board[i][j].piece.faction !== faction)))
                    return { i: i, j: j };
        return false;
    }

    isInPossibleMoves(nextCell, possibleMoves) {
        for (let move of possibleMoves)
            if (move.cell.i === nextCell.i && move.cell.j === nextCell.j)
                return move;
        return undefined;
    }

    movePiece(currGrid, currCell, nextCell) {
        currGrid[nextCell.i][nextCell.j].changePiece(currCell.piece);
        currGrid[nextCell.i][nextCell.j].piece.move(currGrid[nextCell.i][nextCell.j].x, currGrid[nextCell.i][nextCell.j].y, 0);
        if (currGrid[nextCell.i][nextCell.j].piece instanceof Pawn && currGrid[nextCell.i][nextCell.j].piece.finalizeMove())
            currGrid[nextCell.i][nextCell.j].piece = new Queen(nextCell.i, nextCell.j, width / 8, currGrid[nextCell.i][nextCell.j].piece.faction, true);
        currGrid[nextCell.i][nextCell.j].piece.finalizeMove();
        currCell.piece = undefined;
    }

    isSameCell(cells, i, j) {
        for (let k = 0; k < cells.length; k++)
            if (cells[k].i === i && cells[k].j === j)
                return true;
        return false;
    }

    getMustDoMoves(possibleMoves) {
        let mustDoMoves = [];
        for (let i = 0; i < possibleMoves.length; i++) {
            let currCell = this.currMovingCell.clone();
            let newGrid = this.copyGrid();
            this.movePiece(newGrid, currCell, { i: possibleMoves[i].cell.i, j: possibleMoves[i].cell.j })
            if (!this.isInCheck(newGrid))
                mustDoMoves.push(possibleMoves[i]);
        }
        return mustDoMoves;
    }

    checkForPlayerMove() {
        if (mouseIsPressed) {
            if (!this.currMovingCell) {
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        if (this.board[i][j].contains(mouseY, mouseX) && this.board[i][j].piece && this.board[i][j].piece.faction === this.currentPlayer) {
                            if (!this.isInCheck(this.board)) 
                                this.currMovingCell = this.board[i][j];
                            else {
                                let cells = this.blockCheckCells();
                                if (this.isSameCell(cells, i, j))
                                    this.currMovingCell = this.board[i][j];
                            }
                        }
                    }
                }
            } else {
                this.currMovingCell.piece.move(mouseX, mouseY, 1);
                this.currMovingCell.highlightPossibleMoves(this.board);
            }
        } else {
            if (this.currMovingCell) {
                let nextCell = this.canMoveTo(mouseX, mouseY, this.currMovingCell.piece.faction);
                let possibleMoves = this.currMovingCell.piece.getPossibleMoves(this.board);
                let mustDoMoves = this.getMustDoMoves(possibleMoves);
                let move = this.isInPossibleMoves(nextCell, mustDoMoves);
                if (nextCell && move) {
                    console.log(move);
                    if (!move.castle.isCastling)
                        this.movePiece(this.board, this.currMovingCell, nextCell);
                    else
                        this.castle(this.currentPlayer, move.castle.direction)
                    if (this.currentPlayer === "white") this.currentPlayer = "black";
                    else this.currentPlayer = "white";
                    console.log("position fen " + this.constructFen() + " b KQkq - 0 1");
                    this.engine.engine.postMessage("position fen " + this.constructFen() + " b KQkq - 0 1");
                    this.engine.alreadyMoved = false;
                } else {
                    this.currMovingCell.piece.move(this.currMovingCell.x, this.currMovingCell.y, 0);
                }
            }
            this.currMovingCell = undefined;
        }   
    }

    isInCheck(currGrid) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.currentPlayer === "white" && currGrid[i][j].piece && currGrid[i][j].piece.faction === "black") {
                    let possibleMoves = currGrid[i][j].piece.getPossibleMoves(currGrid);
                    for (let k = 0; k < possibleMoves.length; k++)
                        if (currGrid[possibleMoves[k].cell.i][possibleMoves[k].cell.j].piece && currGrid[possibleMoves[k].cell.i][possibleMoves[k].cell.j].piece.faction === "white" && currGrid[possibleMoves[k].cell.i][possibleMoves[k].cell.j].piece instanceof King)
                            return true;
                } else if (this.currentPlayer === "black" && currGrid[i][j].piece && currGrid[i][j].piece.faction === "white") {
                    let possibleMoves = currGrid[i][j].piece.getPossibleMoves(currGrid);
                    for (let k = 0; k < possibleMoves.length; k++)
                        if (currGrid[possibleMoves[k].cell.i][possibleMoves[k].cell.j].piece && currGrid[possibleMoves[k].cell.i][possibleMoves[k].cell.j].piece.faction === "black" && currGrid[possibleMoves[k].i][possibleMoves[k].cell.j].piece instanceof King)
                            return true;
                }
            }
        }
        return false;
    }

    copyGrid() {
        let newGrid = this.createNewGrid(8, 8);
        for (let i = 0; i < 8; i++) 
            for (let j = 0; j < 8; j++) 
                newGrid[i][j] = this.board[i][j].clone();
        return newGrid;
    }

    blockCheckCells() {
        let cells = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.currentPlayer === "white" && this.board[i][j].piece && this.board[i][j].piece.faction === "white") {
                    let possibleMoves = this.board[i][j].piece.getPossibleMoves(this.board);
                    for (let k = 0; k < possibleMoves.length; k++) {
                        let newGrid = this.copyGrid();
                        this.movePiece(newGrid, newGrid[i][j], { i: possibleMoves[k].cell.i, j: possibleMoves[k].cell.j });
                        if (!this.isInCheck(newGrid))
                            cells.push(newGrid[i][j]);
                    }
                } else if (this.currentPlayer === "black" && this.board[i][j].piece && this.board[i][j].piece.faction === "black") {
                    let possibleMoves = this.board[i][j].piece.getPossibleMoves(grid);
                    for (let k = 0; k < possibleMoves.length; k++) {
                        let newGrid = copyGrid();
                        this.movePiece(newGrid, newGrid[i][j], { i: possibleMoves[k].cell.i, j: possibleMoves[k].cell.j });
                        if (!this.isInCheck(newGrid))
                            cells.push(newGrid[i][j]);
                    }
                }
            }
        }
        return cells;
    }

    getFenChar(cell) {
        if (cell.piece) {
            let c = '';
            if (cell.piece instanceof Rook) c = 'r';
            if (cell.piece instanceof Knight) c = "n";
            if (cell.piece instanceof Bishop) c = "b";
            if (cell.piece instanceof Queen) c = "q";
            if (cell.piece instanceof King) c = "k";
            if (cell.piece instanceof Pawn) c = "p";
            if (cell.piece.faction === "black")
                return c; 
            return c.toUpperCase();
        }
        return null;
    }

    constructFen() {
        let fen = "";
        for (let i = 0; i < 8; i++) {
            let cont = 0;
            for (let j = 0; j < 8; j++) {
                let c = this.getFenChar(this.board[i][j]);
                if (c === null)
                    cont++;
                else {
                    if (cont != 0) {
                        fen += "" + cont;
                        cont = 0;
                    } 
                    fen += c;
                }
            }
            if (cont != 0)
                fen += "" + cont;
            if (i !== 7)
                fen += "/";
        }
        return fen;
    }

    castle(faction, direction) {
        console.log(direction);
        if (direction === "left") {
            if (faction === "white") {
                this.movePiece(this.board, this.board[7][0], this.board[7][3]);
                this.movePiece(this.board, this.board[7][4], this.board[7][2]);
            } else {
                this.movePiece(this.board, this.board[0][0], this.board[0][3]);
                this.movePiece(this.board, this.board[0][4], this.board[0][2]);
            }
        } else {
            if (faction === "white") {
                this.movePiece(this.board, this.board[7][4], this.board[7][6]); 
                this.movePiece(this.board, this.board[7][7], this.board[7][5]);
            } else {
                this.movePiece(this.board, this.board[0][7], this.board[0][5]);
                this.movePiece(this.board, this.board[0][4], this.board[0][6]);
            }
        }
    }

    isCheckMate() {
        return this.isInCheck(this.board) && this.blockCheckCells.length === 0;
    }
}
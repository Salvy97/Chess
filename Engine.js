class Engine {
    constructor(chessBoard, faction) {
        this.chessBoard = chessBoard;
        this.faction = faction;
        this.alreadyMoved = false;

        this.engine = new Worker('chessengine.js');
        this.engine.postMessage('uci');
        this.engine.postMessage('ucinewgame');
        this.engine.postMessage('position startpos');

        let engineInstance = this;
        this.engine.onmessage = function(event) {
            console.log(event.data);
            if (!engineInstance.alreadyMoved && engineInstance.chessBoard.currentPlayer === engineInstance.faction) {
                let r = event.data;
                if (r.includes("bestmove")) {
                    let move = r.substring(9, 13);
                    engineInstance.makeMove(move);
                    engineInstance.alreadyMoved = true;
                }
            }
        };
    }

    calculateNextMove() {
        this.engine.postMessage('go depth 1');
    }

    makeMove(move) {
        let movingCell = undefined;
        let nextCell = undefined;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let col = move.charCodeAt(0) - 97;
                let row = move.charCodeAt(1) - 49;
                let nCol = move.charCodeAt(2) - 97;
                let nRow = move.charCodeAt(3) - 49;
                if (row === 0) row = 7;
                else if (row === 1) row = 6;
                else if (row === 2) row = 5;
                else if (row === 3) row = 4;
                else if (row === 4) row = 3;
                else if (row === 5) row = 2;
                else if (row === 6) row = 1;
                else if (row === 7) row = 0;
                if (nRow === 0) nRow = 7;
                else if (nRow === 1) nRow = 6;
                else if (nRow === 2) nRow = 5;
                else if (nRow === 3) nRow = 4;
                else if (nRow === 4) nRow = 3;
                else if (nRow === 5) nRow = 2;
                else if (nRow === 6) nRow = 1;
                else if (nRow === 7) nRow = 0;
                if (col === j && row === i) {
                    movingCell = this.chessBoard.board[row][col];
                }
                else if (nCol === j && nRow === i)
                    nextCell = this.chessBoard.board[nRow][nCol];
            }
        }
        if (movingCell && nextCell) {
            console.log("best move " + move);
            console.log("moved {" + movingCell.i + " - " + movingCell.j + "} into {" + nextCell.i + " - " + nextCell.j + "}");
            this.chessBoard.movePiece(this.chessBoard.board, movingCell, { i: nextCell.i, j: nextCell.j });
            if (this.faction === "white") this.chessBoard.currentPlayer = "black";
            else this.chessBoard.currentPlayer = "white";
            this.engine.postMessage("position fen " + this.chessBoard.constructFen() + " w KQkq - 0 1");
        }
    }
}
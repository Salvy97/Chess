var chessBoard;
var engine;

function setup() {
    createCanvas(800, 800);
    chessBoard = new ChessBoard();
}

function draw() {
    background(255);

    for (let i = 0; i < 8; i++)
        for (let j = 0; j < 8; j++)
            chessBoard.board[i][j].draw();

    if (chessBoard.currentPlayer === "white")
        chessBoard.checkForPlayerMove();
    else
        chessBoard.engine.calculateNextMove();

    for (let i = 0; i < 8; i++)
        for (let j = 0; j < 8; j++)
            if (chessBoard.board[i][j].piece)
                chessBoard.board[i][j].piece.draw();
}
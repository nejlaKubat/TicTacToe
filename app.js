
function main() {

    const players = [{ name: "Nejla", symbol: "X", squares: [] }, { name: "Hanad", symbol: "O", squares: [] }]
    let turn = 1;
    let finished = false;

    document.getElementById("p1-name").textContent = players[0].name
    document.getElementById("p2-name").textContent = players[1].name

    const board = document.getElementsByClassName("square");

    function findWinningCombos(squares) {
        if (squares.includes(0)) {
            if (squares.includes(1) && squares.includes(2)) { //first row
                return true;
            }
            else if (squares.includes(3) && squares.includes(6)) { //first column
                return true;
            }
            else if (squares.includes(4) && squares.includes(8)) { //left top to right bottom
                return true;
            }
        }
        if (squares.includes(8)) {
            if (squares.includes(5) && squares.includes(2)) { //last row
                return true;
            }
            else if (squares.includes(7) && squares.includes(6)) { //last column
                return true;
            }
        }
        if (squares.includes(4)) {
            if (squares.includes(5) && squares.includes(3)) { //middle row
                return true;
            }
            else if (squares.includes(7) && squares.includes(1)) { //middle column
                return true;
            }
            else if (squares.includes(2) && squares.includes(6)) { //right top to left bottom
                return true;
            }
        }
    }

    function isGameFinished() {
        let winner;
        if (findWinningCombos(players[0].squares)) {
            winner = players[0].name;
            finished = true;
            if(!alert(`${winner} won in ${turn - 1} turns!`)){window.location.reload();}
        }
        else if (findWinningCombos(players[1].squares)) {
            winner = players[1].name;
            finished = true;
            if(!alert(`${winner} won in ${turn - 1} turns!`)){window.location.reload();}
        }
        else if (turn > 9) {
            finished = true;
            if(!alert("Even score!")){window.location.reload();}
        }
    }

    function addSymbolToSquare(e, position) {
        console.log(e)
        // square.appendChild()
        if (e && e.srcElement && !finished) {
            const square = e.srcElement;
            if (!!square.textContent) return;
            if (turn % 2 == 0) {
                square.textContent = "O";
                players[1].squares.push(position);
            }
            else {
                square.textContent = "X";
                players[0].squares.push(position);
            }
            turn++;
            setTimeout(isGameFinished, 0);
        }
    }

    for (let i = 0; i < board.length; i++) {
        const square = board.item(i);
        console.log(square);

        square.addEventListener("click", (e) => addSymbolToSquare(e, i))
    }

}

main();
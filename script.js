let boxes = document.querySelectorAll(".box");
let new_game = document.querySelector("#new-btn");
let msg_box = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let reset = document.querySelector("#reset-btn");

let first_player, second_player;
let count = 0;
let turnX = true;

const winpat = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const getPlayer = (player) => {
    let name;
    do {
        name = prompt(`Enter ${player} player name`);
        if (name === null) {
            alert("Input is Null. Please try again.");
        } else if (name.trim() === "") {
            alert("Input is blank. Please try again");
        }
    } while (name === null || name.trim() === "");
    return name;
};

const initialize = () => {
    first_player = getPlayer("first");
    second_player = getPlayer("second");
    count = 0;
    turnX = true;
    enablebtn();
};

const resetnewgame = () => {
    initialize();
    msg_box.classList.add("hide");
};

const handleEachBox = (box) => {
    if (box.dataset.disabled === "true") 
        return;

    box.innerText = turnX ? "X" : "O";
    box.dataset.disabled = "true";

    count++;

    if (!win() && count === 9) {
        gameDraw();
    } else {
        turnX = !turnX;
    }
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        handleEachBox(box);
    });
});

const gameDraw = () => {
    msg.innerText = `Game is Draw`;
    msg_box.classList.remove("hide");
    disablebtn();
};

const disablebtn = () => {
    boxes.forEach((box) => {
        box.dataset.disabled = "true";
        box.classList.add("disabled");
    });
};

const resetGame = () => {
    count = 0;
    turnX = true;
    enablebtn();
    msg_box.classList.add("hide");
};

const enablebtn = () => {
    boxes.forEach((box) => {
        box.classList.remove("disabled");
        box.innerText = "";
        box.dataset.disabled = "false";
    });
};

const showwinner = (winner) => {
    if (winner === "X") {
        msg.innerText = `Congratulations, Winner is ${first_player}`;
    } else {
        msg.innerText = `Congratulations, Winner is ${second_player}`;
    }
    msg_box.classList.remove("hide");
};

const win = () => {
    for (let pattern of winpat) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                disablebtn();
                showwinner(pos1);
                return true;
            }
        }
    }
    return false;
};

new_game.addEventListener("click", resetnewgame);
reset.addEventListener("click", resetGame);

initialize();

function createBoard() {
  const Node = (x, y) => {
    return { x, y, next: null, prev: null };
  };

  let spaces = [];

  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 8; j++) {
      spaces.push(Node(i, j));
    }
  }
  // console.log(spaces);

  for (let space of spaces) {
    let x = Number(space.x);
    let y = Number(space.y);

    let validMoves = [];

    let xdir = [1, 1, -1, -1, 2, 2, -2, -2];
    let ydir = [2, -2, 2, -2, 1, -1, 1, -1];

    for (let i in xdir) {
      let hash = findIndex(x + xdir[i], y + ydir[i]);
      console.log(hash);
      validMoves.push(spaces[hash]);
    }
    console.log(validMoves);
    // what is  is [circular]
    // !what is going on here
    // removes null values
    space.next = validMoves.filter((val) => val);
  }
  return spaces;
}

function findIndex(x, y) {
  // acts as a hash function
  if (x > 8 || x < 1 || y > 8 || y < 1) return null;
  return (x - 1) * 8 + (y - 1);
}

function knightMoves(start, end) {
  // console.log([1, 1] === [1, 1]);
  if (start == end) return "no moves required!";

  for (let val of [...start, ...end]) {
    console.log(val);
    if (val > 8 || val < 1) return "invalid input";
  }

  let board = createBoard();
  // console.log(board);
  let startNode = board[findIndex(start[0], start[1])];
  // console.log(startNode);
  // console.log(startNode.next);

  let path = [];
  let queue = [startNode];
  let visited = new Set();
  visited.add(startNode);

  while (queue.length) {
    let currentNode = queue.shift();

    // check if its target node
    if (currentNode.x == end[0] && currentNode.y == end[1]) {
      let temp = currentNode;
      //trace back to root
      while (temp.prev) {
        path.unshift([temp.x, temp.y]);
        temp = temp.prev;
      }
      path.unshift([startNode.x, startNode.y]);
      return path;
    }

    for (let move of currentNode.next) {
      if (!visited.has(move)) {
        move.prev = currentNode;
        visited.add(move);
        queue.push(move);
      }
    }
  }
}

const submit = document.getElementById("submit");
const para = document.getElementById("demo");

let start = document.getElementById("start");
let end = document.getElementById("end");

submit.addEventListener("click", (e) => {
  e.preventDefault();

  let s = start.value + "";
  let t = end.value + "";
  console.log({ s, t });

  start.value = "";
  end.value = "";

  let x = knightMoves([s[0], s[1]], [t[0], t[1]]);
  let txt = "";
  for (let i = 0; i < x.length; i++) {
    txt += "[" + x[i] + "] ";
  }
  para.textContent = "[ " + txt + "]";

  console.log(txt);
});

import { useEffect, useRef, useState } from "react";

function GoBoard({ sgf }) {
  const boardRef = useRef(null);
  const [moves, setMoves] = useState([]);
  const [currentMove, setCurrentMove] = useState(0);

  useEffect(() => {
    if (!sgf) return;

    const allMoves = [...sgf.matchAll(/;([BW])\[([a-s]{2})\]/gi)];
    const parsedMoves = allMoves.map(match => ({
      color: match[1].toUpperCase(),
      x: match[2].charCodeAt(0) - 97 + 1,
      y: match[2].charCodeAt(1) - 97 + 1,
    }));

    setMoves(parsedMoves);
    setCurrentMove(parsedMoves.length);
  }, [sgf]);

  useEffect(() => {
    if (moves.length === 0) return;

    const size = 19;
    const cell = 30;
    const canvasSize = cell * (size + 1); // 剛好一圈 padding

    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = canvasSize;
    const ctx = canvas.getContext("2d");

    // 背景底
    ctx.fillStyle = "#DEB887";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;

    // 畫格線
    for (let i = 1; i <= size; i++) {
      const pos = cell * i;

      // 垂直線
      ctx.beginPath();
      ctx.moveTo(pos, cell);
      ctx.lineTo(pos, cell * size);
      ctx.stroke();

      // 水平線
      ctx.beginPath();
      ctx.moveTo(cell, pos);
      ctx.lineTo(cell * size, pos);
      ctx.stroke();
    }

      // 畫星位（9 點）
     const starPoints = [4, 10, 16];
     for (let x of starPoints) {
       for (let y of starPoints) {
       ctx.beginPath();
       ctx.arc(cell * x, cell * y, cell * 0.15, 0, 2 * Math.PI);
       ctx.fillStyle = "black";
       ctx.fill();
       }
      }
    

    // 畫座標
    const letters = [..."ABCDEFGHJKLMNOPQRST"];
    ctx.fillStyle = "black";
    ctx.font = `${cell * 0.4}px sans-serif`;

    // 下方 A–T
    ctx.textAlign = "center";
    ctx.textBaseline = "top";
    for (let i = 0; i < size; i++) {
      const x = cell * (i + 1);
      ctx.fillText(letters[i], x, canvasSize - cell * 0.8);
    }

    // 左側 19–1
    ctx.textAlign = "right";
    ctx.textBaseline = "middle";
    for (let i = 0; i < size; i++) {
      const y = cell * (i + 1);
      ctx.fillText(`${19 - i}`, cell * 0.7, y);
    }

    // 畫棋子
    for (let i = 0; i < currentMove; i++) {
      const { color, x, y } = moves[i];
      const px = x * cell;
      const py = y * cell;

      ctx.beginPath();
      ctx.arc(px, py, cell / 2.5, 0, 2 * Math.PI);
      ctx.fillStyle = color === "B" ? "black" : "white";
      ctx.fill();
      ctx.stroke();

      if (i === currentMove - 1) {
        ctx.fillStyle = color === "B" ? "white" : "black";
        ctx.font = `${cell * 0.5}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(i + 1, px, py);
      }
    }

    boardRef.current.innerHTML = "";
    boardRef.current.appendChild(canvas);
  }, [moves, currentMove]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          ref={boardRef}
          style={{
            border: "1px solid #aaa",
            marginBottom: "10px",
            position: "relative",
            maxWidth: "100%",
            overflow: "hidden"
          }}
        ></div>
      </div>

      <div style={{ textAlign: "center", display: "flex", justifyContent: "center", gap: "10px" }}>
        <button onClick={() => setCurrentMove(0)}>⏮</button>
        <button onClick={() => setCurrentMove(Math.max(0, currentMove - 1))}>◀</button>
        <button onClick={() => setCurrentMove(Math.min(moves.length, currentMove + 1))}>▶</button>
        <button onClick={() => setCurrentMove(moves.length)}>⏭</button>
      </div>
    </div>
  );
}

export default GoBoard;

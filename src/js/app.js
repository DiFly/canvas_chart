const WIDTH = 900;
const HEIGHT = 300;
const PADDING = 40;
const DPI_WIDTH = WIDTH * 2;
const DPI_HEIGHT = HEIGHT * 2;
const VIEW_HEIGHT = DPI_HEIGHT - PADDING * 2;
const ROWS_COUNT = 5;

function chart(canvas, data) {
  const ctx = canvas.getContext("2d");
  canvas.width = DPI_WIDTH;
  canvas.height = DPI_HEIGHT;

  const [yMin, yMax] = computeBoundaries(data);
  console.log("yMin: " + yMin, ", yMax: " + yMax);
  const yRation = VIEW_HEIGHT / (yMax - yMin);
  console.log("yRation: " + yRation);

  // === y axis
  const step = VIEW_HEIGHT / ROWS_COUNT;
  console.log("step: " + step);
  const stepText = (yMax - yMin) / ROWS_COUNT;
  console.log("stepText: " + stepText);

  ctx.beginPath();
  ctx.strokeStyle = "#bbbbbb";
  ctx.font = "bold 20px Hevletica, sans-serif";
  ctx.fillStyle = "#96a2aa";
  for (let i = 1; i <= ROWS_COUNT; i++) {
    const y = step * i;
    const text = yMax - stepText * i;
    ctx.fillText(text.toString(), 5, y + PADDING - 10);
    ctx.moveTo(0, y + PADDING);
    ctx.lineTo(DPI_WIDTH, y + PADDING);
  }
  ctx.stroke();
  ctx.closePath();
  // ===

  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#ff0000";
  for (const [x, y] of data) {
    ctx.lineTo(x, DPI_HEIGHT - PADDING - y * yRation);
  }
  ctx.stroke();
  ctx.closePath();
}

chart(document.getElementById("chart"), [
  [0, 0],
  [100, 50],
  [200, 150],
  [300, 50],
  [500, 500],
  [600, 200],
  [700, 200],
  [800, 250],
  [900, 350],
  [1000, 400],
  [1100, 600],
  [1200, 700],
  [1300, 500],
  [1400, 100],
  [1500, 300],
  [1600, 300],
]);

function computeBoundaries(data) {
  let min;
  let max;

  for (const [x, y] of data) {
    if (typeof min !== "number") min = y;
    if (typeof max !== "number") max = y;

    if (min > y) min = y;
    if (max < y) max = y;
  }

  return [min, max];
}

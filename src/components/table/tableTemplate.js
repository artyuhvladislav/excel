import { defaultStyles } from "../../constants";
import { toInlineStyles } from "../../core/utils";

const CODES = {
  A: 65,
  Z: 90,
};

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function withWidthFrom(state) {
  return function(col, index) {
    return { col, index, width: getWidth(state.colState, index) }
  }
}

function createRow(index, content, state) {
  const resize = index
    ? '<div class="row-resize" data-resize="row"></div>'
    : "";

  return `
    <div class="row" data-type="resizable" data-row="${index}" style="height: ${getHeight(state, index)}">
        <div class="row-info">
            ${index ? index : ""}
            ${resize}
        </div>
        <div class="row-data">${content}</div>
    </div>
    `;
}

function createCol({ col, index, width }) {
    return `
      <div class="column" 
          data-type="resizable"
          data-col="${index}"
          style="width: ${width}"
      >
          ${col}
          <div class="col-resize" data-resize="col"></div>
      </div>
      `;
}


function createCell(row, state ) {
  return function (_, col) {
    const width = getWidth(state.colState, col)
    const id = `${row}:${col}`
    const data = state.dataState[id] || '';
    const styles = toInlineStyles({
      ...defaultStyles,
      ...state.stylesState[id]
    })
    return `
            <div 
                class="cell" 
                contenteditable
                data-type="col"
                data-col="${col}"
                data-id="${id}"
                style="${styles}; width: ${width}"
            >${data}</div>
         `;
  };
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index);
}

export function createTable(rowsCount = 15, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill("")
    .map(toChar)
    .map(withWidthFrom(state))
    .map(createCol)
    .join("");

  rows.push(createRow(null, cols, {}));

  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(colsCount).fill("").map(createCell(row, state)).join("");
    rows.push(createRow(row + 1, cells, state.rowState));
  }

  return rows.join("");
}

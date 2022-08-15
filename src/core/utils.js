export function capitalize(str) {
  if (typeof str !== "string") {
    return "";
  }
  return str[0].toUpperCase() + str.slice(1);
}

export function range(start, end) {
  if (start > end) {
    [end, start] = [start, end];
  }
  return new Array(end - start + 1).fill("").map((_, index) => start + index);
}

export function matrix($current, $target) {
  const current = $current.id(true);
  const target = $target.id(true);
  const cols = range(current.col, target.col);
  const rows = range(current.row, target.row);
  return cols.reduce((acc, col) => {
    rows.forEach((row) => acc.push(`${row}:${col}`));
    return acc;
  }, []);
}


export function nextSelector(key, {row, col}) {
  switch(key) {
    case "Enter":
    case "ArrowDown":
      row++
      break
    case "Tab":
    case "ArrowRight":
      col++
      break
    case "ArrowLeft":
      if(col === 0) break
      col--
    case "ArrowUp":
      if(row === 0) break
      row--
  } 

  return `[data-id="${row}:${col}"]`
}

export function storage(key, data) {
  if(!data) {
    return JSON.parse(localStorage.getItem(key, data))
  }
  localStorage.setItem(key, JSON.stringify(data))
}

export function isEqual(a, b) {
  if(typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelToDashCase(myStr) {
  return myStr.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles).map(key => `${camelToDashCase(key)}: ${styles[key]}`).join(';')
}

export function debounce(fn, wait) {
  let timeout
  return function(...args) {
    let later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
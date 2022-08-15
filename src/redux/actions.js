import {
  RESIZE_TABLE,
  CHANGE_TEXT,
  CURRENT_STYLE,
  APPLY_STYLE,
  CHANGE_TITLE,
} from "./types";

export function resizeTable(data) {
  return {
    type: RESIZE_TABLE,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}

export function changeStyles(data) {
  return {
    type: CURRENT_STYLE,
    data,
  };
}

export function applyStyle(data) {
  return {
    type: APPLY_STYLE,
    data,
  };
}

export function changeTitle(data) {
  return {
    type: CHANGE_TITLE,
    data,
  };
}

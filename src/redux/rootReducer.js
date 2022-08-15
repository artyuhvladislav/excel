import { initialState } from "./initialState";
import { RESIZE_TABLE, CHANGE_TEXT, APPLY_STYLE, CURRENT_STYLE, CHANGE_TITLE } from "./types";

export function rootReducer(state = initialState, action) {
  let field;
  switch (action.type) {
    case RESIZE_TABLE: {
      field = action.data.type === "col" ? "colState" : "rowState";
      return { ...state, [field]: value(state, field, action) };
    }

    case CHANGE_TEXT: {
      const text = action.data.value;
      field = "dataState";
      return {
        ...state,
        currentText: text,
        [field]: value(state, field, action),
      };
    }

    case CURRENT_STYLE: {
      return { ...state, currentStyles: action.data };
    }

    case APPLY_STYLE: {
      field = "stylesState";
      const val = state[field] || {};
      action.data.ids.forEach((id) => {
        val[id] = { ...val[id], ...action.data.value };
      });
      return {
        ...state,
        [field]: val,
        currentStyles: { ...state.currentStyles, ...action.data.value },
      };
    }

    case CHANGE_TITLE: {
      return {
        ...state,
        title: action.data
      }
    }

    default:
      return state;
  }
}

function value(state, field, action) {
  const val = state[field] || {};
  val[action.data.id] = action.data.value;
  return val;
}

import { defaultStyles } from "../constants"
import { storage } from "../core/utils"

const defaultState = {
    colState: {},
    rowState: {},
    currentText: '',
    title: 'new excel',
    stylesState: {},
    dataState: {},
    currentStyles: defaultStyles,
}

function normalize(state) {
    return {
        ...state,
        currentStyles: defaultStyles,
        currentText: ''
    }
}

export const initialState = storage('excel-state')
    ? normalize(storage('excel-state'))
    : defaultState
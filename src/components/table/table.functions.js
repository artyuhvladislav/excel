export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'col'
}

export function isGroupCell(event) {
    return event.shiftKey === true
}
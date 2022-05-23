class Dom {
    constructor(selector) {
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    html(html) {
        if(html) {
            this.$el.innerHTML = html
            return this
        }
        this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    append(node) {
        if(node instanceof Dom) {
            node = node.$el
        }
        if(Element.prototype.append) {
            this.$el.append(node)
        }
        this.$el.appendChild(node)
        return this
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    get data() {
        return this.$el.dataset
    }

    css(style = {}) {
        Object
            .keys(style)
            .forEach( key => {
                this.$el.style[key] = style[key]
            })
    }

    id(parse) {
        if(parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    focus() {
        this.$el.focus()
        return this
    }

    text(text) {
        if(typeof text === 'string') {
            this.$el.textContent = text
            return this
        } 
        if(this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
       return this.$el.textContent.trim()
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
    }

    on(eventType, callBack) {
        this.$el.addEventListener(eventType, callBack)
    }

    off(eventType, callBack) {
        this.$el.removeEventListener(eventType, callBack)
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, className = '') => {
    const el = document.createElement(tagName)
    if(className) {
        el.classList.add(className)
    }
    return $(el)
}
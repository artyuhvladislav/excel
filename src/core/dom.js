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
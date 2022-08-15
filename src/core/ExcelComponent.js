import { DomListener } from "@core/DomListener"

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners)
        this.name = options.name || ''
        this.unsubscribers = []
        this.emitter = options.emitter
        this.store = options.store
        this.storeSub = null
        this.subscribe = options.subscribe || []
        this.prepare()
    }

    prepare() {
        
    }

    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    storeChanged() {
        
    }
    
    isWatching(key) {
        return this.subscribe.includes(key)
    }

    toHTML() {
        return ''
    }

    init() {
        this.initDOMListeners()
    }

    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach( fn => fn())
        this.storeSub.unsubscribe()
    }
}
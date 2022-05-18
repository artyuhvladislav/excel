import { capitalize } from "./utils";

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error("No root node");
    }
    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method =  getMethodName(listener)
      if(!this[method]) {
          throw new Error('this method is not implemented')
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method =  getMethodName(listener)
      this.$root.off(listener, this[method]);
    });
  }
}

function getMethodName(method) {
    return 'on' + capitalize(method);
}

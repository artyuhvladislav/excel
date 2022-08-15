import { defaultStyles } from "../../constants";
import { $ } from "../../core/dom";
import { ExcelStateComponent } from "../../core/ExcelStateComponent";
import { toolBarTemplate } from "./toolBarTemplate";

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar'

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options
        })
    }

    prepare() {
        this.initState(defaultStyles)
    }

    get template() {
        return toolBarTemplate(this.state)
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    toHTML() {
        return this.template
    }

    onClick(event) {
        const $target = $(event.target)
        if($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            this.$emit('toolbar:applyStyle', value)
        }
    }

}
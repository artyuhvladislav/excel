import { ExcelComponent } from "../../core/ExcelComponent";
import { $ } from "../../core/dom";
import { changeTitle } from "../../redux/actions";
export class Header extends ExcelComponent {
    static className = 'excel__header'

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        })
    }

    toHTML() {
        const value = this.store.getState().title
        return `<input class="input" type="text" value="${value}"/>`
    }

    onInput(event) {
        const $target = $(event.target)
        const value = $target.text()
        this.$dispatch(changeTitle(value))
    }
}
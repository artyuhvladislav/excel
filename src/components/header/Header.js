import { ExcelComponent } from "../../core/ExcelComponent";

export class Header extends ExcelComponent {
    static className = 'excel__header'

    toHTML() {
        return '<h2>Header</h2>'
    }
}
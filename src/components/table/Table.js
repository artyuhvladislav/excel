import { ExcelComponent } from "../../core/ExcelComponent";
import { createTable } from "./tableTemplate";
import { resizeHandler } from "./resizeHandler";
import { isCell, isGroupCell, shouldResize } from "./table.functions";
import { TableSelection } from "./TableSelection";
import { $ } from "../../core/dom";
import { matrix, nextSelector } from "../../core/utils";
import * as actions from "../../redux/actions"
import { defaultStyles } from "../../constants";
export class Table extends ExcelComponent {
  static className = "excel__table";
  constructor($root, options) {
    super($root, {
      listeners: ["mousedown", "keydown", "input"],
      ...options
    });
  
  }

  prepare() {
    this.selection = new TableSelection();
  }

  toHTML() {
    return createTable(5,this.store.getState());
  }

  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selectCell($cell)

    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
      this.updateTextInStore(text)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value)
      this.$dispatch(actions.applyStyle({value, ids: this.selection.selectedIds}))
    })
    
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    this.$dispatch(actions.changeStyles(styles))
  }

  async resizeTable(event) {
    try {
      const _res = await resizeHandler.call(this, event);
      this.$dispatch(actions.resizeTable(_res))
    } catch (error) {
      console.warn(error.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (isGroupCell(event)) {
        const $cells = matrix(this.selection.current, $target).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        );

        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
      }
    }
  }

  onKeydown(event) {
    const keys = [
      "Enter",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "ArrowDown",
      "ArrowUp"
    ]

    const { key } = event
    if(keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true)    
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    const value = $(event.target).text()
    this.updateTextInStore(value)
  }
}



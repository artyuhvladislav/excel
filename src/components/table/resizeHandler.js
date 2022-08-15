import { $ } from "../../core/dom";

export function resizeHandler(event) {
  return new Promise((resolve) => {
    let value;
    const $resizer = $(event.target);
    const $parent = $resizer.closest('[data-type="resizable"]');
    const coords = $parent.getCoords();

    const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);
    const type = $resizer.data.resize;

    $resizer.css({
      opacity: 1,
    });

    document.onmousemove = (e) => {
      if (type === "col") {
        const delta = e.pageX - coords.right;
        $resizer.css({
          right: -delta + "px",
          bottom: "-5000px",
        });
        value = coords.width + delta;
      } else {
        const delta = e.pageY - coords.bottom;
        value = coords.height + delta;
        $resizer.css({
          bottom: -delta + "px",
          right: "-5000px",
        });
      }
    };

    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;

      if (type === "col") {
        $parent.css({ width: value + "px" });
        cells.forEach((el) => (el.style.width = value + "px"));
      } else {
        $parent.css({ height: value + "px" });
      }
  
      resolve({
        id: $parent.data[type],
        type,
        value,
      })

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      });
    };
  });
}

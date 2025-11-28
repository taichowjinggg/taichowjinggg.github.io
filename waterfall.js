
class Waterfall {
  /**
   * @param {string} containerId
   * @param {HTMLElement[]} elements
   * @param {number} [elementGap=0]
   */
  constructor(containerId, elements, elementGap = 0) {
    this.container = document.getElementById(containerId);
    this.elements = elements;
    this.elementGap = elementGap;
  }

  handleResize(newColumns) {
    if (newColumns !== this.columns) {
      this.columns = newColumns;
      this.renderColumns();
      this.distributeItems();
    }
  }

  renderColumns() {
    this.container.innerHTML = '';
    for (let i = 0; i < this.columns; i++) {
      const column = document.createElement('div');
      column.className = 'waterfall-column';
      column.setAttribute('data-column', i);
      this.container.appendChild(column);
    }
  }

  distributeItems() {
    const columns = this.container.querySelectorAll('.waterfall-column');

    this.columnHeights = new Array(this.columns).fill(0);

    this.elements.forEach(element => {
      const minHeight = Math.min(...this.columnHeights);
      const columnIndex = this.columnHeights.indexOf(minHeight);

      columns[columnIndex].appendChild(element);

      this.columnHeights[columnIndex] += element.offsetHeight + this.elementGap;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const tables = document.querySelectorAll('table.collapsible')
  tables.forEach((table, index) => {
    const rows = table.querySelectorAll('tr')
    if (rows.length > 3) {
      // Create a container for the table and button
      const container = document.createElement('div')
      container.className = 'table-container'
      table.parentNode.insertBefore(container, table)
      container.appendChild(table)

      const expandButton = document.createElement('div')
      expandButton.className = 'expand-button'
      expandButton.innerHTML = '\u25BC Show More'
      expandButton.addEventListener('click', () => {
        table.classList.toggle('collapsed')
        const isCollapsed = table.classList.contains('collapsed')
        expandButton.innerHTML = isCollapsed ? '\u25BC Show More' : '\u25B2 Show Less'
        expandButton.title = isCollapsed ? 'Click to expand' : 'Click to collapse'
      })
      container.appendChild(expandButton)
      table.classList.add('collapsed')
    }
  })
})

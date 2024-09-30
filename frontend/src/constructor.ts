(function(){
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('tableForm') as HTMLFormElement | null;
    const resultContainer = document.getElementById('resultContainer') as HTMLDivElement | null;

    if (!form || !resultContainer) return;

    const savedRows = localStorage.getItem('rows');
    const savedCols = localStorage.getItem('cols');
    if (savedRows) (form.elements.namedItem('rows') as HTMLInputElement).value = savedRows;
    if (savedCols) (form.elements.namedItem('cols') as HTMLInputElement).value = savedCols;

    form.addEventListener('submit', e => {
      e.preventDefault();
      const rowsInput = form.elements.namedItem('rows') as HTMLInputElement;
      const colsInput = form.elements.namedItem('cols') as HTMLInputElement;

      const rows = parseInt(rowsInput.value, 10);
      const cols = parseInt(colsInput.value, 10);

      localStorage.setItem('rows', String(rows));
      localStorage.setItem('cols', String(cols));

      let tableHTML = '<table border="1">';
      for (let r = 0; r < rows; r++) {
        tableHTML += '<tr>';
        for (let c = 0; c < cols; c++) {
          tableHTML += `<td>R${r+1}C${c+1}</td>`;
        }
        tableHTML += '</tr>';
      }
      tableHTML += '</table>';

      resultContainer.innerHTML = tableHTML;
    });
  });
})();

// export default function displayAllHospitals () {

fetch('./data/newhp.json')
        .then(response => response.json())
        .then(data => {
            // Specify the selected keys to display
            const selectedKeys = ['Hospital Name', 'Total Free Bed', 'Hospital Phone No.', 'Available Free Critical Bed (with ventilator)', 'Last Update Date'];
        
            // Create the table element
            const table = document.createElement('table');
            // Create the table header row
            const headerRow = document.createElement('tr');
    
            // Iterate over the selected keys to create the table header cells
            selectedKeys.forEach(key => {
                const headerCell = document.createElement('th');
                headerCell.textContent = key;
                headerRow.appendChild(headerCell);
            });
    
            // Append the header row to the table
            table.appendChild(headerRow);
    
            // Create table body rows and cells
            data.forEach(rowData => {
                const row = document.createElement('tr');
    
                // Iterate over the selected keys to create the table cells
                selectedKeys.forEach(key => {
                    const cell = document.createElement('td');
                    cell.textContent = rowData[key];
                    row.appendChild(cell);
                });
    
                // Append the row to the table
                table.appendChild(row);
            });
    
            // Append the table to the HTML document (e.g., a <div> with the id "tableContainer")
            const tableContainer = document.getElementById('data-table');
            tableContainer.appendChild(table);
        })
        .catch(error => console.log(error));
// };
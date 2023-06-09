// Load JSON data
// import * as dispAll from "./hpList";

fetch('./data/newhp.json')
.then(response => response.json())
.then(data => {
    // dispAll();
    const searchBar = document.getElementById('search-bar');
    const hospitalTable = document.getElementById('data-table');
    
    // Function to display filtered hospitals
    function displayHospitals(hospitals) {
        hospitalTable.innerHTML = '';
        const selectedKeys = ['Hospital Name', 'Total Free Bed', 'Hospital Phone No.', 'Available Free Critical Bed (with ventilator)', 'Last Update Date'];
        const table = document.createElement('table');
        // Create the table header row
        const headerRow = document.createElement('tr');
    
        selectedKeys.forEach(key => {
            const headerCell = document.createElement('th');
            headerCell.textContent = key;
            headerRow.appendChild(headerCell);
        })
    
        // Append the header row to the table
        table.appendChild(headerRow);
        // console.log('yo');
    
        hospitals.forEach(rowData => {
            const row = document.createElement('tr');
    
            // Iterate over the selected keys to create the table cells
            selectedKeys.forEach(key => {
                const cell = document.createElement('td');
                cell.textContent = rowData[key];
                row.appendChild(cell);
            });
    
            // Append the row to the table
            table.appendChild(row);
            // console.log('go')
        });
    
            // Append the table to the HTML document (e.g., a <div> with the id "tableContainer")
            const tableContainer = document.getElementById('data-table');
            tableContainer.appendChild(table);
        
        // hospitals.forEach(hospital => {
        //     const listItem = document.createElement('li');
        //     listItem.textContent = `${hospital["Hospital Name"]}`;
        //     hospitalTable.appendChild(listItem);
        // });
    }
    
    function clearDisplayHospitals() {
        hospitalTable.innerHTML = '';
        searchBar.ariaPlaceholder = 'Search...';
        const selectedKeys = ['Hospital Name', 'Total Free Bed', 'Hospital Phone No.', 'Available Free Critical Bed (with ventilator)', 'Last Update Date'];
        
        // Create the table element
            const table = document.createElement('table');
            // Create the table header row
            const headerRow = document.createElement('tr');

            selectedKeys.forEach(key => {
                const headerCell = document.createElement('th');
                headerCell.textContent = key;
                headerRow.appendChild(headerCell);
            })

            // Append the header row to the table
            table.appendChild(headerRow);
            // console.log('yo');

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
                // console.log('go')
            });

                // Append the table to the HTML document (e.g., a <div> with the id "tableContainer")
                const tableContainer = document.getElementById('data-table');
                tableContainer.appendChild(table);
            }

        // Event listener for search bar input
        searchBar.addEventListener('input', function () {
                const searchTerm = searchBar.value.toLowerCase();
                if (searchTerm === '') {
                    clearDisplayHospitals();


                }
                else {
                    const filteredHospitals = data.filter(hospital =>
                        hospital["Hospital Name"].toLowerCase().includes(searchTerm)
                    );
                    displayHospitals(filteredHospitals);
                }

            });
        });


/*
**************************************** 

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
            headerCell.textContent = `${key} is good`;
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


  ****************************************
  */
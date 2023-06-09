function searchNearbyHospitals() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

function successCallback(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    console.log('Your Location: ' + latitude + "," + longitude);

    // Fetch the JSON file containing hospital data
    fetch('./data/newhp.json')
        .then(response => response.json())
        .then(data => {
            // Filter the hospitals within a 5km radius from the user's location
            const nearbyHospitals = data.filter(hospital => {
                // console.log(hospital);
                const distance = getDistance(latitude, longitude, hospital.latitude, hospital.longitude);
                console.log("distance: ", distance);
                return distance <= 20; // 5km radius
            });

            // Display the nearby hospitals to the user
            displayHospitals(nearbyHospitals);


        })
        .catch(error => {
            console.log('Error occurred while fetching hospital data:', error);
        });
}

function errorCallback(error) {
    console.log('Error occurred while retrieving geolocation: ' + error.message);
}

function getDistance(lat1, lon1, lat2, lon2) {
    // Earth's radius in kilometers
    const R = 6371.0;

    // Convert latitude and longitude to radians
    const phi1 = toRadians(lat1);
    const phi2 = toRadians(lat2);
    const lambda1 = toRadians(lon1);
    const lambda2 = toRadians(lon2);

    // Calculate the distance between the two points
    const d = R * Math.acos(
        Math.sin(phi1) * Math.sin(phi2) +
        Math.cos(phi1) * Math.cos(phi2) * Math.cos(lambda1 - lambda2)
    );

    // Return the distance in kilometers
    return d;
}


// Function to convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Function to display the nearby hospitals
function displayHospitals(hospitals) {
    // You can customize this function to display the hospitals in your desired format
    console.log('Nearby Hospitals:');
    hospitals.forEach(hospital => {
        // console.log(hospital.name);
        console.log('Location:', hospital.latitude, hospital.longitude);
        console.log('Address:', hospital["Hospital Name"]);
        console.log('---');
    });

    // const 
    const hospitalTable = document.getElementById('data-table');
    hospitalTable.innerHTML = '';
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

    hospitals.forEach(rowData => {
        const row = document.createElement('tr');

        // Iterate over the selected keys to create the table cells
        selectedKeys.forEach(key => {
            const cell = document.createElement('td');
            if(key==='Hospital Name'){
                cell.classList = 'col-md-5';
                cell.innerHTML=`<a href="./index.html" class="btn nearby-link">${rowData[key]}</a>`;
                // cell.innerHTML=`<a href="${rowData["location"]}">${rowData[key]}</a>`;
            }
            else if (key === 'Total Free Bed'){
                cell.classList = 'col-md-1';
                cell.textContent = rowData[key];
            }
            else if (key === 'Hospital Phone No.'){
                cell.classList = 'col-md-2';
                cell.textContent = rowData[key];
            }
            else if (key === 'Available Free Critical Bed (with ventilator)'){
                cell.classList = 'col-md-3';
                cell.textContent = rowData[key];
            }
            else if (key === 'Last Update Date'){
                cell.classList = 'col-md-1';
                cell.textContent = rowData[key];
            }
            // cell.textContent = rowData[key];
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
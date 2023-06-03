function searchNearbyHospitals() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        console.log('Geolocation is not supported by this browser.');
    }
}

function successCallback(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // const latitude = 28.638284;
    // const longitude = 77.028743;

    console.log('Your Location: ' + latitude + "," + longitude)
    // Fetch the JSON file containing hospital data
    fetch('./data/newhp.json')
        .then(response => response.json())
        .then(data => {
            // Filter the hospitals within a 5km radius from the user's location
            const nearbyHospitals = data.filter(hospital => {
                console.log(hospital);
                const distance = getDistance(latitude, longitude, hospital.latitude, hospital.longitude);
                console.log("distance: ", distance);
                return distance <= 20; // 3km radius
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
}


















// function searchNearbyHospitals() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
//     } else {
//         console.log('Geolocation is not supported by this browser.');
//     }
// }
// function successCallback(position) {
//     const latitude = position.coords.latitude;
//     const longitude = position.coords.longitude;

//     const geocoder = new google.maps.Geocoder();
//     const latLng = new google.maps.LatLng(latitude, longitude);

//     geocoder.geocode({ 'location': latLng }, function (results, status) {
//         if (status === google.maps.GeocoderStatus.OK) {
//             if (results[0]) {
//                 console.log('Precise Location:', results[0].formatted_address);
//             } else {
//                 console.log('No results found.');
//             }
//         } else {
//             console.log('Geocoder failed due to:', status);
//         }
//     });
// }

// function errorCallback(error) {
//     console.log('Error occurred while retrieving location:', error.message);
// }
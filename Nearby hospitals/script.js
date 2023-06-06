function initMap() {
  var map = new Microsoft.Maps.Map("#map", {
    credentials:
      "AgY_1Z7utwIHvWjMjAEw8OzMXC8e2PFDSrZKdrtQ9OiZIivHEvM579KNw0tBPYWm",
    center: new Microsoft.Maps.Location(28.6139, 77.209),
    zoom: 12,
  });

  var searchManager = new Microsoft.Maps.Search.SearchManager(map);

  function findHospitals() {
    var location = document.getElementById("location").value;

    if (location.trim() === "") {
      alert("Please enter your location.");
      return;
    }

    var searchRequest = {
      where: location,
      callback: showSearchResults,
      errorCallback: showError,
    };

    searchManager.geocode(searchRequest);
  }

  function showSearchResults(response, userData) {
    if (response && response.results && response.results.length > 0) {
      var location = response.results[0].location;

      map.setView({ center: location });

      var searchRequest = {
        location: location,
        query: "hospital",
        callback: showHospitals,
        errorCallback: showError,
      };

      searchManager.search(searchRequest);
    } else {
      alert("Location not found.");
    }
  }

  function showHospitals(response, userData) {
    if (response && response.results && response.results.length > 0) {
      var hospitals = response.results.filter(function (result) {
        return result.entityType === "Hospital";
      });

      if (hospitals.length > 0) {
        var table = document.getElementById("hospital-table");
        table.innerHTML = "";

        var headerRow = table.insertRow();
        var nameHeader = headerRow.insertCell();
        nameHeader.textContent = "Hospital Name";
        var addressHeader = headerRow.insertCell();
        addressHeader.textContent = "Address";

        hospitals.forEach(function (hospital) {
          var row = table.insertRow();
          var nameCell = row.insertCell();
          nameCell.textContent = hospital.name;
          var addressCell = row.insertCell();
          addressCell.textContent = hospital.address.formattedAddress;
        });

        table.style.display = "table";
      } else {
        alert("No hospitals found near the location.");
      }
    } else {
      alert("No hospitals found near the location.");
    }
  }

  function showError(error) {
    alert("An error occurred while searching for hospitals.");
  }
}

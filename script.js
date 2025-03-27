// 🔹 Initialize OpenStreetMap with Leaflet.js
function initMap() {
    var map = L.map('map').setView([28.6139, 77.2090], 12); // Default to New Delhi

    // Use OpenStreetMap Tiles (No API Key Needed)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Collection Points
    var locations = [
        { lat: 28.7041, lng: 77.1025, name: "Collection Center 1" },
        { lat: 28.5355, lng: 77.3910, name: "Collection Center 2" }
    ];

    // Add Markers to the Map
    locations.forEach(loc => {
        L.marker([loc.lat, loc.lng]).addTo(map)
            .bindPopup(`<b>${loc.name}</b>`);
    });
}

// 🔹 Machine Learning Simulation for Sorting
function analyzeWaste() {
    const fileInput = document.getElementById("uploadFile");
    const result = document.getElementById("result");

    if (fileInput.files.length === 0) {
        result.innerText = "Please upload an image!";
        return;
    }

    // Simulating ML categorization
    const categories = ["Battery", "Laptop", "Mobile", "Plastic", "Glass"];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    result.innerText = `Identified as: ${randomCategory} - Dispose correctly!`;
}

// Load Map When Page Loads
window.onload = initMap;

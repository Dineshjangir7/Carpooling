let userPhoneNumber = "";
let userProfile = {
    name: "",
    phone: ""
};

let locations = ['Delhi', 'Jaipur', 'Mumbai', 'Chennai', 'Bangalore', 'Udaipur', 'Agra', 'Noida', 'Gurgaon'];
let vehicleModels = ['Maruti Suzuki', 'Honda City', 'Hyundai Verna', 'Toyota Fortuner', 'Mahindra XUV500'];
let postedRides = [];

// Show pages based on navigation
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('visible');
    });
    document.getElementById(pageId).classList.add('visible');
    if (pageId !== 'login-page') {
        document.getElementById('nav-bar').style.display = 'flex';  // Show nav-bar after login
        document.getElementById('contact-developer-btn').style.display = 'block';  // Show developer button after login
    } else {
        document.getElementById('nav-bar').style.display = 'none'; // Hide nav-bar on login page
        document.getElementById('contact-developer-btn').style.display = 'none'; // Hide developer button before login
    }
}

// Login with phone number
function login() {
    const phone = document.getElementById('phone').value;
    if (phone.length === 10) {
        userPhoneNumber = phone;
        userProfile.phone = phone; // Save phone number in profile
        showPage('home-page');
    } else {
        alert("Please enter a valid 10-digit phone number");
    }
}

// Show suggestions for locations
function showSuggestions(type) {
    const input = document.getElementById(`${type}`);
    const suggestionsBox = document.getElementById(`${type}-suggestions`);
    const filter = input.value.toUpperCase();

    if (filter.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    const suggestions = locations.filter(location => location.toUpperCase().includes(filter));
    
    suggestionsBox.innerHTML = suggestions.map(location => `<div onclick="selectLocation('${location}', '${type}')">${location}</div>`).join('');
    suggestionsBox.style.display = suggestions.length > 0 ? 'block' : 'none';
}

// Select a location
function selectLocation(location, type) {
    document.getElementById(type).value = location;
    document.getElementById(`${type}-suggestions`).style.display = 'none';
}

// Post a ride
function postRide() {
    const from = document.getElementById('post-from').value;
    const to = document.getElementById('post-to').value;
    const seats = document.getElementById('seats').value;
    const price = document.getElementById('price').value;
    const vehicle = document.getElementById('vehicle').value;
    const contact = document.getElementById('contact').value;
    const date = document.getElementById('ride-date').value;
    const time = `${document.getElementById('depart-hour').value}:${document.getElementById('depart-minute').value} ${document.getElementById('depart-time').value}`;
    
    const driverName = document.getElementById('name').value;
    
    if (!driverName) {
        alert("Please set your name in the profile before posting a ride.");
        return;
    }

    const ride = {
        from, to, seats, price, vehicle, contact, date, time, driverName
    };
    postedRides.push(ride);
    alert("Ride posted successfully!");

    // Redirect to home page to show rides
    showPage('home-page');
}

// Search rides based on selected date and location
function searchRides() {
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const date = document.getElementById('date').value;

    const filteredRides = postedRides.filter(ride => 
        ride.from === from && 
        ride.to === to && 
        new Date(ride.date) >= new Date() && new Date(ride.date) <= new Date(date)
    );

    let rideResults = document.getElementById('ride-results');
    if (filteredRides.length === 0) {
        document.getElementById('no-rides-popup').style.display = 'block';
        setTimeout(() => {
            document.getElementById('no-rides-popup').style.display = 'none';
        }, 3000); // Hide popup after 3 seconds
    }

    rideResults.innerHTML = filteredRides.map(ride => `
        <div>
            <strong>Driver: ${ride.driverName}</strong><br>
            <strong>Location:</strong> ${ride.from} - ${ride.to}<br>
            <strong>Vehicle:</strong> ${ride.vehicle}<br>
            <strong>Price:</strong> ₹${ride.price}<br>
            <strong>Seats Available:</strong> ${ride.seats}<br>
            <strong>Date & Time:</strong> ${ride.date} at ${ride.time}<br>
            <strong>Contact:</strong> ${ride.contact}<br>
        </div>
    `).join('');
}

// Save Profile Information
function saveProfile() {
    const name = document.getElementById('set-name-input').value;
    userProfile.name = name;
    document.getElementById('profile-name').innerText = `Name: ${userProfile.name}`;
    document.getElementById('profile-phone').innerText = `Phone Number: ${userProfile.phone}`;
    alert("Profile saved successfully!");
}

const APP_ID = "589C4FDD-0CFD-49E2-A21F-EC8A2184825E";
const API_KEY = "CE71FB5A-4108-408B-9B5B-565675426040";
const BACKENDLESS_API = `https://api.backendless.com/${APP_ID}/${API_KEY}`;

// Login
document.getElementById("loginButton").addEventListener("click", async () => {
    const name = document.getElementById("userName").value.trim();
    const phone = document.getElementById("userPhone").value.trim();

    if (name && phone.length === 10) {
        const user = { name, phone };
        await fetch(`${BACKENDLESS_API}/data/Users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });
        localStorage.setItem("userName", name);
        localStorage.setItem("userPhone", phone);
        switchScreen("homeScreen");
    } else {
        alert("Please enter valid details.");
    }
});

// Search Rides
document.getElementById("searchButton").addEventListener("click", async () => {
    const from = document.getElementById("fromLocation").value.trim();
    const to = document.getElementById("toLocation").value.trim();
    const date = document.getElementById("rideDate").value;

    const response = await fetch(
        `${BACKENDLESS_API}/data/Rides?where=fromLocation='${from}' AND toLocation='${to}' AND rideDate='${date}'`
    );
    const rides = await response.json();
    displayRides(rides);
});

// Post a Ride
document.getElementById("postRideButton").addEventListener("click", async () => {
    const ride = {
        fromLocation: document.getElementById("postFrom").value,
        toLocation: document.getElementById("postTo").value,
        rideDate: document.getElementById("postDate").value,
        rideTime: document.getElementById("postTime").value,
        seatsAvailable: parseInt(document.getElementById("postSeats").value),
        vehicleModel: document.getElementById("postVehicle").value,
        pricePerSeat: parseFloat(document.getElementById("postPrice").value),
        driverName: localStorage.getItem("userName"),
        driverPhone: localStorage.getItem("userPhone")
    };

    await fetch(`${BACKENDLESS_API}/data/Rides`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ride)
    });
    alert("Ride posted successfully!");
});

// Ensure Backendless SDK is initialized correctly
Backendless.initApp("589C4FDD-0CFD-49E2-A21F-EC8A2184825E", "CE71FB5A-4108-408B-9B5B-565675426040");

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const loginScreen = document.getElementById("login-screen");
  const homeScreen = document.getElementById("home-screen");
  const postRideScreen = document.getElementById("post-ride-screen");
  const yourRidesScreen = document.getElementById("your-rides-screen");
  const rideResults = document.getElementById("ride-results");
  const locations = [
    "New Delhi", "Mumbai", "Bangalore", "Chennai", "Hyderabad", "Kolkata", "Pune", "Jaipur", "Chandigarh",
    "Surat", "Ahmedabad", "Kochi", "Lucknow", "Patna", "Indore", "Goa", "Nagpur", "Vadodara", "Coimbatore"
  ];

  // Handle login form submission
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits!");
      return;
    }

    const user = { name, phone };
    localStorage.setItem("user", JSON.stringify(user));
    loginScreen.style.display = "none";
    homeScreen.style.display = "block";
  });

  // Location suggestion for "From" and "To"
  function updateLocationSuggestions(inputId) {
    const input = document.getElementById(inputId).value.toLowerCase();
    const datalist = document.getElementById("locations");
    datalist.innerHTML = "";
    const suggestions = locations.filter(location => location.toLowerCase().includes(input));

    suggestions.forEach(location => {
      const option = document.createElement("option");
      option.value = location;
      datalist.appendChild(option);
    });
  }

  // Add input event listener for "From" and "To"
  document.getElementById("from").addEventListener("input", () => updateLocationSuggestions("from"));
  document.getElementById("to").addEventListener("input", () => updateLocationSuggestions("to"));

  // Handle "Search Ride"
  document.getElementById("search-ride").addEventListener("click", async () => {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;

    if (!from || !to || !date) {
      alert("Please fill out all fields.");
      return;
    }

    const rides = await Backendless.Data.of("Rides").find({
      where: `from = '${from}' AND to = '${to}' AND date >= '${date}'`
    });

    rideResults.innerHTML = '';
    if (rides.length === 0) {
      rideResults.innerHTML = '<p>No rides available for this route and date.</p>';
    } else {
      rides.forEach(ride => {
        const rideDiv = document.createElement("div");
        rideDiv.classList.add("ride");
        rideDiv.innerHTML = `
          <p>From: ${ride.from} | To: ${ride.to}</p>
          <p>Date: ${ride.date} | Price: ₹${ride.price}</p>
          <p>Seats Available: ${ride.seats}</p>
          <p>Driver: ${ride.driver.name} | Phone: ${ride.driver.phone}</p>
        `;
        rideResults.appendChild(rideDiv);
      });
    }
  });

  // Handle "Post Ride"
  document.getElementById("post-ride").addEventListener("click", () => {
    homeScreen.style.display = "none";
    postRideScreen.style.display = "block";
  });

  // Handle "Your Rides"
  document.getElementById("your-rides").addEventListener("click", () => {
    homeScreen.style.display = "none";
    yourRidesScreen.style.display = "block";
  });

  // Handle "Contact Developer"
  document.getElementById("contact-dev").addEventListener("click", () => {
    document.getElementById("contact-screen").style.display = "block";
    homeScreen.style.display = "none";
  });
});

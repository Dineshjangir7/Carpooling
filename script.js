// Ensure Backendless SDK is initialized correctly
Backendless.initApp("589C4FDD-0CFD-49E2-A21F-EC8A2184825E", "CE71FB5A-4108-408B-9B5B-565675426040");

document.addEventListener("DOMContentLoaded", function() {
  const loginForm = document.getElementById("login-form");
  const loginScreen = document.getElementById("login-screen");
  const homeScreen = document.getElementById("home-screen");
  const rideResults = document.getElementById("ride-results");

  // Handle login form submission
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    // Validate phone number format
    if (!/^\d{10}$/.test(phone)) {
      alert("Phone number must be 10 digits!");
      return;
    }

    // Save user data to localStorage
    const user = { name, phone };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Login successful!");

    // Hide login screen and show home screen
    loginScreen.style.display = "none";
    homeScreen.style.display = "block";
  });

  // Handle search button click
  const searchButton = document.getElementById("search-ride");
  searchButton.addEventListener("click", async () => {
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const date = document.getElementById("date").value;

    // Query the database for available rides matching search criteria
    const rides = await Backendless.Data.of("Rides").find({
      condition: `from = '${from}' AND to = '${to}' AND date >= '${date}'`
    });

    // Clear previous results
    rideResults.innerHTML = "";

    // If no rides found, show a message
    if (rides.length === 0) {
      rideResults.innerHTML = `<p>No rides available for this route and date.</p>`;
      return;
    }

    // Show available rides
    rides.forEach((ride) => {
      rideResults.innerHTML += `
        <div class="ride">
          <h3>${ride.from} → ${ride.to}</h3>
          <p>Date: ${ride.date}</p>
          <p>Price: ₹${ride.price}</p>
          <p>Seats Available: ${ride.seats}</p>
          <p>Driver: ${ride.driverName} (${ride.driverPhone})</p>
        </div>
      `;
    });
  });

  // Event listener for the "Home" button (returns to home screen)
  document.getElementById("home").addEventListener("click", () => {
    loginScreen.style.display = "none";
    homeScreen.style.display = "block";
  });

  // Event listener for the "Post a Ride" button (navigate to the post ride section)
  document.getElementById("post-ride").addEventListener("click", () => {
    // You can add functionality for posting a ride here
  });

  // Event listener for the "Your Rides" button (navigate to user's rides section)
  document.getElementById("your-rides").addEventListener("click", () => {
    // You can add functionality to show user’s posted rides here
  });

  // Event listener for the "Contact Developer" button
  document.getElementById("contact-dev").addEventListener("click", () => {
    alert("Contact info:\nTelegram: @dj3680\nApp made by Dinesh Jangir.");
  });
});

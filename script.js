// Initialize Backendless
Backendless.initApp("589C4FDD-0CFD-49E2-A21F-EC8A2184825E", "CE71FB5A-4108-408B-9B5B-565675426040");

const loginForm = document.getElementById("login-form");
const homeScreen = document.getElementById("home-screen");
const loginScreen = document.getElementById("login-screen");
const rideResults = document.getElementById("ride-results");

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
  alert("Login successful!");
  loginScreen.style.display = "none";
  homeScreen.style.display = "block";
});

document.getElementById("search-ride").addEventListener("click", async () => {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const date = document.getElementById("date").value;

  const rides = await Backendless.Data.of("Rides").find({
    condition: `from = '${from}' AND to = '${to}' AND date >= '${date}'`
  });

  rideResults.innerHTML = "";
  if (rides.length === 0) {
    rideResults.innerHTML = `<p>No rides available for this route and date.</p>`;
    return;
  }

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

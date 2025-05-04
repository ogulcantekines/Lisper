// main.js

// Select DOM elements
const btn = document.getElementById("new-secret-btn");
const secretText = document.getElementById("secret-text");
const userText = document.getElementById("user-text");
const popSound = document.getElementById("pop-sound");
const spinner = document.getElementById("spinner");

// Button click event
btn.addEventListener("click", async () => {
    try {
        // Show loading state
        secretText.innerText = "Loading new secret...";
        secretText.classList.add("loading");
        userText.innerText = "";
        btn.classList.add("fade-out");
        spinner.style.display = "block";  // Show spinner

        // Fetch secret (you can toggle between real API and fake data)
        const response = await axios.get("/new-secret");
        const data = response.data;

        /*
        // Fake data fallback (if API limit is hit)
        const secrets = [
            { secret: "Test secret 1 🚀", user: "Alice" },
            { secret: "Another juicy secret 🤫", user: "Bob" },
            { secret: "Yet another one! 🔥", user: "Charlie" }
        ];
        const data = secrets[Math.floor(Math.random() * secrets.length)];
        */

        // Update UI after fetching
        spinner.style.display = "none";
        secretText.classList.remove("loading");
        secretText.innerText = data.secret;
        userText.innerText = data.user;

        // Play sound effect
        popSound.currentTime = 0;
        popSound.play();

        // Show button again smoothly
        btn.classList.remove("fade-out");

    } catch (err) {
        console.error("Error fetching new secret:", err);
        secretText.classList.remove("loading");
        secretText.innerText = "Oops! Couldn't fetch a new secret.";
        userText.innerText = "";
    }
});

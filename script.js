// Initialize Firebase (Replace with your own Firebase project config)
const firebaseConfig = {
  apiKey: "AIzaSyCa08VA0AyJ08or6NACYGWiYfdeTP147Jk",
  authDomain: "rating-1a952.firebaseapp.com",
  projectId: "rating-1a952",
  storageBucket: "rating-1a952.firebasestorage.app",
  messagingSenderId: "753479569571",
  appId: "1:753479569571:web:af92b64d68a05fd5a2af16",
  measurementId: "G-Y47E61Y5VE"
};


// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();





const stars = document.querySelectorAll(".star");
const submitButton = document.getElementById("submit");
const messageDiv = document.getElementById("message");
const nameInput = document.getElementById("name");
const reviewInput = document.getElementById("review");

let selectedRating = 0;

// Handle star selection
stars.forEach(star => {
  star.addEventListener("click", () => {
    selectedRating = parseInt(star.getAttribute("data-value"));
    stars.forEach(s => s.classList.remove("selected")); // Clear previous selection
    for (let i = 0; i < selectedRating; i++) {
      stars[i].classList.add("selected"); // Highlight selected stars
    }
  });
});

// Handle submission
submitButton.addEventListener("click", async () => {
  const name = nameInput.value.trim();
  const review = reviewInput.value.trim();
  messageDiv.textContent = ""; // Clear any previous message

  // Validate inputs
  if (!name) {
    messageDiv.textContent = "Please enter your name.";
    messageDiv.style.color = "red";
    return;
  }

  if (!review) {
    messageDiv.textContent = "Please write a review.";
    messageDiv.style.color = "red";
    return;
  }

  if (selectedRating === 0) {
    messageDiv.textContent = "Please select a rating before submitting!";
    messageDiv.style.color = "red";
    return;
  }

  try {
    // Upload data to Firestore
    const docRef = await db.collection("reviews").add({
      name: name,
      review: review,
      rating: selectedRating,
      timestamp: new Date().toISOString(),
    });

    // Success message
    messageDiv.textContent = `Thank you, ${name}`;
    messageDiv.style.color = "#007bff";

    // Clear fields after submission
    nameInput.value = "";
    reviewInput.value = "";
    stars.forEach(s => s.classList.remove("selected"));
    selectedRating = 0;
  } catch (error) {
    messageDiv.textContent = "Failed to submit feedback. Please try again.";
    messageDiv.style.color = "red";
    console.error("Error adding document: ", error);
  }
});
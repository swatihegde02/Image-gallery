// Get elements for the popup
const popupContainer = document.getElementById("popupImg");
const popupImage = document.getElementById("popupImage");
const closePopup = document.getElementById("closePopup");
const popupImageDesc = document.getElementById("popupImageDescription");
const popupLikeButton = document.getElementById("popupLikeButton");
// Get all gallery images and add event listeners
const galleryItems = document.querySelectorAll(".images img");
const likedContent = {};

// When an image is clicked, show the popup with the larger image
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imgSrc = item.src; // Get the clicked image's source
    popupImage.src = imgSrc; // Set the popup image's source to the clicked image
    popupContainer.style.display = "flex"; // Show the popup
    popupImageDesc.innerHTML =
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo, ipsa adipisci vel deserunt enim minima qui perferendis dolor corrupti ipsum dicta similique eos facilis ex atque? Ut, saepe,";
    if (likedContent[popupImage.src]) {
      popupLikeButton.classList.add("liked");
    }
  });
});

popupLikeButton.addEventListener("click", () => {
  if (popupLikeButton.classList.contains("liked")) {
    popupLikeButton.classList.remove("liked");
    likedContent[popupImage.src] = false;
  } else {+
    popupLikeButton.classList.add("liked");
    likedContent[popupImage.src] = true;
  }
});

// Close the popup when the close button (&times;) is clicked
closePopup.addEventListener("click", () => {
    popupContainer.style.display = "none"; // Hide the popup
    popupLikeButton.classList.remove("liked");
});

// // Close the popup if user clicks anywhere outside the image
popupContainer.addEventListener("click", (event) => {
  if (event.target === popupContainer) {
    popupContainer.style.display = "none"; // Hide the popup when clicking outside the image
    popupLikeButton.classList.remove("liked");
  }
});


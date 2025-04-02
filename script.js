// Get elements for the popup
const popupContainer = document.getElementById("popupImg");
const popupImage = document.getElementById("popupImage");
const closePopup = document.getElementById("closePopup");
const popupImageDesc = document.getElementById("popupImageDescription");
const popupLikeButton = document.getElementById("popupLikeButton");
// Get all gallery images and add event listeners
const galleryItems = document.querySelectorAll(".images img");
const likedContent = {};

let filterItem = document.querySelector(".items-links");
let filterImages = document.querySelectorAll(".images");

window.addEventListener("load", () => {
  filterItem.addEventListener("click", (selectedItem) => {
    if (selectedItem.target.classList.contains("item-link")) {
      document.querySelector(".menu-active").classList.remove("menu-active");
      selectedItem.target.classList.add("menu-active");
      let filterName = selectedItem.target.getAttribute("data-name");
      filterImages.forEach((image) => {
        let filterImages = image.getAttribute("data-name");
        if (filterImages == filterName || filterName == "all") {
          image.style.display = "block";
        } else {
          image.style.display = "none";
        }
      });
    }
  });
});

// When an image is clicked, show the popup with the larger image
galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imgSrc = imgElement.src; // Get the clicked image's source
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
  } else {
    +popupLikeButton.classList.add("liked");
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

// // Check if token exists in localStorage
const token = localStorage.getItem("token");
const authButtons = document.getElementById("auth-buttons");
const tabs = document.getElementById("tabs");

if (token) {
  // If token exists, show "Create Post" button
  authButtons.innerHTML = `
      <a href="create-post.html" class="btn2" style="cursor: pointer">Create Post</a>
      <button class="btn2" id="logout">Logout</button>
    `;

  if (!document.querySelector('[data-name="posts"]')) {
    tabs.innerHTML += `
        <span class="item-link" data-name="posts">Posts</span>
        <span class="item-link" data-name="my-posts">My Posts</span>
      `;
  }
} else {
  // If no token, show "Login" button
  authButtons.innerHTML = `
      <a href="login.html" class="btn2" style="cursor: pointer">Login</a>
    `;

  document
    .querySelectorAll('[data-name="posts"], [data-name="my-posts"]')
    .forEach((tab) => tab.remove());
}

document.getElementById("logout").addEventListener("click", (event) => {
  localStorage.removeItem("token");

  const currentPath = window.location.pathname
    .split("/")
    .slice(0, -1)
    .join("/");
  window.location.href = `${window.location.origin}${currentPath}/login.html`;
});

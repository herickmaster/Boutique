// Toggle mobile menu
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    nav.classList.toggle("show");
    // Change icon between bars and times
    toggle.innerHTML = nav.classList.contains("show")
      ? '<i class="fas fa-times"></i>'
      : '<i class="fas fa-bars"></i>';
  });
});



let currentIndex = 0;
let products = [];

document.addEventListener("DOMContentLoaded", () => {
  // Collect all product cards
  products = Array.from(document.querySelectorAll(".card"));

  // Enable swipe gestures
  const modal = document.getElementById("imageModal");
  let touchStartX = 0;

  modal.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  modal.addEventListener("touchend", (e) => {
    let touchEndX = e.changedTouches[0].screenX;
    if (touchEndX - touchStartX > 50) {
      changeSlide(-1); // swipe right → previous
    } else if (touchStartX - touchEndX > 50) {
      changeSlide(1); // swipe left → next
    }
  });
});

// Open modal on card click
function openModal(card) {
  currentIndex = products.indexOf(card);
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const thumbContainer = document.getElementById("modalThumbnails");

  // Get product data
  const images = card.dataset.images ? card.dataset.images.split(",") : [card.querySelector("img").src];
  
  // Show modal
  modal.classList.add("show");
  modalImg.src = images[0].trim();
  captionText.innerHTML = card.querySelector("h3").innerText;

  // Build thumbnails
  thumbContainer.innerHTML = "";
  images.forEach((src, i) => {
    const thumb = document.createElement("img");
    thumb.src = src.trim();
    thumb.classList.add("thumb");
    if (i === 0) thumb.classList.add("active");

    thumb.addEventListener("click", () => {
      modalImg.src = src.trim();
      document.querySelectorAll("#modalThumbnails .thumb").forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
    });

    thumbContainer.appendChild(thumb);
  });
}


// Show selected slide
function showSlide(index) {
  const modalImg = document.getElementById("modalImage");
  const captionText = document.getElementById("caption");
  const thumbContainer = document.getElementById("modalThumbnails");

  if (index >= products.length) currentIndex = 0;
  if (index < 0) currentIndex = products.length - 1;

  const product = products[currentIndex];

  // Set main image
  const firstImage = product.dataset.images
    ? product.dataset.images.split(",")[0].trim()
    : product.querySelector("img").src;
  modalImg.src = firstImage;

  // Set caption
  captionText.innerText = product.querySelector("h3").innerText;

  // Rebuild thumbnails
  thumbContainer.innerHTML = "";
  if (product.dataset.images) {
    const images = product.dataset.images.split(",");
    images.forEach((src, i) => {
      const thumb = document.createElement("img");
      thumb.src = src.trim();
      thumb.classList.add("thumb");
      if (i === 0) thumb.classList.add("active");

      thumb.addEventListener("click", () => {
        modalImg.src = src.trim();
        document.querySelectorAll("#modalThumbnails .thumb").forEach(t => t.classList.remove("active"));
        thumb.classList.add("active");
      });

      thumbContainer.appendChild(thumb);
    });
  }
}


// Change slides
function changeSlide(n) {
  currentIndex += n;
  showSlide(currentIndex);
}

// Close modal
function closeModal() {
  const modal = document.getElementById("imageModal");
  modal.classList.remove("show");
}


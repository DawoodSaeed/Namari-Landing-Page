const init = () => {
  const animationHandler = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  };

  // Creating an observer;
  const observer = new IntersectionObserver(animationHandler, {
    threshold: 0.5,
  });

  document.querySelectorAll(".animateMe").forEach((element) => {
    observer.observe(element);
  });
};
window.onload = init;

const scrollHandler = () => {
  const navLinks = document.querySelectorAll(".header-nav__items ul li a");
  const wrapper = document.getElementById("wrapper");
  const margin = window
    .getComputedStyle(wrapper)
    .getPropertyValue("margin-left");
  const nav = document.querySelector(".header-nav");
  nav.style.margin = `0px ${parseInt(margin)}px`;
  const scrollPosition = window.scrollY;
  document.querySelectorAll("section").forEach((section) => {
    const top = section.offsetTop - 100;
    const bottom = top + section.clientHeight;

    if (scrollPosition >= top && scrollPosition < bottom) {
      const id = section.getAttribute("id");
      console.log(id);
      navLinks.forEach((link) => link.classList.remove("active"));
      document
        .querySelector(`.header-nav__items ul li a[href="#${id}"]`)
        .classList.add("active");
    }
  });

  const aboutSection = document.getElementById("about");
  const navbar = document.querySelector(".header-nav");
  const aboutTop = aboutSection.offsetTop - 100;

  if (scrollPosition >= aboutTop) {
    navbar.classList.add("active");
  } else {
    nav.style.margin = `0px`;
    navbar.classList.remove("active");
  }
};

window.addEventListener("scroll", scrollHandler);

// ################## GALLERY ################

let currentIdx = 0;

const images = [""];

// Chossing the certain image Logic
const fullViewGallery = document.querySelector(".gallery_full_view");
const img = fullViewGallery.querySelector("img");

document.querySelectorAll(".gallery_image").forEach((gallery) => {
  gallery.addEventListener("click", function () {
    const imageSrc = this.querySelector("img").src;
    currentIdx = parseInt(this.getAttribute("data-index"));
    fullViewGallery.style.display = "flex";
    img.src = imageSrc;
  });
});

// Closing Feature of gallery;
fullViewGallery.querySelector(".cross").addEventListener("click", function () {
  fullViewGallery.style.display = "none";
});

// Slide logic next and previous slide button logic
fullViewGallery
  .querySelector(".next_image")
  .addEventListener("click", function () {
    currentIdx += 1;
    if (currentIdx > 6) currentIdx = 1;
    img.classList.remove("imageShowActive");
    img.classList.add("imageShowActive");
    img.src = `images/gallery-image-${currentIdx}.jpg`;
  });

fullViewGallery
  .querySelector(".prev_image")
  .addEventListener("click", function () {
    currentIdx -= 1;
    if (currentIdx < 1) currentIdx = 6;
    img.src = `images/gallery-image-${currentIdx}.jpg`;
  });

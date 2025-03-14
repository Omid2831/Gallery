// DOM Elements
const img = document.querySelector("#omid-pic img");
const popupMessage = document.getElementById("popup-message");
const musicToggle = document.getElementById("toggleMusic");
const bgMusic = document.getElementById("bgMusic");
const contactForm = document.getElementById("contact-form");
const container = document.querySelector(".container");

// Music Control
let isMusicPlaying = false;

// Add this to handle autoplay restrictions
document.addEventListener(
  "click",
  function () {
    if (!isMusicPlaying) {
      bgMusic
        .play()
        .then(() => {
          isMusicPlaying = true;
          musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
        })
        .catch((error) => {
          console.log("Audio play failed:", error);
        });
    }
  },
  { once: true }
);

musicToggle.addEventListener("click", () => {
  if (isMusicPlaying) {
    bgMusic.pause();
    musicToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
  } else {
    bgMusic
      .play()
      .then(() => {
        musicToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
      })
      .catch((error) => {
        console.log("Audio play failed:", error);
      });
  }
  isMusicPlaying = !isMusicPlaying;
});

// Profile Image Interaction
img.addEventListener("mouseover", () => {
  popupMessage.style.display = "block";
  img.style.transform = "scale(1.1) rotate(-5deg)";
});

img.addEventListener("mouseout", () => {
  popupMessage.style.display = "none";
  img.style.transform = "scale(1) rotate(0)";
});

// Gallery Interaction
let isRotating = true;
container.addEventListener("click", () => {
  if (isRotating) {
    container.style.animationPlayState = "paused";
  } else {
    container.style.animationPlayState = "running";
  }
  isRotating = !isRotating;
});

// Smooth Scrolling for Navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Contact Form Handling
contactForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Create mailto link
  const mailtoLink = `mailto:mehrabiomid8282@gmail.com?subject=Message from ${name}&body=${encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  )}`;

  // Open default email client
  window.location.href = mailtoLink;

  // Show success message
  alert("Thank you for your message! Opening your email client...");
  contactForm.reset();
});

// Scroll Progress Indicator
const scrollProgress = document.querySelector(".scroll-progress");

window.addEventListener("scroll", () => {
  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.pageYOffset / totalHeight) * 100;
  scrollProgress.style.width = `${progress}%`;
});

// Enhanced Intersection Observer for Animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
    }
  });
}, observerOptions);

// Apply different animation styles to different sections
document.querySelectorAll("section").forEach((section, index) => {
  section.classList.add("hidden");

  // Alternate animation styles
  if (index % 4 === 0) {
    section.classList.add("from-left");
  } else if (index % 4 === 1) {
    section.classList.add("from-right");
  } else if (index % 4 === 2) {
    section.classList.add("from-bottom");
  } else {
    section.classList.add("scale-up");
  }

  observer.observe(section);
});

// Animate individual elements within sections
const animateElements = () => {
  const elements = document.querySelectorAll(
    ".stat-item, .social-link, .form-group"
  );
  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.5s ease";
    element.style.transitionDelay = `${index * 0.1}s`;

    const elementObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.5 }
    );

    elementObserver.observe(element);
  });
};

// Call the function after DOM is loaded
document.addEventListener("DOMContentLoaded", animateElements);

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  setCurrentYear();
  markActiveNavigation();
  createProjectCards();
  setupContactForm();
  setupRevealAnimation();
});

function setCurrentYear() {
  document.querySelectorAll("#current-year").forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
}

function markActiveNavigation() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll("nav a").forEach((link) => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function createProjectCards() {
  const grid = document.querySelector("#projects-grid");

  if (!grid) return;

  const projects = [
    { title: "", description: "", image: "", link: "" },
    { title: "", description: "", image: "", link: "" },
    { title: "", description: "", image: "", link: "" },
    { title: "", description: "", image: "", link: "" }
  ];

  grid.innerHTML = projects
    .map((project, index) => {
      const title = project.title || "Project Coming Soon";
      const description =
        project.description ||
        "This card is ready for your next creative project.";

      const image = project.image
        ? `<img src="${project.image}" alt="${title}">`
        : `<span>Project ${index + 1}</span>`;

      const button = project.link
        ? `<a class="btn" href="${project.link}" target="_blank" rel="noopener">View Project</a>`
        : `<button class="btn disabled-btn" type="button" disabled>Coming Soon</button>`;

      return `
        <article class="project-card reveal">
          <div class="project-image">${image}</div>
          <div class="project-content">
            <h2>${title}</h2>
            <p>${description}</p>
            ${button}
          </div>
        </article>
      `;
    })
    .join("");
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");

  if (!form) return;

  const status = document.querySelector("#form-status");
  const fields = form.querySelectorAll("input, select, textarea");

  fields.forEach((field) => {
    field.addEventListener("input", () => {
      field.classList.remove("invalid");
      status.textContent = "";
      status.className = "form-status";
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let valid = true;

    fields.forEach((field) => {
      if (!field.checkValidity()) {
        field.classList.add("invalid");
        valid = false;
      }
    });

    if (!valid) {
      status.textContent = "Please complete all fields correctly.";
      status.className = "form-status error";
      form.reportValidity();
      return;
    }

    const formData = new FormData(form);
    const name = formData.get("name");

    status.textContent =
      `Thank you, ${name}! Your message has been received.`;
    status.className = "form-status success";

    form.reset();
    fields.forEach((field) => field.classList.remove("invalid"));
  });
}

function setupRevealAnimation() {
  const elements = document.querySelectorAll(".reveal");

  if (!elements.length || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observerInstance.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elements.forEach((element) => observer.observe(element));
}
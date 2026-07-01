(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  var form = document.querySelector("#inquiry-form");
  var message = document.querySelector("#form-message");

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (form && message) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var trip = form.querySelector('[name="trip"]').value;
      var name = form.querySelector('[name="name"]').value.trim();
      message.textContent =
        "Thanks, " +
        name +
        "! We received your inquiry for " +
        trip +
        ". We'll reply by email with dates, pricing, and deposit details.";
      message.classList.add("visible");
      form.reset();
    });
  }

  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  if (sections.length && navLinks.length && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) {
            return;
          }
          var id = entry.target.id;
          navLinks.forEach(function (link) {
            var match = link.getAttribute("href") === "#" + id;
            link.setAttribute("aria-current", match ? "true" : "false");
          });
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }
})();

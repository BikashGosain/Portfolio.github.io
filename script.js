// ============================================================
// Footer Year
// ============================================================

var yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ============================================================
// Theme Toggle
// ============================================================

var root = document.documentElement;
var themeBtn = document.getElementById("themeToggle");

var savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  root.setAttribute("data-theme", savedTheme);
} else {
  var prefersLight = window.matchMedia(
    "(prefers-color-scheme: light)"
  ).matches;

  root.setAttribute(
    "data-theme",
    prefersLight ? "light" : "dark"
  );
}

if (themeBtn) {
  themeBtn.addEventListener("click", function () {

    var current = root.getAttribute("data-theme");

    var newTheme =
      current === "light"
        ? "dark"
        : "light";

    root.setAttribute("data-theme", newTheme);

    localStorage.setItem("theme", newTheme);
  });
}


// ============================================================
// Reduced Motion
// ============================================================

var reduceMotionQuery = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);


// ============================================================
// Scroll-to-top Button
// ============================================================

var toTop = document.getElementById("toTop");

if (toTop) {

  window.addEventListener("scroll", function () {

    toTop.classList.toggle(
      "visible",
      window.scrollY > 480
    );

  });

  toTop.addEventListener("click", function () {

    window.scrollTo({
      top: 0,
      behavior: reduceMotionQuery.matches
        ? "auto"
        : "smooth"
    });

  });
}


// ============================================================
// Mobile Navigation
// ============================================================

var toggle = document.getElementById("navToggle");
var routes = document.getElementById("routes");

if (toggle && routes) {

  toggle.addEventListener("click", function () {

    var open = routes.classList.toggle("open");

    toggle.setAttribute(
      "aria-expanded",
      String(open)
    );

  });


  routes.querySelectorAll("a").forEach(function (a) {

    a.addEventListener("click", function () {

      routes.classList.remove("open");

      toggle.setAttribute(
        "aria-expanded",
        "false"
      );

    });

  });
}


// ============================================================
// Terminal Typing Effect
// Only runs on pages that have #typedOut
// ============================================================

var target = document.getElementById("typedOut");

if (target) {

  var reduceMotion = reduceMotionQuery.matches;

  var finalHTML =
    '<span class="cmd">$</span> curl https://bikashgosain.dev/about\n\n' +
    '{\n' +
    '  <span class="key">"name"</span>: <span class="str">"Bikash Gosain"</span>,\n' +
    '  <span class="key">"focus"</span>: <span class="str">"Python / Django backend development"</span>,\n' +
    '  <span class="key">"based_in"</span>: <span class="str">"Bhaktapur, Nepal"</span>,\n' +
    '  <span class="key">"currently"</span>: <span class="str">"8th semester, CSIT"</span>,\n' +
    '  <span class="key">"open_to_internship"</span>: <span class="bool">true</span>\n' +
    '}';


  if (reduceMotion) {

    target.innerHTML = finalHTML;

  } else {

    var plain =
      '$ curl https://bikashgosain.dev/about\n\n' +
      '{\n' +
      '  "name": "Bikash Gosain",\n' +
      '  "focus": "Python / Django backend development",\n' +
      '  "based_in": "Bhaktapur, Nepal",\n' +
      '  "currently": "8th semester, CSIT",\n' +
      '  "open_to_internship": true\n' +
      '}';

    var i = 0;

    function typeChar() {

      if (i <= plain.length) {

        target.textContent =
          plain.slice(0, i);

        i += 2;

        requestAnimationFrame(function () {

          setTimeout(
            typeChar,
            8
          );

        });

      } else {

        target.innerHTML =
          finalHTML +
          '<span class="cursor"></span>';

      }
    }

    typeChar();
  }
}


// ============================================================
// Active Navigation Link
// ============================================================

var currentPage =
  window.location.pathname
    .split("/")
    .pop();

if (currentPage === "") {
  currentPage = "index.html";
}

var navLinks =
  document.querySelectorAll(".routes a");

navLinks.forEach(function (link) {

  var linkPage =
    link.getAttribute("href");

  if (linkPage === currentPage) {

    link.classList.add("active");

  }

});


// ============================================================
// PROJECT IMAGE SLIDERS
// ============================================================
//
// Features:
// - Previous / Next
// - Native horizontal scrolling
// - Mouse drag
// - Touch swipe
// - Scroll snap
// - Image counter
// - Keyboard navigation
// ============================================================

(function () {

  var galleries =
    document.querySelectorAll(
      ".pgx-gallery"
    );

  if (!galleries.length) {
    return;
  }


  galleries.forEach(function (gallery) {

    var track =
      gallery.querySelector(
        ".pgx-gallery-track"
      );

    var slides =
      Array.from(
        gallery.querySelectorAll(
          ".pgx-gallery-slide"
        )
      );

    var previousButton =
      gallery.querySelector(
        "[data-pgx-prev]"
      );

    var nextButton =
      gallery.querySelector(
        "[data-pgx-next]"
      );

    var counter =
      gallery.querySelector(
        ".pgx-gallery-counter"
      );


    if (!track || !slides.length) {
      return;
    }


    var currentIndex = 0;

    var isDragging = false;
    var startX = 0;
    var startScrollLeft = 0;
    var movedDuringDrag = false;


    // --------------------------------------------------------
    // Update Counter
    // --------------------------------------------------------

    function updateCounter() {

      if (counter) {

        counter.textContent =
          (currentIndex + 1) +
          " / " +
          slides.length;

      }

    }


    // --------------------------------------------------------
    // Get Closest Slide
    // --------------------------------------------------------

    function getClosestSlideIndex() {

      var trackRect =
        track.getBoundingClientRect();

      var scrollLeft =
        track.scrollLeft;

      var closestIndex = 0;
      var closestDistance = Infinity;


      slides.forEach(function (slide, index) {

        var slideRect =
          slide.getBoundingClientRect();

        var slideLeft =
          slideRect.left -
          trackRect.left +
          scrollLeft;

        var distance =
          Math.abs(
            slideLeft - scrollLeft
          );


        if (distance < closestDistance) {

          closestDistance = distance;
          closestIndex = index;

        }

      });


      return closestIndex;
    }


    // --------------------------------------------------------
    // Update Buttons
    // --------------------------------------------------------

    function updateButtons() {

      if (previousButton) {

        previousButton.disabled =
          currentIndex <= 0;

      }


      if (nextButton) {

        nextButton.disabled =
          currentIndex >=
          slides.length - 1;

      }

    }


    // --------------------------------------------------------
    // Update Everything
    // --------------------------------------------------------

    function updateGallery() {

      currentIndex =
        getClosestSlideIndex();

      updateCounter();
      updateButtons();

    }


    // --------------------------------------------------------
    // Go To Slide
    // --------------------------------------------------------

    function goToSlide(index) {

      if (index < 0) {
        index = 0;
      }

      if (index > slides.length - 1) {
        index = slides.length - 1;
      }


      var trackRect =
        track.getBoundingClientRect();

      var slideRect =
        slides[index].getBoundingClientRect();


      var targetLeft =
        slideRect.left -
        trackRect.left +
        track.scrollLeft;


      track.scrollTo({

        left: targetLeft,

        behavior:
          reduceMotionQuery.matches
            ? "auto"
            : "smooth"

      });


      currentIndex = index;

      updateCounter();
      updateButtons();

    }


    // --------------------------------------------------------
    // Previous
    // --------------------------------------------------------

    if (previousButton) {

      previousButton.addEventListener(
        "click",
        function () {

          goToSlide(
            currentIndex - 1
          );

        }
      );

    }


    // --------------------------------------------------------
    // Next
    // --------------------------------------------------------

    if (nextButton) {

      nextButton.addEventListener(
        "click",
        function () {

          goToSlide(
            currentIndex + 1
          );

        }
      );

    }


    // --------------------------------------------------------
    // Scroll Event
    // --------------------------------------------------------

    var scrollTimeout;

    track.addEventListener(
      "scroll",
      function () {

        clearTimeout(scrollTimeout);

        scrollTimeout =
          setTimeout(
            updateGallery,
            80
          );

      },
      { passive: true }
    );


    // --------------------------------------------------------
    // Keyboard Navigation
    // --------------------------------------------------------

    track.addEventListener(
      "keydown",
      function (event) {

        if (event.key === "ArrowLeft") {

          event.preventDefault();

          goToSlide(
            currentIndex - 1
          );

        }


        if (event.key === "ArrowRight") {

          event.preventDefault();

          goToSlide(
            currentIndex + 1
          );

        }

      }
    );


    // --------------------------------------------------------
    // Mouse / Pointer Drag
    // --------------------------------------------------------

    track.addEventListener(
      "pointerdown",
      function (event) {

        if (event.button !== 0) {
          return;
        }


        isDragging = true;
        movedDuringDrag = false;

        startX = event.clientX;
        startScrollLeft =
          track.scrollLeft;


        track.classList.add(
          "pgx-is-dragging"
        );


        try {

          track.setPointerCapture(
            event.pointerId
          );

        } catch (error) {
          // Ignore unsupported pointer capture.
        }

      }
    );


    track.addEventListener(
      "pointermove",
      function (event) {

        if (!isDragging) {
          return;
        }


        var distance =
          event.clientX - startX;


        if (Math.abs(distance) > 5) {

          movedDuringDrag = true;

        }


        track.scrollLeft =
          startScrollLeft - distance;

      }
    );


    function stopDragging(event) {

      if (!isDragging) {
        return;
      }


      isDragging = false;

      track.classList.remove(
        "pgx-is-dragging"
      );


      try {

        track.releasePointerCapture(
          event.pointerId
        );

      } catch (error) {
        // Ignore unsupported pointer capture.
      }


      if (movedDuringDrag) {

        var index =
          getClosestSlideIndex();

        goToSlide(index);

      }

    }


    track.addEventListener(
      "pointerup",
      stopDragging
    );

    track.addEventListener(
      "pointercancel",
      stopDragging
    );

    track.addEventListener(
      "pointerleave",
      function (event) {

        if (isDragging) {
          stopDragging(event);
        }

      }
    );


    // --------------------------------------------------------
    // Prevent accidental image dragging
    // --------------------------------------------------------

    slides.forEach(function (slide) {

      var image =
        slide.querySelector("img");

      if (image) {

        image.setAttribute(
          "draggable",
          "false"
        );

      }

    });


    // --------------------------------------------------------
    // Initial State
    // --------------------------------------------------------

    updateGallery();

  });

})();
// Footer year
var yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


// ==============================
// Theme Toggle
// ==============================

var root = document.documentElement;
var themeBtn = document.getElementById('themeToggle');

var savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
} else {
  var prefersLight = window.matchMedia(
    '(prefers-color-scheme: light)'
  ).matches;

  root.setAttribute(
    'data-theme',
    prefersLight ? 'light' : 'dark'
  );
}

if (themeBtn) {
  themeBtn.addEventListener('click', function() {

    var current = root.getAttribute('data-theme');

    var newTheme =
      current === 'light'
        ? 'dark'
        : 'light';

    root.setAttribute('data-theme', newTheme);

    localStorage.setItem('theme', newTheme);

  });
}


// ==============================
// Reduced Motion
// ==============================

var reduceMotionQuery = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
);


// ==============================
// Scroll-to-top Button
// ==============================

var toTop = document.getElementById('toTop');

if (toTop) {
  window.addEventListener('scroll', function () {
    toTop.classList.toggle('visible', window.scrollY > 480);
  });

  toTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: reduceMotionQuery.matches ? 'auto' : 'smooth'
    });
  });
}


// ==============================
// Mobile Navigation
// ==============================

var toggle = document.getElementById('navToggle');
var routes = document.getElementById('routes');

if (toggle && routes) {
  toggle.addEventListener('click', function () {
    var open = routes.classList.toggle('open');

    toggle.setAttribute('aria-expanded', open);
  });

  routes.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      routes.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}


// ==============================
// Terminal Typing Effect
// Only runs on pages that have #typedOut
// ==============================

var target = document.getElementById('typedOut');

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

        target.textContent = plain.slice(0, i);
        i += 2;

        requestAnimationFrame(function () {
          setTimeout(typeChar, 8);
        });

      } else {

        target.innerHTML =
          finalHTML + '<span class="cursor"></span>';

      }
    }

    typeChar();
  }
}

// Active navigation link
var currentPage = window.location.pathname.split('/').pop();

if (currentPage === '') {
  currentPage = 'index.html';
}

var navLinks = document.querySelectorAll('.routes a');

navLinks.forEach(function(link) {
  var linkPage = link.getAttribute('href');

  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});
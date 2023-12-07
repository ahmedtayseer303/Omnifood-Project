// Set the year
const yearEl = document.querySelector(".year");
yearEl.textContent = new Date().getFullYear();

///////////////////////////////////////////////////////////
// open the nav menue

const btnEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header");
btnEl.addEventListener("click", function () {
  headerEl.classList.toggle("nav-open");
});

///////////////////////////////////////////////////////////
// Smooth scrolling animation

document.body.addEventListener("click", function (e) {
  const link = e.target.closest("a");
  if (link) {
    e.preventDefault();
    const href = link.getAttribute("href");

    // Scroll back to top
    if (href === "#")
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

    // Scroll to other links
    if (href !== "#" && href.startsWith("#"))
      document.querySelector(href).scrollIntoView({ behavior: "smooth" });

    // Close mobile naviagtion
    if (link.classList.contains("main-nav-link"))
      headerEl.classList.remove("nav-open");
  }
});

///////////////////////////////////////////////////////////
// Sticky nav

const sectionHeroEl = document.querySelector(".section-hero");
const logoEl = sectionHeroEl.querySelector(".logo");

// observe the intersection between the view screen and the element at entered intersection threshold ratio then fire an event
// note the event is fired one time at the begining
const obs = new IntersectionObserver(
  function (entries) {
    // entries is arr of one element
    const ent = entries[0];
    if (!ent.isIntersecting) {
      document.body.classList.add("sticky");
      logoEl.setAttribute("src", "img/omnifood-logo.png");
    } else {
      document.body.classList.remove("sticky");
      logoEl.setAttribute("src", "img/omnifood-logo3.png");
    }
  },
  {
    root: null, // default, null => window view
    threshold: 0, // default = 0
    rootMargin: "-80px", // same as nav height
  }
);
obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";

  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);
  console.log(isSupported);

  if (!isSupported) document.body.classList.add("no-flexbox-gap");
}
checkFlexGap();

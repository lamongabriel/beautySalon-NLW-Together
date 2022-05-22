// Document.querySelector() simplification
qs = (e) => document.querySelector(e);
qsa = (e) => document.querySelectorAll(e);

// Dark mode functionalities
qs("#darkModeButton").addEventListener("click", (e) => {
  qs("body").classList.toggle("dark")
  if (qs("body").classList.contains("dark")) {
    e.currentTarget.innerHTML = "Lights On";
    e.currentTarget.classList.add("active")
    return;
  };
  e.currentTarget.innerHTML = "Lights Out"
  e.currentTarget.classList.remove("active")
});

// Mobile menu navigation
const navigationMenu = qs("#header nav")
const toggleMenuElements = qsa("nav .toggle")
const menuLinks = qsa(".menuLink")

for (element of toggleMenuElements) {
  element.addEventListener("click", () => navigationMenu.classList.toggle("show"))
}

menuLinks.forEach(element => {
  element.addEventListener("click", () => navigationMenu.classList.remove("show"))
});

// Menu box shadow on scroll and arrow top
window.addEventListener("scroll", () => {
  if (scrollY != 0)
    qs("#header").classList.add("scroll")
  else
    qs("#header").classList.remove("scroll")

  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    qs(".back-to-top").classList.add("allow")
  } else{
    qs(".back-to-top").classList.remove("allow")
  }
  menuTagAppearOnPageScroll();
})

// Testimonials carrousel declaration
const swiper = new Swiper('.testimonials.swiper', {
  slidesPerView: 1,
  pagination: {
    el: '.swiper-pagination',
  },
  keyboard: true,
  breakpoints: {
    767:{
      slidesPerView: 2,
      setWrapperSize: true,
    },
  }
});

// Scroll Reveal framework configuration
const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true,
})

scrollReveal.reveal(`
  #home .text, #home .image,
  #about .image, #about .text,
  #services header, #services .cards,
  #testimonials header, #testimonials .swiper,
  #contact .text, #contct .links,
  #footer .brand, #footer .social
`, {
  interval: 100
})

// Loading
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    qs(".load").classList.remove("loading")
  }, 1000)
});

// Menu active link tag
const sections = qsa(".section__home")
const menuLinksNotDark = qsa(".menuLink:not(.menuLink#darkModeButton)")

for(menuLink of menuLinksNotDark){
  menuLink.addEventListener("click", (e)=>{
    menuLinksNotDark.forEach(element =>{
      element.classList.remove("active")
    })
    e.currentTarget.classList.add("active")
  })
}

const menuTagAppearOnPageScroll = () =>{
  const checkpoint = window.pageYOffset + (window.innerHeight / 9) * 4

  for(const section of sections){
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      qs(`nav ul li a[href*=${sectionId}]`).classList.add("active")
    } else{
      qs(`nav ul li a[href*=${sectionId}]`).classList.remove("active")
    }
  }
}

// Navigation menu toggle
let navOpen = false;

function toggleNav() {
    if(!navOpen) {
        document.getElementById("nav").style.display = "block";
        navOpen = true;
    } else {
        document.getElementById("nav").style.display = "none";
        navOpen = false;
    }
}

// Smooth scrolling 
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});
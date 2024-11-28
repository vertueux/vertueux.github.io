const hamburgerToggler = document.querySelector(".hamburger");
const navLinksContainer = document.querySelector(".navlinks-container");
const navLinksContainerSpan = document.querySelector(".navlinks-container span");
const lastNavLink = document.getElementById("last-navlink");
const search = document.querySelector('.input-group input');
const table_rows = document.querySelectorAll('tbody tr');
const page = document.querySelector(".page");

var navOpen = false;
var preventReopening = false;

const toggleNav = () => {
    hamburgerToggler.classList.toggle("open")
    const ariaToggle = hamburgerToggler.getAttribute("aria-expanded") === "true" ? "false" : "true";
    hamburgerToggler.setAttribute("aria-expanded", ariaToggle)
    if (navOpen == true) {
        // Closing the navbar.
        navLinksContainer.classList.add("close-nav");
        navLinksContainerSpan.classList.add("disappear");
        lastNavLink.classList.add("disappear");
        page.classList.add("change-to-bright");
        page.classList.remove("change-to-dark");
        navOpen = false;
    } else if (preventReopening == false) {
        navOpen = true;
    }
    if (ariaToggle == "true") {
        // Prevent from clicking.
        page.style.setProperty('pointer-events', "none");
        page.classList.add("change-to-dark");
        page.classList.remove("change-to-bright");
    } else {
        page.style.setProperty('pointer-events', "auto");
    }
    navLinksContainer.classList.toggle("open");
}

hamburgerToggler.addEventListener("click", toggleNav);

function closeNav() {
    preventReopening = true;
    navOpen = false;
    navLinksContainer.classList.add("close-nav");
    navLinksContainerSpan.classList.add("disappear");
    lastNavLink.classList.add("disappear");
    page.classList.add("change-to-bright");
    page.classList.remove("change-to-dark");
    toggleNav();
    preventReopening = false;
}

window.onscroll = function () {
    if (navOpen == true) {
        closeNav();
    }
};


document.addEventListener("click", (evt) => {
    var w = window.innerWidth;
    if (w <= 1450) {
        let targetEl = evt.target;
        do {
            if (targetEl == navLinksContainer || targetEl == hamburgerToggler) {
                return;
            }
            targetEl = targetEl.parentNode;
        } while (targetEl);
        // This is a click outside.      
        if (navOpen == true) {
            closeNav();
        }
    }
});
new ResizeObserver(entries => {
    if (entries[0].contentRect.width <= 1450) {
        navLinksContainer.style.transition = "transform 0.1s ease-out";
        if (navOpen == true) {
            navLinksContainer.style.setProperty('display', "block");
            page.style.setProperty('pointer-events', "none");
            navLinksContainer.classList.add("close-nav");
            navLinksContainerSpan.classList.add("disappear");
            lastNavLink.classList.add("disappear");
            page.classList.add("change-to-dark");
            page.classList.remove("change-to-bright");
        }
    } else {
        navLinksContainer.style.transition = "none";
        if (navOpen == true) {
            navLinksContainer.style.setProperty('display', "none");
            navLinksContainer.classList.remove("close-nav");
            navLinksContainerSpan.classList.remove("disappear");
            lastNavLink.classList.remove("disappear");
            page.style.setProperty('pointer-events', "auto");
            page.classList.add("change-to-bright");
            page.classList.remove("change-to-dark");
        }
    }
}).observe(document.body)

if (search) {
    search.addEventListener('input', searchTable)
}

function searchTable() {
    table_rows.forEach((row, i) => {
        let table_data = row.textContent.toLowerCase(),
            search_data = search.value.toLowerCase();
        row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
        row.style.setProperty('--delay', i / 25 + 's');
    })
}

function searchTableEnter(event) {
    if (event.keyCode === 13) {
        table_rows.forEach((row, i) => {
            let table_data = row.textContent.toLowerCase(),
                search_data = search.value.toLowerCase();
            row.classList.toggle('hide', table_data.indexOf(search_data) < 0);
            row.style.setProperty('--delay', i / 25 + 's');
        })
    }
}
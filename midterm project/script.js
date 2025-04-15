// urls to redirect
const urls = {
    "Happy": ["https://9gag.com/", "https://theuselessweb.com/", "https://asoftmurmur.com/"],
    "Love": ["https://www.lovepanky.com/", "https://www.poemhunter.com/poems/love/", "https://www.gottman.com/"],
    "Sad": ["https://www.befrienders.org/", "https://www.rainymood.com/", "https://www.psychologytoday.com/us/basics/depression"],
    "Explore": ["https://earth.google.com/", "https://www.atlasobscura.com/", "https://apod.nasa.gov/apod/astropix.html"],
    "Work": ["https://trello.com/", "https://www.linkedin.com/", "https://www.rescuetime.com/"],
    "Thrill": ["https://rcdb.com/", "https://www.scaryforkids.com/", "https://www.creepypasta.com/"],
    "Vacation": ["https://www.tripadvisor.com/", "https://www.lonelyplanet.com/", "https://www.skyscanner.com/"]
};

// backgrounds (pc)
const backgroundImages = {
    happy: "./img/happy_h.jpg",
    love: "./img/love_h.jpg",
    sad: "./img/sad_h.jpg",
    explore: "./img/explore_h.jpg",
    work: "./img/work_h.jpg",
    thrill: "./img/thrill_h.jpg",
    vacation: "./img/vacation_h.jpg"
};

// change backgrounds on hover (pc)
function changeBackground(category) {
    document.body.style.backgroundImage = `url(${backgroundImages[category]})`;
    document.body.style.backgroundSize = "cover";
}

function handleClick(category) {
    if (window.innerWidth <= 768) {
        // (mobile) GO! effect
        const overlay = document.getElementById('fullscreen-overlay');
        overlay.classList.add('show');

        setTimeout(() => {
            window.location.href = urls[category][Math.floor(Math.random() * urls[category].length)];
        }, 1000);
    } else {
        // (pc) redirect directly
        window.location.href = urls[category][Math.floor(Math.random() * urls[category].length)];
    }
}

// About Us
function goToAboutUs() {
    window.location.href = "about.html";
}

// Login
function goToLogin() {
    window.location.href = "login.html";
}
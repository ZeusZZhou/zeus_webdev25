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

// zodiac websites library
const zodiacWebsites = {
    Aries: ["https://www.coursera.org/learn/entrepreneurship", "https://www.udemy.com/courses/development/", "https://www.meetup.com/"],
    Taurus: ["https://www.bilibili.com/video/BV1e4411d7Fz", "https://www.airbnb.com/s/homes", "https://www.youtube.com/watch?v=5qap5aO4i9A"],
    Gemini: ["https://www.ted.com/talks", "https://www.linkedin.com/", "https://www.zhihu.com/"],
    Cancer: ["https://www.wolai.com/", "https://www.familydoctor.com.cn/", "https://www.bing.com/images/search?q=cute+cats"],
    Leo: ["https://www.behance.net/", "https://www.instagram.com/", "https://www.kaggle.com/competitions"],
    Virgo: ["https://todoist.com/", "https://www.notion.so/", "https://www.wikihow.com/Main-Page"],
    Libra: ["https://www.calm.com/", "https://www.deezer.com/en/playlist/9282675522", "https://www.britannica.com/topic/list-of-philosophers-2027175"],
    Scorpio: ["https://www.psychologytoday.com/", "https://www.reddit.com/r/UnresolvedMysteries/", "https://www.tarot.com/", ],
    Sagittarius: ["https://www.lonelyplanet.com/", "https://www.couchsurfing.com/", "https://www.gapyear.com/"],
    Capricorn: ["https://www.linkedin.com/learning/", "https://www.investopedia.com/", "https://www.notion.so/"],
    Aquarius: ["https://www.producthunt.com/", "https://www.ted.com/topics/innovation", "https://www.hackster.io/"],
    Pisces: ["https://www.deviantart.com/", "https://soundcloud.com/", "https://www.canva.com/"]
};

const weatherWebsites = {
    Clear: ["https://www.natgeotv.com/asia/photo-of-the-day", "https://earthview.withgoogle.com/", "https://explore.org/livecams"],
    Rain: ["https://www.rainymood.com/", "https://www.poetryfoundation.org/collections/145134/poems-about-rain", "https://www.netflix.com/search?q=rain"],
    Snow: ["https://www.snow-forecast.com/", "https://neal.fun/snow/", "https://www.youtube.com/watch?v=_xMz2SnSWS4"],
    Cloudy: ["https://www.thisiscolossal.com/clouds/", "https://www.weather.com/photos/news/clouds-photos", "https://cloudspotterapp.com/"],
    Other: ["https://www.boredpanda.com/", "https://asoftmurmur.com/", "https://www.gutenberg.org/"]
};

// backgrounds (pc)
const backgroundImages = {
    happy: "./img/happy_h.jpg",
    love: "./img/love_h.jpg",
    sad: "./img/sad_h.jpg",
    explore: "./img/explore_h.jpg",
    work: "./img/work_h.jpg",
    thrill: "./img/thrill_h.jpg",
    weather:"./img/weather_h.webp",
    vacation: "./img/vacation_h.jpg",
    zodiac: "./img/zodiac_h.jpg"
};

// change backgrounds on hover (pc)
function changeBackground(category) {
    document.body.style.backgroundImage = `url(${backgroundImages[category]})`;
    document.body.style.backgroundSize = "cover";
}

function handleClick(category) {
    if (category === "Weather") {
        if (!navigator.geolocation) {
            alert('Geolocation not supported by your browser.');
        }
        if (window.innerWidth <= 768) {
            const overlay = document.getElementById('fullscreen-overlay');
            overlay.classList.add('show');
        }
        navigator.geolocation.getCurrentPosition(
            function(position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`)
                    .then(response => response.json())
                    .then(data => {
                        if (!data.current_weather || typeof data.current_weather.weathercode !== 'number') {
                            alert('Failed to get weather information.');
                        }
                        const weatherType = getWeatherTypeByCode(data.current_weather.weathercode);
                        let links = weatherWebsites[weatherType] || weatherWebsites.Other;
                        if (!links || links.length === 0) {
                            alert(`No website for weather type: ${weatherType}. Please fill in the links.`);
                        }
                        setTimeout(() => {
                            window.location.href = links[Math.floor(Math.random() * links.length)];
                        }, (window.innerWidth <= 768) ? 1000 : 0);
                    })
                    .catch(() => {
                        alert('Failed to get weather.');
                    });
            },
            function() {
                alert('Failed to get your location.');
            }
        );
    }
    if (category === "Zodiac") {
        const username = localStorage.getItem('site_seeing_current_user');
        const users = JSON.parse(localStorage.getItem('site_seeing_users') || '{}');
        if (!username || !users[username]) {
            alert('Please login to use Zodiac Luck!');
            window.location.href = 'login.html';
            return;
        }
        const zodiac = users[username].zodiac;
        const links = zodiacWebsites[zodiac];
        if (window.innerWidth <= 768) {
            // (mobile) GO! effect
            const overlay = document.getElementById('fullscreen-overlay');
            overlay.classList.add('show');
            setTimeout(() => {
                window.location.href = links[Math.floor(Math.random() * links.length)];
            }, 1000);
        } else {
            // (pc) redirect directly
            window.location.href = links[Math.floor(Math.random() * links.length)];
        }
        return;
    }

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

function getWeatherTypeByCode(code) {
    if (code === 0) return "Clear";
    if ([1,2,3,45,48].includes(code)) return "Cloudy";
    if ([61,63,65,80,81,82,51,53,55,56,57,66,67].includes(code)) return "Rain";
    if ([71,73,75,77,85,86].includes(code)) return "Snow";
    return "Other";
}

// About Us
function goToAboutUs() {
    window.location.href = "about.html";
}

// Login
function goToLogin() {
    window.location.href = "login.html";
}
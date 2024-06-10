document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

const canvas = document.getElementById('starfield');
const context = canvas.getContext('2d');
const moon = document.getElementById('moon');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function createStars() {
    const stars = [];
    for (let i = 0; i < 500; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            alpha: Math.random(),
            speedX: (Math.random() - 0.5) * 0.1,
            speedY: (Math.random() - 0.5) * 0.1
        });
    }
    return stars;
}

const stars = createStars();

function drawStars() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, 2 * Math.PI);
        context.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        context.fill();
    });
}

function animateStars() {
    stars.forEach(star => {
        star.alpha += (Math.random() - 0.5) * 0.05;
        if (star.alpha < 0) star.alpha = 0;
        if (star.alpha > 1) star.alpha = 1;

        star.x += star.speedX;
        star.y += star.speedY;

        if (star.x < 0) star.x = canvas.width;
        if (star.x > canvas.width) star.x = 0;
        if (star.y < 0) star.y = canvas.height;
        if (star.y > canvas.height) star.y = 0;
    });
    drawStars();
    requestAnimationFrame(animateStars);
}

animateStars();

function setInitialMoonPosition() {
    moon.style.top = `${Math.random() * 80 + 10}%`;
    moon.style.left = `${Math.random() * 80 + 10}%`;
}

setInitialMoonPosition();

function moveMoon() {
    let moonX = parseFloat(moon.style.left);
    let moonY = parseFloat(moon.style.top);

    moonX += 0.03;
    moonY += 0.03;

    if (moonX > 100) {
        moonX = -10;
    }
    if (moonY > 100) {
        moonY = -10;
    }

    moon.style.left = `${moonX}%`;
    moon.style.top = `${moonY}%`;

    requestAnimationFrame(moveMoon);
}

moveMoon();

// Adding shooting stars with streaks and color
const shootingStars = [];

function createShootingStar() {
    const colors = ['rgba(255, 0, 0, ', 'rgba(0, 0, 255, ', 'rgba(255, 255, 0, '];
    const color = colors[Math.floor(Math.random() * colors.length)];
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 80 + 20,
        speed: Math.random() * 10 + 5,
        size: Math.random() * 1 + 0.5,
        color: color,
        streaks: 3,
        active: true
    };
}

function drawShootingStar(star) {
    context.beginPath();
    context.moveTo(star.x, star.y);
    context.lineTo(star.x - star.length, star.y + star.length);
    context.strokeStyle = `${star.color}0.5)`;
    context.lineWidth = star.size;
    context.stroke();

    for (let i = 1; i <= star.streaks; i++) {
        context.beginPath();
        context.moveTo(star.x, star.y);
        context.lineTo(star.x - (star.length / i), star.y + (star.length / i));
        context.strokeStyle = `${star.color}${0.5 / i})`;
        context.lineWidth = star.size / i;
        context.stroke();
    }
}

function animateShootingStars() {
    if (shootingStars.length < 1) {
        shootingStars.push(createShootingStar());
    }

    shootingStars.forEach((star, index) => {
        if (star.active) {
            drawShootingStar(star);

            star.x += star.speed;
            star.y -= star.speed;

            if (star.x > canvas.width || star.y < 0) {
                shootingStars.splice(index, 1);
            }
        }
    });

    requestAnimationFrame(animateShootingStars);
}

animateShootingStars();

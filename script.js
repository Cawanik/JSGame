document.querySelector("button").addEventListener('click', () => {
    document.querySelector("input").click();
});
document.querySelector("input").addEventListener('change', (file) => {

    beatRecognition(file);
});

const startGame = () => {
    const triangle = {
        x: window.innerWidth / 2 - 25,
        y: window.innerHeight / 2 - 25,
        hp: 100,
        rotate: 0,
        cd: 0.3,
        html: document.createElement("img")
    }
    triangle.html.classList.add('triangle');
    triangle.html.src = '/ship.png'
    triangle.html.style.top = `${triangle.y}px`;
    triangle.html.style.left = `${triangle.x}px`;
    document.body.appendChild(triangle.html);

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    })

    function setAngle(x) {
        triangle.html.style.transform = `rotate(${x}deg)`
    }

    function fire(angle, angle2) {
        const bullet = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
            html: document.createElement('div'),
        }
        bullet.html.classList.add('bullet');
        bullet.html.style.transform = `rotate(${angle2}deg)`
        document.body.appendChild(bullet.html);
        let bulletInterval;
        bulletInterval = setInterval(() => {
            bullet.y += Math.sin(angle) * 10;
            bullet.x += Math.cos(angle) * 10;
            bullet.html.style.top = `${bullet.y}px`;
            bullet.html.style.left = `${bullet.x}px`;

            if (bullet.x > window.innerWidth || bullet.x < 0 || bullet.y > window.innerHeight || bullet.y < 0) {
                clearInterval(bulletInterval);
                bullet.html.remove();
            }
        }, 30);
    }

    document.body.addEventListener('mousemove', (event) => {
        const deg = (Math.atan2(
            (event.y - (triangle.html.offsetTop + triangle.html.height / 2)),
            (event.x - (triangle.html.offsetLeft + triangle.html.width / 2))) / Math.PI * 180);
        setAngle(deg);
    });

    document.body.addEventListener('mousedown', (event) => {
        event.preventDefault();

        const deg = (Math.atan2(
            (event.y - (triangle.html.offsetTop + triangle.html.height / 2)),
            (event.x - (triangle.html.offsetLeft + triangle.html.width / 2))
        ));
        const deg2 = (Math.atan2(
            (event.y - (triangle.html.offsetTop + triangle.html.height / 2)),
            (event.x - (triangle.html.offsetLeft + triangle.html.width / 2))
        ) / Math.PI * 180);

        fire(deg, deg2)
    });

    function meteorSpawn() {
        const meteor = {
            html: document.createElement('div'),
        }
        const side = Math.floor(Math.random() * 4);
        if (side < 2) {
            meteor.x = side === 1 ? window.innerWidth : -50;
            meteor.y = Math.random() * window.innerHeight;
        } else {
            meteor.y = side === 3 ? window.innerHeight : -50;
            meteor.x = Math.random() * window.innerWidth;
        }
        meteor.html.classList.add('meteor');
        meteor.html.style.top = `${meteor.y}px`;
        meteor.html.style.left = `${meteor.x}px`;
        document.body.appendChild(meteor.html);

        let meteorInterval;
        const deg = (Math.atan2(
            ((triangle.html.offsetTop + triangle.html.height / 2) - meteor.y),
            ((triangle.html.offsetLeft + triangle.html.width / 2) - meteor.x)
        ));

        meteorInterval = setInterval(() => {
            meteor.y += Math.sin(deg) * 5;
            meteor.x += Math.cos(deg) * 5;
            meteor.html.style.top = `${meteor.y}px`;
            meteor.html.style.left = `${meteor.x}px`;
        }, 20);
    }


    setInterval(meteorSpawn, 3000);
}


((document) => {
    const space = document.getElementsByClassName('space')[0];
    const defender = document.getElementsByClassName('space-invader-defender')[0];
    const defenderPosition = {
        left: 0,
        top: 0
    }
    const missiles = [];

    const invaders = document.querySelectorAll('.space-invader:not(.space-invader-defender)');

    const moveDefender = () => {
        defender.style.left = defenderPosition.left + 'px';
    }

    const addMissiles = () => {
        const m = {
            left: defenderPosition.left + 45,
            bottom: defenderPosition.top + 50
        }

        const div = document.createElement('div');
        div.className = 'missile';
        div.style.bottom = m.bottom + 'px';
        div.style.left = m.left + 'px';
        space.appendChild(div);

        m.el = div;
        missiles.push(m);
    }

    const moveMissiles = () => {
        missiles.forEach((m, i, missilesArr) => {
            if (m.el.offsetTop > space.offsetTop) {
                m.bottom += 50;
                m.el.style.bottom = m.bottom + 'px';
            } else {
                m.el.parentElement.removeChild(m.el);
                missilesArr.splice(i, 1);
            }
        })
    }

    const getPositions = (elem) => {
        const width = parseFloat(getComputedStyle(elem, null).width.replace("px", ""));
        const height = parseFloat(getComputedStyle(elem, null).height.replace("px", ""));
        return [
            [elem.offsetLeft, elem.offsetLeft + width],
            [elem.offsetTop, elem.offsetTop + height]
        ];
    }

    const comparePositions = (p1, p2) => {
        let r1, r2;
        if (p1[0] < p2[0]) {
            r1 = p1;
            r2 = p2;
        } else {
            r1 = p2;
            r2 = p1;
        }
        return r1[1] > r2[0] || r1[0] === r2[0];
    }


    const collisionDetection = () => {
        missiles.forEach((m, i, missilesArr) => {
            let pos1 = getPositions(m.el);
            invaders.forEach((inv) => {
                let pos2 = getPositions(inv);
                if (comparePositions(pos1, pos2)) {
                    missilesArr.splice(i, 1);
                    inv.parentElement.removeChild(inv);
                }
            })
        })
    }

    document.onkeydown = function(e) {
        // Left
        if (e.keyCode === 37 && defenderPosition.left > 0) {
            defenderPosition.left -= 10;
        }

        // Right
        if (e.keyCode === 39 && (defenderPosition.left + defender.offsetWidth < space.offsetWidth)) {
            defenderPosition.left += 10;
        }

        // Spacebar (fire)
        if (e.keyCode === 32) {
            addMissiles()
        }
        moveDefender();
    }

    const intervals = 200;
    const gameLoop = () => {
        moveMissiles();
        collisionDetection();
    };

    setInterval(gameLoop, intervals)

})(document);
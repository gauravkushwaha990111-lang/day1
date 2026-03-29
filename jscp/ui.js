
let isLandscape = false;
let matrixInterval = null;
const confettiPool = [];
const maxConfetti = 50;
const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


function createConfetti() {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    return confetti;
}

function getConfettiFromPool() {
    if (confettiPool.length > 0) {
        return confettiPool.pop();
    }
    return createConfetti();
}

// ✅ FIX 1: Add function to force resize matrix canvas
function forceResizeMatrix() {
    const matrixCanvas = document.getElementById('matrix-rain');
    if (matrixCanvas) {
        // Force resize canvas to current window size
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;

        // Restart matrix rain with new dimensions
        if (matrixInterval) {
            clearInterval(matrixInterval);
            matrixInterval = null;
        }
        initMatrixRain();
    }
}

function returnConfettiToPool(confetti) {
    confetti.remove();
    confettiPool.push(confetti);
}


function checkOrientation() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const orientationLock = document.getElementById('orientation-lock');
    const matrixCanvas = document.getElementById('matrix-rain');
    const mainCanvas = document.querySelector('.canvas');
    const bookContainer = document.querySelector('.book-container');
    const book = document.getElementById('book');

    if (!isMobile) {
        isLandscape = true;
        orientationLock.style.display = 'none';
        matrixCanvas.style.display = 'block';
        mainCanvas.style.display = 'block';
        if (bookContainer) bookContainer.style.display = 'block';
        if (book) book.style.display = 'block';
        startWebsite();
    } else {
        const mediaQuery = window.matchMedia("(orientation: landscape)");
        isLandscape = mediaQuery.matches;

        if (isLandscape) {
            orientationLock.style.display = 'none';
            matrixCanvas.style.display = 'block';
            mainCanvas.style.display = 'block';
            if (bookContainer) bookContainer.style.display = 'block';
            if (book) book.style.display = 'block';
            startWebsite();

            // ✅ FIX 2: Force resize matrix when switching to landscape
            setTimeout(() => {
                forceResizeMatrix();
            }, 100);
        } else {
            orientationLock.style.display = 'flex';
            matrixCanvas.style.display = 'none';
            mainCanvas.style.display = 'none';
            if (bookContainer) bookContainer.style.display = 'none';
            if (book) book.style.display = 'none';
            stopWebsite();
        }

        mediaQuery.addEventListener('change', (e) => {
            isLandscape = e.matches;
            if (isLandscape) {
                orientationLock.style.display = 'none';
                matrixCanvas.style.display = 'block';
                mainCanvas.style.display = 'block';
                if (bookContainer) bookContainer.style.display = 'block';
                if (book) book.style.display = 'block';
                startWebsite();

                // ✅ FIX 3: Force resize matrix on orientation change
                setTimeout(() => {
                    forceResizeMatrix();
                }, 100);
            } else {
                orientationLock.style.display = 'flex';
                matrixCanvas.style.display = 'none';
                mainCanvas.style.display = 'none';
                if (bookContainer) bookContainer.style.display = 'none';
                if (book) book.style.display = 'none';
                stopWebsite();
            }
        });
    }
}
function startWebsite() {
    if (!matrixInterval) {
        initMatrixRain();
    }
    if (typeof resetWebsiteState === 'function') {
        resetWebsiteState();
    }
    S.init(); // always run the effect again
    S.initialized = true;
}

function stopWebsite() {
    if (matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
        const matrixCanvas = document.getElementById('matrix-rain');
        if (matrixCanvas) {
            const matrixCtx = matrixCanvas.getContext('2d');
            matrixCtx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        }
    }
}

let matrixChars = "HAPPYBIRTHDAY".split("");
function initMatrixRain() {
    const matrixCanvas = document.getElementById('matrix-rain');
    const matrixCtx = matrixCanvas.getContext('2d');

    // ✅ FIX 4: Force set canvas size to current window dimensions
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    // Detect mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    // Adjust fontSize and speed for mobile
    const fontSize = isMobile ? 13 : 25;
    const intervalTime = isMobile ? 44 : 50; // mobile runs slower

    const columns = Math.floor(matrixCanvas.width / fontSize);
    const drops = [];
    const columnColors = [];
    const delays = [];
    const started = [];

    const maxLength = Math.floor(matrixCanvas.height / fontSize) + 2;

    for (let x = 0; x < columns; x++) {
        drops[x] = 0;
        columnColors[x] = x % 2 === 0 ?
            (window.settings ? window.settings.matrixColor1 : settings.matrixColor1) :
            (window.settings ? window.settings.matrixColor2 : settings.matrixColor2);
        delays[x] = Math.random() * 2000;
        started[x] = false;
    }

    let startTime = Date.now();

    function drawMatrixRain() {
        matrixCtx.fillStyle = "rgba(0, 0, 0, 0.05)";
        matrixCtx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

        matrixCtx.font = "bold " + fontSize + "px Menlo, Consolas, 'Liberation Mono', 'Courier New', monospace";

        const currentTime = Date.now();

        for (let i = 0; i < drops.length; i++) {
            if (!started[i] && currentTime - startTime >= delays[i]) {
                started[i] = true;
            }

            if (started[i] && drops[i] < maxLength) {
                const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                const color = columnColors[i];
                matrixCtx.fillStyle = color;
                matrixCtx.shadowColor = color;
                matrixCtx.shadowBlur = 8;
                matrixCtx.fillText(text, x, y);
                matrixCtx.shadowBlur = 0;
            }

            if (started[i]) {
                drops[i]++;
            }

            if (drops[i] >= maxLength) {
                drops[i] = 0;
                delays[i] = Math.random() * 1000;
                started[i] = false;
            }
        }
    }

    matrixInterval = setInterval(drawMatrixRain, intervalTime);

    // ✅ FIX 5: Improve resize handler
    window.addEventListener('resize', () => {
        // Debounce resize events
        clearTimeout(window.matrixResizeTimeout);
        window.matrixResizeTimeout = setTimeout(() => {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
            const newColumns = Math.floor(matrixCanvas.width / fontSize);
            const newMaxLength = Math.floor(matrixCanvas.height / fontSize) + 2;

            // Reset arrays with new dimensions
            drops.length = 0;
            columnColors.length = 0;
            delays.length = 0;
            started.length = 0;

            for (let x = 0; x < newColumns; x++) {
                drops[x] = 0;
                columnColors[x] = x % 2 === 0 ?
                    (window.settings ? window.settings.matrixColor1 : settings.matrixColor1) :
                    (window.settings ? window.settings.matrixColor2 : settings.matrixColor2);
                delays[x] = Math.random() * 1000;
                started[x] = false;
            }
            startTime = Date.now();
        }, 100);
    });
}

S = {
    initialized: false,
    init: function () {
        if (!isLandscape && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            return;
        }
        var action = window.location.href,
            i = action.indexOf('?websiteId=');

        if (i !== -1) {
            //  S.UI.simulate('');
            // S.UI.simulate(decodeURI(action).substring(i + 3));
            // console.log('Simulating action from URL:', decodeURI(action).substring(i + 3));
            // console.log(window.settings);
        } else {
            // // // ✅ Sử dụng sequence từ settings thay vì hardcode
            // const currentSettings = window.settings;
            // const countdownValue = currentSettings.countdown;
            // const sequenceText = currentSettings.sequence;
            // const sequence = `|#countdown ${countdownValue}|${sequenceText}|#gift|`;
            // S.UI.simulate(sequence);
        }

        S.Drawing.init('.canvas');
        document.body.classList.add('body--ready');

        S.Drawing.loop(function () {
            S.Shape.render();
        });
    }
};

document.addEventListener('DOMContentLoaded', checkOrientation);

S.Drawing = (function () {
    var canvas,
        context,
        renderFn,
        requestFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };

    return {
        init: function (el) {
            canvas = document.querySelector(el);
            context = canvas.getContext('2d');
            this.adjustCanvas();
            window.addEventListener('resize', function () {
                S.Drawing.adjustCanvas();
            });
        },

        loop: function (fn) {
            renderFn = !renderFn ? fn : renderFn;
            this.clearFrame();
            renderFn();
            requestFrame.call(window, this.loop.bind(this));
        },

        adjustCanvas: function () {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        },

        clearFrame: function () {
            context.clearRect(0, 0, canvas.width, canvas.height);
        },

        getArea: function () {
            // ✅ Check canvas before accessing
            if (!canvas) {
                console.warn('Canvas not initialized, returning default area');
                return { w: window.innerWidth || 800, h: window.innerHeight || 600 };
            }
            return { w: canvas.width, h: canvas.height };
        },
        drawCircle: function (p, c) {
            context.fillStyle = c.render();
            context.beginPath();
            context.arc(p.x, p.y, p.z, 0, 2 * Math.PI, true);
            context.closePath();
            context.fill();
        }
    };
}());

S.UI = (function () {
    var canvas = document.querySelector('.canvas'),
        interval,
        currentAction,
        time,
        maxShapeSize = 30,
        firstAction = true,
        sequence = [],
        cmd = '#';

    function formatTime(date) {
        var h = date.getHours(),
            m = date.getMinutes(),
            m = m < 10 ? '0' + m : m;
        return h + ':' + m;
    }

    function getValue(value) {
        return value && value.split(' ')[1];
    }

    function getAction(value) {
        value = value && value.split(' ')[0];
        return value && value[0] === cmd && value.substring(1);
    }

    function timedAction(fn, delay, max, reverse) {
        clearInterval(interval);
        currentAction = reverse ? max : 1;
        fn(currentAction);

        if (!max || (!reverse && currentAction < max) || (reverse && currentAction > 0)) {
            interval = setInterval(function () {
                currentAction = reverse ? currentAction - 1 : currentAction + 1;
                fn(currentAction);
                if ((!reverse && max && currentAction === max) || (reverse && currentAction === 0)) {
                    clearInterval(interval);
                }
            }, delay);
        }
    }

    function reset(destroy) {
        clearInterval(interval);
        sequence = [];
        time = null;
        destroy && S.Shape.switchShape(S.ShapeBuilder.letter(''));
    }

    function performAction(value) {
        var action,
            value,
            current;

        sequence = typeof (value) === 'object' ? value : sequence.concat(value.split('|'));

        function getDynamicDelay(str) {
            const base = isMobile ? 1700 : 1900;
            if (!str || typeof str !== 'string') return base;
            // If it's a command (starts with #), do not add extra time
            if (str.trim().startsWith('#')) return base;
            const extra = Math.max(0, (str.length - 5) * 100);
            if (extra > 0) {
            }
            return base + extra;
        }

        timedAction(function (index) {
            current = sequence.shift();
            action = getAction(current);
            value = getValue(current);

            // Calculate dynamic delay for each action
            const actionDelay = getDynamicDelay(current);

            switch (action) {
                case 'countdown':
                    value = parseInt(value) || 10;
                    value = value > 0 ? value : 10;
                    timedAction(function (index) {
                        if (index === 0) {
                            if (sequence.length === 0) {
                                S.Shape.switchShape(S.ShapeBuilder.letter(''));
                            } else {
                                performAction(sequence);
                            }
                        } else {
                            S.Shape.switchShape(S.ShapeBuilder.letter(index), true);
                        }
                    }, isMobile ? 1300 : 1400, value, true);
                    break;

                case 'circle':
                    value = parseInt(value) || maxShapeSize;
                    value = Math.min(value, maxShapeSize);
                    S.Shape.switchShape(S.ShapeBuilder.circle(value));
                    break;

                case 'time':
                    var t = formatTime(new Date());
                    if (sequence.length > 0) {
                        S.Shape.switchShape(S.ShapeBuilder.letter(t));
                    } else {
                        timedAction(function () {
                            t = formatTime(new Date());
                            if (t !== time) {
                                time = t;
                                S.Shape.switchShape(S.ShapeBuilder.letter(time));
                            }
                        }, 1000);
                    }
                    break;

                case 'gift':
                    const canvas = document.querySelector('.canvas');
                    const giftImage = document.getElementById('gift-image');
                    const matrixCanvas = document.getElementById('matrix-rain');

                    showStars();
                    showFloatingHearts();

                    const currentSettings = window.settings || settings;

                    if (currentSettings.enableBook === true) {
                        if (canvas && giftImage && matrixCanvas) {
                            canvas.style.display = 'none';
                            matrixCanvas.style.display = 'none';

                            if (giftImage.src && giftImage.src !== window.location.href && giftImage.src !== '' && !giftImage.src.includes('undefined')) {
                                giftImage.style.display = 'block';
                                giftImage.style.animation = 'giftCelebration 2s ease-in-out';
                                setTimeout(() => {
                                    giftImage.style.display = 'none';
                                    showBook();
                                }, 3000);
                            } else {
                                showBook();
                            }
                        } else {
                            showBook();
                        }
                    } else {
                        if (canvas && matrixCanvas) {
                            canvas.style.display = 'none';
                            matrixCanvas.style.display = 'none';
                        }
                        if (giftImage && giftImage.src && giftImage.src !== window.location.href && giftImage.src !== '' && !giftImage.src.includes('undefined')) {
                            giftImage.style.display = 'block';
                            giftImage.style.animation = 'giftCelebration 2s ease-in-out';
                            if (currentSettings.enableHeart === true) {
                                setTimeout(() => {
                                    startHeartEffect();
                                }, 2000);
                            }
                        } else {
                            if (currentSettings.enableHeart === true) {
                                startHeartEffect();
                            }
                        }
                    }
                    break;

                default:
                    S.Shape.switchShape(S.ShapeBuilder.letter(current[0] === cmd ? 'What?' : current));
            }
        }, getDynamicDelay(sequence[0]), sequence.length);
    }

    function bindEvents() {
        canvas.addEventListener('click', function (e) { });
    }

    function init() {
        bindEvents();
    }

    init();

    return {
        simulate: function (action) {
            if (isLandscape || !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                performAction(action);
            }
        },
        reset: function (destroy) {
            reset(destroy);
        }
    };
}());

S.Point = function (args) {
    this.x = args.x;
    this.y = args.y;
    this.z = args.z;
    this.a = args.a;
    this.h = args.h;
};

S.Color = function (r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
};

S.Color.prototype = {
    render: function () {
        return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
    }
};

// Update S.Dot with smaller size
S.Dot = function (x, y) {
    this.p = new S.Point({
        x: x,
        y: y,
        z: this.getDotSize(),
        a: 1,
        h: 0
    });
    this.e = 0.07;
    this.s = true;
    const currentSettings = window.settings || settings;
    const rgb = hexToRgb(currentSettings.sequenceColor);
    this.c = new S.Color(rgb.r, rgb.g, rgb.b, this.p.a);
    this.t = this.clone();
    this.q = [];
};
S.Dot.prototype = {
    // Add method to calculate dot size based on device
    getDotSize: function () {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            return 2; // Smaller dots for mobile
        } else {
            return 4; // Medium dots for desktop
        }
    },

    clone: function () {
        return new S.Point({
            x: this.x,
            y: this.y,
            z: this.z,
            a: this.a,
            h: this.h
        });
    },

    _draw: function () {
        // Update color according to current settings every time it draws
        const currentSettings = window.settings || settings;
        const rgb = hexToRgb(currentSettings.sequenceColor);
        this.c.r = rgb.r;
        this.c.g = rgb.g;
        this.c.b = rgb.b;
        this.c.a = this.p.a;
        S.Drawing.drawCircle(this.p, this.c);
    },

    _moveTowards: function (n) {
        var details = this.distanceTo(n, true),
            dx = details[0],
            dy = details[1],
            d = details[2],
            e = this.e * d;

        if (this.p.h === -1) {
            this.p.x = n.x;
            this.p.y = n.y;
            return true;
        }

        if (d > 1) {
            this.p.x -= ((dx / d) * e);
            this.p.y -= ((dy / d) * e);
        } else {
            if (this.p.h > 0) {
                this.p.h--;
            } else {
                return true;
            }
        }

        return false;
    },

    _update: function () {
        if (this._moveTowards(this.t)) {
            var p = this.q.shift();
            if (p) {
                this.t.x = p.x || this.p.x;
                this.t.y = p.y || this.p.y;
                this.t.z = p.z || this.p.z;
                this.t.a = p.a || this.p.a;
                this.p.h = p.h || 0;
            } else {
                if (this.s) {
                    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                    const amplitude = isMobile ? 0.1 : 3.142;
                    this.p.x -= Math.sin(Math.random() * amplitude);
                    this.p.y -= Math.sin(Math.random() * amplitude);
                } else {
                    this.move(new S.Point({
                        x: this.p.x + (Math.random() * 50) - 25,
                        y: this.p.y + (Math.random() * 50) - 25,
                    }));
                }
            }
        }
        d = this.p.a - this.t.a;
        this.p.a = Math.max(0.1, this.p.a - (d * 0.05));
        d = this.p.z - this.t.z;
        this.p.z = Math.max(1, this.p.z - (d * 0.05));
    },

    distanceTo: function (n, details) {
        var dx = this.p.x - n.x,
            dy = this.p.y - n.y,
            d = Math.sqrt(dx * dx + dy * dy);
        return details ? [dx, dy, d] : d;
    },

    move: function (p, avoidStatic) {
        if (!avoidStatic || (avoidStatic && this.distanceTo(p) > 1)) {
            this.q.push(p);
        }
    },

    render: function () {
        this._update();
        this._draw();
    }
};

S.ShapeBuilder = (function () {
    var shapeCanvas = document.createElement('canvas'),
        shapeContext = shapeCanvas.getContext('2d'),
        fontSize = 500,
        fontFamily = 'Avenir, Helvetica Neue, Helvetica, Arial, sans-serif';
    //    fontFamily = 'Pacifico, Arial, sans-serif';

    // Adjust gap based on device
    function getGap() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
            return 4; // Smaller gap for mobile = denser dots
        } else {
            return 8; // Medium gap for desktop
        }
    }

    function fit() {
        const gap = getGap();
        shapeCanvas.width = Math.floor(window.innerWidth / gap) * gap;
        shapeCanvas.height = Math.floor(window.innerHeight / gap) * gap;
        shapeContext.fillStyle = 'red';
        shapeContext.textBaseline = 'middle';
        shapeContext.textAlign = 'center';
    }

    function processCanvas() {
        const gap = getGap();
        var pixels = shapeContext.getImageData(0, 0, shapeCanvas.width, shapeCanvas.height).data,
            dots = [],
            x = 0,
            y = 0,
            fx = shapeCanvas.width,
            fy = shapeCanvas.height,
            w = 0,
            h = 0;

        // Use dynamic gap to create more dots
        for (var p = 0; p < pixels.length; p += (4 * gap)) {
            if (pixels[p + 3] > 0) {
                dots.push(new S.Point({
                    x: x,
                    y: y
                }));

                w = x > w ? x : w;
                h = y > h ? y : h;
                fx = x < fx ? x : fx;
                fy = y < fy ? y : fy;
            }
            x += gap;
            if (x >= shapeCanvas.width) {
                x = 0;
                y += gap;
                p += gap * 4 * shapeCanvas.width;
            }
        }
        return { dots: dots, w: w + fx, h: h + fy };
    }

    function setFontSize(s) {
        shapeContext.font = 'bold ' + s + 'px ' + fontFamily;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function init() {
        fit();
        window.addEventListener('resize', fit);
    }

    init();

    return {
        circle: function (d) {
            var r = Math.max(0, d) / 2;
            const gap = getGap();
            shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
            shapeContext.beginPath();
            shapeContext.arc(r * gap, r * gap, r * gap, 0, 2 * Math.PI, false);
            shapeContext.fill();
            shapeContext.closePath();
            return processCanvas();
        },

        letter: function (l) {
            var s = 0;

            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const isSmallScreen = window.innerWidth < 768;
            const baseFontSize = (isMobile || isSmallScreen) ? 250 : 500; // Reduce font size for mobile

            setFontSize(baseFontSize);
            s = Math.min(baseFontSize,
                (shapeCanvas.width / shapeContext.measureText(l).width) * 0.8 * baseFontSize,
                (shapeCanvas.height / baseFontSize) * (isNumber(l) ? 0.8 : 0.35) * baseFontSize); // Reduce ratio for mobile

            setFontSize(s);
            shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
            shapeContext.fillText(l, shapeCanvas.width / 2, shapeCanvas.height / 2);
            return processCanvas();
        }
    };
}());

// Update S.Shape with optimized dot creation logic
S.Shape = (function () {
    var dots = [],
        width = 0,
        height = 0,
        cx = 0,
        cy = 0;

    function compensate() {
        var a = S.Drawing.getArea();
        cx = a.w / 2 - width / 2;
        cy = a.h / 2 - height / 2;
    }

    function getDotCreationParams() {
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isSmallScreen = window.innerWidth < 768;

        if (isMobile || isSmallScreen) {
            return {
                minSize: 1,      // Reduce from 2 to 1
                maxSize: 4,      // Reduce from 8 to 4
                minZ: 2,         // Reduce from 3 to 2
                maxZ: 3          // Reduce from 6 to 3
            };
        } else {
            return {
                minSize: 3,
                maxSize: 12,
                minZ: 4,
                maxZ: 8
            };
        }
    }

    return {
        switchShape: function (n, fast) {
            var size,
                a = S.Drawing.getArea();
            width = n.w;
            height = n.h;
            compensate();

            const params = getDotCreationParams();

            if (n.dots.length > dots.length) {
                size = n.dots.length - dots.length;
                for (var d = 1; d <= size; d++) {
                    dots.push(new S.Dot(a.w / 2, a.h / 2));
                }
            }

            var d = 0,
                i = 0;
            while (n.dots.length > 0) {
                i = Math.floor(Math.random() * n.dots.length);
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                dots[d].e = isMobile ? 0.35 : 0.11; // Increase movement speed for mobile

                if (dots[d].s) {
                    dots[d].move(new S.Point({
                        z: Math.random() * (params.maxSize - params.minSize) + params.minSize,
                        a: Math.random(),
                        h: 18
                    }));
                } else {
                    dots[d].move(new S.Point({
                        z: Math.random() * (params.minZ) + params.minZ,
                        h: fast ? 18 : 30
                    }));
                }

                dots[d].s = true;
                dots[d].move(new S.Point({
                    x: n.dots[i].x + cx,
                    y: n.dots[i].y + cy,
                    a: 1,
                    z: params.minZ,
                    h: 0
                }));

                n.dots = n.dots.slice(0, i).concat(n.dots.slice(i + 1));
                d++;
            }

            for (var i = d; i < dots.length; i++) {
                if (dots[i].s) {
                    dots[i].move(new S.Point({
                        z: Math.random() * (params.maxSize - params.minSize) + params.minSize,
                        a: Math.random(),
                        h: 20
                    }));
                    dots[i].s = false;
                    dots[i].e = 0.04;
                    dots[i].move(new S.Point({
                        x: Math.random() * a.w,
                        y: Math.random() * a.h,
                        a: 0.3,
                        z: Math.random() * params.minZ,
                        h: 0
                    }));
                }
            }
        },

        render: function () {
            for (var d = 0; d < dots.length; d++) {
                dots[d].render();
            }
        }
    };
}());


// 4. Optimize floating hearts
const heartPool = [];
const maxFloatingHearts = 25; // Reduce from 40 to 25

function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.className = 'heart';
    return heart;
}

function getHeartFromPool() {
    if (heartPool.length > 0) {
        return heartPool.pop();
    }
    return createFloatingHeart();
}

function returnHeartToPool(heart) {
    heart.remove();
    heartPool.push(heart);
}

function showFloatingHearts() {
    const heartSymbols = ['❤️', '💕', '💖', '💗', '💓', '💞'];

    let heartCount = 0;
    function spawnHeart() {
        if (heartCount >= maxFloatingHearts) return;

        const heart = getHeartFromPool();
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '100%';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';

        document.body.appendChild(heart);
        heartCount++;

        // Cleanup after 10 seconds
        setTimeout(() => returnHeartToPool(heart), 10000);

        // Next spawn
        if (heartCount < maxFloatingHearts) {
            setTimeout(spawnHeart, 1600); // Reduce delay
        }
    }

    spawnHeart();
}

// Particle burst effect for book opening
function showBookParticles() {
    const colors = ['#ff69b4', '#ff1493', '#ffd700', '#ffffff', '#87ceeb'];
    const numParticles = 60; // 60 particles for an awesome effect
    const bookElement = document.getElementById('book');
    const rect = bookElement ? bookElement.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'book-particle';
        const size = Math.random() * 8 + 3; // Random size between 3px and 11px
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.left = (centerX - size / 2) + 'px';
        particle.style.top = (centerY - size / 2) + 'px';
        particle.style.boxShadow = `0 0 ${size * 1.5}px ${particle.style.backgroundColor}`; // Glowing effect

        document.body.appendChild(particle);

        // Calculate random direction and distance
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 350 + 100; // Spread distance
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        // Animate particles using Web Animations API
        particle.animate([
            { transform: 'translate(0px, 0px) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], {
            duration: Math.random() * 800 + 700, // Random duration for a natural look
            easing: 'cubic-bezier(0, .9, .57, 1)', // Fast start, slow end (explosion like)
            fill: 'forwards'
        });

        setTimeout(() => particle.remove(), 1600); // Cleanup after animation
    }
}

// Particle burst when flipping pages
function spawnPageFlipParticles() {
    const colors = ['#ff69b4', '#ffb6c1', '#ffffff', '#ffd700'];
    const numParticles = 15;
    const bookElement = document.getElementById('book');
    if (!bookElement) return;

    const rect = bookElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'book-particle';
        const size = Math.random() * 5 + 3;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        particle.style.left = (centerX - size / 2) + 'px';
        particle.style.top = (centerY - size / 2) + 'px';
        particle.style.boxShadow = `0 0 ${size}px ${particle.style.backgroundColor}`;

        document.body.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 120 + 60;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;

        particle.animate([
            { transform: 'translate(0px, 0px) scale(1)', opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
        ], { duration: Math.random() * 500 + 400, easing: 'cubic-bezier(0.25, 1, 0.5, 1)', fill: 'forwards' });
        setTimeout(() => particle.remove(), 1000);
    }
}

// 5. Optimize book opening effect
function showBook() {

    const book = document.getElementById('book');
    const bookContainer = document.querySelector('.book-container');

    // Show stars once
    showStars();
    if (book && bookContainer) {
        bookContainer.style.display = 'block';
        bookContainer.classList.add('show');
        book.style.display = 'block';

        // Trigger the magical particle burst
        showBookParticles();

        // ✅ FIX: Calculate z-index for all pages
        calculatePageZIndexes();
        
        // ✅ FIX: Set up observer to track book structure changes
        setupPageObserver();

        // Batch DOM updates
        requestAnimationFrame(() => {
            book.style.opacity = '0';
            book.style.transform = 'scale(0.8) translateY(50px)';
            book.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

            requestAnimationFrame(() => {
                book.style.opacity = '1';
                book.style.transform = 'scale(1) translateY(0)';
                // Delay music toggle
                setTimeout(() => {
                    if (!isPlaying) {
                        toggleMusic();
                    }
                }, 800);
            });
        });
    }

}
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 211, g: 155, b: 155 };
}


const book = document.getElementById('book');
const contentDisplay = document.getElementById('contentDisplay');
const contentText = document.getElementById('contentText');
let currentPage = 0;
let isFlipping = false;
let typewriterTimeout;
let isBookFinished = false;
let photoUrls = pages.filter(page => page.image).map(page => page.image);

// Sound effect for flipping pages
const flipSound = new Audio('./music/flip.mp3');
flipSound.volume = 0.5; // Thodi aawaz kam rakhi hai taaki background music distrub na ho
function playFlipSound() {
    flipSound.currentTime = 0; // Rapid clicks ke liye aawaz reset
    flipSound.play().catch(e => {}); // Autoplay error ignore karne ke liye
}

function showConfetti() {
    const confettiColors = ['#ff6f91', '#ff9671', '#ffc75f', '#f9f871', '#ff3c78'];

    // Use requestAnimationFrame instead of direct loop
    let confettiCount = 0;
    function spawnConfetti() {
        if (confettiCount >= maxConfetti) return;

        const confetti = getConfettiFromPool();
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.setProperty('--x', (Math.random() * 400 - 200) + 'px');
        confetti.style.setProperty('--y', (Math.random() * -400) + 'px');
        confetti.style.left = (window.innerWidth / 2) + 'px';
        confetti.style.top = (window.innerHeight / 2) + 'px';
        document.body.appendChild(confetti);

        // Use optimized setTimeout
        setTimeout(() => returnConfettiToPool(confetti), 1000);

        confettiCount++;

        // Next spawn with smaller delay
        if (confettiCount < maxConfetti) {
            setTimeout(spawnConfetti, 20); // Reduce delay
        }
    }

    spawnConfetti();
}

let fireworkContainer = null;
function showFirework() {
    if (!fireworkContainer) {
        fireworkContainer = document.getElementById('fireworkContainer');
    }

    // Clear old content efficiently
    fireworkContainer.innerHTML = '';
    fireworkContainer.style.opacity = 1;

    // Use DocumentFragment for optimal DOM manipulation
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 20; i++) { // Reduce from 30 to 20
        const fw = document.createElement('div');
        fw.className = 'firework';
        fw.style.transform = `rotate(${i * 18}deg) translateY(-40px)`; // Increase angle to compensate for reduced quantity
        fragment.appendChild(fw);
    }

    fireworkContainer.appendChild(fragment);

    // Use requestAnimationFrame for smooth animation
    requestAnimationFrame(() => {
        setTimeout(() => {
            fireworkContainer.style.opacity = 0;
        }, 1000);
    });
}


// 3. Optimize photo heart effect with throttling
const photoCache = new Map();
let heartPhotosCreated = 0;
const maxHeartPhotos = 30;
let heartContainer = null;
let heartPhotoElements = []; // To store photo elements for the animation
let bgParticlesInterval = null;

function preloadPhoto(url) {
    if (photoCache.has(url)) {
        return photoCache.get(url);
    }

    const img = new Image();
    img.src = url;
    photoCache.set(url, img);
    return img;
}

function makeElementDraggable(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let animationFrameId = null;

    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        if(e.type === 'mousedown') e.preventDefault();
        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        pos3 = clientX;
        pos4 = clientY;
        
        // Drag karte time instant follow kare bina kisi delay ke
        elmnt.style.transition = 'none';

        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchend = closeDragElement;
        document.addEventListener('touchmove', elementDrag, { passive: false });
        elmnt.style.cursor = 'grabbing';
    }

    function elementDrag(e) {
        e = e || window.event;
        // Mobile par background scroll hone se roke
        if (e.cancelable) e.preventDefault(); 

        const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;
        pos1 = pos3 - clientX;
        pos2 = pos4 - clientY;
        pos3 = clientX;
        pos4 = clientY;

        // 60FPS smooth dragging ke liye requestAnimationFrame
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(() => {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        });
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.removeEventListener('touchmove', elementDrag);
        elmnt.style.cursor = 'grab';
        
        // Mouse chhodne par ek smooth "settle/slide" effect
        elmnt.style.transition = 'top 0.4s cubic-bezier(0.25, 1, 0.5, 1), left 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    }
}

function spawnHeartPhotosCentered() {
    heartPhotosCreated = 0;
    heartPhotoElements = []; // Clear previous elements

    // Preload all images first
    photoUrls.forEach(url => preloadPhoto(url));

    // Initialize container if it doesn't exist
    if (!document.getElementById('heartPhotoContainer')) {
        heartContainer = document.createElement('div');
        heartContainer.id = 'heartPhotoContainer';
        heartContainer.style.position = 'fixed';
        heartContainer.style.left = '50%';
        heartContainer.style.top = '50%';
        heartContainer.style.width = '0px';
        heartContainer.style.height = '0px';
        heartContainer.style.zIndex = '300';
        heartContainer.style.cursor = 'grab';
        document.body.appendChild(heartContainer);
        makeElementDraggable(heartContainer);
    } else {
        heartContainer = document.getElementById('heartPhotoContainer');
        heartContainer.innerHTML = '';
        heartContainer.style.left = '50%';
        heartContainer.style.top = '50%';
    }

    // Remove pulsing class if it exists from a previous run
    if (heartContainer.classList.contains('pulsing')) {
        heartContainer.classList.remove('pulsing');
    }

    // --- Phase 1: Create photos and animate them to orbit ---
    for (let i = 0; i < maxHeartPhotos; i++) {
        setTimeout(() => {
            if (heartPhotosCreated >= maxHeartPhotos) return;

            const photoUrl = photoUrls[i % photoUrls.length];
            const photo = document.createElement('img');
            photo.src = photoUrl;
            photo.className = 'photo';
            photo.style.position = 'absolute';
            photo.style.left = '0px';
            photo.style.top = '0px';
            photo.style.opacity = '0';
            photo.style.transform = 'translate(-50%, -50%)';
            photo.draggable = false;
            photo.style.zIndex = 300 + i; // Stagger z-index for overlapping effect

            heartContainer.appendChild(photo);
            heartPhotoElements.push(photo);
            heartPhotosCreated++;

            // Animate to orbit position
            const isLandscapeMobile = window.innerHeight <= 500 && window.innerWidth > window.innerHeight;
            const orbitRadius = isLandscapeMobile ? 80 : 150;
            const randomAngle = (i / maxHeartPhotos) * Math.PI * 2 + (Math.random() * 0.5 - 0.25);
            const orbitX = orbitRadius * Math.cos(randomAngle);
            const orbitY = orbitRadius * Math.sin(randomAngle) * 0.7; // Make the orbit slightly elliptical
            const randomRotation = (Math.random() - 0.5) * 45;
            const zMovement = Math.sin(randomAngle) * 80; // This will move photos in 3D space

            photo.animate([
                { transform: 'translate(-50%, -50%) translateZ(0px) scale(0)', opacity: 0 },
                { transform: `translate(calc(-50% + ${orbitX}px), calc(-50% + ${orbitY}px)) translateZ(${zMovement}px) scale(1.1) rotate(${randomRotation}deg)`, opacity: 1 }
            ], {
                duration: 1200,
                easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                fill: 'forwards'
            });

        }, i * 100); // Stagger the appearance
    }

    // --- Phase 2: After a delay, animate all to form the heart ---
    const totalStaggerTime = maxHeartPhotos * 100;
    const orbitAnimationTime = 1200;
    const delayBeforeForming = 1000; // Wait a bit after the last one appears
    
    setTimeout(() => {
        const isLandscapeMobile = window.innerHeight <= 500 && window.innerWidth > window.innerHeight;
        const scale = isLandscapeMobile ? 8 : 16;

        heartPhotoElements.forEach((photo, idx) => {
            // Calculate final heart position
            const t = (idx / maxHeartPhotos) * 2 * Math.PI;
            const sin_t = Math.sin(t);
            const cos_t = Math.cos(t);
            const targetX = scale * 16 * Math.pow(sin_t, 3);
            const targetY = -scale * (13 * cos_t - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

            // Animate from current (orbit) position to final heart position
            photo.animate([
                { /* Current styles are implicitly the start */ },
                { transform: `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) translateZ(0px) scale(1) rotate(0deg)` }
            ], {
                duration: 1500,
                easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
                fill: 'forwards',
                delay: Math.random() * 300
            });
        });
    }, totalStaggerTime + orbitAnimationTime + delayBeforeForming);

    // --- Phase 3: Add pulsing glow effect after the heart is fully formed ---
    const heartFormationAnimationTime = 1500 + 300; // duration + max random delay
    setTimeout(() => {
        if (heartContainer) {
            heartContainer.classList.add('pulsing');
            hideStars(); // Piche wale white stars ko hide karne ke liye
            startBackgroundParticles();
        }
    }, totalStaggerTime + orbitAnimationTime + delayBeforeForming + heartFormationAnimationTime);
}

function startBackgroundParticles() {
    if (bgParticlesInterval) return; // Prevent multiple intervals

    const colors = ['#ff69b4', '#ff1493', '#ffd700', '#ffffff', '#ffb6c1'];
    
    bgParticlesInterval = setInterval(() => {
        // Ek baar mein 3 particles spawn honge aur interval fast kar diya hai
        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('div');
            particle.className = 'bg-floating-particle';
            
            const size = Math.random() * 6 + 2; // 2px to 8px
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.boxShadow = `0 0 ${size * 2}px ${particle.style.backgroundColor}`;
            
            particle.style.left = Math.random() * 100 + 'vw';
            
            const duration = Math.random() * 4 + 4; // 4s to 8s
            particle.style.setProperty('--duration', duration + 's');
            particle.style.setProperty('--max-opacity', Math.random() * 0.5 + 0.3); // Soft opacity
            
            document.body.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, duration * 1000);
        }
    }, 100); // Pehle 300ms tha, ab 100ms kar diya taaki particles jaldi-jaldi aayein
}

// 7. Optimize startHeartEffect
function startHeartEffect() {
    const currentSettings = window.settings || settings;
    if (!currentSettings.enableHeart) {
        return;
    }

    // Batch DOM updates
    const book = document.getElementById('book');
    const bookContainer = document.querySelector('.book-container');
    const contentDisplay = document.getElementById('contentDisplay');

    // Hide elements efficiently
    if (book) {
        book.style.display = 'none';
        book.classList.remove('show');
    }
    if (bookContainer) {
        bookContainer.style.display = 'none';
        bookContainer.classList.remove('show');
    }
    if (contentDisplay) {
        contentDisplay.classList.remove('show');
    }

    // Stagger effects to avoid blocking
    requestAnimationFrame(() => {
        setTimeout(() => {
            showConfetti();
        }, 100);

        setTimeout(() => {
            showFirework();
        }, 200);

        setTimeout(() => {
            spawnHeartPhotosCentered();
        }, 300);
    });
}

function checkBookFinished() {
    const totalPhysicalPages = Math.ceil(pages.length / 2);
    const lastPageIndex = totalPhysicalPages - 1;
    const lastPage = document.querySelector(`.page[data-page="${lastPageIndex}"]`);
    if (currentPage === lastPageIndex && lastPage && lastPage.classList.contains('flipped')) {
        if (!isBookFinished) {
            isBookFinished = true;
            const contentDisplay = document.getElementById('contentDisplay');
            if (contentDisplay) {
                contentDisplay.classList.remove('show');
            }
            setTimeout(() => {
                const currentSettings = window.settings || settings;
                if (currentSettings.enableHeart) {
                    startHeartEffect();
                }
            }, 1000);
        }
    }
}

function nextPage() {
    const totalPhysicalPages = Math.ceil(pages.length / 2);
    if (currentPage < totalPhysicalPages - 1 && !isFlipping) {
        isFlipping = true;
        playFlipSound(); // Yahan aawaz play hogi
        spawnPageFlipParticles();
        const pageToFlip = document.querySelector(`.page[data-page="${currentPage}"]`);
        pageToFlip.classList.add('flipping');
        setTimeout(() => {
            pageToFlip.classList.remove('flipping');
            pageToFlip.classList.add('flipped');
            currentPage++;
            isFlipping = false;
            showPageContent();
            checkBookFinished();
        }, 400);
    } else if (currentPage === totalPhysicalPages - 1 && !isFlipping) {
        const lastPage = document.querySelector(`.page[data-page="${currentPage}"]`);
        if (lastPage && !lastPage.classList.contains('flipped')) {
            isFlipping = true;
            playFlipSound(); // Yahan aawaz play hogi
            spawnPageFlipParticles();
            lastPage.classList.add('flipping');
            setTimeout(() => {
                lastPage.classList.remove('flipping');
                lastPage.classList.add('flipped');
                isFlipping = false;
                showPageContent();
                checkBookFinished();
            }, 400);
        }
    }
}

function prevPage() {
    if (currentPage > 0 && !isFlipping) {
        isFlipping = true;
        playFlipSound(); // Piche palatne par bhi aawaz play hogi
        spawnPageFlipParticles();
        currentPage--;
        const pageToFlip = document.querySelector(`.page[data-page="${currentPage}"]`);
        pageToFlip.classList.add('flipping');
        setTimeout(() => {
            pageToFlip.classList.remove('flipping');
            pageToFlip.classList.remove('flipped');
            isFlipping = false;
            showPageContent();
            isBookFinished = false;
        }, 400);
    }
}

// 6. Optimize typewriter effect
function typewriterEffect(element, text, speed = 50) {
    return new Promise((resolve) => {
        element.innerHTML = '';
        let i = 0;
        let lastScrollTime = 0;

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;

                // Throttle scroll updates
                const now = Date.now();
                if (now - lastScrollTime > 100) { // Only scroll every 100ms
                    const container = element.closest('.content-display');
                    if (container && container.scrollHeight > container.clientHeight) {
                        container.scrollTop = container.scrollHeight - container.clientHeight;
                    }
                    lastScrollTime = now;
                }

                // Use requestAnimationFrame instead of setTimeout when possible
                if (speed < 16) {
                    requestAnimationFrame(type);
                } else {
                    typewriterTimeout = setTimeout(type, speed);
                }
            } else {
                resolve();
            }
        }
        type();
    });
}

async function showPageContent() {
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }
    let logicalPageIndex = 0;
    if (currentPage === 0) {
        logicalPageIndex = 0;
    } else {
        const currentPhysicalPage = document.querySelector(`.page[data-page="${currentPage}"]`);
        if (currentPhysicalPage && currentPhysicalPage.classList.contains('flipped')) {
            logicalPageIndex = currentPage * 2 + 1;
        } else {
            logicalPageIndex = currentPage * 2;
        }
    }
    const contentToShow = pages[logicalPageIndex]?.content;
    if (contentToShow) {
        contentDisplay.classList.add('show');
        contentText.innerHTML = '';
        await typewriterEffect(contentText, contentToShow, 30);
    } else {
        contentDisplay.classList.remove('show');
    }
}

function createPlaceholderImage(text) {
    return `data:image/svg+xml;base64,${btoa(`
                <svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400">
                    <rect width="300" height="400" fill="#f0f0f0"/>
                    <text x="150" y="200" text-anchor="middle" font-family="Arial" font-size="16" fill="#999">
                        ${text}
                    </text>
                </svg>
            `)}`;
}



let startX = 0;
let startY = 0;
let startTime = 0;
let isDragging = false;
let currentTransform = 0;

book.addEventListener('touchstart', handleTouchStart, { passive: false });
book.addEventListener('touchmove', handleTouchMove, { passive: false });
book.addEventListener('touchend', handleTouchEnd, { passive: false });
book.addEventListener('mousedown', handleMouseStart);
book.addEventListener('mousemove', handleMouseMove);
book.addEventListener('mouseup', handleMouseEnd);
book.addEventListener('mouseleave', handleMouseEnd);

function handleTouchStart(e) {
    if (isFlipping) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    startTime = Date.now();
    isDragging = true;
    currentTransform = 0;
}

function handleMouseStart(e) {
    if (isFlipping) return;
    startX = e.clientX;
    startY = e.clientY;
    startTime = Date.now();
    isDragging = true;
    currentTransform = 0;
    e.preventDefault();
}

function handleTouchMove(e) {
    if (!isDragging || isFlipping) return;
    e.preventDefault();
    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = currentX - startX;
    const deltaY = currentY - startY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        handleSwipeMove(deltaX);
    }
}

function handleMouseMove(e) {
    if (!isDragging || isFlipping) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        handleSwipeMove(deltaX);
    }
}

function handleSwipeMove(deltaX) {
    const swipeThreshold = 50;
    const maxRotation = 45;
    let rotation = Math.max(-maxRotation, Math.min(maxRotation, deltaX / 3));
    currentTransform = rotation;
    const currentPageElement = document.querySelector(`.page[data-page="${currentPage}"]`);
    if (currentPageElement && !currentPageElement.classList.contains('flipped')) {
        if (deltaX < -swipeThreshold) {
            currentPageElement.style.transform = `rotateY(${rotation}deg)`;
            currentPageElement.style.boxShadow = `${rotation / 10}px 10px 20px rgba(0,0,0,${0.3 + Math.abs(rotation / 100)})`;
        }
    } else if (currentPage > 0) {
        const prevPageElement = document.querySelector(`.page[data-page="${currentPage - 1}"]`);
        if (prevPageElement && prevPageElement.classList.contains('flipped') && deltaX > swipeThreshold) {
            prevPageElement.style.transform = `rotateY(${-180 + Math.abs(rotation)}deg)`;
            prevPageElement.style.boxShadow = `${-rotation / 10}px 10px 20px rgba(0,0,0,${0.3 + Math.abs(rotation / 100)})`;
        }
    }
}

function handleTouchEnd(e) {
    if (!isDragging || isFlipping) return;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    const deltaX = endX - startX;
    const deltaY = endY - startY;
    const deltaTime = Date.now() - startTime;
    handleSwipeEnd(deltaX, deltaY, deltaTime);
}

function handleMouseEnd(e) {
    if (!isDragging || isFlipping) return;
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;
    const deltaTime = Date.now() - startTime;
    handleSwipeEnd(deltaX, deltaY, deltaTime);
}

function handleSwipeEnd(deltaX, deltaY, deltaTime) {
    isDragging = false;
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.style.transform = '';
        page.style.boxShadow = '';
    });
    const swipeThreshold = 50;
    const velocity = Math.abs(deltaX) / deltaTime;
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > swipeThreshold) {
        if (deltaX < 0) {
            nextPage();
        } else {
            prevPage();
        }
    } else if (velocity > 0.5 && Math.abs(deltaX) > 30) {
        if (deltaX < 0) {
            nextPage();
        } else {
            prevPage();
        }
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
    } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevPage();
    }
});

book.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

const musicControl = document.getElementById('musicControl');
const birthdayAudio = document.getElementById('birthdayAudio');
let isPlaying = false;

birthdayAudio.volume = 0.6;

function fadeAudio(audio, targetVolume, duration) {
    const startVolume = audio.volume;
    const volumeChange = targetVolume - startVolume;
    let startTime = null;

    function animateFade(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        audio.volume = startVolume + (volumeChange * progress);

        if (progress < 1) {
            requestAnimationFrame(animateFade);
        } else {
            if (targetVolume === 0) {
                audio.pause();
            }
        }
    }
    requestAnimationFrame(animateFade);
}

async function toggleMusic() {
    if (isPlaying) {
        fadeAudio(birthdayAudio, 0, 500); // Fade out in 500ms
        musicControl.innerHTML = '▶';
        musicControl.classList.remove('playing');
        musicControl.title = 'Play Music';
        isPlaying = false;
    } else {
        try {
            await birthdayAudio.play();
            fadeAudio(birthdayAudio, 0.6, 800); // Fade in to volume 0.6 in 800ms
            musicControl.innerHTML = '⏸';
            musicControl.classList.add('playing');
            musicControl.title = 'Pause Music';
            isPlaying = true;
        } catch (error) {
            // Autoplay was prevented.
        }
    }
}

musicControl.addEventListener('click', toggleMusic);

birthdayAudio.addEventListener('ended', () => {
});

birthdayAudio.addEventListener('error', (e) => {
    musicControl.style.display = 'none';
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden && isPlaying) {
        birthdayAudio.pause();
    }
});

// 8. Optimize stars creation
let starsCreated = false;
function createStars() {
    if (starsCreated) return; // Avoid recreating stars

    const starsContainer = document.getElementById('starsContainer');
    starsContainer.innerHTML = '';

    const starCount = 100; // Reduce from 150 to 100
    const starSizes = ['small', 'medium', 'large'];
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = `star ${starSizes[Math.floor(Math.random() * starSizes.length)]}`;

        // Batch style updates
        star.style.cssText = `
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation-duration: ${Math.random() * 3 + 1}s;
            animation-delay: ${Math.random() * 2}s;
        `;

        fragment.appendChild(star);
    }

    starsContainer.appendChild(fragment);
    starsCreated = true;
}

function showStars() {
    const starsContainer = document.getElementById('starsContainer');
    createStars();
    starsContainer.style.display = 'block';
}

function hideStars() {
    const starsContainer = document.getElementById('starsContainer');
    starsContainer.style.display = 'none';
}

// 9. Cleanup function to free memory
function cleanup() {
    // Clear timeouts
    if (typewriterTimeout) {
        clearTimeout(typewriterTimeout);
    }
    
    if (zIndexUpdateTimeout) {
        clearTimeout(zIndexUpdateTimeout);
    }

    // Clear pools
    confettiPool.length = 0;
    heartPool.length = 0;

    // Clear photo cache
    photoCache.clear();

    // Reset counters
    heartPhotosCreated = 0;
    starsCreated = false;
    
    // Clear heart container
    const heartCont = document.getElementById('heartPhotoContainer');
    if (heartCont) heartCont.remove();

    // Clear background particles interval
    if (bgParticlesInterval) {
        clearInterval(bgParticlesInterval);
        bgParticlesInterval = null;
    }
    document.querySelectorAll('.bg-floating-particle').forEach(p => p.remove());

    // ✅ FIX: Reset z-index properties
    const book = document.getElementById('book');
    if (book) {
        const pages = book.querySelectorAll('.page');
        pages.forEach(page => {
            page.style.removeProperty('--page-z-index');
            page.style.removeProperty('--page-flipped-z-index');
        });
    }
}

// 10. Debounce resize events
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Resize logic here
        const matrixCanvas = document.getElementById('matrix-rain');
        if (matrixCanvas) {
            matrixCanvas.width = window.innerWidth;
            matrixCanvas.height = window.innerHeight;
        }
    }, 100);
}

window.addEventListener('resize', handleResize);
// Call cleanup when page unloads
window.addEventListener('beforeunload', cleanup);

/**
 * Handles the first user interaction to unlock and unmute the background audio.
 * This is required by modern browser autoplay policies.
 */
function initialUserInteractionHandler() {
    const audio = document.getElementById('birthdayAudio');
    if (audio && audio.muted) {
        audio.muted = false;
        // The audio is already playing due to the 'autoplay' attribute.
        // We just need to sync our state and UI.
        if (!isPlaying) {
            isPlaying = true;
            const musicControl = document.getElementById('musicControl');
            if (musicControl) {
                musicControl.innerHTML = '⏸';
                musicControl.classList.add('playing');
                musicControl.title = 'Pause Music';
            }
        }
    }
    // This handler should only run once.
    document.body.removeEventListener('click', initialUserInteractionHandler);
    document.body.removeEventListener('touchstart', initialUserInteractionHandler);
}

// ✅ FIX: Add dynamic z-index management functions for pages
let zIndexUpdateTimeout;

function calculatePageZIndexes() {
    
    const book = document.getElementById('book');
    if (!book) {
        console.warn('⚠️ [WARNING] Book element not found');
        return;
    }
    
    const pages = book.querySelectorAll('.page');
    const totalPages = pages.length;
    
    
    if (totalPages === 0) {
        console.warn('⚠️ [WARNING] No pages found in book');
        return;
    }
    
    pages.forEach((page, physicalIndex) => {
        const logicalPageIndex = physicalIndex * 2;
        const nextLogicalPageIndex = logicalPageIndex + 1;
        
        // Calculate z-index for current page
        const normalZIndex = totalPages - physicalIndex;
        const flippedZIndex = physicalIndex + 1;
        
        
        // Apply z-index
        page.style.setProperty('--page-z-index', normalZIndex.toString());
        page.style.setProperty('--page-flipped-z-index', flippedZIndex.toString());
    });
    
}

function updatePageZIndexes() {
    clearTimeout(zIndexUpdateTimeout);
    zIndexUpdateTimeout = setTimeout(() => {
        calculatePageZIndexes();
    }, 100);
}

function setupPageObserver() {
    const book = document.getElementById('book');
    if (!book) {
        console.warn('⚠️ [WARNING] Book element not found for observer setup');
        return;
    }
    
    const observer = new MutationObserver((mutations) => {
        let shouldUpdate = false;
        
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                shouldUpdate = true;
            }
        });
        
        if (shouldUpdate) {
            updatePageZIndexes();
        }
    });
    
    observer.observe(book, {
        childList: true,
        subtree: true
    });
    
}

window.debugBookImages = function() {
    const allImages = document.querySelectorAll('.page img');
    allImages.forEach((img, index) => {
        const pageIndex = img.getAttribute('data-page-index');
        const imageUrl = img.getAttribute('data-image-url');
    });
};

// Listen for the first user interaction to unmute audio
document.body.addEventListener('click', initialUserInteractionHandler);
document.body.addEventListener('touchstart', initialUserInteractionHandler);
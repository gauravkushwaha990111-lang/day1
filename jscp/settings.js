const settingsButton = document.getElementById('settingsButton');
const settingsModal = document.getElementById('settingsModal');
const closeModal = document.querySelector('.close');
let pages = [];
const applySettingsButton = document.getElementById('applySettings');
let settings = {
    music: './music/this december.mp3',
    countdown: 3,
    matrixText: 'HAPPYBIRTHDAY',
    matrixColor1: '#ff69b4', // Pink color
    matrixColor2: '#ff1493', // Pink color
    sequence: 'HAPPY|BIRTHDAY|TO|YOU|HINATA|❤',
    sequenceColor: '#ff69b4', // Pink color
    gift: '', // No sticker/GIF
    pages: [
        { image: './image/Birthday!/cover.jpg', content: '' }, // Front cover
        { image: './image/Birthday!/photo1.jpg', content: 'Dear Hinata, you bring so much joy and happiness! 💕' },
        { image: './image/Birthday!/photo2.jpg', content: 'Your smile lights up every room you enter! ✨' },
        { image: './image/Birthday!/photo3.jpg', content: 'You are such an amazing and beautiful person! 🌸' },
        { image: './image/Birthday!/photo4.jpg', content: 'Your kindness and warmth touch hearts! 💖' },
        { image: './image/Birthday!/photo5.jpg', content: 'Wishing you the most wonderful birthday ever! 🎉' },
        { image: './image/Birthday!/photo6.jpg', content: 'May all your dreams come true! ⭐' },
        { image: './image/Birthday!/photo7.jpg', content: 'You deserve all the happiness! 🌈' },
        { image: './image/Birthday!/photo8.jpg', content: 'Love you so much! Have the best day! ❤️🎂' },
        { image: './image/Birthday!/9.jpg', content: '' } // End cover
    ],
    enableBook: true,
    enableHeart: true,
    isSave: false,
};

// Global variable to store the state of the isSave checkbox
window.lastIsSaveState = false;

const musicOptions = [
    { value: './music/happy-birthday.mp3', label: 'Happy Birthday (Free)' },
    { value: './music/happybirthday.mp3', label: 'Happy Birthday (Version 2)' },
    { value: './music/happybirthday_domixi.mp3', label: 'Happy Birthday (Do Mixi)' },
    { value: './music/happybirtday_uia.mp3', label: 'Happy Birthday (Meo UIA)' },
    { value: './music/music.mp3', label: 'Happy Birthday (Instrumental)' },
    { value: './music/postcardnam.mp3', label: 'Happy Birthday Podcast (Male)' },
    { value: './music/podcardnu.mp3', label: 'Happy Birthday Podcast (Female)' },
    { value: './music/givemeyourforever.mp3', label: 'Give Me Your Forever' },
    { value: './music/perfect.mp3', label: 'Perfect' },
    { value: './music/phepmau.mp3', label: 'Magic' },
    { value: './music/lambantraianhe.mp3', label: 'Be My Boyfriend' },
    { value: './music/denbenanh.mp3', label: 'Come to Me' },
    { value: './music/anhnangcuaanh.mp3', label: 'My Sunshine' },
    { value: './music/dunglamtraitimanhdau.mp3', label: 'Dont Break My Heart' },
    { value: './music/buiphan.mp3', label: 'Chalk Dust' },
    { value: './music/buocnhevaotimanh.mp3', label: 'Step Softly Into My Heart' },
    { value: './music/codoidieu.mp3', label: 'A Few Things' },
    { value: './music/coem.mp3', label: 'Having You' },
    { value: './music/emnay.mp3', label: 'Hey Girl' },
    { value: './music/emlacogiaovungcao.mp3', label: 'Highland Teacher' },
    { value: './music/emlacogiaovungcaoremix.mp3', label: 'Highland Teacher (Remix)' },
    { value: './music/lathuguithay.mp3', label: 'Letter to Teacher' },
    { value: './music/loithayco.mp3', label: 'Teachers Words' },
    { value: './music/nguoithay.mp3', label: 'The Teacher' },
    { value: './music/nguoigieomamxanh.mp3', label: 'The Sower of Seeds' },
    { value: './music/nguoidautien.mp3', label: 'The First Person' },
    { value: './music/motdoi.mp3', label: 'A Lifetime' },
    { value: './music/minhcungnhaudongbang.mp3', label: 'Let Freeze Together' },
    { value: './music/neunhucohaitraitim.mp3', label: 'If I Had Two Hearts' },
    { value: './music/ngayxuaay.mp3', label: 'Those Old Days' },
    { value: './music/Như 1 vì tinh tú.mp3', label: 'Like a Star' },
    { value: './music/tinhyeudieuky.mp3', label: 'Magical Love' },
    { value: './music/trentinhbanduoitinhyeu.mp3', label: 'More Than Friends, Less Than Lovers' },
    { value: './music/tungngayyeuem.mp3', label: 'Loving You Every Day' },
    { value: './music/yeuemratnhieu.mp3', label: 'Love You So Much' },
    { value: './music/suynghitronganh.mp3', label: 'My Thoughts' }
];
const gifOptions = [
    { value: '', label: 'None' },
    { value: './gif/happy.gif', label: 'Gif1' },
    { value: './gif/Cat Love GIF by KIKI.gif', label: 'Gif2' },
    { value: './gif/Happy-Birthday-GIF-by-BREAD-TR-unscreen.gif', label: 'Gif3' },
    { value: './gif/happy2.gif', label: 'Gif4' },
    { value: './gif/happy3.gif', label: 'Gif5' },
];
const musicPreviewButton = document.getElementById('musicPreviewButton');
const musicPreviewStatus = document.getElementById('musicPreviewStatus');
const musicPreviewAudio = new Audio();
musicPreviewAudio.preload = 'auto';
let currentPreviewTrack = '';

function getSelectedMusicLabel() {
    const musicSelect = document.getElementById('backgroundMusic');
    if (!musicSelect) return '';
    const selectedOption = musicSelect.options[musicSelect.selectedIndex];
    return selectedOption ? selectedOption.textContent : '';
}

function getIdlePreviewMessage() {
    const label = getSelectedMusicLabel();
    return label ? `Selected: ${label}` : 'Select a song and click "Preview"';
}

function setMusicPreviewState({ message, isPlaying }) {
    if (musicPreviewButton) {
        musicPreviewButton.textContent = isPlaying ? '⏸ Stop preview' : '▶ Preview';
        if (isPlaying) {
            musicPreviewButton.classList.add('playing');
        } else {
            musicPreviewButton.classList.remove('playing');
        }
    }
    if (musicPreviewStatus && message) {
        musicPreviewStatus.textContent = message;
    }
}

function stopMusicPreview(customMessage) {
    musicPreviewAudio.pause();
    musicPreviewAudio.currentTime = 0;
    currentPreviewTrack = '';
    setMusicPreviewState({
        message: customMessage || getIdlePreviewMessage(),
        isPlaying: false
    });
}

function handleMusicPreview() {
    const musicSelect = document.getElementById('backgroundMusic');
    if (!musicSelect || !musicSelect.value) {
        setMusicPreviewState({
            message: 'Please select a song before previewing',
            isPlaying: false
        });
        return;
    }

    const selectedSrc = musicSelect.value;
    const selectedLabel = getSelectedMusicLabel();

    if (currentPreviewTrack === selectedSrc && !musicPreviewAudio.paused) {
        stopMusicPreview();
        return;
    }

    currentPreviewTrack = selectedSrc;
    musicPreviewAudio.pause();
    musicPreviewAudio.currentTime = 0;
    musicPreviewAudio.src = selectedSrc;

    musicPreviewAudio.play().then(() => {
        setMusicPreviewState({
            message: `Playing: ${selectedLabel}`,
            isPlaying: true
        });
    }).catch(error => {
        console.error('Cannot play preview music:', error);
        stopMusicPreview('Failed to play preview. Please try again.');
    });
}

function attachMusicSelectChangeListener() {
    const musicSelect = document.getElementById('backgroundMusic');
    if (!musicSelect) return;
    musicSelect.onchange = () => {
        stopMusicPreview();
    };
}

if (musicPreviewButton) {
    musicPreviewButton.addEventListener('click', handleMusicPreview);
}

musicPreviewAudio.addEventListener('ended', () => stopMusicPreview());
musicPreviewAudio.addEventListener('pause', () => {
    if (musicPreviewAudio.currentTime === 0) {
        setMusicPreviewState({
            message: getIdlePreviewMessage(),
            isPlaying: false
        });
    }
});
musicPreviewAudio.addEventListener('error', () => {
    stopMusicPreview('Failed to play preview. Please try again.');
});

stopMusicPreview();

// Define preset color themes (3 presets + custom)
const colorThemes = {
    pink: {
        matrixColor1: '#ff69b4',
        matrixColor2: '#ff1493',
        sequenceColor: '#ff69b4',
        name: 'Sweet Pink'
    },
    blue: {
        matrixColor1: '#87ceeb',
        matrixColor2: '#4169e1',
        sequenceColor: '#1e90ff',
        name: 'Cool Blue'
    },
    purple: {
        matrixColor1: '#dda0dd',
        matrixColor2: '#9370db',
        sequenceColor: '#8a2be2',
        name: 'Dreamy Purple'
    },
    custom: {
        matrixColor1: '#ffb6c1',
        matrixColor2: '#ffc0cb',
        sequenceColor: '#d39b9b',
        name: 'Custom Color'
    }
};

// Create a reusable general reset function
function resetWebsiteState() {

    // Reset website state
    const book = document.getElementById('book');
    const bookContainer = document.querySelector('.book-container');
    const canvas = document.querySelector('.canvas');
    const matrixCanvas = document.getElementById('matrix-rain');
    const giftImageElement = document.getElementById('gift-image');
    const contentDisplay = document.getElementById('contentDisplay');
    const fireworkContainer = document.getElementById('fireworkContainer');
    const birthdayAudio = document.getElementById('birthdayAudio');

    S.initialized = false;
    // Hide stars on reset
    if (typeof hideStars === 'function') {
        hideStars();
    }

    // Hide book and related elements
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
    if (giftImageElement) {
        giftImageElement.style.display = 'none';
        giftImageElement.style.animation = '';
    }
    if (fireworkContainer) {
        fireworkContainer.style.display = 'none';
        fireworkContainer.style.opacity = '0';
        fireworkContainer.innerHTML = '';
    }

    // Remove any existing heart photos
    const photos = document.querySelectorAll('.photo');
    photos.forEach(photo => photo.remove());

    // Remove heart photo container if exists
    const heartContainer = document.getElementById('heartPhotoContainer');
    if (heartContainer) heartContainer.remove();

    // Reset canvas visibility
    if (canvas) {
        canvas.style.display = 'block';
    }
    if (matrixCanvas) {
        matrixCanvas.style.display = 'block';
    }

    // Reset book state
    if (typeof currentPage !== 'undefined') {
        currentPage = 0;
    }
    if (typeof isBookFinished !== 'undefined') {
        isBookFinished = false;
    }
    if (typeof isFlipping !== 'undefined') {
        isFlipping = false;
    }
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('flipped', 'flipping');
    });

    // Apply music settings
    if (birthdayAudio && window.settings) {
        birthdayAudio.src = window.settings.music;
        if (typeof isPlaying !== 'undefined' && isPlaying) {
            birthdayAudio.play().catch(error => {
            });
        }
    }

    // Reset and restart matrix rain với màu mới
    if (window.settings && typeof matrixChars !== 'undefined') {
        matrixChars = window.settings.matrixText.split('');

        if (typeof matrixInterval !== 'undefined' && matrixInterval) {
            clearInterval(matrixInterval);
            matrixInterval = null;
            if (matrixCanvas) {
                const matrixCtx = matrixCanvas.getContext('2d');
                matrixCtx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
            }
        }
        if (typeof initMatrixRain === 'function') {
            initMatrixRain();
        }
    }

    // Update gift image
    if (giftImageElement && window.settings) {
        if (window.settings.gift && window.settings.gift !== '') {
            giftImageElement.src = window.settings.gift;
        } else {
            giftImageElement.src = '';
        }
    }

    // ✅ Update pages and recreate book với debug
    if (window.settings && window.settings.pages) {
        pages = window.settings.pages;
        createPages();
    }

    // Reset and restart the sequence với màu mới
    if (typeof S !== 'undefined' && S.UI && window.settings) {
        S.UI.reset(true);
        const sequence = `|#countdown ${window.settings.countdown}|${window.settings.sequence}|#gift|`;
        S.UI.simulate(sequence);
    }

}

// Function to initialize default settings
function initializeDefaultSettings() {

    window.settings = {
        music: './music/hinata.mp3',
        countdown: 3,
        matrixText: 'HAPPYBIRTHDAY',
        matrixColor1: '#ff69b4', // Pink color
        matrixColor2: '#ff1493', // Pink color
        sequence: 'HAPPY|BIRTHDAY|TO|YOU|HINATA|❤',
        sequenceColor: '#ff69b4', // Pink color
        gift: '', // No sticker/GIF
        enableBook: true,
        enableHeart: true,
        isSave: false,  
        colorTheme: 'pink',
        pages: [
            { image: './image/Birthday!/cover.jpg', content: '' }, // Front cover
            { image: './image/Birthday!/photo1.jpg', content: 'Dear Hinata, you bring so much joy and happiness! 💕' },
            { image: './image/Birthday!/photo2.jpg', content: 'Your smile lights up every room you enter! ✨' },
            { image: './image/Birthday!/photo3.jpg', content: 'You are such an amazing and beautiful person! 🌸' },
            { image: './image/Birthday!/photo4.jpg', content: 'Your kindness and warmth touch hearts! 💖' },
            { image: './image/Birthday!/photo5.jpg', content: 'Wishing you the most wonderful birthday ever! 🎉' },
            { image: './image/Birthday!/photo6.jpg', content: 'May all your dreams come true! ⭐' },
            { image: './image/Birthday!/photo7.jpg', content: 'You deserve all the happiness! 💕' },
            { image: './image/Birthday!/photo8.jpg', content: 'Love you so much! Have the best day! ❤️🎂' },
            { image: './image/Birthday!/9.jpg', content: '' } // End cover
        ]
    };

    pages = window.settings.pages;
}


// Function để apply settings đã load
function applyLoadedSettings() {
    const settings = window.settings;
    // Apply music settings
    const birthdayAudio = document.getElementById('birthdayAudio');
    if (birthdayAudio) {
        birthdayAudio.src = settings.music;
    }

    // Apply gift image
    const giftImageElement = document.getElementById('gift-image');
    if (giftImageElement && settings.gift) {
        giftImageElement.src = settings.gift;
    }

    // Update matrix rain
    matrixChars = settings.matrixText.split('');

    if (matrixInterval) {
        clearInterval(matrixInterval);
        matrixInterval = null;
        const matrixCanvas = document.getElementById('matrix-rain');
        if (matrixCanvas) {
            const matrixCtx = matrixCanvas.getContext('2d');
            matrixCtx.clearRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        }
    }
    initMatrixRain();

    // Recreate book pages
    createPages();

    // Reset and restart the sequence
    S.UI.reset(true);
    const sequence = `|#countdown ${settings.countdown}||${settings.sequence}|#gift|`;
    S.UI.simulate(sequence);

}

settingsButton.addEventListener('click', () => {
    settingsModal.style.display = 'block';
    populateModal();
});

closeModal.addEventListener('click', () => {
    settingsModal.style.display = 'none';
    stopMusicPreview();
});

// Sửa lại hàm populateModal
function populateModal() {
    stopMusicPreview();
    const musicSelect = document.getElementById('backgroundMusic');
    musicSelect.innerHTML = musicOptions.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
    musicSelect.value = settings.music;
    attachMusicSelectChangeListener();
    setMusicPreviewState({
        message: getIdlePreviewMessage(),
        isPlaying: false
    });

    const countdownSelect = document.getElementById('countdownTime');
    countdownSelect.value = settings.countdown;

    const enableBookSelect = document.getElementById('enableBook');
    enableBookSelect.value = settings.enableBook.toString();

    const enableHeartSelect = document.getElementById('enableHeart');
    enableHeartSelect.value = settings.enableHeart.toString();

    const isSaveCheckbox = document.getElementById('isSave');
    if (isSaveCheckbox) {
        const savedState = window.lastIsSaveState !== undefined ? window.lastIsSaveState : settings.isSave;
        isSaveCheckbox.checked = savedState;
    }

    const giftSelect = document.getElementById('giftImage');
    giftSelect.innerHTML = gifOptions.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join('');
    giftSelect.value = settings.gift;

    const matrixTextInput = document.getElementById('matrixText');
    matrixTextInput.value = settings.matrixText;

    const matrixColor1Input = document.getElementById('matrixColor1');
    matrixColor1Input.value = settings.matrixColor1;

    const matrixColor2Input = document.getElementById('matrixColor2');
    matrixColor2Input.value = settings.matrixColor2;

    const sequenceInput = document.getElementById('sequenceText');
    sequenceInput.value = settings.sequence;

    const sequenceColorInput = document.getElementById('sequenceColor');
    sequenceColorInput.value = settings.sequenceColor;

    // Sử dụng colorTheme đã lưu thay vì detect
    const currentTheme = settings.colorTheme || detectCurrentColorTheme();
    
    // Thêm event listener cho các nút màu
    const colorButtons = document.querySelectorAll('.color-theme-btn');
    colorButtons.forEach(button => {
        button.addEventListener('click', function() {
            const theme = this.getAttribute('data-theme');
            handleColorThemeChange(theme);
        });
    });
    
    // Khởi tạo với mẫu màu hiện tại
    handleColorThemeChange(currentTheme);

    // Thêm custom color listeners
    addCustomColorListeners();

    const pageConfigs = document.getElementById('pageConfigs');
    pageConfigs.innerHTML = '';

    // Add event listener for enableBook to show/hide the book page settings form IMMEDIATELY
    enableBookSelect.addEventListener('change', function () {
        const bookSettingsSection = document.getElementById('bookSettingsSection');
        const enableHeartSelect = document.getElementById('enableHeart');

        if (this.value === 'true') {
            bookSettingsSection.style.display = 'block';
            // When book is enabled, user can select heart
            enableHeartSelect.disabled = false;
        } else {
            bookSettingsSection.style.display = 'none';
            // ✅ When book is disabled, automatically turn off and disable heart
            enableHeartSelect.value = 'false';
            enableHeartSelect.disabled = true;
        }

        // Update pricing immediately
        updatePricingFromModal();
    });

    settings.pages.forEach((page, index) => {
        const pageConfig = document.createElement('div');
        pageConfig.className = 'page-config';

        // Tạo tiêu đề
        const title = document.createElement('h3');
if (index === 0) {
    title.textContent = t('pageTitleCover', {num: index + 1});
} else {
    title.textContent = t('pageTitle', {num: index + 1});
}
        pageConfig.appendChild(title);

        // Create close button (only shown when deletion is possible)
        if (settings.pages.length > 1) {
            const closeBtn = document.createElement('p');
            closeBtn.className = 'page-config-close';
            closeBtn.textContent = '×';
            closeBtn.onclick = () => removePage(index);
            pageConfig.appendChild(closeBtn);
        }

        // Tạo label cho input file
        const fileLabel = document.createElement('label');
        fileLabel.setAttribute('for', `pageImage${index}`);
        fileLabel.textContent = t('imageLabel');
        pageConfig.appendChild(fileLabel);

        // Tạo input file
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.id = `pageImage${index}`;
        fileInput.accept = 'image/*';
        pageConfig.appendChild(fileInput);

        // ✅ Show only one image preview
        const imagePreview = document.createElement('img');
        imagePreview.id = `imagePreview${index}`;
        imagePreview.style.cssText = `
            max-width: 150px;
            max-height: 150px;
            object-fit: cover;
            border: 1px solid #ddd;
            border-radius: 4px;
            display: block;
            margin-bottom: 10px;
            margin-top: 10px;
        `;

        // ✅ Show current image or placeholder
        if (page.image) {
            imagePreview.src = page.image;
            imagePreview.alt = `Page ${index + 1} Image`;
        } else {
            // Hiển thị placeholder
            const placeholderText = index === 0 ? t('coverPlaceholder') : t('pagePlaceholder', {num: index + 1});
            imagePreview.style.cssText += `
                display: flex;
                justify-content: center;
                align-items: center;
                width: 150px;
                height: 150px;
                background-color: #f0f0f0;
                font-size: 14px;
                color: #999;
                text-align: center;
            `;
            imagePreview.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gaW1hZ2U8L3RleHQ+PC9zdmc+';
            imagePreview.alt = t('noImageAlt', {placeholder: placeholderText});
        }

        pageConfig.appendChild(imagePreview);

        // ✅ Restore selectedFile if it exists
        if (page.selectedFile) {
            // Tạo FileList giả để gán vào input
            const dt = new DataTransfer();
            dt.items.add(page.selectedFile);
            fileInput.files = dt.files;

            // Hiển thị ảnh đã chọn
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.alt = `New image for page ${index + 1}`;
            };
            reader.readAsDataURL(page.selectedFile);
        }

        // ✅ Event listener to replace the image when a new file is selected
        fileInput.addEventListener('change', function (e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    // Thay thế ảnh hiện tại bằng ảnh mới
                    imagePreview.src = e.target.result;
                    imagePreview.style.cssText = `
                        max-width: 150px;
                        max-height: 150px;
                        object-fit: cover;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        display: block;
                        margin-bottom: 10px;
                        margin-top: 10px;
                    `;
                    imagePreview.alt = `New image for page ${index + 1}`;
                };
                reader.readAsDataURL(file);
            } else {
                // If no file is selected, show the old image or placeholder again
                if (page.image && !page.selectedFile) {
                    imagePreview.src = page.image;
                    imagePreview.alt = `Current image for page ${index + 1}`;
                } else {
                    // Hiển thị placeholder
                    const placeholderText = index === 0 ? t('coverPlaceholder') : t('pagePlaceholder', {num: index + 1});
                    imagePreview.style.cssText += `
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 150px;
                        height: 150px;
                        background-color: #f0f0f0;
                        font-size: 14px;
                        color: #999;
                        text-align: center;
                    `;
                    imagePreview.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9Ijc1IiB5PSI3NSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gaW1hZ2U8L3RleHQ+PC9zdmc+';
                    imagePreview.alt = t('noImageAlt', {placeholder: placeholderText});
                }
            }
        });

        // Only create textareas for odd pages starting from page 3 (index 2, 4, 6, 8...)
        if (index >= 2 && index % 2 === 0) {
          

            const contentTextarea = document.createElement('textarea');
            contentTextarea.id = `pageContent${index}`;
            contentTextarea.placeholder = t('contentPlaceholder', {num: index + 1});
            contentTextarea.rows = 4;
            contentTextarea.value = page.content || '';
            pageConfig.appendChild(contentTextarea);
        }

        pageConfigs.appendChild(pageConfig);
    });
    // Always show the Add New Page button (no check here)
    if (settings.pages.length < 19) {
        const addPageButton = document.createElement('button');
        addPageButton.textContent = t('addNewPage');
        addPageButton.onclick = addNewPage;
        addPageButton.style.cssText = `
                    background: linear-gradient(135deg, #4caf50, #45a049);
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    margin-top: 10px;
                `;
        pageConfigs.appendChild(addPageButton);
    }

    // Thêm sự kiện input để cập nhật màu preview
    matrixColor1Input.addEventListener('input', () => {
        const matrixColor1Preview = document.getElementById('matrixColor1Preview');
        if (matrixColor1Preview) {
            matrixColor1Preview.style.backgroundColor = matrixColor1Input.value;
        }
    });

    matrixColor2Input.addEventListener('input', () => {
        const matrixColor2Preview = document.getElementById('matrixColor2Preview');
        if (matrixColor2Preview) {
            matrixColor2Preview.style.backgroundColor = matrixColor2Input.value;
        }
    });

    sequenceColorInput.addEventListener('input', () => {
        const sequenceColorPreview = document.getElementById('sequenceColorPreview');
        if (sequenceColorPreview) {
            sequenceColorPreview.style.backgroundColor = sequenceColorInput.value;
        }
    });
    // Ẩn/hiện form cài đặt trang sách dựa trên trạng thái enableBook
    const bookSettingsSection = document.getElementById('bookSettingsSection');
    if (settings.enableBook) {
        bookSettingsSection.style.display = 'block';
    } else {
        bookSettingsSection.style.display = 'none';
    }

    if (window.pricingCalculator) {
        window.pricingCalculator.updateFromSettings(settings);
    }




    const fieldsToWatch = [
        'backgroundMusic',
        'enableBook',
        'enableHeart'
    ];

    fieldsToWatch.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('change', function () {
                updatePricingFromModal();
            });
        }
    });

    // Thêm event listener riêng cho checkbox isSave
    const isSaveField = document.getElementById('isSave');
    if (isSaveField) {
        isSaveField.addEventListener('change', function () {
            // Lưu trạng thái mới nhất
            window.lastIsSaveState = this.checked;
            updatePricingFromModal();
            updateExpireDateDisplay();
        });
    }

    // Cập nhật giá khi populate modal
    updatePricingFromModal();
    updateExpireDateDisplay();
    // Fix space input issue
    const allInputs = document.querySelectorAll('.modal-content input[type="text"], .modal-content textarea');
    allInputs.forEach(input => {
        input.addEventListener('keydown', function (e) {
            if (e.key === ' ' || e.code === 'Space') {
                e.stopPropagation();
                return true;
            }
        });

        input.addEventListener('input', function (e) {
            e.stopPropagation();
        });
    });
}
function addNewPage() {
    if (settings.pages.length < 20) {
        // ✅ Lưu dữ liệu form trước khi thêm trang mới
        saveFormDataToSettings();

        // Thêm trang mới
        settings.pages.push({ image: '', content: '' });

        // Populate modal lại
        populateModal();

        // Cập nhật pricing
        updatePricingFromModal();
    }
}

function removePage(index) {
    if (settings.pages.length > 1) {
        // ✅ Save form data before deleting a page
        saveFormDataToSettings();

        // Delete the page
        settings.pages.splice(index, 1);

        // Populate modal lại
        populateModal();

        // Cập nhật pricing
        updatePricingFromModal();
    }
}


// Revise handleColorThemeChange to save the selected theme
function handleColorThemeChange(selectedTheme) {
    const matrixColor1Input = document.getElementById('matrixColor1');
    const matrixColor2Input = document.getElementById('matrixColor2');
    const sequenceColorInput = document.getElementById('sequenceColor');
    const customColorSection = document.getElementById('customColorSection');
    const sequenceColorSection = document.getElementById('sequenceColorSection');
    
    // Save the selected theme to settings
    settings.colorTheme = selectedTheme;
    
    // Update the active state of the buttons
    const allButtons = document.querySelectorAll('.color-theme-btn');
    allButtons.forEach(btn => btn.classList.remove('active'));
    
    const activeButton = document.querySelector(`[data-theme="${selectedTheme}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Show/hide the custom color section
    if (selectedTheme === 'custom') {
        customColorSection.style.display = 'flex';
        sequenceColorSection.style.display = 'block';
    } else {
        customColorSection.style.display = 'none';
        sequenceColorSection.style.display = 'none';
        
        // Only update colors if not custom
        const theme = colorThemes[selectedTheme];
        if (theme && matrixColor1Input && matrixColor2Input && sequenceColorInput) {
            matrixColor1Input.value = theme.matrixColor1;
            matrixColor2Input.value = theme.matrixColor2;
            sequenceColorInput.value = theme.sequenceColor;
            
            // Update settings with new colors
            settings.matrixColor1 = theme.matrixColor1;
            settings.matrixColor2 = theme.matrixColor2;
            settings.sequenceColor = theme.sequenceColor;
            
            // Trigger change event to update preview if available
            matrixColor1Input.dispatchEvent(new Event('input'));
            matrixColor2Input.dispatchEvent(new Event('input'));
            sequenceColorInput.dispatchEvent(new Event('input'));
        }
    }
}




// Add event listeners for custom color inputs to automatically switch to custom theme
function addCustomColorListeners() {
    const matrixColor1Input = document.getElementById('matrixColor1');
    const matrixColor2Input = document.getElementById('matrixColor2');
    const sequenceColorInput = document.getElementById('sequenceColor');
    
    if (matrixColor1Input) {
        matrixColor1Input.addEventListener('input', function() {
            // Only update settings when in custom mode
            if (settings.colorTheme === 'custom') {
                settings.matrixColor1 = this.value;
                
                // Update preview if available
                const matrixColor1Preview = document.getElementById('matrixColor1Preview');
                if (matrixColor1Preview) {
                    matrixColor1Preview.style.backgroundColor = this.value;
                }
            }
        });
    }
    
    if (matrixColor2Input) {
        matrixColor2Input.addEventListener('input', function() {
            if (settings.colorTheme === 'custom') {
                settings.matrixColor2 = this.value;
                
                const matrixColor2Preview = document.getElementById('matrixColor2Preview');
                if (matrixColor2Preview) {
                    matrixColor2Preview.style.backgroundColor = this.value;
                }
            }
        });
    }
    
    if (sequenceColorInput) {
        sequenceColorInput.addEventListener('input', function() {
            if (settings.colorTheme === 'custom') {
                settings.sequenceColor = this.value;
                
                const sequenceColorPreview = document.getElementById('sequenceColorPreview');
                if (sequenceColorPreview) {
                    sequenceColorPreview.style.backgroundColor = this.value;
                }
            }
        });
    }
}

// Revise detectCurrentColorTheme to prioritize the saved colorTheme
function detectCurrentColorTheme() {
    // If a colorTheme is already saved, use it
    if (settings.colorTheme) {
        return settings.colorTheme;
    }
    
    const matrixColor1Input = document.getElementById('matrixColor1');
    const matrixColor2Input = document.getElementById('matrixColor2');
    const sequenceColorInput = document.getElementById('sequenceColor');
    
    if (matrixColor1Input && matrixColor2Input && sequenceColorInput) {
        const currentMatrix1 = matrixColor1Input.value;
        const currentMatrix2 = matrixColor2Input.value;
        const currentSequence = sequenceColorInput.value;
        
        // Find the most suitable color theme (including custom)
        for (const [themeKey, theme] of Object.entries(colorThemes)) {
            if (theme.matrixColor1 === currentMatrix1 && 
                theme.matrixColor2 === currentMatrix2 && 
                theme.sequenceColor === currentSequence) {
                return themeKey;
            }
        }
    }
    
    // Default to 'pink' if not found
    return 'pink';
}
function saveFormDataToSettings() {
    try {
        // Lưu các settings cơ bản
        const musicSelect = document.getElementById('backgroundMusic');
        if (musicSelect) settings.music = musicSelect.value;

        const countdownSelect = document.getElementById('countdownTime');
        if (countdownSelect) settings.countdown = parseInt(countdownSelect.value) || 3;

        const enableBookSelect = document.getElementById('enableBook');
        if (enableBookSelect) settings.enableBook = enableBookSelect.value === 'true';

        const enableHeartSelect = document.getElementById('enableHeart');
        if (enableHeartSelect) settings.enableHeart = enableHeartSelect.value === 'true';

        const isSaveCheckbox = document.getElementById('isSave');
        if (isSaveCheckbox) settings.isSave = isSaveCheckbox.checked;

        const giftSelect = document.getElementById('giftImage');
        if (giftSelect) settings.gift = giftSelect.value;

        const matrixTextInput = document.getElementById('matrixText');
        if (matrixTextInput) settings.matrixText = matrixTextInput.value;

        const matrixColor1Input = document.getElementById('matrixColor1');
        if (matrixColor1Input) settings.matrixColor1 = matrixColor1Input.value;

        const matrixColor2Input = document.getElementById('matrixColor2');
        if (matrixColor2Input) settings.matrixColor2 = matrixColor2Input.value;

        const sequenceInput = document.getElementById('sequenceText');
        if (sequenceInput) settings.sequence = sequenceInput.value;

        const sequenceColorInput = document.getElementById('sequenceColor');
        if (sequenceColorInput) settings.sequenceColor = sequenceColorInput.value;

        // Lưu mẫu màu đã chọn
        const activeButton = document.querySelector('.color-theme-btn.active');
        if (activeButton) {
            settings.colorTheme = activeButton.getAttribute('data-theme');
        }

        // Lưu dữ liệu các trang...
        settings.pages.forEach((page, index) => {
            const fileInput = document.getElementById(`pageImage${index}`);
            const contentInput = document.getElementById(`pageContent${index}`);

            if (fileInput && fileInput.files.length > 0) {
                const newImageURL = URL.createObjectURL(fileInput.files[0]);
                settings.pages[index].image = newImageURL;
                settings.pages[index].selectedFile = fileInput.files[0];
            }

            if (contentInput) {
                settings.pages[index].content = contentInput.value;
            }
        });

    } catch (error) {
        console.error('Error saving form data:', error);
    }
}

// Function to update price from modal
function updatePricingFromModal() {
    if (window.pricingCalculator) {
        const currentModalSettings = {
            music: document.getElementById('backgroundMusic')?.value || './music/happybirtday_uia.mp3',
            enableBook: document.getElementById('enableBook')?.value === 'true',
            enableHeart: document.getElementById('enableHeart')?.value === 'true',
            isSave: document.getElementById('isSave')?.checked || false,
            pages: settings.pages || []
        };

        window.pricingCalculator.updateFromSettings(currentModalSettings);
    }
}

// Function to update the display of the expiration date
function updateExpireDateDisplay() {
    const isSaveCheckbox = document.getElementById('isSave');
    const expireDateElement = document.getElementById('expireDate');
    const expireContainer = expireDateElement?.parentElement;
    
    if (isSaveCheckbox && expireDateElement && expireContainer) {
        if (isSaveCheckbox.checked) {
            expireDateElement.textContent = t('saveForever');
            expireDateElement.style.color = '#4caf50'; // Màu xanh lá
            expireContainer.innerHTML = `⏳ ${t('expireText')} <b id="expireDate" style="color: #4caf50;">${t('saveForever')}</b>`;
        } else {
            expireDateElement.textContent = t('thirtyDays');
            expireDateElement.style.color = ''; // Màu mặc định
            expireContainer.innerHTML = `⏳ ${t('expireText')} <b id="expireDate">${t('thirtyDays')}</b>`;
        }
    }
}
function createPages() {

    book.innerHTML = '';
    const totalLogicalPages = pages.length;
    const totalPhysicalPages = Math.ceil(totalLogicalPages / 2);

    for (let physicalPageIndex = 0; physicalPageIndex < totalPhysicalPages; physicalPageIndex++) {
        const page = document.createElement('div');
        page.classList.add('page');
        page.dataset.page = physicalPageIndex;

        const frontLogicalIndex = physicalPageIndex * 2;
        const backLogicalIndex = frontLogicalIndex + 1;


        const front = document.createElement('div');
        front.classList.add('page-front');

        if (frontLogicalIndex < pages.length && pages[frontLogicalIndex]) {
            const frontPageData = pages[frontLogicalIndex];

            if (frontPageData.image) {
                const frontImg = document.createElement('img');
                frontImg.src = frontPageData.image;
                frontImg.onerror = function () {
                    const placeholderText = frontLogicalIndex === 0 ? 'Book Cover' : `Page ${frontLogicalIndex + 1}`;
                    this.src = createPlaceholderImage(placeholderText);
                };
                front.appendChild(frontImg);
                
                // Add text overlay if content exists
                if (frontPageData.content) {
                    const textDiv = document.createElement('div');
                    textDiv.classList.add('page-text');
                    textDiv.textContent = frontPageData.content;
                    front.appendChild(textDiv);
                }
            } else if (frontPageData.content) {
                // Show text content only
                front.classList.add('text-page');
                const textDiv = document.createElement('div');
                textDiv.classList.add('page-text');
                textDiv.textContent = frontPageData.content;
                front.appendChild(textDiv);
            } else {
                front.classList.add('empty-page');
               front.textContent = t('emptyPage');
            }
        } else {
            front.classList.add('empty-page');
           front.textContent = t('emptyPage');
        }

        const back = document.createElement('div');
        back.classList.add('page-back');

        if (backLogicalIndex < pages.length && pages[backLogicalIndex]) {
            const backPageData = pages[backLogicalIndex];

            if (backPageData.image) {
                const backImg = document.createElement('img');
                backImg.src = backPageData.image;
                backImg.onerror = function () {
                    const placeholderText = `Page ${backLogicalIndex + 1}`;
                    this.src = createPlaceholderImage(placeholderText);
                };
                back.appendChild(backImg);
                
                // Add text overlay if content exists
                if (backPageData.content) {
                    const textDiv = document.createElement('div');
                    textDiv.classList.add('page-text');
                    textDiv.textContent = backPageData.content;
                    back.appendChild(textDiv);
                }
            } else if (backPageData.content) {
                // Show text content only
                back.classList.add('text-page');
                const textDiv = document.createElement('div');
                textDiv.classList.add('page-text');
                textDiv.textContent = backPageData.content;
                back.appendChild(textDiv);
            } else {
                back.classList.add('empty-page');
                back.textContent = t('emptyPage');
            }
        } else {
            const endImg = document.createElement('img');
            endImg.src = './image/theend.jpg';
            endImg.onerror = function () {
                back.classList.add('empty-page');
               back.textContent = t('endOfBook');
            };
            back.appendChild(endImg);
        }

        page.appendChild(front);
        page.appendChild(back);
        book.appendChild(page);

        page.addEventListener('click', (e) => {
            if (!isFlipping) {
                const rect = page.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const pageWidth = rect.width;
                if (clickX < pageWidth / 2 && page.classList.contains('flipped')) {
                    prevPage();
                } else if (clickX >= pageWidth / 2 && !page.classList.contains('flipped')) {
                    nextPage();
                }
            }
        });
    }

    photoUrls = pages.filter(page => page.image).map(page => page.image);
    
    // ✅ FIX: Calculate z-index for all pages after creation
    if (typeof calculatePageZIndexes === 'function') {
        calculatePageZIndexes();
    }
}


// Fix DOMContentLoaded: DO NOT call startWebsite here anymore
document.addEventListener('DOMContentLoaded', function () {
    const book = document.getElementById('book');
    const bookContainer = document.querySelector('.book-container');
    if (book) {
        book.style.display = 'none';
        book.classList.remove('show');
    }
    if (bookContainer) {
        bookContainer.style.display = 'none';
        bookContainer.classList.remove('show');
    }

    createPages();
    // ✅ Initialize settings before initializing pricing
    const websiteId = window.birthdayAPI?.getWebsiteIdFromURL();
    if (websiteId) {
        const googleAuthContainer = document.getElementById('googleAuthContainer');
        if (googleAuthContainer) googleAuthContainer.style.display = 'none';
        loadWebsiteFromServer();
    } else {
        initializeDefaultSettings();
        applyLoadedSettings();
        if (window.initializePricingCalculator) {
            window.initializePricingCalculator();
        }
        if (window.pricingCalculator) {
            window.pricingCalculator.updatePricing();
        }
        window.isWebsiteReady = true;
        // DO NOT call startWebsite here, it will be called in loadWebsiteFromServer or after applyLoadedSettings
    }
});
// Create loading UI
function createLoadingUI() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loadingOverlay';
 
loadingOverlay.innerHTML = `
    <div class="loading-content">
        <div class="loading-spinner"></div>
        <h2>${t('loading')}</h2>
        <p>${t('waitingIsHappiness')}</p>
    </div>
`;


    // Add CSS for loading UI
    const loadingStyles = document.createElement('style');
    loadingStyles.textContent = `
        #loadingOverlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 99999;
            animation: fadeIn 0.3s ease-in-out;
        }
        
        .loading-content {
            text-align: center;
            color: white;
            padding: 20px;
        }
        
        .loading-spinner {
            width: 30px;
            height: 30px;
            border: 4px solid rgba(51, 10, 58, 0.3);
            border-top: 4px solid #fff;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 20px;
        }
        
      .loading-content h2 {
        font-size: 24px;
        margin-bottom: 10px;
        font-family: 'Pacifico', Arial, sans-serif;
    }
    
    .loading-content p {
        font-size: 16px;
        opacity: 0.8;
        font-family: 'Pacifico', Arial, sans-serif;
    }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    `;

    document.head.appendChild(loadingStyles);
    document.body.appendChild(loadingOverlay);

    return loadingOverlay;
}

// Remove loading UI
function removeLoadingUI() {
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        loadingOverlay.style.animation = 'fadeOut 0.3s ease-in-out';
        setTimeout(() => {
            loadingOverlay.remove();
        }, 300);
    }
}

window.isWebsiteReady = false;
// Function to load data from server
// Fix enableBook logic error
async function loadWebsiteFromServer() {
    const websiteId = window.birthdayAPI.getWebsiteIdFromURL();

    if (!websiteId) {
        initializeDefaultSettings();
        applyLoadedSettings();
        window.isWebsiteReady = true;
        if (typeof startWebsite === 'function') tryStartWebsiteWhenLandscape();;
        return;
    }


    // Hide settings button, settings hint, and pricing UI when loading from server
    const settingsButton = document.getElementById('settingsButton');
    const settingsHint = document.getElementById('settingsHint');
    const pricingContainer = document.getElementById('pricingContainer');

    if (settingsButton) {
        settingsButton.style.display = 'none';
    }

    if (settingsHint) {
        settingsHint.style.display = 'none';
    }

    if (pricingContainer) {
        pricingContainer.style.display = 'none';
    }

//     // Hide the language switch button here
const languageSwitchBtn = document.getElementById('langSwitchBtn');
if (languageSwitchBtn) {
    languageSwitchBtn.style.display = 'none';
}

    // Show loading UI
    const loadingOverlay = createLoadingUI();

    try {
        // Call API to get data
        const result = await window.birthdayAPI.getBirthdayWebsiteByWebsiteId(websiteId);

        if (result.success && result.data) {

            // Update settings from server data
            const serverSettings = result.data.settings;

            // Check status and hide copyright if PAID
            const status = result.data.status;
            const copyrightElement = document.querySelector('.copyright');

            if (status === 'PAID' && copyrightElement) {
                copyrightElement.style.display = 'none';
            } else {
            }

            // ✅ Fix enableBook and enableHeart logic
            window.settings = {
                music: serverSettings.music || './music/happybirtday_uia.mp3',
                countdown: serverSettings.countdown || 3,
                matrixText: serverSettings.matrixText || 'HAPPYBIRTHDAY',
                matrixColor1: serverSettings.matrixColor1 || '#ffb6c1',
                matrixColor2: serverSettings.matrixColor2 || '#ffc0cb',
                sequence: serverSettings.sequence || 'HAPPY|BIRTHDAY|TO|YOU|❤',
                sequenceColor: serverSettings.sequenceColor || '#d39b9b',
                gift: serverSettings.gift || '',
                // ✅ Fix boolean logic - check the value correctly
                enableBook: serverSettings.enableBook === true,
                enableHeart: serverSettings.enableHeart === true,
                isSave: serverSettings.isSave === true || false, // Backward compatibility
                pages: serverSettings.pages || []
            };

            // Update pages global variable
            pages = window.settings.pages;


            // Wait a bit for the user to see loading (better UX)
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Remove loading UI
            removeLoadingUI();

            resetWebsiteState();
            window.isWebsiteReady = true;
            if (typeof startWebsite === 'function') tryStartWebsiteWhenLandscape();;


        } else {
            throw new Error(result.error || 'Cannot load data from server');
        }

    } catch (error) {

        initializeDefaultSettings();
        applyLoadedSettings();
        window.isWebsiteReady = true;
        if (typeof startWebsite === 'function') tryStartWebsiteWhenLandscape();;
    }
}

// Update event listener for apply settings to use the common reset function
applySettingsButton.addEventListener('click', () => {
    // Check enableBook first
    const enableBookSelect = document.getElementById('enableBook');
    const isBookEnabled = enableBookSelect ? enableBookSelect.value === 'true' : false;
    
    // Check if book is enabled but has no pages or all pages are empty
    if (isBookEnabled) {
        if (settings.pages.length === 0) {
            alert('❌ Book needs pages!\n\nPlease add at least 1 page to the book or disable the book feature.');
            return;
        }
        
        // // Check if at least one page has an image
        // const hasValidPage = settings.pages.some(page => page.image && page.image.trim() !== '');
        // if (!hasValidPage) {
        //     alert('❌ Sách cần có trang!\n\nVui lòng thêm ít nhất 1 trang có ảnh cho sách hoặc tắt tính năng sách.');
        //     return;
        // }
    }
    
    // Check page logic before applying
    const totalPages = settings.pages.length;

    if (totalPages > 1 && totalPages % 2 === 0) {
        alert(`❌ ${t('invalidPageStructure')}\n\n${t('currentPages', {total: totalPages})}\n${t('bookStructureGuide')}\n\n${t('pleaseAddOrRemovePage')}`);

        return;
    }

    // Update settings from the form
    settings.music = document.getElementById('backgroundMusic').value;
    settings.countdown = parseInt(document.getElementById('countdownTime').value) || 3;
    settings.matrixText = document.getElementById('matrixText').value || 'HAPPYBIRTHDAY';
    settings.matrixColor1 = document.getElementById('matrixColor1').value;
    settings.matrixColor2 = document.getElementById('matrixColor2').value;
    settings.sequence = document.getElementById('sequenceText').value || 'HAPPY|BIRTHDAY|MY|CUTE|LITTLE|HINATA|❤';
    settings.sequenceColor = document.getElementById('sequenceColor').value;
    settings.gift = document.getElementById('giftImage').value;
    
    // Save the selected color theme
    const activeButton = document.querySelector('.color-theme-btn.active');
    if (activeButton) {
        settings.colorTheme = activeButton.getAttribute('data-theme');
    }

    settings.enableBook = document.getElementById('enableBook').value === 'true';
    settings.enableHeart = document.getElementById('enableHeart').value === 'true';
    settings.isSave = document.getElementById('isSave')?.checked || false;
    
    // Update global state
    window.lastIsSaveState = settings.isSave;

    const newPages = [];
    settings.pages.forEach((page, index) => {
        const fileInput = document.getElementById(`pageImage${index}`);
        const contentInput = document.getElementById(`pageContent${index}`);

        const newPage = {};
        if (fileInput.files.length > 0) {
            newPage.image = URL.createObjectURL(fileInput.files[0]);
        } else {
            newPage.image = page.image;
        }
        if (contentInput) {
            newPage.content = contentInput.value;
        }
        newPages.push(newPage);
    });
    settings.pages = newPages;

    // Update pricing
    if (window.pricingCalculator) {
        window.pricingCalculator.updateFromSettings(settings);
    }

    // Update window.settings
    window.settings = settings;

    // Use the common reset function
    resetWebsiteState();

    stopMusicPreview();

    // Close modal
    settingsModal.style.display = 'none';

    // Ensure website is started
    if (typeof startWebsite === 'function') {
        tryStartWebsiteWhenLandscape();;
    }
});

function isAndroid() {
    return /android/i.test(navigator.userAgent);
}
const fullscreenBtn = document.getElementById('fullscreenBtn');
fullscreenBtn.style.zIndex = 9009999;

function updateFullscreenBtnVisibility() {
    if (
        fullscreenBtn &&
        isAndroid() &&
        !document.fullscreenElement // Chỉ hiện nếu chưa fullscreen
    ) {
        fullscreenBtn.style.display = 'block';

        // Ẩn nút sau 3 giây nếu chưa bấm
        if (fullscreenBtn.hideTimeout) clearTimeout(fullscreenBtn.hideTimeout);
        fullscreenBtn.hideTimeout = setTimeout(() => {
            fullscreenBtn.style.display = 'none';
        }, 2500);
    } else if (fullscreenBtn) {
        fullscreenBtn.style.display = 'none';
        if (fullscreenBtn.hideTimeout) clearTimeout(fullscreenBtn.hideTimeout);
    }
}

updateFullscreenBtnVisibility();

fullscreenBtn.onclick = function () {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            elem.requestFullscreen();
        }
    } else {
        alert(t('fullscreenNotSupported'));
    }
    // Ẩn nút ngay khi bấm
    fullscreenBtn.style.display = 'none';
    if (fullscreenBtn.hideTimeout) clearTimeout(fullscreenBtn.hideTimeout);
};

// Ẩn nút nếu user chuyển sang fullscreen bằng cách khác
document.addEventListener('fullscreenchange', function () {
    updateFullscreenBtnVisibility();
});
function isLandscapeMode() {
    return window.innerWidth > window.innerHeight;
}

function tryStartWebsiteWhenLandscape() {
    if (window.isWebsiteReady && typeof startWebsite === 'function') {
        if (isLandscapeMode()) {
            startWebsite();
        } else {
            // Đợi đến khi landscape mới start
            window.addEventListener('resize', function onResize() {
                if (isLandscapeMode()) {
                    startWebsite();
                    window.removeEventListener('resize', onResize);
                }
            });
        }
    }
}
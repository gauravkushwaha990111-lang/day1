// English-only translations for Hinata's Birthday Website
// Created for you

const translations = {
    en: {
        title: "Happy Birthday Hinata 🎁",
        description: "A special birthday surprise for Hinata! Click to see the special message!",
        login: "Sign in with Google",
        logout: "Logout",
        settings: "Website Settings",
        music: "Music Settings",
        backgroundMusic: "Background Music:",
        countdown: "Countdown Settings",
        countdownTime: "Countdown Time:",
        matrix: "Matrix Rain Effect Settings",
        matrixText: "Matrix main text:",
        matrixColor1: "Matrix color 1:",
        matrixColor2: "Matrix color 2:",
        sequence: "Main Text Settings",
        sequenceText: "Main text content:",
        sequenceColor: "Main text color:",
        gift: "Animated Image Settings",
        giftImage: "Animated Image (optional):",
        enableBook: "Show book:",
        book: "Book Page Settings",
        enableHeart: "Show heart effect:",
        note: "⏳ Enjoy this special birthday website!",
        follow: "💝 This special birthday website was lovingly created for you",
        apply: "Apply Settings",
        copyright: 'Made with 💕 for Hinata\'s Birthday',
        fullscreen: "Fullscreen",
        on: "On",
        off: "Off",
        sec3: "3 seconds",
        sec5: "5 seconds",
        sec10: "10 seconds",
        noGif: "None",
        colorTheme: "Choose color:",
        settingsHint: "click here to customize settings",
        pinkTheme: "Sweet Pink",
       blueTheme: "Cool Blue",
        purpleTheme: "Dreamy Purple",
        customTheme: "Custom Color",
        noteSequence: "Note: Please separate words with | and don't make a line too long",
        noteExpire: "⏳ <b>Note:</b> Enjoy this special birthday surprise! 🎉",
        followNote: "💝 This special birthday website was lovingly created for you",
        notVietnamWarning: '🎉 Happy Birthday Hinata! Wishing you a wonderful day filled with joy and love! 💕',
        pageTitleCover: "Page {num} (Cover)",
        pageTitle: "Page {num}",
        imageLabel: "Image:",
        coverPlaceholder: "Book Cover",
        pagePlaceholder: "Page {num}",
        noImageAlt: "No image yet - {placeholder}",
        contentLabel: "Content:",
        contentPlaceholder: "Enter content for page {num}",
        addNewPage: "➕ Add New Page",
        emptyPage: "Empty page",
        endOfBook: "End of book",
        loading: "Loading...",
        waitingIsHappiness: "Waiting is happiness...",
        invalidPageStructure: "Invalid page structure!",
        currentPages: "Currently there are {total} pages.",
        bookStructureGuide: "A book must have an odd number of total pages to look correct (Cover + pages + Back cover).",
        pleaseAddOrRemovePage: "Please add or remove 1 page.",
        saveForever: "Save permanently",
        thirtyDays: "30 Days",
        expireText: "Expires in:",
        pricingTitle: "Pricing",
        voucher: "Voucher",
        voucherApplied: "Voucher {code} applied (-{discount}%)",
        needLoginVoucher: "Please login to view vouchers",
        noVoucher: "No vouchers available",
        tip: "Tip amount:",
        paymentMethod: "Payment Method",
        bankPayment: "Bank Transfer",
        bankPaymentDesc: "Transfer via bank/Momo/ZaloPay",
        paypalPayment: "PayPal",
        paypalPaymentDesc: "Pay via PayPal account",
        total: "Total:",
        createWebsite: "Create Website",
        payAndCreate: "Pay & Create",
        defaultConfig: "Default configuration (Free)",
        needLogin: "Please login first!",
        free: "Free",
        createSuccess: "Website created successfully!",
        price: "Price:",
        shareLink: "Share Link:",
        copyLink: "Copy Link",
        viewWebsite: "View Website",
        heartQr: "Heart QR",
        close: "Close",
        thanks: "Thanks for using!",
        tiktokBtn: "Follow on TikTok",
        heartQrCopy: "Link copied! Opening Heart QR generator...",
        copySuccess: "Link copied to clipboard!",
        fullscreenNotSupported: "Fullscreen is not supported on your browser."
    }
};

function setLanguage(lang) {
    // Always use English
    lang = 'en';
    document.documentElement.lang = lang;
    
    // Set title and meta
    document.title = translations.en.title;
    document.querySelector('meta[name="description"]').setAttribute('content', translations.en.description);

    // Update all elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations.en[key]) {
            if (
                translations.en[key].includes('<b>') ||
                translations.en[key].includes('<a')
            ) {
                el.innerHTML = translations.en[key];
            } else {
                el.innerText = translations.en[key];
            }
        }
    });

    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations.en[key]) {
            el.setAttribute('placeholder', translations.en[key]);
        }
    });
}

// Simplified - no language switching needed
function switchLanguage() {
    // Do nothing - always English
    return;
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    setLanguage('en');
    // Remove language switch button if it exists
    const langBtn = document.getElementById('langSwitchBtn');
    if (langBtn) langBtn.remove();
});

function t(key, vars = {}) {
    // Always use English
    let str = (translations.en && translations.en[key]) || key;
    Object.keys(vars).forEach(k => {
        str = str.replace(`{${k}}`, vars[k]);
    });
    return str;
}
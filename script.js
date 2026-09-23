/* ========================================
   Romantic Gift Website - JavaScript
   Created for Raghad with love
   ======================================== */

// Global Variables
const startDate = new Date('2025-01-02T00:00:00');
let currentPhoto = 0;
let isPlaying = false;
let messageIndex = 0;

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const mainContent = document.getElementById('mainContent');
const enterButton = document.getElementById('enterButton');
const fallingHearts = document.getElementById('fallingHearts');
const playBtn = document.getElementById('playBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const repeatBtn = document.getElementById('repeatBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const albumRotation = document.getElementById('albumRotation');
const lyricsContainer = document.getElementById('lyricsContainer');
const lyricLines = document.querySelectorAll('.lyric-line');
const typedMessage = document.getElementById('typedMessage');
const loveButton = document.getElementById('loveButton');
const prevPhoto = document.getElementById('prevPhoto');
const nextPhoto = document.getElementById('nextPhoto');
const photoContainer = document.getElementById('photoContainer');
const photoCounter = document.getElementById('photoCounter');
const popup = document.getElementById('popup');
const closePopup = document.getElementById('closePopup');
const shareBtn = document.getElementById('shareBtn');
const saveBtn = document.getElementById('saveBtn');
const printBtn = document.getElementById('printBtn');
const audioPlayer = document.getElementById('audioPlayer');

// Love Message Text
const loveMessage = `إلى أغلى الناس، إلى حبيبتي صفا

منذ لحظة لقياكِ، عرفتُ أنكِ كل الدنيا بالنسبة لي.
أنتِ نبض قلبي، وأنتِ سر ابتسامتي.
كل لحظة معكِ هي أجمل هدية أتلقاها.
أحبكِ حباً لا ينتهي، وأتمنى أن أكون بجانبكِ إلى الأبد.

مع كل نبضة، أحبكِ أكثر.
أنتِ أجمل ما حدث لي في هذه الحياة.
صفاوتي ... احبج`;

// ========================================
// Initialize Functions
// ========================================

// Create falling hearts
function createFallingHearts() {
    const heartSymbols = ['❤️', '💕', '💗', '💖', '💘', '💝', '❤️‍🔥', '💞'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
            heart.style.opacity = Math.random() * 0.5 + 0.5;
            fallingHearts.appendChild(heart);
            
            // Remove and recreate heart after animation
            setTimeout(() => {
                heart.remove();
                createSingleHeart();
            }, 7000);
        }, i * 200);
    }
}

function createSingleHeart() {
    const heartSymbols = ['❤️', '💕', '💗', '💖', '💘', '💝', '❤️‍🔥', '💞'];
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
    heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
    heart.style.opacity = Math.random() * 0.5 + 0.5;
    fallingHearts.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
        createSingleHeart();
    }, 7000);
}

// Enter button click handler
enterButton.addEventListener('click', () => {
    loginScreen.classList.add('hidden');
    setTimeout(() => {
        loginScreen.style.display = 'none';
        mainContent.classList.add('visible');
        
        // Start the typing effect after entering
        setTimeout(startTypingEffect, 500);
        
        // Start love duration counter
        updateLoveDuration();
        setInterval(updateLoveDuration, 1000);
        
        // Start auto-sliding photos
        startPhotoSlider();
    }, 800);
});

// ========================================
// Music Player Functions
// ========================================

playBtn.addEventListener('click', togglePlay);

function togglePlay() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        albumRotation.classList.add('playing');
        
        // Try to play the audio
        const playPromise = audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log("Audio playback failed:", error);
            });
        }
        
        // Start lyrics sync
        startLyricsSync();
        
        // Start progress update
        startProgressUpdate();
    } else {
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        albumRotation.classList.remove('playing');
        audioPlayer.pause();
    }
}

let progressInterval;

function startProgressUpdate() {
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        if (audioPlayer.duration) {
            const currentTime = audioPlayer.currentTime;
            const duration = audioPlayer.duration;
            const progressPercent = (currentTime / duration) * 100;
            progressFill.style.width = progressPercent + '%';
            
            // Update time display
            const minutes = Math.floor(currentTime / 60);
            const seconds = Math.floor(currentTime % 60);
            currentTimeEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

prevBtn.addEventListener('click', () => {
    audioPlayer.currentTime = 0;
    updateProgress();
});

nextBtn.addEventListener('click', () => {
    audioPlayer.currentTime = 0;
    updateProgress();
});

repeatBtn.addEventListener('click', () => {
    repeatBtn.classList.toggle('active');
    audioPlayer.loop = !audioPlayer.loop;
});

function updateProgress() {
    if (audioPlayer.duration) {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progressPercent = (currentTime / duration) * 100;
        progressFill.style.width = progressPercent + '%';
    }
}

// Progress bar click
progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    audioPlayer.currentTime = clickPosition * audioPlayer.duration;
    updateProgress();
});

// Audio ended event
audioPlayer.addEventListener('ended', () => {
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
    albumRotation.classList.remove('playing');
    isPlaying = false;
});

// Audio loaded metadata
audioPlayer.addEventListener('loadedmetadata', () => {
    const duration = audioPlayer.duration;
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    durationEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

// ========================================
// تزامن الكلمات مع الأغنية - Improved Lyrics Sync
// ========================================

// إخفاء كل الكلمات أولاً
lyricLines.forEach(line => {
    line.style.display = 'none';
});

// إضافة رسالة المقدمة الموسيقية
const introMessage = document.createElement('div');
introMessage.className = 'intro-message';
introMessage.innerHTML = '🎵 مقدمة موسيقية... انتظر قليلاً 🎵';
introMessage.style.cssText = 'text-align: center; color: #FFD700; font-size: 18px; margin: 20px 0;';
lyricsContainer.insertBefore(introMessage, lyricLines[0]);

// تحديث الكلمات حسب وقت الأغنية
function startLyricsSync() {
    audioPlayer.addEventListener('timeupdate', function() {
        const currentTime = audioPlayer.currentTime;
        
        // إخفاء رسالة المقدمة بعد 7 ثواني
        if (introMessage && currentTime > 25) {
            introMessage.style.display = 'none';
        }
        
        // إظهار الكلمات من 25 ثانية
        if (currentTime >= 25) {
            lyricLines.forEach(line => {
                const lineTime = parseFloat(line.dataset.time);
                
                // عرض كل كلمة لمدة 3 ثواني (من وقتها حتى وقتها +3)
                if (currentTime >= lineTime && currentTime < lineTime + 3) {
                    line.style.display = 'block';
                    line.style.opacity = '1';
                    line.classList.add('active-lyric');
                } else {
                    line.style.display = 'none';
                    line.classList.remove('active-lyric');
                }
            });
        }
    });
    
    // عند بداية الأغنية
    audioPlayer.addEventListener('play', function() {
        if (audioPlayer.currentTime < 7) {
            introMessage.style.display = 'block';
        }
    });
}

// ========================================
// Typing Effect for Love Message
// ========================================

function startTypingEffect() {
    if (messageIndex < loveMessage.length) {
        typedMessage.textContent += loveMessage.charAt(messageIndex);
        messageIndex++;
        setTimeout(startTypingEffect, 80);
    }
}

// Love button click handler
loveButton.addEventListener('click', () => {
    popup.classList.add('visible');
});

closePopup.addEventListener('click', () => {
    popup.classList.remove('visible');
});

popup.addEventListener('click', (e) => {
    if (e.target === popup) {
        popup.classList.remove('visible');
    }
});

// ========================================
// Photo Slider Functions
// ========================================

function updatePhotoSlider() {
    photoContainer.style.transform = `translateX(-${currentPhoto * 100}%)`;
    photoCounter.textContent = `${currentPhoto + 1} / 5`;
}

prevPhoto.addEventListener('click', () => {
    currentPhoto--;
    if (currentPhoto < 0) {
        currentPhoto = 4;
    }
    updatePhotoSlider();
});

nextPhoto.addEventListener('click', () => {
    currentPhoto++;
    if (currentPhoto > 4) {
        currentPhoto = 0;
    }
    updatePhotoSlider();
});

function startPhotoSlider() {
    setInterval(() => {
        currentPhoto++;
        if (currentPhoto > 4) {
            currentPhoto = 0;
        }
        updatePhotoSlider();
    }, 5000);
}

// ========================================
// Love Duration Counter
// ========================================

function updateLoveDuration() {
    const now = new Date();
    const diff = now - startDate;
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// ========================================
// Action Buttons
// ========================================

shareBtn.addEventListener('click', () => {
    if (navigator.share) {
        navigator.share({
            title: 'هدية حب لـ شهد',
            text: 'صنع بكل حب لـ شهد 💕',
            url: window.location.href
        });
    } else {
        alert('تم نسخ الرابط! شاركه مع من تحب');
    }
});

saveBtn.addEventListener('click', () => {
    alert('لحفظ الصفحة: Ctrl+S أو Command+S');
});

printBtn.addEventListener('click', () => {
    window.print();
});

// ========================================
// Initialize on Page Load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    createFallingHearts();
});

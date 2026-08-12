let appData = {};

async function loadAppData() {
    try {
        const [aboutRes, projectsRes, techstackRes, aboutosRes] = await Promise.all([
            fetch('data/about.json'),
            fetch('data/projects.json'),
            fetch('data/techstack.json'),
            fetch('data/aboutos.json')
        ]);
        appData.about = await aboutRes.json();
        appData.projects = await projectsRes.json();
        appData.techstack = await techstackRes.json();
        appData.aboutos = await aboutosRes.json();
    } catch (err) {
        console.error('Failed to load app data:', err);
        appData.about = {
            name: 'User',
            bio: '',
            avatarIcon: 'assets/svg/about.svg',
            skills: []
        };
        appData.projects = [];
        appData.techstack = [];
        appData.aboutos = {
            title: 'DenjiOS',
            version: 'v1.0',
            description: 'A desktop‑style portfolio interface.',
            footer: 'Built with<img class="love" src="assets/svg/heart.svg">by Denji',
            systemInfo: []
        };
    }
}

const APP_DEFS = {
    about: {
        title: 'About Me',
        icon: 'assets/svg/about.svg',
        width: 440, height: 420, x: 80, y: 50,
        content: () => {
            const data = appData.about;
            return `
                <div class="about-content">
                    <div class="about-avatar">
                        <img src="${data.avatarIcon}" alt="Avatar" style="width:100%; height:100%; object-fit: cover;">
                    </div>
                    <h2>Hello, I'm ${data.name}</h2>
                    <p style="color:var(--text-dim);line-height:1.6;max-width:320px;">${data.bio}</p>
                    <div class="skills">
                        ${data.skills.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                    </div>
                </div>`;
        }
    },
    projects: {
        title: 'My Projects',
        icon: 'assets/svg/projects.svg',
        width: 500, height: 420, x: 140, y: 80,
        content: () => {
            const projects = appData.projects;
            return `<div class="projects-content">${projects.map(p => `
                <a href="${p.link || '#'}" target="_blank" class="project-card" style="text-decoration: none; color: inherit; display: block;">
                    <h4>${p.title}</h4>
                    <p>${p.description}</p>
                    <div class="tech-tags">${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}</div>
                </a>
            `).join('')}</div>`;
        }
    },
    techstack: {
        title: 'Tech Stack',
        icon: 'assets/svg/techstack.svg',
        width: 597, height: 507, x: 200, y: 100,
        content: () => {
            const techs = appData.techstack;
            return `<div class="techstack-content">
                <h3 style="color:var(--text-main);">Technologies I Use</h3>
                <p style="color:var(--text-dim); font-size:12px; margin-bottom:12px;">A curated list of tools and frameworks I work with daily.</p>
                <div class="tech-grid">${techs.map(t => `
                    <div class="tech-card">
                        <img src="assets/svg/tech/${t.icon}" alt="${t.name}" style="width:75px; height:75px; object-fit:contain; margin-bottom:6px;">
                        <div class="tech-name">${t.name}</div>
                    </div>
                `).join('')}</div>
            </div>`;
        }
    },
    devlog: {
        title: 'DevLog',
        icon: 'assets/svg/devlog.svg',
        width: 480, height: 440, x: 160, y: 90,
        content: () => `
            <div class="devlog-content">
                <h3 style="color:var(--text-main);">Development Log</h3>
                <div class="devlog-placeholder">
                    <p style="font-size:16px;">:D Supabase integration coming soon!</p>
                    <p>Real‑time updates and dynamic entries will appear here.</p>
                </div>
                <div class="devlog-timeline"></div>
            </div>`
    },
    contact: {
        title: 'Contact Me',
        icon: 'assets/svg/contact.svg',
        width: 420, height: 494, x: 100, y: 60,
        content: () => `
            <div class="contact-content">
                <h3 style="color:var(--text-main);">Get In Touch</h3>
                <input type="text" id="contact-name" placeholder="Your Name">
                <input type="email" id="contact-email" placeholder="Your Email">
                <textarea id="contact-message" rows="4" placeholder="Your Message..."></textarea>
                <div class="custom-send-btn" onclick="window.sendEmail()">
                    <span>Send Mail</span>
                </div>
                <div style="color:var(--text-dim); font-size:11px; text-align:center; margin-top:4px;">Or reach me on:</div>
                <div class="social-btns">
                    <div class="social-btn" onclick="window.open('https://github.com/ItsDenji777', '_blank')">
                        <div class="social-btn-icon" id="github" style="mask-image: url('assets/svg/socials/github.svg'); -webkit-mask-image: url('assets/svg/socials/github.svg');"></div>
                    </div>
                    <div class="social-btn" onclick="window.open('https://x.com/DenjisWorkspace', '_blank')">
                        <div class="social-btn-icon" id="twitter" style="mask-image: url('assets/svg/socials/twitter.svg'); -webkit-mask-image: url('assets/svg/socials/twitter.svg');"></div>
                    </div>
                    <div class="social-btn" onclick="window.open('https://t.me/ItsDenji777', '_blank')">
                        <div class="social-btn-icon" id="tg" style="mask-image: url('assets/svg/socials/telegram.svg'); -webkit-mask-image: url('assets/svg/socials/telegram.svg');"></div>
                    </div>
                    <div class="social-btn" onclick="window.open('https://instagram.com/its.denji777/', '_blank')">
                        <div class="social-btn-icon" id="ig" style="mask-image: url('assets/svg/socials/instagram.svg'); -webkit-mask-image: url('assets/svg/socials/instagram.svg');"></div>
                    </div>
                </div>
                <p style="color:var(--overlay0); font-size:11px; text-align:center;">can't wait to work with you :)</p>
            </div>`
    },
    aboutos: {
        title: 'About This OS',
        icon: 'assets/svg/aboutos.svg',
        width: 360, height: 360, x: 250, y: 120,
        content: () => {
            const data = appData.aboutos || {};

            const resolveValue = (val) => {
                if (typeof val === 'string' && val.startsWith('static:')) return val.slice(7);
                switch (val) {
                    case 'browser': return navigator.appName || 'Unknown';
                    case 'platform': return navigator.platform || 'Unknown';
                    case 'language': return navigator.language || 'en';
                    case 'online': return navigator.onLine ? 'Yes' : 'No';
                    case 'resolution': return window.screen.width + 'x' + window.screen.height;
                    default: return val;
                }
            };

            const systemInfo = data.systemInfo || [];
            const rows = systemInfo.length > 0
                ? systemInfo.map(row => `
                    <div class="system-row">
                        <span>${row.label || ''}</span>
                        <span>${resolveValue(row.value)}</span>
                    </div>
                `).join('')
                : `<div class="system-row" style="color:var(--red);">⚠️ No system information loaded</div>`;

            return `
                <div class="aboutos-content">
                    <h3>${data.title || 'DenjiOS'} ${data.version || ''}</h3>
                    <p>${data.description || '...'}</p>
                    <div class="system-info">${rows}</div>
                    <p style="margin-top:12px; font-size:11px;">${data.footer || ''}</p>
                </div>`;
        }
    },
};

window.sendEmail = function() {
    const name = document.getElementById('contact-name')?.value || '';
    const email = document.getElementById('contact-email')?.value || '';
    const message = document.getElementById('contact-message')?.value || '';
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href = `mailto:contact-me@kasra-seydi.ir?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const bootScreen = document.getElementById('boot-screen');
const bootLogo = document.getElementById('boot-logo');
const bootLogoText = document.getElementById('boot-logo-text');
const bootLottie = document.getElementById('boot-lottie');

function createLottie() {
    const player = document.createElement('lottie-player');
    player.setAttribute('src', 'assets/lottie/loading.json');
    player.setAttribute('background', 'transparent');
    player.setAttribute('speed', '2.5');
    player.loop = false;
    player.setAttribute('autoplay', '');
    player.setAttribute('style', 'width: 100%; height: 100%;');
    player.addEventListener('complete', () => {
        finishBoot();
    });
    bootLottie.appendChild(player);
}

async function runBoot() {
    createLottie();
    bootLogo.classList.add('visible');
    bootLogoText.classList.add('visible');
    bootLottie.classList.add('visible');
}

async function finishBoot() {
    await loadAppData();
    await preloadAssets();

    initDesktop();

    for (let i = 0; i < 4; i++) {
        await new Promise(r => requestAnimationFrame(r));
    }

    void document.getElementById('desktop').offsetHeight;

    await new Promise(r => setTimeout(r, 20));

    bootScreen.classList.add('hidden');
    document.body.style.cursor = 'default';
}

const windowsContainer = document.getElementById('windows-container');
const taskbarApps = document.getElementById('taskbar-apps');
const startBtn = document.getElementById('start-btn');
const startMenu = document.getElementById('start-menu');
const contextMenu = document.getElementById('context-menu');
let openWindows = {};
let globalZIndex = 10;
let focusedWindowApp = null;

windowsContainer.addEventListener('contextmenu', e => e.preventDefault());

function getDockIcon(appId) {
    return taskbarApps.querySelector(`.taskbar-app-btn[data-app="${appId}"]`);
}

function createWindow(appId) {
    const def = APP_DEFS[appId];
    const win = document.createElement('div');
    win.className = 'window';
    win.dataset.app = appId;
    win.style.width = def.width + 'px';
    win.style.height = def.height + 'px';
    win.style.left = def.x + 'px';
    win.style.top = def.y + 'px';
    win.style.zIndex = ++globalZIndex;
    win.innerHTML = `
        <div class="window-titlebar">
            <span class="window-title">${def.title}</span>
            <div class="window-controls">
                <button class="win-minimize" title="Minimize">
                    <div class="control-icon" style="mask-image: url('svg/minimize.svg'); -webkit-mask-image: url('assets/svg/minimize.svg');"></div>
                </button>
                <button class="win-maximize" title="Maximize">
                    <div class="control-icon" style="mask-image: url('svg/maximize.svg'); -webkit-mask-image: url('assets/svg/maximize.svg');"></div>
                </button>
                <button class="win-close" title="Close">
                    <div class="control-icon" style="mask-image: url('svg/close.svg'); -webkit-mask-image: url('assets/svg/close.svg');"></div>
                </button>
            </div>
        </div>
        <div class="window-content">${def.content()}</div>
        ${['n','s','e','w','ne','nw','se','sw'].map(d => `<div class="resize-handle resize-${d}" data-resize="${d}"></div>`).join('')}
    `;
    windowsContainer.appendChild(win);
    setupWindowEvents(win, appId);
    return win;
}

function setupWindowEvents(win, appId) {
    const titlebar = win.querySelector('.window-titlebar');
    let isDragging = false, startX, startY, startLeft, startTop;

    win.addEventListener('mousedown', () => { focusWindow(appId); closeStartMenu(); contextMenu.style.display='none'; });
    win.querySelector('.win-close').addEventListener('click', e => { e.stopPropagation(); closeWindow(appId); });
    win.querySelector('.win-maximize').addEventListener('click', e => { e.stopPropagation(); toggleMaximize(appId); });
    win.querySelector('.win-minimize').addEventListener('click', e => { e.stopPropagation(); minimizeWindow(appId); });

    titlebar.addEventListener('mousedown', e => {
        if (e.target.closest('.window-controls')) return;

        if (openWindows[appId]?.maximized) {
            const winData = openWindows[appId];
            const normalW = winData.savedSize?.width || 800;
            const normalH = winData.savedSize?.height || 600;
            win.style.transition = 'none';

            const mouseX = e.clientX;
            const mouseY = e.clientY;
            const oldRect = win.getBoundingClientRect();
            const relX = (mouseX - oldRect.left) / oldRect.width;
            const relY = (mouseY - oldRect.top) / oldRect.height;

            let newLeft = mouseX - normalW * relX;
            let newTop  = mouseY - normalH * relY;

            const maxLeft = window.innerWidth - normalW;
            const maxTop  = window.innerHeight - 64 - normalH;
            newLeft = Math.max(0, Math.min(newLeft, maxLeft));
            newTop  = Math.max(0, Math.min(newTop, maxTop));

            win.style.width  = normalW + 'px';
            win.style.height = normalH + 'px';
            win.style.left   = newLeft + 'px';
            win.style.top    = newTop + 'px';
            win.classList.remove('maximized');
            winData.maximized = false;

            winData.savedPos  = { x: newLeft, y: newTop };
            winData.savedSize = { width: normalW, height: normalH };

            const maxBtn = win.querySelector('.win-maximize');
            if (maxBtn) {
                const maxIcon = maxBtn.querySelector('.control-icon');
                if (maxIcon) {
                    maxIcon.style.maskImage = "url('assets/svg/maximize.svg')";
                    maxIcon.style.webkitMaskImage = "url('assets/svg/maximize.svg')";
                }
                maxBtn.title = 'Maximize';
            }
            void win.offsetWidth;
        }

        isDragging = true;
        const rect = win.getBoundingClientRect();
        startX = e.clientX;
        startY = e.clientY;
        startLeft = rect.left;
        startTop  = rect.top;
        win.style.transition = 'none';
        document.body.style.cursor = 'grabbing';
        e.preventDefault();
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const dx = e.clientX - startX, dy = e.clientY - startY;
        let newLeft = startLeft + dx, newTop = startTop + dy;
        newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - win.offsetWidth));
        newTop = Math.max(0, Math.min(newTop, window.innerHeight - 64 - win.offsetHeight));
        win.style.left = newLeft + 'px';
        win.style.top = newTop + 'px';
        if (openWindows[appId]) openWindows[appId].savedPos = { x: newLeft, y: newTop };
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) { isDragging = false; win.style.transition = ''; document.body.style.cursor = 'default'; }
    });

    win.querySelectorAll('.resize-handle').forEach(handle => {
        handle.addEventListener('mousedown', e => {
            if (openWindows[appId]?.maximized) return;
            const dir = handle.dataset.resize;
            const rect = win.getBoundingClientRect();
            const startX = e.clientX, startY = e.clientY;
            const startW = rect.width, startH = rect.height, startL = rect.left, startT = rect.top;
            function onMove(e) {
                let newW = startW, newH = startH, newL = startL, newT = startT;
                const dx = e.clientX - startX, dy = e.clientY - startY;
                if (dir.includes('e')) newW = Math.max(280, startW + dx);
                if (dir.includes('w')) { newW = Math.max(280, startW - dx); newL = startL + (startW - newW); }
                if (dir.includes('s')) newH = Math.max(160, startH + dy);
                if (dir.includes('n')) { newH = Math.max(160, startH - dy); newT = startT + (startH - newH); }
                win.style.width = newW + 'px'; win.style.height = newH + 'px';
                win.style.left = newL + 'px'; win.style.top = newT + 'px';
                if (openWindows[appId]) {
                    openWindows[appId].savedSize = { width: newW, height: newH };
                    openWindows[appId].savedPos = { x: newL, y: newT };
                }
            }
            function onUp() { document.removeEventListener('mousemove', onMove); document.removeEventListener('mouseup', onUp); }
            document.addEventListener('mousemove', onMove);
            document.addEventListener('mouseup', onUp);
            e.preventDefault(); e.stopPropagation();
        });
    });
}

function launchApp(appId) {
    if (openWindows[appId]) {
        if (openWindows[appId].minimized) {
            animateRestore(appId);
        } else {
            focusWindow(appId);
        }
        return;
    }

    const win = createWindow(appId);
    openWindows[appId] = {
        element: win,
        minimized: false,
        maximized: false,
        savedPos: { x: parseFloat(win.style.left), y: parseFloat(win.style.top) },
        savedSize: { width: parseFloat(win.style.width), height: parseFloat(win.style.height) }
    };
    focusWindow(appId);

    win.style.opacity = '0';
    win.style.transform = 'scale(0.9)';
    win.style.transition = 'none';
    void win.offsetWidth;

    requestAnimationFrame(() => {
        win.style.transition = 'opacity 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)';
        win.style.opacity = '1';
        win.style.transform = 'scale(1)';

        const onOpenEnd = () => {
            win.removeEventListener('transitionend', onOpenEnd);
            win.style.transition = '';
        };
        win.addEventListener('transitionend', onOpenEnd);
    });
}

function focusWindow(appId) {
    if (!openWindows[appId]) return;
    Object.values(openWindows).forEach(w => w.element.classList.remove('focused'));
    openWindows[appId].element.classList.add('focused');
    openWindows[appId].element.style.zIndex = ++globalZIndex;
    openWindows[appId].element.style.display = 'flex';
    focusedWindowApp = appId;
    updateTaskbarButtons();
}

function animateMinimize(appId) {
    const winData = openWindows[appId];
    if (!winData || winData.minimized) return;
    const win = winData.element;
    const btn = getDockIcon(appId);
    if (!btn) { minimizeDirectly(appId); return; }
    const winRect = win.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    const targetX = btnRect.left + btnRect.width/2 - winRect.left - winRect.width/2;
    const targetY = btnRect.top + btnRect.height/2 - winRect.top - winRect.height/2;
    win.classList.add('animating-minimize');
    win.style.transform = `translate(${targetX}px, ${targetY}px) scale(0.2)`;
    win.style.opacity = '0';
    const onEnd = () => {
        win.removeEventListener('transitionend', onEnd);
        win.classList.remove('animating-minimize');
        win.style.transform = ''; win.style.opacity = ''; win.style.transition = '';
        winData.minimized = true; win.style.display = 'none';
        win.classList.remove('focused');
        if (focusedWindowApp === appId) focusedWindowApp = null;
        updateTaskbarButtons();
    };
    win.addEventListener('transitionend', onEnd);
}

function animateRestore(appId) {
    const winData = openWindows[appId];
    if (!winData || !winData.minimized) return;
    const win = winData.element;
    const btn = getDockIcon(appId);
    if (!btn) { restoreDirectly(appId); return; }

    win.style.display = 'flex';

    let targetLeft, targetTop, targetWidth, targetHeight;
    if (winData.maximized) {
        targetLeft = 0;
        targetTop = 0;
        targetWidth = window.innerWidth;
        targetHeight = window.innerHeight - 64;
    } else {
        targetLeft = winData.savedPos?.x ?? 100;
        targetTop  = winData.savedPos?.y ?? 100;
        targetWidth = winData.savedSize?.width ?? 400;
        targetHeight = winData.savedSize?.height ?? 300;
    }

    win.style.left = targetLeft + 'px';
    win.style.top  = targetTop + 'px';
    win.style.width = targetWidth + 'px';
    win.style.height = targetHeight + 'px';
    win.style.transition = 'none';

    const btnRect = btn.getBoundingClientRect();
    const startX = btnRect.left + btnRect.width / 2 - targetWidth / 2;
    const startY = btnRect.top + btnRect.height / 2 - targetHeight / 2;
    const translateX = startX - targetLeft;
    const translateY = startY - targetTop;

    win.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.2)`;
    win.style.opacity = '0';
    void win.offsetWidth;

    win.classList.add('animating-restore');
    win.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease';
    win.style.transform = 'translate(0, 0) scale(1)';
    win.style.opacity = '1';
    winData.minimized = false;

    const onEnd = () => {
        win.removeEventListener('transitionend', onEnd);
        win.classList.remove('animating-restore');
        win.style.transition = '';
        win.style.transform = '';
        if (winData.maximized) {
            win.classList.add('maximized');
        }
        focusWindow(appId);
    };
    win.addEventListener('transitionend', onEnd);
}

function minimizeWindow(appId) { animateMinimize(appId); }
function restoreWindow(appId) { animateRestore(appId); }

function toggleMaximize(appId) {
    const winData = openWindows[appId];
    if (!winData) return;
    const win = winData.element;
    const maxBtn = win.querySelector('.win-maximize');
    const maxIcon = maxBtn.querySelector('.control-icon');

    if (winData.maximized) {
        requestAnimationFrame(() => {
            win.style.width = winData.savedSize.width + 'px';
            win.style.height = winData.savedSize.height + 'px';
            win.style.left = winData.savedPos.x + 'px';
            win.style.top = winData.savedPos.y + 'px';
            win.classList.remove('maximized');
            winData.maximized = false;

            maxIcon.style.maskImage = "url('assets/svg/maximize.svg')";
            maxIcon.style.webkitMaskImage = "url('assets/svg/maximize.svg')";
            maxBtn.title = 'Maximize';
        });
    } else {
        const rect = win.getBoundingClientRect();
        winData.savedPos = { x: rect.left, y: rect.top };
        winData.savedSize = { width: rect.width, height: rect.height };

        requestAnimationFrame(() => {
            win.style.width = '100vw';
            win.style.height = 'calc(100vh - 64px)';
            win.style.left = '0px';
            win.style.top = '0px';
            win.classList.add('maximized');
            winData.maximized = true;

            maxIcon.style.maskImage = "url('assets/svg/restore.svg')";
            maxIcon.style.webkitMaskImage = "url('assets/svg/restore.svg')";
            maxBtn.title = 'Restore';
        });
    }
}

function closeWindow(appId) {
    if (!openWindows[appId]) return;
    const win = openWindows[appId].element;
    win.style.transition = 'opacity 0.15s ease, transform 0.15s ease';
    win.style.opacity = '0'; win.style.transform = 'scale(0.9)';
    setTimeout(() => {
        win.remove(); delete openWindows[appId];
        if (focusedWindowApp === appId) focusedWindowApp = null;
        updateTaskbarButtons();
    }, 150);
}

function minimizeDirectly(appId) {
    const winData = openWindows[appId]; if (!winData) return;
    winData.minimized = true; winData.element.style.display = 'none';
    winData.element.classList.remove('focused');
    if (focusedWindowApp === appId) focusedWindowApp = null;
    updateTaskbarButtons();
}

function restoreDirectly(appId) {
    const winData = openWindows[appId]; if (!winData) return;
    winData.minimized = false; winData.element.style.display = 'flex';
    focusWindow(appId);
}

function initDock() {
    taskbarApps.innerHTML = '';
    ['about','projects','techstack','devlog','contact'].forEach(appId => {
        const def = APP_DEFS[appId];
        const btn = document.createElement('button');
        btn.className = 'taskbar-app-btn';
        btn.dataset.app = appId;
        btn.title = def.title;
        const iconDiv = document.createElement('div');
        iconDiv.className = 'taskbar-icon';
        iconDiv.style.maskImage = `url('${def.icon}')`;
        iconDiv.style.webkitMaskImage = `url('${def.icon}')`;
        btn.appendChild(iconDiv);
        btn.addEventListener('click', () => {
            if (openWindows[appId]) {
                if (openWindows[appId].minimized) restoreWindow(appId);
                else if (focusedWindowApp === appId) minimizeWindow(appId);
                else focusWindow(appId);
            } else launchApp(appId);
            closeStartMenu();
        });
        taskbarApps.appendChild(btn);
    });
    updateTaskbarButtons();
}

function updateTaskbarButtons() {
    taskbarApps.querySelectorAll('.taskbar-app-btn').forEach(btn => {
        const appId = btn.dataset.app; const winData = openWindows[appId];
        btn.classList.remove('active','open','minimized');
        if (winData) {
            if (winData.minimized) btn.classList.add('minimized');
            else { btn.classList.add('open'); if (focusedWindowApp === appId) btn.classList.add('active'); }
        }
    });
}

const desktop = document.getElementById('desktop');
const desktopIcons = document.getElementById('desktop-icons');

function initDesktopIcons() {
    desktopIcons.innerHTML = '';
    ['about','projects','techstack','devlog','contact'].forEach(appId => {
        const def = APP_DEFS[appId];
        const icon = document.createElement('div');
        icon.className = 'desktop-icon';
        icon.dataset.app = appId;
        const imgDiv = document.createElement('div');
        imgDiv.className = 'icon-img';
        imgDiv.style.maskImage = `url('${def.icon}')`;
        imgDiv.style.webkitMaskImage = `url('${def.icon}')`;
        const label = document.createElement('span');
        label.className = 'icon-label';
        label.textContent = def.title;
        icon.appendChild(imgDiv);
        icon.appendChild(label);
        desktopIcons.appendChild(icon);
    });

    desktopIcons.addEventListener('click', e => {
        const icon = e.target.closest('.desktop-icon');
        if (icon) {
            document.querySelectorAll('.desktop-icon.selected').forEach(i => i.classList.remove('selected'));
            icon.classList.add('selected');
            closeStartMenu();
            contextMenu.style.display = 'none';
        }
    });

    desktopIcons.addEventListener('dblclick', e => {
        const icon = e.target.closest('.desktop-icon');
        if (icon) launchApp(icon.dataset.app);
    });
}

desktop.addEventListener('mousedown', (e) => {
    if (e.target.closest('.desktop-icon, .window, #taskbar, #start-menu, #context-menu')) return;

    document.querySelectorAll('.desktop-icon.selected').forEach(i => i.classList.remove('selected'));
    closeStartMenu();
    contextMenu.style.display = 'none';

    isSelecting = true;
    wasDragSelection = false;

    const rect = desktop.getBoundingClientRect();
    selectionStartX = e.clientX - rect.left;
    selectionStartY = e.clientY - rect.top;

    selectionBox.style.display = 'none';
});

document.addEventListener('mousemove', (e) => {
    if (!isSelecting) return;

    const rect = desktop.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;
    const dx = currentX - selectionStartX;
    const dy = currentY - selectionStartY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (!wasDragSelection && distance > 5) {
        wasDragSelection = true;
        selectionBox.style.display = 'block';
    }

    if (wasDragSelection) {
        const left = Math.min(selectionStartX, currentX);
        const top = Math.min(selectionStartY, currentY);
        const width = Math.abs(currentX - selectionStartX);
        const height = Math.abs(currentY - selectionStartY);

        selectionBox.style.left = left + 'px';
        selectionBox.style.top = top + 'px';
        selectionBox.style.width = width + 'px';
        selectionBox.style.height = height + 'px';
    }
});

document.addEventListener('mouseup', () => {
    if (!isSelecting) return;
    isSelecting = false;

    selectionBox.style.display = 'none';

    if (wasDragSelection) {
        const boxRect = selectionBox.getBoundingClientRect();
        const icons = document.querySelectorAll('.desktop-icon');
        icons.forEach(icon => {
            const iconRect = icon.getBoundingClientRect();
            if (
                iconRect.left >= boxRect.left &&
                iconRect.right <= boxRect.right &&
                iconRect.top >= boxRect.top &&
                iconRect.bottom <= boxRect.bottom
            ) {
                icon.classList.add('selected');
            } else {
                icon.classList.remove('selected');
            }
        });
    }
});

desktop.addEventListener('click', (e) => {
    if (wasDragSelection) {
        wasDragSelection = false;
        return;
    }

    if (!e.target.closest('.desktop-icon, .window, #taskbar, #start-menu, #context-menu')) {
        document.querySelectorAll('.desktop-icon.selected').forEach(i => i.classList.remove('selected'));
        closeStartMenu();
        contextMenu.style.display = 'none';
    }
});

const selectionBox = document.getElementById('selection-box');
let isSelecting = false;
let selectionStartX = 0, selectionStartY = 0;
let wasDragSelection = false;

function openStartMenu() {
    startMenu.classList.add('open');
    startBtn.classList.add('active');
    document.getElementById('menu-search-input').value = '';
    startMenu.querySelectorAll('.menu-grid-item').forEach(item => item.style.display = '');
}

function closeStartMenu() {
    startMenu.classList.remove('open');
    startBtn.classList.remove('active');
}

startBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (startMenu.classList.contains('open')) closeStartMenu();
    else openStartMenu();
});

document.addEventListener('click', e => {
    if (!startMenu.contains(e.target) && e.target !== startBtn && !startBtn.contains(e.target)) {
        if (startMenu.classList.contains('open')) closeStartMenu();
    }
});

function initStartMenu() {
    const menuGrid = document.getElementById('menu-grid');
    menuGrid.innerHTML = '';
    ['about','projects','techstack','devlog','contact'].forEach(appId => {
        const def = APP_DEFS[appId];
        const item = document.createElement('button');
        item.className = 'menu-grid-item';
        item.dataset.app = appId;
        const iconDiv = document.createElement('div');
        iconDiv.className = 'menu-icon';
        iconDiv.style.maskImage = `url('${def.icon}')`;
        iconDiv.style.webkitMaskImage = `url('${def.icon}')`;
        const label = document.createElement('span');
        label.textContent = def.title;
        item.appendChild(iconDiv);
        item.appendChild(label);
        item.addEventListener('click', () => {
            launchApp(appId);
            closeStartMenu();
        });
        menuGrid.appendChild(item);
    });
    document.getElementById('menu-search-input').addEventListener('input', e => {
        const filter = e.target.value.toLowerCase();
        menuGrid.querySelectorAll('.menu-grid-item').forEach(item => {
            const appId = item.dataset.app;
            const title = APP_DEFS[appId]?.title.toLowerCase() || '';
            item.style.display = title.includes(filter) ? '' : 'none';
        });
    });
}

desktop.addEventListener('contextmenu', e => {
    e.preventDefault();
    contextMenu.style.display = 'block';
    contextMenu.style.left = Math.min(e.clientX, window.innerWidth-200) + 'px';
    contextMenu.style.top = Math.min(e.clientY, window.innerHeight-150) + 'px';
    closeStartMenu();
});

contextMenu.querySelectorAll('.ctx-item').forEach(item => {
    item.addEventListener('click', () => {
        const action = item.dataset.action;
        if (action === 'refresh') {
            desktop.style.opacity = '0.9'; setTimeout(() => desktop.style.opacity = '1', 150);
        } else if (action === 'aboutos') {
            launchApp('aboutos');
        }
        contextMenu.style.display = 'none';
    });
});

function updateClock() {
    const now = new Date();
    document.getElementById('taskbar-time').textContent = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
    document.getElementById('taskbar-date').textContent = now.toLocaleDateString([], {month:'short', day:'numeric'});
}
updateClock(); setInterval(updateClock, 1000);

function preloadAssets() {
    const fixedSvgs = [
        'assets/svg/about.svg',
        'assets/svg/aboutos.svg',
        'assets/svg/close.svg',
        'assets/svg/contact.svg',
        'assets/svg/devlog.svg',
        'assets/svg/lock.svg',
        'assets/svg/maximize.svg',
        'assets/svg/minimize.svg',
        'assets/svg/refresh.svg',
        'assets/svg/restore.svg',
        'assets/svg/search.svg',
        'assets/svg/shutdown.svg',
        'assets/svg/start.svg',
        'assets/svg/techstack.svg',
        'assets/svg/user.svg',
        'assets/svg/projects.svg',
        'assets/svg/socials/github.svg',
        'assets/svg/socials/twitter.svg',
        'assets/svg/socials/telegram.svg',
        'assets/svg/socials/instagram.svg',
    ];

    const uiImages = [
        'assets/ui/hover.png',
        'assets/ui/not_focused.png',
        'assets/ui/selected.png',
        'assets/ui/minimized.png',
        'assets/ui/btn.png',
        'assets/ui/btn_hover.png',
        'assets/ui/btn_click.png',
        'assets/ui/small_btn.png',
        'assets/ui/small_btn_hover.png',
        'assets/ui/small_btn_click.png',
    ];

    const cursors = [
        'assets/cursors/pointer-dark.png',
        'assets/cursors/grab-dark.png',
        'assets/cursors/grabbing-dark.png',
        'assets/cursors/n-resize.png',
        'assets/cursors/s-resize.png',
        'assets/cursors/e-resize.png',
        'assets/cursors/w-resize.png',
        'assets/cursors/ne-resize.png',
        'assets/cursors/nw-resize.png',
        'assets/cursors/se-resize.png',
        'assets/cursors/sw-resize.png',
    ];

    const techIcons = (appData.techstack || [])
        .map(t => `assets/svg/tech/${t.icon}`)
        .filter(path => path);

    const allAssets = [...fixedSvgs, ...uiImages, ...cursors, ...techIcons];

    return Promise.all(
        allAssets.map(src => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = () => resolve();
                img.src = src;
            });
        })
    );
}

function initDesktop() {
    initDock();
    initDesktopIcons();
    initStartMenu();
}

runBoot();
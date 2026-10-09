// Extracted JS from index.html

// Sermons Data
const sermonsData = [
    { id: 1, title: "The Power of a Renewed Mind", speaker: "Dr. Michael Vance", category: "Victory", date: "October 4, 2026", duration: "48 mins" },
    { id: 2, title: "Walking in Unshakable Faith", speaker: "Pastor Sarah Vance", category: "Faith", date: "September 27, 2026", duration: "52 mins" },
    { id: 3, title: "The Riches of His Grace", speaker: "Rev. David Sterling", category: "Grace", date: "September 20, 2026", duration: "45 mins" },
    { id: 4, title: "Overcoming Fear with Divine Courage", speaker: "Dr. Michael Vance", category: "Faith", date: "September 13, 2026", duration: "50 mins" },
    { id: 5, title: "The Victorious Life in Christ", speaker: "Pastor Sarah Vance", category: "Victory", date: "September 6, 2026", duration: "44 mins" },
    { id: 6, title: "Embracing Unconditional Grace", speaker: "Rev. David Sterling", category: "Grace", date: "August 30, 2026", duration: "41 mins" }
];

// Testimonies Data
let testimoniesData = [
    { id: 1, title: "Miraculous Healing from Chronic Back Pain", author: "Brother Marcus Thorne", date: "October 2, 2026", content: "For over five years, I suffered severe spinal discomfort that limited my daily work. During the Wednesday prayer service, as the pastoral elders anointed and prayed over me, complete restoration manifested!" },
    { id: 2, title: "Restored Marriage After Years of Strife", author: "Sister Elena & James Vance", date: "September 24, 2026", content: "My spouse and I were on the brink of divorce. Through godly counseling and our Life Group community, the Lord healed our communication and poured fresh love into our household." },
    { id: 3, title: "Profound Financial Breakthrough in Business", author: "Brother Daniel Adebayo", date: "September 15, 2026", content: "My small business was struggling under heavy liabilities. After applying biblical principles of stewardship and sowing into the church's outreach fund, unexpected contracts cleared all debts." }
];

let currentSermonCategory = 'all';

// View Switching Controller
function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    const target = document.getElementById('view-' + viewId);
    if (target) {
        target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    document.querySelectorAll('.nav-link').forEach(btn => {
        if (btn.getAttribute('data-target') === viewId) {
            btn.classList.add('text-sage-400');
            btn.classList.remove('text-gray-300');
        } else {
            btn.classList.remove('text-sage-400');
            btn.classList.add('text-gray-300');
        }
    });
}

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

function toggleMobileMenu() { mobileMenu.classList.add('hidden'); }

// Render Sermons Grid
function renderSermons(filtered) {
    const grid = document.getElementById('sermons-grid');
    if (!grid) return;
    grid.innerHTML = '';
    filtered.forEach(s => {
        const card = document.createElement('div');
        card.className = "bg-white rounded-3xl overflow-hidden shadow-sm border border-stoneBg-200 group cursor-pointer hover:shadow-xl transition-all";
        card.onclick = () => openSermonModal(s.title, s.speaker);
        card.innerHTML = `
            <div class="aspect-video bg-midnight-950 relative flex items-center justify-center">
                <div class="absolute inset-0 bg-gradient-to-tr from-midnight-950 to-midnight-900 opacity-90"></div>
                <div class="w-14 h-14 rounded-full bg-sage-500 text-midnight-950 flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform z-10">
                    <i class="fa-solid fa-play ml-0.5"></i>
                </div>
                <span class="absolute top-4 left-4 bg-midnight-950/80 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full text-sage-400 z-10">${s.category}</span>
            </div>
            <div class="p-8">
                <h4 class="font-serif text-xl font-bold text-midnight-950 group-hover:text-sage-600 transition-colors">${s.title}</h4>
                <p class="text-sm text-gray-500 mt-1">${s.speaker}</p>
                <div class="flex items-center justify-between text-xs text-gray-400 mt-6 pt-4 border-t border-stoneBg-100">
                    <span><i class="fa-regular fa-calendar mr-1"></i> ${s.date}</span>
                    <span><i class="fa-regular fa-clock mr-1"></i> ${s.duration}</span>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filterSermons() {
    const input = document.getElementById('sermon-search');
    const query = input ? input.value.toLowerCase() : '';
    const filtered = sermonsData.filter(s =>
        (currentSermonCategory === 'all' || s.category === currentSermonCategory) &&
        (s.title.toLowerCase().includes(query) || s.speaker.toLowerCase().includes(query))
    );
    renderSermons(filtered);
}

function setSermonCategory(cat) {
    currentSermonCategory = cat;
    document.querySelectorAll('.sermon-filter-btn').forEach(btn => {
        if (btn.innerText.toLowerCase().includes(cat.toLowerCase()) || (cat === 'all' && btn.innerText.includes('All'))) {
            btn.className = "sermon-filter-btn px-5 py-2.5 rounded-xl text-xs font-semibold bg-midnight-950 text-white transition-all shadow";
        } else {
            btn.className = "sermon-filter-btn px-5 py-2.5 rounded-xl text-xs font-semibold bg-white border border-stoneBg-200 text-gray-700 hover:bg-stoneBg-100 transition-all";
        }
    });
    filterSermons();
}

// Render Testimonies Grid (accepts optional list)
function renderTestimonies(list) {
    const data = list || testimoniesData;
    const grid = document.getElementById('testimonies-grid');
    if (!grid) return;
    grid.innerHTML = '';
    data.forEach(t => {
        const card = document.createElement('div');
        card.className = "bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-stoneBg-200 flex flex-col justify-between hover:shadow-lg transition-all";
        const snippet = t.content.length > 200 ? t.content.slice(0, 200).trim() + '…' : t.content;
        card.setAttribute('id', `testimony-${t.id}`);
        card.innerHTML = `
            <div>
                <div class="text-sage-500 text-sm mb-4">
                    <i class="fa-solid fa-quote-left text-3xl opacity-30"></i>
                </div>
                <h4 class="font-serif text-xl font-bold text-midnight-950 mb-3">${t.title}</h4>
                <p class="text-gray-600 text-sm leading-relaxed mb-4">${snippet}</p>
                ${t.content.length > 200 ? `<button onclick="openTestimonyDetail(${t.id})" class="text-sage-600 hover:underline text-sm font-semibold">Read more</button>` : ''}
                <div class="mt-3 share-button-row">
                    <button onclick="whatsappShare(${t.id})" class="text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs font-semibold"> <i class="fa-brands fa-whatsapp mr-2"></i>WhatsApp</button>
                    <button onclick="telegramShare(${t.id})" class="text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs font-semibold"><i class="fa-brands fa-telegram mr-2"></i>Telegram</button>
                    <button onclick="facebookShare(${t.id})" class="text-blue-800 bg-white px-3 py-1 rounded-full border border-stoneBg-200 text-xs font-semibold"><i class="fa-brands fa-facebook-f mr-2"></i>Facebook</button>
                    <button onclick="instagramShare(${t.id})" class="text-pink-600 bg-pink-50 px-3 py-1 rounded-full text-xs font-semibold"><i class="fa-brands fa-instagram mr-2"></i>Instagram</button>
                    <button onclick="copyTestimonyLink(${t.id})" class="text-midnight-950 bg-stoneBg-100 px-3 py-1 rounded-full text-xs font-semibold">Copy Link</button>
                </div>
            </div>
            <div class="pt-4 border-t border-stoneBg-100 flex items-center justify-between text-xs text-gray-500">
                <span class="font-semibold text-midnight-950">${t.author}</span>
                <span>${t.date}</span>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filter testimonies by search input
function filterTestimonies() {
    const input = document.getElementById('testimony-search');
    const q = input ? input.value.trim().toLowerCase() : '';
    if (!q) return renderTestimonies();
    const filtered = testimoniesData.filter(t =>
        t.title.toLowerCase().includes(q) ||
        (t.author && t.author.toLowerCase().includes(q)) ||
        t.content.toLowerCase().includes(q)
    );
    renderTestimonies(filtered);
}

// Testimony detail modal
function openTestimonyDetail(id) {
    const t = testimoniesData.find(x => x.id === id);
    if (!t) return;
    const modal = document.getElementById('testimony-detail-modal');
    if (!modal) return;
    const titleEl = document.getElementById('detail-title');
    const authorEl = document.getElementById('detail-author');
    const dateEl = document.getElementById('detail-date');
    const contentEl = document.getElementById('detail-content');
    if (titleEl) titleEl.innerText = t.title;
    if (authorEl) authorEl.innerText = t.author;
    if (dateEl) dateEl.innerText = t.date;
    if (contentEl) contentEl.innerText = t.content;
    modal.classList.remove('hidden');
    modal.setAttribute('aria-hidden', 'false');
    // focus for accessibility
    const closeBtn = modal.querySelector('[data-close]');
    if (closeBtn) closeBtn.focus();
    // store current id for copy/share helpers
    window.currentTestimonyId = id;
}

function closeTestimonyDetail() {
    const modal = document.getElementById('testimony-detail-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden', 'true');
}

function copyTestimonyLink(id) {
    const url = window.location.href.split('#')[0] + `#testimony-${id}`;
    const t = testimoniesData.find(x => x.id === id);
    const text = t ? `${t.title} - ${t.author}\n\n${t.content.slice(0,200)}...\n\nRead more: ${url}` : url;
    if (navigator.share) {
        navigator.share({ title: t ? t.title : 'Testimony', text, url }).then(() => showToast('Shared via device share')).catch(() => {
            if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(() => showToast('Link copied to clipboard'));
        });
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => showToast('Link copied to clipboard'));
    } else {
        showToast('Copy your browser link to share');
    }
}

function shareTestimony() {
    const id = window.currentTestimonyId;
    const t = testimoniesData.find(x => x.id === id);
    if (!t) return showToast('No testimony selected');
    const text = `${t.title} — ${t.author}\n\n${t.content.slice(0,200)}...\n\nRead more: ${window.location.href.split('#')[0]}#testimony-${id}`;
    if (navigator.share) {
        navigator.share({ title: t.title, text, url: window.location.href }).then(() => showToast('Shared successfully')).catch(()=>showToast('Share canceled'));
    } else {
        copyTestimonyLink(id);
        showToast('Link copied; use your device share options');
    }
}

// WhatsApp share helper
function whatsappShare(id) {
    const t = testimoniesData.find(x => x.id === id);
    if (!t) return showToast('Testimony not found');
    const base = window.location.href.split('#')[0] + `#testimony-${id}`;
    const text = `${t.title} - ${t.author}%0A%0A${encodeURIComponent(t.content.slice(0,200))}...%0A%0ARead more: ${encodeURIComponent(base)}`;
    const wa = `https://wa.me/?text=${text}`;
    window.open(wa, '_blank');
}

// Telegram share helper
function telegramShare(id) {
    const t = testimoniesData.find(x => x.id === id);
    if (!t) return showToast('Testimony not found');
    const base = window.location.href.split('#')[0] + `#testimony-${id}`;
    const text = encodeURIComponent(`${t.title} - ${t.author}\n\n${t.content.slice(0,200)}...\n\nRead more: ${base}`);
    const url = `https://t.me/share/url?url=${encodeURIComponent(base)}&text=${text}`;
    window.open(url, '_blank');
}

// Facebook share helper
function facebookShare(id) {
    const t = testimoniesData.find(x => x.id === id);
    if (!t) return showToast('Testimony not found');
    const base = window.location.href.split('#')[0] + `#testimony-${id}`;
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(base)}&quote=${encodeURIComponent(t.title + ' - ' + t.author)}`;
    window.open(url, '_blank');
}

// Instagram share (fallback) — Instagram web doesn't support prefilled text; copy link and instruct user
function instagramShare(id) {
    copyTestimonyLink(id);
    showToast('Link copied — open Instagram to paste into a post or story.');
}

// WhatsApp share helper
function whatsappShare(id) {
    const t = testimoniesData.find(x => x.id === id);
    if (!t) return showToast('Testimony not found');
    const base = window.location.href.split('#')[0] + `#testimony-${id}`;
    const text = `${t.title} - ${t.author}%0A%0A${encodeURIComponent(t.content.slice(0,200))}...%0A%0ARead more: ${encodeURIComponent(base)}`;
    const wa = `https://wa.me/?text=${text}`;
    // open in new tab
    window.open(wa, '_blank');
}

// Modal Controls
function openTestimonyModal() { document.getElementById('testimony-modal').classList.remove('hidden'); }
function closeTestimonyModal() { document.getElementById('testimony-modal').classList.add('hidden'); }
function handleTestimonySubmit(e) {
    e.preventDefault();
    const name = document.getElementById('test-name').value;
    const title = document.getElementById('test-title').value;
    const content = document.getElementById('test-content').value;
    testimoniesData.unshift({ id: Date.now(), title, author: name, date: "Just Now", content });
    renderTestimonies();
    closeTestimonyModal();
    e.target.reset();
    showToast("Your testimony has been successfully published!");
}

function openSermonModal(title, speaker) {
    document.getElementById('modal-sermon-title').innerText = title;
    document.getElementById('modal-sermon-heading').innerText = title;
    document.getElementById('modal-sermon-speaker').innerText = speaker;
    document.getElementById('sermon-modal').classList.remove('hidden');
}
function closeSermonModal() { document.getElementById('sermon-modal').classList.add('hidden'); }

// Prayer Request Submission
function handlePrayerSubmit(e) {
    e.preventDefault();
    document.getElementById('prayer-success').classList.remove('hidden');
    e.target.reset();
    setTimeout(() => document.getElementById('prayer-success').classList.add('hidden'), 6000);
}

// Giving Options
function setGivingType(type) {
    document.querySelectorAll('.giving-tab').forEach(btn => btn.className = "giving-tab p-6 rounded-2xl border-2 border-stoneBg-200 bg-white text-center transition-all hover:border-sage-300");
        const el = document.getElementById('btn-' + type);
        if (el) el.className = "giving-tab p-6 rounded-2xl border-2 border-sage-500 bg-sage-500/5 text-center transition-all";
}
function setAmount(amt) { const el = document.getElementById('custom-amount'); if (el) el.value = amt; }
function simulateGiving() { showToast("Redirecting securely to online stewardship portal..."); }

// Contact Form
function handleContactSubmit(e) {
    e.preventDefault();
    const success = document.getElementById('contact-success');
    if (success) success.classList.remove('hidden');
    e.target.reset();
    setTimeout(() => { if (success) success.classList.add('hidden'); }, 5000);
}

// Toast Notification System
function showToast(msg) {
    const div = document.createElement('div');
    div.className = "fixed bottom-8 right-8 z-50 bg-midnight-950 text-white px-6 py-4 rounded-2xl shadow-2xl border border-sage-500/40 text-sm flex items-center space-x-3";
    div.innerHTML = `<i class="fa-solid fa-circle-check text-sage-400 text-lg"></i><span>${msg}</span>`;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 4000);
}

// Page-level share helpers (WhatsApp + copy link)
function whatsappPageShare() {
    const title = document.title || document.querySelector('h1')?.innerText || 'Transformation Network';
    const url = window.location.href.split('#')[0];
    const text = encodeURIComponent(title + '\n\n' + url);
    const wa = `https://wa.me/?text=${text}`;
    window.open(wa, '_blank');
}

function copyPageLink() {
    const url = window.location.href.split('#')[0];
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => showToast('Link copied to clipboard'));
    } else {
        // fallback
        prompt('Copy this link', url);
    }
}

// Initialization
// Back to top helper + small accessibility helpers
function handleBackToTop() {
    const el = document.getElementById('back-to-top');
    if (!el) return;
    if (window.scrollY > 300) el.classList.add('show'); else el.classList.remove('show');
}

window.addEventListener('scroll', handleBackToTop);

window.addEventListener('load', () => {
    renderSermons(sermonsData);
    renderTestimonies();
    // add skip-link anchor target for keyboard users
    const main = document.querySelector('main');
    if (main && !document.getElementById('main-content')) main.setAttribute('id','main-content');
});

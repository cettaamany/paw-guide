const API_URL = '/api';

// --- FUNGSI NAVIGASI ---
function showPage(pageId, element = null) {
    // 1. Sembunyikan semua halaman
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    
    // 2. Tampilkan halaman target
    const targetPage = document.getElementById(pageId);
    if(targetPage) targetPage.classList.add('active');

    // 3. Update Navigasi Bawah
    if (element) {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        element.classList.add('active');
    } else {
        // Jika navigasi manual (misal tombol kembali), cari nav item yang cocok
        document.querySelectorAll('.nav-item').forEach(nav => {
            nav.classList.remove('active');
            if(nav.getAttribute('onclick') && nav.getAttribute('onclick').includes(pageId)) {
                nav.classList.add('active');
            }
        });
    }
    window.scrollTo(0, 0);
}

// --- FITUR HEWAN ---
async function fetchAnimals() {
    const list = document.getElementById('popular-list');
    try {
        const res = await fetch(`${API_URL}/animals`);
        const data = await res.json();
        
        list.innerHTML = data.map(animal => `
            <div class="card">
                <img src="${animal.image_url}" alt="${animal.name}" loading="lazy">
                <h3>${animal.name}</h3> 
                <span class="badge">${animal.type}</span>
                <button class="btn-primary" onclick="showDetail('${animal.id}')">Detail</button>
            </div>
        `).join('');
    } catch (error) {
        list.innerHTML = `<p style="text-align:center">Gagal memuat data.</p>`;
    }
}

async function showDetail(id) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('detail').classList.add('active');
    
    const container = document.getElementById('animal-detail-content');
    container.innerHTML = '<p>Memuat profil...</p>';
    
    try {
        const res = await fetch(`${API_URL}/animals/${id}`);
        const animal = await res.json();
        
        container.innerHTML = `
            <div class="detail-view">
                <img src="${animal.image_url}" style="width:100%; border-radius:15px; margin-bottom:15px;" alt="${animal.name}">
                <h1 style="color:var(--primary)">${animal.name}</h1>
                <p class="badge" style="display:inline-block; font-size:1rem">${animal.breed}</p>
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin:20px 0; text-align:center; background:var(--card-bg); padding:15px; border-radius:10px;">
                    <div><strong>Umur</strong><br>${animal.age}</div>
                    <div><strong>Gender</strong><br>${animal.gender}</div>
                </div>
                <h3>Tentang</h3><p>${animal.description}</p>
                <h3>Karakteristik</h3><p>${animal.characteristics}</p>
                <h3>Kebutuhan</h3><p>${animal.needs}</p>
            </div>
        `;
    } catch (error) {
        container.innerHTML = 'Gagal memuat detail.';
    }
}

// --- FITUR TIPS (LIST & DETAIL) ---
async function fetchTips() {
    const list = document.getElementById('tips-list');
    list.innerHTML = '<p>Memuat tips...</p>';

    try {
        const res = await fetch(`${API_URL}/tips`);
        const data = await res.json();
        
        list.innerHTML = data.map(tip => `
            <div class="card" onclick="showTipDetail('${tip.id}')" style="margin-bottom:15px; border-left: 4px solid var(--primary); display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h3 style="margin:0; font-size:1rem;">${tip.title}</h3>
                    <span class="badge" style="margin-top:5px; display:inline-block;">${tip.category}</span>
                </div>
                <button class="btn-primary" style="width:auto; padding:5px 15px; font-size:0.8rem;">Baca</button>
            </div>
        `).join('');
    } catch (error) { console.error(error); }
}

async function showTipDetail(id) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById('tips-detail').classList.add('active');

    // Update Nav
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const tipsNav = document.querySelector('a[onclick*="tips"]');
    if(tipsNav) tipsNav.classList.add('active');

    const container = document.getElementById('tips-detail-content');
    container.innerHTML = '<p>Memuat tips...</p>';
    
    try {
        const res = await fetch(`${API_URL}/tips/${id}`);
        const tip = await res.json();
        
        container.innerHTML = `
            <span class="badge" style="background:var(--primary); color:white; padding:5px 10px; border-radius:15px;">${tip.category}</span>
            <h1 style="color:#333; margin-top:15px; margin-bottom:10px;">${tip.title}</h1>
            <div style="height:2px; background:#eee; width:100%; margin-bottom:20px;"></div>
            <p style="line-height:1.8; color:#444; font-size:1rem; text-align:justify;">${tip.content}</p>
        `;
    } catch (error) {
        container.innerHTML = 'Gagal memuat detail tips.';
    }
}

// --- FITUR SHELTER ---
async function fetchShelters() {
    const list = document.getElementById('shelter-list');
    try {
        const res = await fetch(`${API_URL}/shelters`);
        const data = await res.json();
        list.innerHTML = data.map(shelter => `
            <div class="card" style="display:flex; gap:15px; align-items:center;">
                <img src="${shelter.logo_url}" style="width:60px; height:60px; border-radius:50%; object-fit:cover;">
                <div style="flex:1">
                    <h4 style="margin:0">${shelter.name}</h4>
                    <small>⏰ ${shelter.operational_hours}</small>
                    <a href="https://wa.me/${shelter.contact}" target="_blank" class="btn-primary" style="display:block; text-align:center; margin-top:5px; font-size:0.8rem;">Hubungi</a>
                </div>
            </div>
        `).join('');
    } catch (error) { console.error(error); }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// --- INISIALISASI ---
document.addEventListener('DOMContentLoaded', () => {
    fetchAnimals();
    fetchShelters();
    fetchTips();
});

"use strict";

const KEY = "pusbuk-media5-state";
const chapters = [
    { name: "Gerbang Profesional", chapter: "Bab I", question: "Seberapa yakin kamu menata diksi dan kaidah ejaan dalam surat lamaran tanpa bantuan?", profile: "Sang Negosiator Andal", badge: "Komunikator Profesional", description: "Kamu berpotensi menyampaikan gagasan dan memperkenalkan diri secara profesional.", tips: ["Periksa huruf kapital, tanda baca, dan ejaan.", "Pilih diksi formal, jelas, dan santun.", "Pastikan surat lamaran tersusun runtut."] },
    { name: "Sinema Pemikiran", chapter: "Bab II", question: "Seberapa yakin kamu menemukan pesan utama dan menghubungkannya dengan unsur visual film pendek?", profile: "Sang Kreator Sinematik", badge: "Kreator Visual", description: "Kamu berpotensi menghubungkan pesan, gambar, dan unsur audiovisual.", tips: ["Identifikasi gagasan utama dan pesan film.", "Amati gambar, ekspresi, dan suara.", "Hubungkan unsur visual dengan pesan film."] },
    { name: "Panggung Kehidupan", chapter: "Bab III", question: "Seberapa yakin kamu membaca realitas sosial serta menyusun dialog dan petunjuk lakuan yang sesuai?", profile: "Sang Dramaturg Empatik", badge: "Perangkai Dialog", description: "Kamu berpotensi memahami sudut pandang tokoh dan merangkai dialog bermakna.", tips: ["Kenali konflik dan karakter tokoh.", "Susun dialog sesuai situasi.", "Gunakan petunjuk lakuan untuk memperjelas tindakan."] },
    { name: "Jejak Nusantara", chapter: "Bab IV", question: "Seberapa yakin kamu mengolah fakta budaya menjadi feature digital yang runtut dan menarik?", profile: "Sang Penjelajah Budaya", badge: "Pencerita Nusantara", description: "Kamu berpotensi mengolah fakta dan kekayaan budaya menjadi cerita menarik.", tips: ["Pastikan fakta dan sumber dapat dipercaya.", "Susun feature dengan alur runtut.", "Gunakan visual tanpa mengubah fakta."] }
];
const labels = ["", "Sangat Ragu", "Ragu", "Cukup Yakin", "Yakin", "Sangat Yakin"];
const $ = id => document.getElementById(id);
const steps = ["identity", "map", "reflect", "feedback", "profile", "certificate"];
let state = { identity: { name: "", className: "", number: "" }, scores: [null, null, null, null], done: [false, false, false, false], badges: [], profile: null };
let current = 0, feedbackIndex = 0, tieChoice = null;

function persist() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { console.warn(e); } }
function restore() { try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && Array.isArray(s.scores) && s.scores.length === 4) { state = { ...state, ...s }; } } catch (e) { console.warn(e); } }
function screen(name) {
    document.querySelectorAll(".m5-layout .content-panel").forEach(el => el.classList.toggle("active", el.id === name));
    document.querySelectorAll(".m5-layout .segmen").forEach(el => el.classList.toggle("active", el.dataset.step === name));
    const index = steps.indexOf(name);
    $("progressBar").style.width = ((index + 1) / steps.length * 100) + "%";
    $("progressLabel").textContent = `Langkah ${index + 1} dari ${steps.length}`;
    window.scrollTo({ top: 0, behavior: "smooth" });
}
function notify(msg) { $("scoreHint").textContent = msg; }
function completedCount() { return state.done.filter(Boolean).length; }
function highest() { const max = Math.max(...state.scores.map(v => v || 0)); return state.scores.map((v, i) => v === max ? i : -1).filter(i => i >= 0); }
function renderMap() {
    const box = $("mapNodes"); box.innerHTML = "";
    chapters.forEach((c, i) => {
        const unlocked = i === 0 || state.done[i - 1], done = state.done[i];
        const card = document.createElement("article");
        card.className = "m5-node" + (done ? " done" : unlocked ? " active" : "");
        const num = document.createElement("div"); num.className = "node-number"; num.textContent = done ? "✓" : String(i + 1).padStart(2, "0");
        const title = document.createElement("h3"); title.textContent = c.name;
        const desc = document.createElement("p"); desc.textContent = done ? `Skor refleksi: ${state.scores[i]}/5` : unlocked ? "Pos siap dikerjakan" : "Selesaikan pos sebelumnya";
        const btn = document.createElement("button"); btn.type = "button"; btn.className = "m5-button " + (done ? "secondary" : "primary"); btn.textContent = done ? "Selesai" : unlocked ? "Buka Pos →" : "Terkunci"; btn.disabled = !unlocked || done;
        btn.addEventListener("click", () => openReflect(i));
        card.append(num, title, desc, btn); box.appendChild(card);
    });
    $("mapStatus").textContent = `${completedCount()} dari 4 pos`;
    $("continueMap").textContent = state.done.every(Boolean) ? "Lihat Profil →" : `Buka Pos ${state.done.findIndex(v => !v) + 1} →`;
}
function openReflect(i) {
    if (i > 0 && !state.done[i - 1]) { notify("Selesaikan pos sebelumnya terlebih dahulu."); return; }
    if (state.done[i]) { screen("map"); return; }
    current = i; const c = chapters[i];
    $("chapterTitle").textContent = c.name;
    $("chapterEyebrow").textContent = `TAHAP 03 · REFLEKSI ${c.chapter.toUpperCase()}`;
    $("chapterNumber").textContent = c.chapter;
    $("chapterQuestion").textContent = c.question;
    updateScore(state.scores[i] || 3); screen("reflect");
}
function updateScore(score) {
    $("confidenceSlider").value = score;
    $("scoreLabel").textContent = `${score} · ${labels[score]}`;
    document.querySelectorAll("#scaleButtons button").forEach(b => b.classList.toggle("selected", Number(b.dataset.score) === score));
    notify(score <= 2 ? "Tidak apa-apa jika masih ragu. Refleksi ini membantu mengenali bagian yang perlu dilatih." : score === 3 ? "Terus berlatih untuk memperkuat pemahamanmu." : "Pilih skor yang benar-benar menggambarkan keyakinanmu.");
}
function saveScore() {
    const score = Number($("confidenceSlider").value);
    state.scores[current] = score; state.done[current] = true;
    if (score >= 4 && !state.badges.includes(chapters[current].badge)) state.badges.push(chapters[current].badge);
    persist(); showFeedback(current, score);
}
function showFeedback(i, score) {
    feedbackIndex = i; const c = chapters[i], high = score >= 4;
    $("feedbackTitle").textContent = high ? "Mantap, keyakinanmu kuat!" : "Saatnya menguatkan pemahaman.";
    $("feedbackText").textContent = high ? `Kamu merasa yakin terhadap kompetensi ${c.chapter}. Terus kembangkan kemampuanmu melalui latihan.` : `Kamu memberi skor ${score}/5. Berikut tiga pengingat yang bisa kamu pelajari kembali.`;
    $("badgeResult").textContent = high ? `✦ Lencana: ${c.badge}` : `Skor refleksi: ${score}/5`;
    $("remedialBox").classList.toggle("hidden", high);
    $("feedbackContinue").classList.toggle("hidden", !high);
    $("remedialList").innerHTML = "";
    if (!high) c.tips.forEach(t => { const li = document.createElement("li"); li.textContent = t; $("remedialList").appendChild(li); });
    screen("feedback");
}
function returnMap() { renderMap(); screen("map"); }
function profileIndex() {
    const top = highest();
    if (top.length === 1) return top[0];
    return top.includes(state.profile) ? state.profile : null;
}
function continueProfile() {
    if (!state.done.every(Boolean)) { screen("map"); return; }
    const top = highest();
    if (top.length > 1 && !top.includes(state.profile)) { renderTie(top); screen("profile"); return; }
    state.profile = top[0]; persist(); renderProfile(); screen("profile");
}
function renderTie(indices) {
    $("tieBox").classList.remove("hidden"); $("profileResult").classList.add("hidden");
    $("confirmTie").disabled = true; tieChoice = null; $("tieOptions").innerHTML = "";
    indices.forEach(i => {
        const b = document.createElement("button"); b.type = "button";
        b.innerHTML = `<strong>${chapters[i].profile}</strong><p>${chapters[i].badge} · Skor ${state.scores[i]}/5</p>`;
        b.addEventListener("click", () => {
            tieChoice = i; $("tieOptions").querySelectorAll("button").forEach(x => x.classList.remove("selected"));
            b.classList.add("selected"); $("confirmTie").disabled = false;
        });
        $("tieOptions").appendChild(b);
    });
}
function renderBars(target, compact = false) {
    target.innerHTML = "";
    chapters.forEach((c, i) => {
        const row = document.createElement("div"); row.className = "m5-bar-row";
        const heading = document.createElement("div"); heading.className = "m5-bar-heading";
        const name = document.createElement("span"); name.textContent = c.chapter + " · " + c.name;
        const score = document.createElement("strong"); score.textContent = `${state.scores[i]}/5`;
        heading.append(name, score);
        const track = document.createElement("div"); track.className = "m5-bar-track";
        const fill = document.createElement("div"); fill.className = "m5-bar-fill"; fill.style.width = (state.scores[i] * 20) + "%";
        track.appendChild(fill); row.append(heading, track);
        if (!compact) { const badge = document.createElement("small"); badge.textContent = c.badge; badge.style.color = "#64748b"; row.appendChild(badge); }
        target.appendChild(row);
    });
}
function renderProfile() {
    const i = profileIndex(); if (i === null) return;
    const c = chapters[i];
    $("tieBox").classList.add("hidden"); $("profileResult").classList.remove("hidden");
    $("profileName").textContent = c.profile; $("profileBadge").textContent = c.badge; $("profileDescription").textContent = c.description;
    renderBars($("competencyBars"));
}
function renderCertificate() {
    const i = profileIndex(); if (i === null || !state.done.every(Boolean)) return false;
    $("certificateName").textContent = state.identity.name;
    $("certificateIdentity").textContent = `Kelas ${state.identity.className} · Nomor absen ${state.identity.number}`;
    $("certificateProfile").textContent = chapters[i].profile + " — " + chapters[i].badge;
    $("certificateDate").textContent = "Tanggal refleksi: " + new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "long", year: "numeric" }).format(new Date());
    renderBars($("certificateScores"), true); return true;
}
function start(event) {
    event.preventDefault();
    const name = $("studentName").value.trim(), cls = $("studentClass").value.trim(), num = $("studentNumber").value.trim();
    if (!name || !cls || !num || Number(num) < 1) { alert("Lengkapi identitas dengan benar."); return; }
    state.identity = { name, className: cls, number: String(Number(num)) }; persist(); renderMap(); screen("map");
}
function reset() {
    if (!confirm("Mulai ulang perjalanan dan hapus seluruh jawaban?")) return;
    localStorage.removeItem(KEY); state = { identity: { name: "", className: "", number: "" }, scores: [null, null, null, null], done: [false, false, false, false], badges: [], profile: null };
    $("identityForm").reset(); renderMap(); screen("identity");
}
function clearData() {
    if (!confirm("Hapus identitas, skor, dan progres dari browser?")) return;
    resetWithoutConfirm();
}
function resetWithoutConfirm() {
    localStorage.removeItem(KEY); state = { identity: { name: "", className: "", number: "" }, scores: [null, null, null, null], done: [false, false, false, false], badges: [], profile: null };
    $("identityForm").reset(); renderMap(); screen("identity");
}
document.addEventListener("DOMContentLoaded", () => {
    restore();
    $("identityForm").addEventListener("submit", start);
    document.querySelectorAll(".m5-layout .segmen").forEach(b => b.addEventListener("click", () => {
        const step = b.dataset.step;
        if (step === "identity") screen("identity");
        if (step === "map") { renderMap(); screen("map"); }
        if (step === "reflect") openReflect(Math.max(0, state.done.findIndex(v => !v)));
        if (step === "feedback") screen("feedback");
        if (step === "profile") continueProfile();
        if (step === "certificate") { if (renderCertificate()) screen("certificate"); else alert("Selesaikan empat pos terlebih dahulu."); }
    }));
    $("continueMap").addEventListener("click", () => state.done.every(Boolean) ? continueProfile() : openReflect(state.done.findIndex(v => !v)));
    $("confidenceSlider").addEventListener("input", e => updateScore(Number(e.target.value)));
    $("scaleButtons").addEventListener("click", e => { const b = e.target.closest("[data-score]"); if (b) updateScore(Number(b.dataset.score)); });
    $("saveScore").addEventListener("click", saveScore);
    $("backMap").addEventListener("click", returnMap);
    $("feedbackContinue").addEventListener("click", returnMap);
    $("readRemedial").addEventListener("click", returnMap);
    $("confirmTie").addEventListener("click", () => { if (tieChoice === null) return; state.profile = tieChoice; persist(); renderProfile(); screen("profile"); });
    $("backToMapFromProfile").addEventListener("click", returnMap);
    $("goCertificate").addEventListener("click", () => { if (renderCertificate()) screen("certificate"); });
    $("backProfile").addEventListener("click", () => { renderProfile(); screen("profile"); });
    $("printCertificate").addEventListener("click", () => { if (renderCertificate()) window.print(); });
    $("clearData").addEventListener("click", clearData);
    $("backMap").textContent = "← Kembali ke Peta";
    renderMap();
    if (state.identity.name) {
        $("studentName").value = state.identity.name; $("studentClass").value = state.identity.className; $("studentNumber").value = state.identity.number;
        if (state.done.every(Boolean)) { renderProfile(); screen("profile"); } else { screen("map"); }
    } else screen("identity");
});

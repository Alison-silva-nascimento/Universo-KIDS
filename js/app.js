const BUSINESS = {
  name: "Universo Kids",
  subtitle: "Infanto e Juvenil",
  whatsapp: "556493071814", // Número informado pela loja, apenas dígitos
  phone: "+55 64 9307-1814",
  instagram: "https://www.instagram.com/universokidsif?stkn=MTdhdTdvdGY5NnQ0dg==",
  address: "",
  maps: "",
  openingHours: "",
  canonical: "", // URL completa do site quando publicada
  ogImage: "" // URL absoluta de fotografia real quando disponível
};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const whatsappMessage = (name) => `Olá! Vim pelo site da Universo Kids e gostaria de saber mais sobre este produto: ${name}.`;
const whatsappUrl = (message) => BUSINESS.whatsapp ? `https://wa.me/${BUSINESS.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}` : "#contato";
const instagramUrl = () => BUSINESS.instagram || "#contato";

function configureBusiness() {
  $$(".whatsapp-link").forEach(link => {
    link.href = whatsappUrl("Olá! Vim pelo site da Universo Kids e gostaria de conhecer os looks disponíveis.");
    if (BUSINESS.whatsapp) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
    else { link.setAttribute("aria-label", `${link.getAttribute("aria-label") || link.textContent.trim()} — número ainda não cadastrado`); }
  });
  $$(".instagram-link").forEach(link => {
    link.href = instagramUrl();
    if (BUSINESS.instagram) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
  });
  $("#contact-whatsapp").textContent = BUSINESS.phone || (BUSINESS.whatsapp ? `+${BUSINESS.whatsapp}` : "Número em breve");
  $("#contact-instagram").textContent = BUSINESS.instagram ? "@universokidsif" : "Perfil em breve";
  $("#contact-address").textContent = BUSINESS.address || "Endereço em breve";
  $("#contact-hours").textContent = BUSINESS.openingHours || "Horário em breve";
  $("#year").textContent = new Date().getFullYear();
  if (BUSINESS.canonical) { const tag = document.createElement("link"); tag.rel = "canonical"; tag.href = BUSINESS.canonical; document.head.append(tag); }
  if (BUSINESS.ogImage) { const tag = document.createElement("meta"); tag.setAttribute("property", "og:image"); tag.content = BUSINESS.ogImage; document.head.append(tag); }
  if (BUSINESS.whatsapp) $("#question-submit").innerHTML = 'Enviar pelo WhatsApp <span aria-hidden="true">↗</span>';
}

function photoHTML(image, label, extraClass = "") {
  const thumb = image.replace(/\.webp$/, "-480.webp");
  const medium = image.replace(/\.webp$/, "-800.webp");
  return `<div class="photo-slot ${extraClass}"><img src="${thumb}" srcset="${thumb} 480w, ${medium} 800w, ${image} 1220w" sizes="(max-width: 767px) 48vw, (max-width: 1024px) 45vw, 25vw" alt="${label}" loading="lazy" decoding="async" onerror="this.hidden=true;this.parentElement.classList.add('missing-photo')"><span class="photo-prompt">Foto da coleção<small>Adicione ${label.toLowerCase()}</small></span></div>`;
}

function productCard(product, variant = "") {
  const category = product.category === "meninas" ? "Meninas" : product.category === "meninos" ? "Meninos" : "Bebês";
  return `<article class="product-card ${variant} reveal"> <div class="product-photo-wrap">${photoHTML(product.image, product.name, "product-photo")}${product.new ? '<span class="new-badge">NOVO</span>' : ""}<button class="quick-trigger" type="button" data-product="${product.id}" aria-label="Ver detalhes de ${product.name}">Ver detalhes <span aria-hidden="true">↗</span></button></div><div class="product-info"><span class="product-category">${category}</span><h3>${product.name}</h3><a class="consult-link" href="${whatsappUrl(whatsappMessage(product.name))}" ${BUSINESS.whatsapp ? 'target="_blank" rel="noopener noreferrer"' : ""}>Consultar <span aria-hidden="true">↗</span></a></div></article>`;
}

function renderProducts() {
  $("#new-products").innerHTML = PRODUCTS.filter(p => p.new).slice(0, 4).map(p => productCard(p)).join("");
  $("#girls-products").innerHTML = PRODUCTS.filter(p => p.category === "meninas").map(p => productCard(p, "collection-card")).join("");
  $("#boys-products").innerHTML = PRODUCTS.filter(p => p.category === "meninos").map(p => productCard(p, "collection-card")).join("");
  $("#baby-products").innerHTML = PRODUCTS.filter(p => p.category === "bebes").map(p => productCard(p, "baby-card")).join("");
  $("#pair-products").innerHTML = [PRODUCTS[3], PRODUCTS[0]].map(p => productCard(p, "pair-card")).join("");
  $("#instagram-mosaic").innerHTML = [PRODUCTS[1], PRODUCTS[4], PRODUCTS[2], PRODUCTS[7]].map(p => photoHTML(p.image, p.name, "instagram-photo")).join("");
  $$(".quick-trigger").forEach(button => button.addEventListener("click", () => openQuickView(Number(button.dataset.product))));
}

const quick = $("#quick-view");
let previousFocus;
function openQuickView(id) {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  previousFocus = document.activeElement;
  $("#quick-image").innerHTML = photoHTML(product.image, product.name, "quick-photo");
  $("#quick-category").textContent = product.category === "meninas" ? "MENINAS" : product.category === "meninos" ? "MENINOS" : "BEBÊS";
  $("#quick-title").textContent = product.name;
  $("#quick-description").textContent = product.description;
  const link = $("#quick-whatsapp");
  link.href = whatsappUrl(whatsappMessage(product.name));
  if (BUSINESS.whatsapp) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
  quick.hidden = false;
  document.body.classList.add("modal-open");
  $(".quick-close").focus();
}
function closeQuickView() {
  quick.hidden = true;
  document.body.classList.remove("modal-open");
  previousFocus?.focus();
}
$$("[data-close]").forEach(el => el.addEventListener("click", closeQuickView));
document.addEventListener("keydown", event => {
  if (quick.hidden) return;
  if (event.key === "Escape") closeQuickView();
  if (event.key === "Tab") {
    const focusable = $$("button, a[href]", $(".quick-panel"));
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});

const menuButton = $(".menu-toggle");
const menu = $("#mobile-menu");
function setMenu(open) {
  menu.hidden = !open;
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  document.body.classList.toggle("menu-open", open);
}
menuButton.addEventListener("click", () => setMenu(menu.hidden));
$$("a", menu).forEach(link => link.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", event => { if (event.key === "Escape" && !menu.hidden) setMenu(false); });
window.addEventListener("resize", () => { if (window.innerWidth > 1024) setMenu(false); });

window.addEventListener("scroll", () => $("#site-header").classList.toggle("scrolled", window.scrollY > 20), {passive:true});

const questionsPanel = $("#questions-panel");
const questionTriggers = $$(".contact-open");
let questionPreviousFocus;
function setQuestions(open, trigger) {
  questionsPanel.hidden = !open;
  questionTriggers.forEach(button => button.setAttribute("aria-expanded", String(open)));
  if (open) { questionPreviousFocus = trigger; $("#question-text").focus(); }
  else questionPreviousFocus?.focus();
}
questionTriggers.forEach(button => button.addEventListener("click", () => setQuestions(questionsPanel.hidden, button)));
$(".questions-close").addEventListener("click", () => setQuestions(false));
document.addEventListener("keydown", event => { if (event.key === "Escape" && !questionsPanel.hidden) setQuestions(false); });
document.addEventListener("click", event => {
  if (!questionsPanel.hidden && !questionsPanel.contains(event.target) && !questionTriggers.some(button => button.contains(event.target))) setQuestions(false);
});
$("#question-form").addEventListener("submit", async event => {
  event.preventDefault();
  const question = $("#question-text").value.trim();
  const feedback = $("#question-feedback");
  if (!question) { feedback.textContent = "Escreva sua dúvida antes de continuar."; $("#question-text").focus(); return; }
  const message = `Olá! Vim pelo site da Universo Kids e tenho uma dúvida: ${question}`;
  if (BUSINESS.whatsapp) {
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
    feedback.textContent = "WhatsApp aberto com sua pergunta pronta para enviar.";
    return;
  }
  if (!navigator.clipboard?.writeText) { feedback.textContent = "Selecione e copie sua dúvida para enviar pelo Instagram."; return; }
  const copyAttempt = navigator.clipboard.writeText(message);
  window.open(instagramUrl(), "_blank", "noopener,noreferrer");
  try { await copyAttempt; feedback.textContent = "Dúvida copiada. Cole a mensagem em uma conversa com a loja no Instagram."; }
  catch { feedback.textContent = "Não foi possível copiar automaticamente. Copie sua dúvida antes de enviar pelo Instagram."; }
});

function setupPhotos() {
  $$("[data-photo]").forEach(slot => {
    const img = document.createElement("img");
    img.src = slot.dataset.photo;
    img.srcset = `${slot.dataset.photo.replace(/\.webp$/, "-480.webp")} 480w, ${slot.dataset.photo.replace(/\.webp$/, "-800.webp")} 800w, ${slot.dataset.photo} 1220w`;
    img.sizes = "(max-width: 767px) 100vw, 50vw";
    img.alt = slot.getAttribute("aria-label")?.replace("Espaço reservado para fotografia", "Fotografia") || "Fotografia editorial Universo Kids";
    img.decoding = "async";
    if (!slot.classList.contains("hero-photo")) img.loading = "lazy";
    img.onload = () => { slot.append(img); slot.classList.add("has-photo"); slot.removeAttribute("role"); slot.removeAttribute("aria-label"); };
    img.onerror = () => slot.classList.add("missing-photo");
  });
}

function setupReveals() {
  const items = $$(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) { items.forEach(el => el.classList.add("visible")); return; }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), {threshold:.08, rootMargin:"0px 0px -24px 0px"});
  items.forEach(el => observer.observe(el));
}

configureBusiness();
renderProducts();
setupPhotos();
setupReveals();

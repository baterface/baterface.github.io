const vehicles = ["Citroën Ami","XEV Yoyo","Renault Twizy","X-Trail","Volta EV1","Volta EV2"];
const types = ["Batarya Değişimi","Menzil Artırma","Batarya Arızası"];
let selectedVehicle = "";
let selectedType = "";

const vehicleGrid = document.getElementById("vehicle-grid");
const typeGrid = document.getElementById("type-grid");
const summary = document.getElementById("selection-summary");
const details = document.getElementById("project-details");
const whatsappBtn = document.getElementById("whatsapp-btn");

vehicles.forEach(v => {
  const b = document.createElement("button");
  b.textContent = v;
  b.addEventListener("click", () => {
    selectedVehicle = v;
    [...vehicleGrid.children].forEach(x => x.classList.remove("selected"));
    b.classList.add("selected");
    updateSummary();
  });
  vehicleGrid.appendChild(b);
});

typeGrid.querySelectorAll("button").forEach(b => {
  b.addEventListener("click", () => {
    selectedType = b.dataset.type;
    typeGrid.querySelectorAll("button").forEach(x => x.classList.remove("selected"));
    b.classList.add("selected");
    updateSummary();
  });
});

function updateSummary(){
  if(!selectedVehicle || !selectedType){
    summary.textContent = "Araç ve çözüm türü seçilmedi.";
    whatsappBtn.disabled = true;
    return;
  }
  summary.textContent = `${selectedVehicle} · ${selectedType}`;
  whatsappBtn.disabled = false;
}

whatsappBtn.addEventListener("click", () => {
  const text = `Merhaba BaterFace, Çözüm Talebi oluşturmak istiyorum.%0A%0AAraç: ${selectedVehicle}%0AÇözüm: ${selectedType}%0AProje detayları: ${details.value || "Belirtilmedi"}%0A%0ADetaylı bilgi ve fiyat almak istiyorum.`;
  const phone = "905XXXXXXXXX"; // BURAYA WhatsApp numarasını yaz
  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
});

const modal = document.getElementById("vehicle-modal");
document.getElementById("suggest-vehicle").addEventListener("click", () => modal.classList.add("show"));
document.getElementById("modal-close").addEventListener("click", () => modal.classList.remove("show"));
modal.addEventListener("click", e => { if(e.target === modal) modal.classList.remove("show"); });

document.getElementById("suggestion-send").addEventListener("click", () => {
  const value = document.getElementById("suggestion-input").value.trim();
  if(!value) return;
  alert(`"${value}" araç önerisi alındı.`);
  document.getElementById("suggestion-input").value = "";
  modal.classList.remove("show");
});

document.querySelector(".menu-btn").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});

document.querySelectorAll(".nav a").forEach(a => {
  a.addEventListener("click", () => document.getElementById("nav").classList.remove("open"));
});

const projectSteps = [
  {k:"01 · ARAÇ", title:"Citroën Ami", text:"Aracın mevcut yapısı incelenir ve uygulama alanları belirlenir.", cls:""},
  {k:"02 · TAMPON SÖKÜMÜ", title:"Tampon Sökümü", text:"Arka tampon ve bağlantıları kontrollü şekilde ayrılır. Gerçek proje görselleri bu aşamada kullanılacak.", cls:"open"},
  {k:"03 · EK BATARYA", title:"Ek Batarya", text:"BaterFace ek batarya paketi aracın arka bölümündeki uygun alana yerleştirilir.", cls:"battery"},
  {k:"04 · MONTAJ", title:"Montaj", text:"Batarya bağlantıları ve montaj elemanları kontrol edilir, sistem araç yapısına entegre edilir.", cls:"mount"},
  {k:"05 · TAMAMLANAN PROJE", title:"Tamamlanan Proje", text:"Sistem tamamlanır ve araç günlük kullanıma hazır hale getirilir.", cls:"done"}
];

const amiVisual = document.querySelector(".ami-visual");
const kicker = document.getElementById("ami-kicker");
const amiTitle = document.getElementById("ami-title");
const amiText = document.getElementById("ami-text");
const amiSpecs = document.getElementById("ami-specs");

function setProjectStep(i){
  const s = projectSteps[i];
  document.querySelectorAll(".step").forEach((x,n)=>x.classList.toggle("active",n===i));
  amiVisual.className = "ami-visual " + s.cls;
  kicker.textContent = s.k;
  amiTitle.textContent = s.title;
  amiText.textContent = s.text;
  amiSpecs.innerHTML = i >= 2
    ? `<div><span>Batarya</span><b>Proje verisiyle güncellenecek</b></div>
       <div><span>Kapasite</span><b>Proje verisiyle güncellenecek</b></div>
       <div><span>Montaj</span><b>Araca özel</b></div>`
    : `<div><span>Proje</span><b>Menzil Artırma</b></div>
       <div><span>Yaklaşım</span><b>Araca özel</b></div>`;
}
document.querySelectorAll(".step").forEach(b => b.addEventListener("click",()=>setProjectStep(Number(b.dataset.step))));
setProjectStep(0);

// İletişim WhatsApp linki
document.getElementById("contact-whatsapp").addEventListener("click", e => {
  e.preventDefault();
  window.open("https://wa.me/905XXXXXXXXX", "_blank"); // BURAYA WhatsApp numarasını yaz
});

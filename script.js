const vehicles=['Citroën Ami','XEV Yoyo','Renault Twizy','X-Trail','Volta EV1','Volta EV2'];
let selectedVehicle='',selectedType='';
const vehicleGrid=document.getElementById('vehicle-grid');
const typeGrid=document.getElementById('type-grid');
const summary=document.getElementById('selection-summary');
const whatsappBtn=document.getElementById('whatsapp-btn');
vehicles.forEach(v=>{const b=document.createElement('button');b.textContent=v;b.type='button';b.onclick=()=>{selectedVehicle=v;vehicleGrid.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');updateForm()};vehicleGrid.appendChild(b)});
typeGrid.querySelectorAll('button').forEach(b=>b.onclick=()=>{selectedType=b.dataset.type;typeGrid.querySelectorAll('button').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');updateForm()});
function updateForm(){const ok=selectedVehicle&&selectedType;summary.textContent=ok?`${selectedVehicle} · ${selectedType}`:'Araç ve çözüm türü seçilmedi.';whatsappBtn.disabled=!ok}
const details=document.getElementById('project-details'),count=document.getElementById('char-count');details.addEventListener('input',()=>count.textContent=details.value.length);
whatsappBtn.onclick=()=>{if(whatsappBtn.disabled)return;const phone='905XXXXXXXXX';const text=`Merhaba BaterFace, Çözüm Talebi oluşturmak istiyorum.\n\nAraç: ${selectedVehicle}\nÇözüm: ${selectedType}\nProje detayları: ${details.value||'Belirtilmedi'}\n\nDetaylı bilgi ve fiyat almak istiyorum.`;window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`,'_blank')};
const modal=document.getElementById('vehicle-modal');document.getElementById('suggest-vehicle').onclick=()=>modal.classList.add('show');document.getElementById('modal-close').onclick=()=>modal.classList.remove('show');modal.onclick=e=>{if(e.target===modal)modal.classList.remove('show')};document.getElementById('suggestion-send').onclick=()=>{const v=document.getElementById('suggestion-input').value.trim();if(v){alert(`${v} araç önerisi alındı.`);document.getElementById('suggestion-input').value='';modal.classList.remove('show')}};
const menu=document.querySelector('.menu-btn');menu.onclick=()=>document.getElementById('nav').classList.toggle('open');document.querySelectorAll('#nav a').forEach(a=>a.onclick=()=>document.getElementById('nav').classList.remove('open'));
const caseSticky=document.querySelector('.case-sticky');const steps=[...document.querySelectorAll('.case-step')];const kicker=document.getElementById('case-kicker'),title=document.getElementById('case-title'),text=document.getElementById('case-text'),specs=document.getElementById('case-specs');
const caseData=[
['01','Citroën Ami','Aracın mevcut yapısı, bağlantı noktaları ve batarya yerleşimi incelenir.',['Proje','Menzil artırma'],['Uygulama','Araca özel']],
['02','Tampon Sökümü','Arka tampon kontrollü biçimde sökülür ve bağlantı noktaları açığa çıkarılır.',['İşlem','Tampon sökümü'],['Kontrol','Bağlantı noktaları']],
['03','Batarya Erişimi','Ek bataryanın konumlandırılacağı alan ve kablo güzergâhı hazırlanır.',['Alan','Arka bölüm'],['Yaklaşım','Özel entegrasyon']],
['04','Ek Batarya Montajı','BaterFace ek batarya paketi uygun bağlantı ve sabitleme elemanlarıyla monte edilir.',['Paket','Ek batarya'],['Montaj','Araca özel']],
['05','Montaj Kontrolü','Elektriksel bağlantılar, mekanik sabitleme ve sistem kontrolleri gerçekleştirilir.',['Test','Bağlantı kontrolü'],['Güvenlik','Kontrollü']],
['06','Tamamlanan Proje','Tampon yerine alınır, son kontroller yapılır ve araç teslim aşamasına gelir.',['Sonuç','Menzil artırma'],['Teslim','Kontrol edilmiş']]
];
function setStep(i){const d=caseData[i];steps.forEach((s,n)=>s.classList.toggle('active',n===i));caseSticky.className='case-sticky step-'+i;kicker.textContent=d[0];title.textContent=d[1];text.textContent=d[2];specs.innerHTML=`<div><span>${d[3][0]}</span><b>${d[3][1]}</b></div><div><span>${d[4][0]}</span><b>${d[4][1]}</b></div>`}
steps.forEach(s=>s.onclick=()=>setStep(Number(s.dataset.step)));setStep(0);
const caseSection=document.getElementById('ami-projesi');let ticking=false;window.addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{if(window.innerWidth>900){const r=caseSection.getBoundingClientRect();const max=Math.max(1,caseSection.offsetHeight-window.innerHeight);const p=Math.min(0.999,Math.max(0,(window.scrollY-(caseSection.offsetTop-80))/max));const i=Math.min(5,Math.floor(p*6));setStep(i)}ticking=false})});
const navLinks=[...document.querySelectorAll('#nav a')];const sections=[...document.querySelectorAll('main section[id]')];const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{threshold:.45});sections.forEach(s=>obs.observe(s));

/* ============================================================
   交互逻辑
   ============================================================ */

// Page navigation
function goPage(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  const target = document.getElementById('page-'+page);
  if(target){ target.classList.add('active'); }
  document.querySelectorAll('.nav-link').forEach(l=>l.classList.remove('active'));
  const navPage = (page.indexOf('service-')===0 || page.indexOf('case-')===0) ? 'services' : page;
  const navLink = document.querySelector('.nav-link[data-page="'+navPage+'"]');
  if(navLink){ navLink.classList.add('active'); }
  window.scrollTo({top:0,behavior:'instant'});
  // close mobile nav if open
  const navLinks = document.querySelector('.nav-links');
  if(navLinks.style.display==='flex'){ navLinks.style.display=''; }
}

// Header scroll effect
window.addEventListener('scroll',function(){
  const header=document.getElementById('header');
  if(window.scrollY>10){header.classList.add('scrolled');}else{header.classList.remove('scrolled');}
});

// Mobile nav toggle
function toggleMobileNav(){
  const nav=document.querySelector('.nav-links');
  if(nav.style.display==='flex'){
    nav.style.display='';
  }else{
    nav.style.display='flex';
    nav.style.position='absolute';
    nav.style.top='70px';
    nav.style.left='0';
    nav.style.right='0';
    nav.style.flexDirection='column';
    nav.style.background='#fff';
    nav.style.padding='16px';
    nav.style.boxShadow='var(--shadow-md)';
    nav.style.borderTop='1px solid var(--line)';
  }
}

// Partner filter
function filterPartners(cat){
  document.querySelectorAll('#partnerFilters .chip').forEach(c=>c.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('#partnerWall .logo-tile').forEach(t=>{
    if(cat==='all'||t.dataset.cat===cat){
      t.style.display='flex';
    }else{
      t.style.display='none';
    }
  });
}

// Process step selection
function selectStep(el,index){
  document.querySelectorAll('.pstep').forEach(s=>s.classList.remove('active'));
  el.classList.add('active');
  // animate progress line fill
  const fill=document.getElementById('processFill');
  if(fill){
    const pct=((index+1)/4)*100;
    fill.style.width=pct+'%';
  }
  // update progress dots
  document.querySelectorAll('.pstep').forEach((s,i)=>{
    const dots=s.querySelectorAll('.pstep-dots .d');
    dots.forEach((d,di)=>{
      d.style.background = (di<=i && i<=index || di<=index) ? 'var(--blue)' : 'var(--line)';
      d.style.width = (di===0 && i===index) ? '20px' : '6px';
      d.style.borderRadius = (di===0 && i===index) ? '999px' : '50%';
    });
  });
}

// init process fill on load
window.addEventListener('load',function(){
  const fill=document.getElementById('processFill');
  if(fill){fill.style.width='25%';}
});

// Lightbox
function openLightbox(title,desc,date,valid,code,image){
  document.getElementById('lbTitle').textContent=title;
  document.getElementById('lbDesc').textContent=desc+'。该证书由权威机构审核颁发，代表南京众合信达在相关领域的专业资质与合规经营能力。';
  document.getElementById('lbDate').textContent=date;
  document.getElementById('lbValid').textContent=valid;
  document.getElementById('lbCode').textContent=code;
  document.getElementById('lbOrg').textContent='权威认证机构';
  // set preview icon based on title
  const icons={'高新技术企业':'🏅','专精特新':'⭐','科技型':'🔬','ISO 9001':'📋','ISO 27001':'🔒','ISO 20000':'🖥','ISO 14001':'🌱','管理咨询机构':'📄','工程造价':'📐','人力资源':'👥','发明专利':'⚙','实用新型':'🔧','软件著作权':'💾','商标注册':'™','中国咨询行业':'🏆','年度最佳':'🥇','优秀服务商':'🎖','创新企业奖':'💡','中国企联会员':'🏛','管理咨询协会':'🤝','中小企业协会':'🏢'};
  let icon='🏅';
  for(const key in icons){ if(title.includes(key)){icon=icons[key];break;} }
  const preview=document.getElementById('lbPreview');
  if(image){
    const imageEl=document.createElement('img');
    imageEl.src=image;
    imageEl.alt=title;
    preview.replaceChildren(imageEl);
  }else{
    preview.textContent=icon;
  }
  document.getElementById('lightbox').classList.add('show');
  document.body.style.overflow='hidden';
}
function closeLightbox(e){
  if(e&&e.target.closest('.lb-panel')&&!e.target.closest('.lb-close'))return;
  document.getElementById('lightbox').classList.remove('show');
  document.body.style.overflow='';
}

// Form submit
function submitForm(e){
  e.preventDefault();
  const toast=document.getElementById('toast');
  toast.textContent='✓ 咨询已提交，我们将在 24 小时内联系您';
  toast.style.opacity='1';
  toast.style.transform='translateX(-50%) translateY(0)';
  setTimeout(()=>{
    toast.style.opacity='0';
    toast.style.transform='translateX(-50%) translateY(100px)';
  },3500);
  e.target.reset();
}

// Esc to close lightbox
document.addEventListener('keydown',function(e){
  if(e.key==='Escape'){closeLightbox();}
});

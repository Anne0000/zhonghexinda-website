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

// 企业认证服务分类申报指南（根据用户提供的 Excel 整理）
const serviceGuideData={
  pp:[
    ['ISO 9001 质量管理体系认证','国际通用质量管理体系，适合作为企业合规经营和市场准入的基础认证。','依法成立并明确认证范围、场所；质量体系已建立并有效运行。','质量手册与程序文件；内审和管理评审；运行记录；接受一、二阶段审核及监督。','管理体系认证'],
    ['IATF 16949 汽车质量管理体系认证','汽车行业专用质量管理体系，面向整车厂供应链。','具备合法主体和汽车产品制造/装配过程；体系基于 ISO 9001 并满足 IATF 要求。','按适用过程应用 APQP、PPAP、FMEA、SPC、MSA；完成过程审核、产品审核并接受授权机构审核。','汽车行业管理体系认证'],
    ['ISO 14001 环境管理体系认证','环境管理体系国际标准，证明企业环境管理合规。','营业执照有效且范围一致；环境体系有效运行；识别环境因素并履行环保义务。','环境因素识别与合规评价；内审、管理评审；按适用情形准备环评、排污许可、危废和监测记录。','管理体系认证'],
    ['ISO 45001 职业健康安全管理体系认证','关注员工安全与健康管理的国际体系标准。','具备合法主体；体系运行不少于 3 个月；近一年无重大安全生产事故。','危险源辨识与风险评价；职业健康安全目标和方案；特种作业及体检资料；内审和管理评审。','管理体系认证'],
    ['ISO 10012 测量管理体系认证（AAA级）','测量管理体系认证，确保计量数据准确可靠。','具备合法主体；测量体系有效运行；关键测量过程和设备受控、校准或检定。','明确方针目标和职责；建立设备确认、溯源和记录；按申请等级证明数据可追溯。','测量管理体系认证'],
    ['ISO/IEC 17025 实验室认可','检测/校准实验室能力认可，证明数据可信。','实验室具有明确法律地位；体系有效运行；人员、设备、设施和方法与认可领域匹配。','人员能力证明；设备溯源和环境条件；方法确认或验证；按 CNAS 准则接受评审。','实验室认可'],
    ['CCC 强制性产品认证','列入目录的产品取得后方可出厂销售的强制认证。','产品属于现行 CCC 目录；申请人合法；产品符合国家标准并具备稳定生产条件。','提交技术资料和样品；完成型式试验、工厂检查；获证后接受年度监督。','强制性产品认证'],
    ['CE 标志认证','欧盟市场准入的合格评定标志。','产品属于适用法规/指令范围；制造商完成法规识别、风险评估和合格评定。','确认协调标准；编制技术文件并签署 DoC；法规要求时由公告机构介入；持续保留文件。','欧盟合格评定'],
    ['质量奖（省长/市长质量奖）','省、市级政府质量荣誉，关注卓越绩效和行业示范。','按省、市当年度规则核对注册年限、质量安全记录、经营指标和体系基础。','提交卓越绩效自评、财务与纳税材料；接受资料/现场评审、答辩和公示。','政府质量荣誉'],
    ['质量信用等级 AA/AAA','江苏企业质量信用等级评价，影响招投标和融资。','江苏注册且具备独立法人资格；AA/AAA 按当年度规则和等级路径申请。','首席质量官制度；质量信用管理四维度达标；AAA 需更严格现场核查。','质量信用评价'],
    ['江苏精品','江苏省高端品牌认证和重点品牌培育项目。','江苏注册；产品有市场和品牌基础；通过 ISO 9001 或等效体系；近三年无重大质量安全事故。','产品指标达到先进水平；接受检测、现场审核和专家评审。','区域品牌认证'],
    ['质量标杆企业 / 精益标杆企业','省级质量或精益管理示范荣誉，需分别核验。','省内注册满 3 年；体系有效运行；近三年无重大质量、安全事故。','提交质量管理或精益改善案例、量化成效和经验总结；接受现场评审。','质量/精益管理荣誉'],
    ['工业产品生产许可证','目录内特定工业产品生产所需的行政许可。','产品属于现行许可证目录；厂房、设备、检验仪器和专业人员匹配。','提交申请和生产条件资料；接受现场核查；产品抽检合格并按规则复审。','行政许可'],
    ['团体标准 / 企业标准','通过标准制定体现行业话语权和技术影响力。','团体标准由合法社会团体组织制定；企业标准由企业制定并公开声明；指标不得低于强制性标准。','完成起草、征求意见、审查、发布或自我声明公开流程。','标准制定/公开'],
  ],
  kj:[
    ['高新技术企业认定','核心科技资质，认定后企业所得税按政策可享受优惠。','成立一年以上；拥有核心知识产权；科技人员、研发费用、高新收入等指标按现行认定办法达标。','准备知识产权、科研项目、成果转化、研发费用审计、财务报告和纳税申报材料。','国家级企业资质'],
    ['工程技术研究中心（省级）','省级研发平台认定，体现工程化研发实力。','江苏注册；研发场地、设备、重大科技成果和科研计划经历按当年度通知核对。','研发团队和技术带头人；人才激励与知识产权制度；接受科技/发改部门评审。','研发平台认定'],
    ['科技型中小企业评价入库','科技部评价入库，常作为高企和科技项目的基础条件。','中国境内居民企业；规模、产业、信用条件符合；综合评价不低于 60 分且科技人员指标不为 0。','按科技人员、研发投入、科技成果三类指标填报；符合直通车条件的仍需满足主体和信用条件。','科技企业评价入库'],
    ['中国专利奖','知识产权领域国家级荣誉，关注专利质量和转化效益。','专利权有效且无纠纷；全体权利人同意参评；按届次规则由省级部门或国务院部门推荐。','提交专利质量、实施转化、经济社会效益和专利管理材料。','国家级知识产权荣誉'],
    ['知识产权战略推进工程','企业知识产权战略制定与实施项目。','省内注册；有效专利数量、发明专利数量和信用记录按当年度项目要求核对。','制定战略方案；开展专利导航和预警；推动专利产业化并形成成效。','知识产权政策项目'],
    ['重点实验室（省级）','省级高能级研发机构认定。','研究方向有特色；主任和团队条件、场地设备规模按省级通知核对。','承担国家/省级科研项目；形成论文、专利等成果；开放合作并具备转化能力。','高能级研发平台'],
    ['民营科技企业认定','省级科技型民营企业备案/认定。','省内民营企业经营满一年；科技人员、研发投入、知识产权和信用条件符合年度要求。','提交申请、营业执照及研发投入、人员、知识产权证明。','科技企业备案/认定'],
    ['科技成果转化认定','科技成果市场化转化项目认定。','拥有自主知识产权成果；已产业化或规模化应用并产生经济效益。','提供成果评价/鉴定、转化协议及审计、合同等效益证明。','科技成果转化项目'],
    ['产学研合作项目','企业与高校院所联合研发的项目支持。','签订正式合作协议；项目目标明确；企业有实际研发投入。','提供合作协议、经费支出和阶段成果或验收报告。','产学研合作项目'],
    ['GB/T 29490 知识产权管理规范认证','企业知识产权合规管理体系认证。','营业执照有效；体系运行不少于 3 个月；完成内审、管理评审并配备合格管理人员。','建立方针目标、职务发明奖励和运行记录；接受认证机构两阶段审核。','知识产权管理体系认证'],
    ['国际合作项目','与海外高校、机构或企业开展的科技合作项目。','签订正式合作协议；方向符合国家或江苏国际科技合作重点；主体资格合规。','提供中英文协议、研发内容、预期成果和双方投入证明。','国际科技合作项目'],
    ['DB32/T 2771 企业研发管理体系','江苏省企业研发管理地方标准评价。','江苏注册；研发体系运行不少于 3 个月；有研发活动和投入。','建立研发规划、项目管理、成果转化制度；研发投入独立核算并接受评价。','地方标准/研发管理评价'],
  ],
  gx:[
    ['企业技术中心认定（国家级/省级）','工业和信息化主管部门认定的企业研发机构。','按国家、省、市级当年度通知核对研发投入、人员、设备和前置条件。','建立成果转化与产学研机制；提供财务、研发投入和创新能力证明；接受专家评审。','企业技术中心认定'],
    ['工程研究中心（省级）','发改系统工程化研发平台，侧重成果工程化和产业化。','研发场地、设备、重大成果、科研计划经历和产业化前景按当年度规则核对。','完善人才激励和知识产权制度；鼓励产学研共建；接受专家评审。','工程研究中心认定'],
    ['绿色工厂','绿色制造体系认定，评价资源能源和生产过程的低碳水平。','具备独立法人资格；绿色制造制度有效；无重大安全、环保、质量事故或严重失信。','开展企业自评价；准备用地、原料、生产、废物和能源资源数据；接受推荐、核查和动态管理。','绿色制造认定'],
    ['智能工厂（先进级/卓越级/领航级）','智能制造能力梯度认定，体现工厂数字化和智能化水平。','江苏规模以上工业企业；经营正常；关键装备自主可控；数字基础设施已运行。','按年度指南准备生产、管理、运营和产业链协同场景及数据应用成效。','智能制造梯度培育'],
    ['互联网标杆工厂','工业互联网与制造业融合示范认定。','已具备智能工厂或同等数字化水平；有平台应用和数据驱动案例。','提交标杆经验、平台运行、设备联网、投入产出和可复制推广材料。','工业互联网示范'],
    ['5G全连接工厂','以 5G 支撑全流程数字化、网络化、智能化的示范工厂。','重点行业企业具备独立法人资格；无重大事故；不是单纯网络建设项目。','按建设指南准备网络覆盖、典型场景、安全保障和前后对比数据。','5G+工业互联网示范'],
    ['江苏省转型升级专项资金','支持企业技术改造和产业转型的省级专项资金项目。','江苏注册；符合产业政策；项目列入重点计划；投资门槛按年度通知核对。','提交项目报告、备案文件、设备合同发票并接受现场核查和审计。','专项资金项目'],
    ['数改智转（数字化转型·智能化改造）','江苏重点推进的数字化、智能化改造政策方向。','江苏制造业企业；有明确改造项目；投资和信用条件按属地规则核对。','提交诊断报告、改造方案和投资明细，验收后按政策申请补贴。','数字化改造项目'],
    ['企业上云（星级上云企业）','江苏星级上云企业评定，分三星级至五星级。','江苏注册满一年且经营正常；已采购公有云服务；星级路径和连续使用时间按年度规则核对。','按基础设施、核心业务和全业务上云准备系统集成、使用记录和投入凭证。','企业上云认定'],
    ['首台（套）重大技术装备保险补偿','降低国产新装备推广风险的保费补贴项目。','装备符合指导目录；已有用户采购和销售合同；具备检测/合格证明且无重大事故和失信。','提供技术参数、销售合同、交付证明和首台套综合保险凭证。','重大装备政策补贴'],
    ['两化融合试点 / GB/T 23001 贯标','信息化和工业化融合管理体系及试点项目。','大陆注册满一年；无重大事故和行政处罚；核心信息系统运行不少于 3 个月。','按 A/AA/AAA 等级准备体系文件、内审、管理评审和评定材料；试点与贯标分别核验。','两化融合认证/项目'],
    ['三位一体','江苏制造业技术改造、数字化和管理提升综合项目。','江苏规模以上工业企业；有系统性转型方案；投资和信用条件按年度通知核对。','提交综合转型方案、分项投资合同发票并接受验收评审。','综合转型项目'],
  ],
  qt:[
    ['人才类','双创人才、高层次人才等人才计划申报，可对应安家费或项目资助。','学历/职称、经历、岗位、企业投入和信用条件随具体人才计划核对。','准备申报书、身份学历、科技成果和专利材料，接受答辩或考察。','人才计划/项目'],
    ['金融类','融资对接、信贷支持、上市辅导等金融服务。','主体资格、经营财务状况、信用记录和融资需求符合具体政策。','提供审计报告、融资用途和还款来源；上市辅导另按证券市场准入条件核对。','金融服务/融资政策'],
    ['财税类','研发费用加计扣除和高新技术企业税收优惠等筹划服务。','会计核算健全并查账征收；研发费用可准确归集；按年度政策核对适用主体和比例。','编制研发费用归集表，留存立项/结题等备查资料，在年度汇算清缴时申报。','财税政策服务'],
    ['5S管理','整理、整顿、清扫、清洁、素养组成的现场管理改善服务。','管理层愿意推动；有固定生产或办公现场；愿意投入人力和时间持续改善。','围绕五个环节建立现场标准、检查机制和改善记录。','管理咨询/现场改善'],
    ['精益生产','以消除浪费和持续改善为核心的生产管理咨询。','具备一定生产规模；管理层认同变革；已实施或同步实施 5S。','开展价值流分析，改善七大浪费、JIT、自动化、持续改善和标准化作业。','精益生产管理咨询'],
  ]
};
const guideAuthority={
  pp:'认证机构、市场监管部门或标准组织（按项目）',
  kj:'科技主管部门、知识产权部门、CNAS 或认证机构（按项目）',
  gx:'工信、发展改革主管部门及评定机构（按项目）',
  qt:'人社、科技、金融、税务部门及咨询机构（按项目）'
};

function renderServiceGuides(){
  Object.keys(serviceGuideData).forEach(function(key){
    const page=document.getElementById('page-service-'+key);
    if(!page||page.querySelector('.service-guide-section'))return;
    const section=document.createElement('section');
    section.className='section service-guide-section';
    section.style.background='var(--bg-soft)';
    section.innerHTML='<div class="container"><div class="sec-head text-center"><span class="eyebrow dark"><span class="dot"></span>申报指南</span><h2 class="title">'+({pp:'品牌质量类',kj:'科技知识产权类',gx:'工信发改类',qt:'其他类别'}[key])+'项目清单</h2><p class="lead">项目名称、申报条件与核心要求根据企业认证服务分类申报指南整理，具体以当年度通知为准。</p></div><div class="service-guide">'+serviceGuideData[key].map(function(item){const points=function(text){return text.split('；').map(function(point){return point.trim().replace(/^\\d+[.、]\\s*/,'');}).filter(function(point){return point&&!/^[^：]{1,12}：$/.test(point);}).map(function(point){return '<li>'+point+'</li>';}).join('');}; return '<article class="guide-card"><span class="guide-kind">'+item[4]+'</span><h4>'+item[0]+'</h4><p>'+item[1]+'</p><span class="guide-label">申报条件</span><ol class="guide-points">'+points(item[2])+'</ol><span class="guide-label">核心要求</span><ol class="guide-points">'+points(item[3])+'</ol><div class="guide-meta"><span><strong>主管部门</strong> '+guideAuthority[key]+'</span></div></article>';}).join('')+'</div></div>';
    const ctas=page.querySelectorAll('section.section-sm');
    if(ctas.length)page.insertBefore(section,ctas[ctas.length-1]);
    else page.appendChild(section);
  });
}
renderServiceGuides();

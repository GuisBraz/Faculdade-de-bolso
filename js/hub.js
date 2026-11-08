/* FACULDADE DE BOLSO · hub (carregado por js/boot.js depois que os dados estão prontos) */
const D = window.FACULDADE || {periodos:[]};
/* modo: local (sem conta configurada), admin (Gui logado) ou visitante */
const MODE=window.FDB_MODE||'local', VIS=MODE==='visitante';
if(VIS){ const cur=D.periodos.find(p=>p.atual)||D.periodos[0];
  D.periodos=cur?[{...cur,materias:(cur.materias||[]).filter(m=>(m.arquivos||[]).length).map(({status,professor,codigo,...m})=>m)}]:[]; D.aluno='';
  document.body.classList.add('vis'); const tp=document.querySelector('.top p'); if(tp) tp.textContent='Estude as matérias do semestre de forma prática, organizada e no seu ritmo.' }
const ICONS = {
  vetor:'<path d="M4 20 18 6"/><path d="M12 6h6v6"/>',
  calculo:'<path d="M15 3c-2 0-2.6 2-3 5l-1.8 9c-.5 3-1.2 4-3.2 4"/>',
  fisica:'<circle cx="12" cy="12" r="1.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="3.6" transform="rotate(120 12 12)"/>',
  quimica:'<path d="M9 3h6"/><path d="M10 3v6l-5.4 9.3A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.7-2.7L14 9V3"/><path d="M7.5 15h9"/>',
  programacao:'<path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m13.5 5-3 14"/>',
  desenho:'<path d="M4 20V4l16 16z"/><path d="M8 16v-3.5l3.5 3.5z"/>',
  engrenagem:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1 7 17M17 7l2.1-2.1"/><circle cx="12" cy="12" r="6.5"/>',
  materiais:'<path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z"/><path d="M12 12l8-4.5M12 12v9M12 12 4 7.5"/>',
  estatistica:'<path d="M3 20h18"/><path d="M6 20v-8M11 20V5M16 20v-6M20.5 20V9"/>',
  termo:'<path d="M10 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0z"/><path d="M12 9v7"/>',
  fluidos:'<path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/><path d="M9 15a3 3 0 0 0 3 3"/>',
  eletrica:'<path d="M13 2 5 14h6l-1 8 8-12h-6z"/>',
  estrutura:'<path d="M2 18h20"/><path d="M3 18 7.5 9l4.5 9 4.5-9 4.5 9"/><path d="M7.5 9h9"/>',
  usinagem:'<path d="M3 9h9v6H3z"/><path d="M12 10.5h5l4 1.5-4 1.5h-5"/><path d="M6 15v4M9 15v4"/>',
  solda:'<path d="m3 21 9-9"/><path d="m12 12 3-3 2 2-3 3z"/><path d="M18 3v2M21 6h-2M20 4l-1.5 1.5"/>',
  gestao:'<path d="m3 18 6-6 4 3 8-9"/><path d="M15 6h6v6"/>',
  texto:'<path d="M5 5h14M5 10h14M5 15h14M5 20h8"/>',
  pesquisa:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/>',
  livro:'<path d="M5 4.5A1.5 1.5 0 0 1 6.5 3H19v15H6.5A1.5 1.5 0 0 0 5 19.5z"/><path d="M5 19.5A1.5 1.5 0 0 0 6.5 21H19v-3"/>',
  pessoas:'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0"/><circle cx="17" cy="9" r="2.4"/><path d="M16 14.2a5 5 0 0 1 5.5 5.8"/>',
  cubo:'<path d="M12 3 20 7.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5 12 12l8-4.5M12 12v9"/><path d="M8 5.3l8 4.5" stroke-dasharray="2 2"/>',
  onda:'<path d="M2 12c2.5-6 5-6 7.5 0s5 6 7.5 0 3.5-4 5-2"/>',
  regua:'<path d="M3 15 15 3l6 6L9 21z"/><path d="M7 11l2 2M10 8l1.5 1.5M13 5l2 2M8.5 14.5 10 16M11.5 11.5 13 13"/>',
  viga:'<path d="M3 8h18M3 16h18M7 8v8M12 8v8M17 8v8"/><path d="M3 20l3-4M21 20l-3-4"/>',
  prensa:'<path d="M5 3h14v4H5zM12 7v6"/><path d="M8 13h8l-1 3H9z"/><path d="M3 21h18M6 21v-3h12v3"/>',
  manometro:'<circle cx="12" cy="11" r="7.5"/><path d="M12 11l3.5-3.5"/><path d="M12 18.5V22M9 22h6"/>',
  malha:'<path d="M3 3h18v18H3z"/><path d="M3 3l18 18M3 12h18M12 3v18M12 3l9 9M3 12l9 9"/>',
  pistao:'<path d="M7 3h10v7H7z"/><path d="M7 6h10"/><circle cx="12" cy="13.5" r="1.3"/><path d="M12 14.8 9 21"/><circle cx="9" cy="21" r=".6"/>',
  fluxo:'<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h16a3 3 0 1 1-3 3"/><path d="M3 16h7"/>',
  folha:'<path d="M5 19C5 9 11 4 20 4c0 9-5 15-15 15z"/><path d="M5 19 13 11"/>',
  chip:'<path d="M7 7h10v10H7z"/><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4"/>',
  injecao:'<path d="M3 9h10v6H3z"/><path d="M13 10.5h3l5-2.5v8l-5-2.5h-3"/><path d="M6 9V5h4v4"/>',
  fabrica:'<path d="M3 21V10l5 3V10l5 3V5h4v16z"/><path d="M3 21h18M17 9h4v12"/>',
  moeda:'<circle cx="12" cy="12" r="9"/><path d="M15 8.5c-.6-.9-1.7-1.5-3-1.5-1.7 0-3 .9-3 2.3 0 3.2 6 1.6 6 4.9 0 1.4-1.4 2.3-3 2.3-1.4 0-2.6-.6-3.2-1.6M12 5v2M12 17v2"/>',
  chave:'<path d="M14.5 4a4.5 4.5 0 0 0-4.3 5.8L3 17v4h4l7.2-7.2A4.5 4.5 0 1 0 14.5 4z"/><path d="M16 8h.01"/>',
  selo:'<circle cx="12" cy="9" r="6"/><path d="m9.5 9 1.8 1.8L15 7.3"/><path d="M8.5 14 7 21l5-2.5 5 2.5-1.5-7"/>',
  balanca:'<path d="M12 3v18M7 21h10M5 7h14"/><path d="M5 7 2.5 13a3 3 0 0 0 5 0zM19 7l-2.5 6a3 3 0 0 0 5 0z"/>',
  robo:'<path d="M5 9h14v10H5z"/><path d="M12 9V5M10 4h4"/><circle cx="9" cy="13.5" r="1.2"/><circle cx="15" cy="13.5" r="1.2"/><path d="M9.5 17h5M2 12v4M22 12v4"/>',
  capacete:'<path d="M3 18h18v2H3z"/><path d="M4.5 18a7.5 7.5 0 0 1 15 0"/><path d="M10 10.8V6h4v4.8"/>'
};
const icon = k => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+(ICONS[k]||ICONS.livro)+'</svg>';
const ST = {aprovada:'✓ aprovada',reprovada:'reprovada',cursando:'cursando'};
const TIPOS = {site:'Site',pdf:'PDF',resumo:'Resumo',lista:'Lista',prova:'Prova',link:'Link'};
const esc = s => String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const fdate = d => { if(!d) return ''; const [y,m,dd]=d.split('-'); return dd+'/'+m+'/'+y };
const AR = D.areas||{};
const MATS = [...D.periodos.flatMap(p=>(p.materias||[]).map(m=>({...m,periodo:p.numero,cor:m.cor||(AR[m.area]||{}).cor||'#D9531A',arquivos:m.arquivos||[]}))),
  ...(D.extras||[]).map(m=>({...m,periodo:0,extra:true,cor:m.cor||(AR[m.area]||{}).cor||'#D9531A',arquivos:m.arquivos||[]}))];
const onde=m=>m.extra?'projeto complementar':m.periodo+'º período';
let OV={}; try{ OV=JSON.parse(localStorage.getItem('fdb-status')||'{}')||{} }catch(e){}
MATS.forEach(m=>{ m._base=m.status||''; if(m.id in OV) m.status=OV[m.id]||'' });
let EDIT=false; const SHOWP={past:false,fut:false}; let SELP=null;
function setSt(id,st){ const m=MATS.find(x=>x.id===id); if(!m)return; m.status=st; if(st===m._base) delete OV[id]; else OV[id]=st;
  try{ localStorage.setItem('fdb-status',JSON.stringify(OV)) }catch(e){} renderHome(); if(location.hash==='#m-'+id) renderMat(id) }
const OPTS=[['','não cursada'],['cursando','cursando'],['aprovada','aprovada'],['reprovada','reprovada']];
const stBtns=m=>'<div class="stsel" role="group" aria-label="Situação de '+esc(m.sigla)+'">'+OPTS.map(([v,l])=>'<button type="button" data-id="'+esc(m.id)+'" data-s="'+v+'" class="'+v+((m.status||'')===v?' on':'')+'" aria-pressed="'+((m.status||'')===v)+'">'+l+'</button>').join('')+'</div>';
const FILES = MATS.flatMap(m=>m.arquivos.map(a=>({...a,mat:m})));
const norm = s => String(s||'').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');

function isOpen(a){ return !!a.ciclo && a.aberta!==false && (!a.ate || daysTo(a.ate)>=0) }
function cyChip(a){ if(!a.ciclo) return ''; if(isOpen(a)){ const n=a.ate?daysTo(a.ate):null; return '<span class="cy on">em construção · '+esc(a.ciclo)+(n!=null?' · prova '+cdTxt(n):'')+'</span>' } return '<span class="cy">'+esc(a.ciclo)+' · fechada</span>' }
function fileRow(a,showMat){
  const ext = /^https?:/.test(a.caminho);
  return '<a class="file" style="--mc:'+esc(a.mat.cor)+'" href="'+esc(a.caminho)+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'+
    '<span class="badge">'+esc(TIPOS[a.tipo]||a.tipo||'Arquivo')+'</span>'+
    '<h3>'+esc(a.titulo)+'</h3><span class="go">Abrir →</span>'+(a.ciclo?'<div class="meta">'+cyChip(a)+'</div>':'')+
    '<div class="meta">'+(showMat?'<span class="from">'+esc(a.mat.sigla)+' · '+onde(a.mat)+'</span><br>':'')+esc(a.descricao)+
    '<small>'+[fdate(a.data),...(a.tags||[]).map(t=>'#'+t)].filter(Boolean).map(esc).join(' · ')+'</small></div></a>';
}
function matCard(m){
  const n=m.arquivos.length, st=m.status||'';
  if(EDIT) return '<div class="mat edit'+(st?' '+st:'')+'" style="--mc:'+esc(m.cor)+'"><span class="ic">'+icon(m.icone)+'</span><span class="sg">'+esc(m.sigla)+'</span><span class="nm">'+(m.nome===m.sigla?'&nbsp;':esc(m.nome))+'</span>'+stBtns(m)+'</div>';
  return '<a class="mat'+(n?'':' empty')+(st?' '+st:'')+'" style="--mc:'+esc(m.cor)+'" href="#m-'+esc(m.id)+'"><span class="ic">'+icon(m.icone)+'</span><span class="sg">'+esc(m.sigla)+'</span><span class="nm">'+(m.nome===m.sigla?'&nbsp;':esc(m.nome))+'</span>'+
    '<span class="n"><span>'+(ST[st]?'<span class="st">'+ST[st]+'</span> ':'')+(m.arquivos.some(isOpen)?'<b>oficina aberta</b>':n?'<b>'+n+'</b> '+(n===1?'material':'materiais'):(ST[st]?'':'sem materiais ainda'))+'</span><span>'+(m.extra?'extra':m.ch?m.ch+' h':m.periodo+'º')+'</span></span></a>';
}
function renderHome(){
  document.getElementById('curso').textContent=[D.curso,D.instituicao].filter(Boolean).join(' · ');
  document.getElementById('foot').textContent=[D.aluno,D.instituicao].filter(Boolean).join(' · ');
  const rec=[...FILES].sort((a,b)=>String(b.data).localeCompare(String(a.data))).slice(0,3);
  document.getElementById('recentWrap').hidden=!rec.length;
  document.getElementById('recent').innerHTML=rec.map(a=>'<a class="rc" style="--mc:'+esc(a.mat.cor)+'" href="'+esc(a.caminho)+'" title="'+esc(a.descricao||'')+'"><span class="ic">'+icon(a.mat.icone)+'</span><span class="rt"><b>'+esc(a.titulo)+'</b><small>'+esc(a.mat.sigla)+' · '+fdate(a.data)+'</small></span><span class="go">→</span></a>').join('');
  const pst=p=>{ const ms=MATS.filter(m=>m.periodo===p.numero); const ok=ms.filter(m=>m.status==='aprovada'), rp=ms.filter(m=>m.status==='reprovada');
    const tot=ms.reduce((a,m)=>a+(m.ch||0),0), done=ok.reduce((a,m)=>a+(m.ch||0),0);
    return {ms,ok,rp,tot,done,closed:ms.length>0&&ms.every(m=>m.status==='aprovada'||m.status==='reprovada'),full:ms.length>0&&ok.length===ms.length} };
  const P=D.periodos.map(p=>({p,...pst(p)}));
  const T=P.reduce((a,x)=>a+x.tot,0), Dn=P.reduce((a,x)=>a+x.done,0), pct=T?Dn/T*100:0;
  const nOk=P.reduce((a,x)=>a+x.ok.length,0), nRp=P.reduce((a,x)=>a+x.rp.length,0), nCur=MATS.filter(m=>m.status==='cursando').length, nClosed=P.filter(x=>x.full).length;
  const pctT=(pct<10&&pct>0?pct.toFixed(1).replace('.',','):Math.floor(pct))+'%';
  const pg=document.getElementById('prog'); pg.title=Dn.toLocaleString('pt-BR')+' de '+T.toLocaleString('pt-BR')+' h · '+nOk+' de '+MATS.filter(m=>!m.extra).length+' matérias aprovadas · '+nClosed+' de '+P.length+' períodos concluídos'+(nCur?' · '+nCur+' cursando':'')+(nRp?' · '+nRp+' reprovada(s) a refazer':'');
  pg.innerHTML='<span>Progresso</span><span class="mbar">'+P.map(x=>'<i class="'+(x.p.atual?'cur':'')+'" style="flex:'+x.tot+'"><em style="width:'+(x.tot?x.done/x.tot*100:0)+'%"></em></i>').join('')+'</span><b>'+pctT+'</b>'+(nRp?'<span class="rp">· '+nRp+' a refazer</span>':'');
  const curN0=(D.periodos.find(p=>p.atual)||{}).numero||1; if(SELP==null) SELP=curN0;
  document.getElementById('jump').innerHTML=P.map(x=>'<button data-p="'+x.p.numero+'" aria-pressed="'+(SELP===x.p.numero)+'" class="'+(SELP===x.p.numero?'on ':'')+(x.full?'done':'')+'">'+(x.full?'✓ ':'')+x.p.numero+'º</button>').join('')+(MATS.some(m=>m.extra)?'<button data-x="1" aria-pressed="'+(SELP==='X')+'" class="'+(SELP==='X'?'on':'')+'">Extras</button>':'');
  document.querySelectorAll('#jump button[data-x]').forEach(b=>b.onclick=()=>{ SELP='X'; renderHome() });
  document.querySelectorAll('#jump button[data-p]').forEach(b=>b.onclick=()=>{ SELP=+b.dataset.p; renderHome() });
  const eb=document.getElementById('editBtn'); eb.textContent=EDIT?'✓ Concluir':'Dar baixa nas matérias'; eb.classList.toggle('on',EDIT); eb.setAttribute('aria-pressed',EDIT);
  document.getElementById('editPanel').hidden=!EDIT;
  const curN=(D.periodos.find(p=>p.atual)||{}).numero||1;
  const vis=x=>EDIT||x.p.numero===SELP;
  const hidPast=P.filter(x=>x.p.numero<curN&&!vis(x)), hidFut=P.filter(x=>x.p.numero>curN&&!vis(x));
  const rng=a=>a.length?(a.length===1?a[0].p.numero+'º':a[0].p.numero+'º ao '+a[a.length-1].p.numero+'º'):'';
  document.getElementById('pshow').innerHTML=(true?'':
    (hidPast.length||SHOWP.past&&P.some(x=>x.p.numero<curN)?'<button type="button" data-g="past">'+(SHOWP.past?'Ocultar períodos anteriores':'Mostrar períodos anteriores · '+rng(hidPast))+'</button>':'')+
    (hidFut.length||SHOWP.fut&&P.some(x=>x.p.numero>curN)?'<button type="button" data-g="fut">'+(SHOWP.fut?'Ocultar próximos períodos':'Mostrar próximos períodos · '+rng(hidFut))+'</button>':''));
  document.querySelectorAll('#pshow button').forEach(b=>b.onclick=()=>{ SHOWP[b.dataset.g]=!SHOWP[b.dataset.g]; renderHome() });
  document.getElementById('periodos').innerHTML=P.filter(vis).map(x=>{
    const p=x.p, ms=x.ms, nf=ms.reduce((s,m)=>s+(m.arquivos||[]).length,0);
    const info=ms.length+' matérias'+(p.ch?' · '+p.ch+' h':'')+(nf?' · '+nf+(nf===1?' material':' materiais'):'');
    const grid='<div class="grid">'+MATS.filter(m=>m.periodo===p.numero).map(matCard).join('')+'</div>';
    if(x.closed&&!EDIT){
      const tag=x.full?'<span class="pill ok">concluído · 100%</span>':'<span class="pill bad">'+x.rp.length+' '+(x.rp.length===1?'reprovada':'reprovadas')+'</span>';
      return '<details class="periodo" id="p'+p.numero+'"><summary><div class="ruler"><h2>'+p.numero+'º período</h2>'+tag+'<span class="ticks"></span><span class="tg">'+info+'</span></div></summary>'+grid+'</details>' }
    return '<section class="periodo'+(p.atual?' now':'')+'" id="p'+p.numero+'"><div class="ruler"><h2>'+p.numero+'º período</h2>'+(p.atual?'<span class="pill">cursando</span>':'')+'<span class="ticks"></span><span class="ct">'+info+(x.done?' · '+Math.round(x.done/x.tot*100)+'%':'')+'</span></div>'+grid+'</section>' }).join('')+(EDIT||SELP==='X'?extrasHTML(true):'');
}
function extrasHTML(){ const ex=MATS.filter(m=>m.extra); if(!ex.length||EDIT) return '';
  return '<section class="periodo extras" id="pX"><div class="ruler"><h2>Projetos complementares</h2><span class="pill gh">extra</span><span class="ticks"></span><span class="ct">'+ex.length+(ex.length===1?' matéria':' matérias')+' fora dos semestres · não entram no progresso</span></div><div class="grid">'+ex.map(matCard).join('')+'</div></section>' }
function renderMat(id){
  const m=MATS.find(x=>x.id===id), box=document.getElementById('materia');
  if(!m){ location.hash=''; return }
  document.title=m.sigla+' · Faculdade de Bolso';
  box.innerHTML='<a class="back" href="#">← Todas as matérias</a>'+
    '<div class="mhead" style="--mc:'+esc(m.cor)+'"><span class="ic">'+icon(m.icone)+'</span><div><div class="eyebrow">'+onde(m)+' · '+esc(m.sigla)+'</div><h1>'+esc(m.nome)+'</h1>'+'<p>'+[m.codigo||'',m.ch?m.ch+' h':'',m.professor?'Prof. '+esc(m.professor):'',ST[m.status]||''].filter(Boolean).join(' · ')+'</p>'+(aulasDe(m.id).length?'<p class="mono" style="font-size:.8rem">Aulas: '+aulasDe(m.id).map(a=>DIAS[a.dia]+' '+H.faixas[a.faixa].inicio).join(' · ')+'</p>':'')+'</div></div>'+
    '<div class="stbox"><span class="eyebrow">Situação</span>'+stBtns(m)+'</div>'+
    ((window.PROVAS||[]).some(x=>x.materia===m.id)?'<div class="eyebrow">Provas</div><div class="mprov">'+(typeof PR!=='undefined'?PR:[]).filter(x=>x.materia===m.id).map(provRow).join('')+'</div>':'')+
    (m.arquivos.length?(()=>{ const all=[...m.arquivos].map(a=>({...a,mat:m})).sort((a,b)=>String(b.ate||b.data).localeCompare(String(a.ate||a.data)));
      const op=all.filter(isOpen), cl=all.filter(a=>!isOpen(a));
      const upd=a=>(a.atualizacoes&&a.atualizacoes.length)?'<ul class="upd">'+[...a.atualizacoes].sort((x,y)=>y.data.localeCompare(x.data)).slice(0,6).map(u=>'<li><span>'+fdate(u.data).slice(0,5)+'</span>'+esc(u.texto)+'</li>').join('')+'</ul>':'';
      return (op.length?'<div class="eyebrow" style="margin-bottom:8px">'+(m.extra?'Oficina contínua · vai acumulando conteúdo':'Oficina aberta · acumulando até a prova')+'</div><div class="files">'+op.map(a=>fileRow(a,false)+upd(a)).join('')+'</div>':'')+
        (cl.length?'<div class="eyebrow" style="margin:26px 0 8px">'+(op.length?'Oficinas anteriores':'Materiais')+'</div><div class="files">'+cl.map(a=>fileRow(a,false)).join('')+'</div>':'') })()
      :'<div class="blank"><b>Nada aqui ainda</b>Os materiais desta matéria vão aparecer aqui assim que forem adicionados.</div>');
}
function route(){
  const h=location.hash.slice(1);
  const isMat=h.startsWith('m-'), isProv=!VIS&&h==='provas', isHor=!VIS&&h==='horario', isRev=h==='revisao';
  const isAul=h==='aulas'||h.startsWith('aulas-'), isOfi=h==='oficinas', isExe=h==='exercicios', isLab=h==='labs', isSob=h==='sobre';
  const other=isMat||isProv||isHor||isRev||isAul||isOfi||isExe||isLab||isSob;
  const show={home:!other,revisao:isRev,materia:isMat,provas:isProv,horario:isHor,aulas:isAul,oficinas:isOfi,exercicios:isExe,labs:isLab,sobre:isSob};
  Object.entries(show).forEach(([id,v])=>{ const el=document.getElementById(id); if(el) el.hidden=!v });
  document.querySelector('header.top').hidden=other;
  const tab={tabMat:!other||isMat,tabAul:isAul,tabOfi:isOfi,tabExe:isExe,tabLab:isLab,tabSob:isSob,tabProv:isProv,tabHor:isHor,tabRev:isRev};
  Object.entries(tab).forEach(([id,v])=>{ const el=document.getElementById(id); if(el) el.classList.toggle('on',v) });
  closeUser();
  const T=t=>document.title=t+' · Faculdade de Bolso';
  if(isMat) renderMat(h.slice(2)); else if(isHor){ renderHorario(); T('Horário') } else if(isProv){ renderProvas(); T('Provas') } else if(isRev){ renderRev(); T('Revisão') }
  else if(isAul){ renderAulas(h.slice(6)); T('Aulas') } else if(isOfi){ renderOficinas(); T('Oficinas') } else if(isExe){ renderExercicios(); T('Exercícios') } else if(isLab){ renderLabs(); T('Laboratórios') } else if(isSob){ renderSobre(); T('Sobre') }
  else document.title='Faculdade de Bolso';
  document.body.dataset.aba=isMat?'materia':isAul?'aulas':isOfi?'oficinas':isExe?'exercicios':isLab?'labs':isSob?'sobre':isProv?'provas':isHor?'horario':isRev?'revisao':'inicio';
  document.body.dataset.mat=isMat?h.slice(2):(h.startsWith('aulas-')?h.slice(6):'');
  window.dispatchEvent(new Event('fdb:aba'));
  window.scrollTo(0,0); setTimeout(()=>window.scrollTo(0,0),0);
}

/* ===== revisão (cartas tipo Anki) ===== */
function revMats(){ const cn=(D.periodos.find(p=>p.atual)||{}).numero; return MATS.filter(m=>m.periodo===cn||m.status==='cursando'||m.extra).map(m=>m.id) }
function renderRev(){ if(window.FDB_ANKI) FDB_ANKI.montarJogo(document.getElementById('revBox'),revMats()) }
function revBadge(){ if(!window.FDB_ANKI)return; const n=FDB_ANKI.contarDue(revMats()), b=document.getElementById('revBadge'); b.hidden=!n; b.textContent=n }
if(window.FDB_ANKI){ FDB_ANKI.onChange(revBadge); setInterval(revBadge,60000) }

/* ===== horário ===== */
const H=window.HORARIO||{faixas:[],aulas:[]};
const DIAS=['dom','seg','ter','qua','qui','sex','sáb'], DIASL=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const aulasDe=id=>H.aulas.filter(a=>a.materia===id).sort((a,b)=>a.dia-b.dia||a.faixa-b.faixa);
const hm=t=>{ const [h,m]=t.split(':').map(Number); return h*60+m };
function nextClass(){ const now=new Date(), d=now.getDay(), mins=now.getHours()*60+now.getMinutes();
  for(let k=0;k<8;k++){ const dd=(d+k)%7; const list=H.aulas.filter(a=>a.dia===dd).sort((a,b)=>a.faixa-b.faixa);
    for(const a of list){ const f=H.faixas[a.faixa]; if(k>0||hm(f.fim)>mins) return {a,k,now:k===0&&hm(f.inicio)<=mins} } } return null }
function renderToday(){ const el=document.getElementById('today'); if(!H.aulas.length){ el.hidden=true; return }
  const d=new Date().getDay(), hoje=H.aulas.filter(a=>a.dia===d).sort((a,b)=>a.faixa-b.faixa), nx=nextClass(); el.hidden=false;
  const nm=a=>{ const m=MATS.find(x=>x.id===a.materia); return m?m.sigla:a.materia };
  let h='<span class="tk">'+(hoje.length?'Hoje · '+DIASL[d]:'Próxima aula')+'</span>';
  if(hoje.length) h+=hoje.map(a=>{ const f=H.faixas[a.faixa], m=MATS.find(x=>x.id===a.materia)||{}; const st=nx&&nx.a===a?(nx.now?' agora':' prox'):(hm(f.fim)<=new Date().getHours()*60+new Date().getMinutes()?' feita':'');
    return '<span class="tc'+st+'" style="--mc:'+(m.cor||'var(--accent)')+'"><b>'+f.inicio+'</b> '+esc(nm(a))+(st===' agora'?' <em>agora</em>':'')+'</span>' }).join('');
  else if(nx){ const f=H.faixas[nx.a.faixa], m=MATS.find(x=>x.id===nx.a.materia)||{}; h+='<span class="tc prox" style="--mc:'+(m.cor||'var(--accent)')+'"><b>'+DIASL[nx.a.dia].toLowerCase()+' '+f.inicio+'</b> '+esc(nm(nx.a))+'</span>' }
  el.innerHTML=h+'<span class="go">horário →</span>' }
function renderHorario(){ document.getElementById('horSem').textContent=(H.semestre||'')+' · '+(H.turno||'');
  document.getElementById('horSub').textContent='Local padrão: '+(H.localPadrao||'')+'. Os horários vêm do SUAP.';
  const d=new Date().getDay(), nx=nextClass();
  let t='<table><tr><th></th>'+[1,2,3,4,5].map(i=>'<th class="'+(i===d?'hoje':'')+'">'+DIASL[i]+(i===d?' · hoje':'')+'</th>').join('')+'</tr>';
  H.faixas.forEach((f,fi)=>{ t+='<tr><th class="fx2">'+f.inicio+'<br>'+f.fim+'</th>'+[1,2,3,4,5].map(i=>{ const a=H.aulas.find(z=>z.dia===i&&z.faixa===fi); if(!a)return '<td></td>';
      const m=MATS.find(x=>x.id===a.materia)||{sigla:a.materia,cor:'#888'}; const st=nx&&nx.a===a?(nx.now?'agora':'próxima'):'';
      return '<td class="'+(i===d?'hoje':'')+'"><a class="hc'+(st?' on':'')+'" href="#m-'+esc(m.id||'')+'" style="--mc:'+m.cor+'"><span class="ic">'+icon(m.icone)+'</span><b>'+esc(m.sigla)+'</b><small>'+esc(a.local||H.localPadrao||'')+'</small>'+(st?'<em>'+st+'</em>':'')+'</a></td>' }).join('')+'</tr>' });
  document.getElementById('horGrid').innerHTML=t+'</table>' }
const q=document.getElementById('q'), res=document.getElementById('results');
q.addEventListener('input',()=>{
  const t=norm(q.value.trim());
  if(!t){res.hidden=true;return}
  const ms=MATS.filter(m=>norm(m.nome+' '+m.sigla).includes(t));
  const fs=FILES.filter(f=>norm([f.titulo,f.descricao,(f.tags||[]).join(' '),f.mat.sigla].join(' ')).includes(t));
  res.hidden=false;
  res.innerHTML=(ms.length?'<div class="grid">'+ms.map(matCard).join('')+'</div>':'')+fs.map(f=>fileRow(f,true)).join('')||'<div class="blank"><b>Nada encontrado</b>Tente outra palavra, como o nome da matéria ou um assunto.</div>';
});
document.addEventListener('click',e=>{ const b=e.target.closest('.stsel button'); if(!b)return; e.preventDefault(); setSt(b.dataset.id,b.dataset.s) });
document.getElementById('editBtn').onclick=()=>{ EDIT=!EDIT; renderHome() };
const PROGK=/^[a-z0-9]+-(done|quiz)$/;
function backupObj(){ const prog={}; try{ for(let i=0;i<localStorage.length;i++){ const k=localStorage.key(i); if(PROGK.test(k)) prog[k]=JSON.parse(localStorage.getItem(k)) } }catch(e){}
  return {status:OV,provas:MAN,prog,...(window.FDB_ANKI?{anki:FDB_ANKI.estado()}:{})} }
function restaurarExtras(o){ if(o.prog&&typeof o.prog==='object') Object.entries(o.prog).forEach(([k,v])=>{ if(PROGK.test(k)) try{ localStorage.setItem(k,JSON.stringify(v)) }catch(e){} });
  if(o.anki&&window.FDB_ANKI) FDB_ANKI.substituir(FDB_ANKI.mesclar(FDB_ANKI.estado(),o.anki)) }
document.getElementById('bkCopy').onclick=()=>{ const t=JSON.stringify(backupObj()), ta=document.getElementById('bkTxt'), msg=document.getElementById('bkMsg'); ta.value=t;
  const ok=()=>msg.textContent='Copiado. Cole no outro aparelho e toque em Restaurar.';
  try{ navigator.clipboard.writeText(t).then(ok,()=>{ta.select();msg.textContent='Selecionei o código: copie com Ctrl+C.'}) }catch(_){ta.select();msg.textContent='Selecionei o código: copie com Ctrl+C.'} };
document.getElementById('bkLoad').onclick=()=>{ const msg=document.getElementById('bkMsg'); try{ let o=JSON.parse(document.getElementById('bkTxt').value||'{}'); if(typeof o!=='object'||Array.isArray(o))throw 0; restaurarExtras(o); if(o.status&&typeof o.status==='object'){ if(Array.isArray(o.provas)){ MAN=o.provas; saveMan() } o=o.status }
    MATS.forEach(m=>{ m.status = m.id in o ? (o[m.id]||'') : m._base }); OV={}; MATS.forEach(m=>{ if(m.status!==m._base) OV[m.id]=m.status });
    try{ localStorage.setItem('fdb-status',JSON.stringify(OV)) }catch(_){} renderHome(); msg.textContent='Progresso restaurado.' }catch(_){ msg.textContent='Esse código não é um backup válido. Copie de novo no outro aparelho.' } };

/* ===== provas ===== */
let MAN=[]; try{ MAN=JSON.parse(localStorage.getItem('fdb-provas')||'[]')||[] }catch(e){}
let PR=[];
function buildPR(){ PR=[...(window.PROVAS||[]),...MAN.map(x=>({...x,manual:true}))].map(x=>({...x,mat:MATS.find(m=>m.id===x.materia)})).filter(x=>x.mat&&/^\d{4}-\d{2}-\d{2}$/.test(x.data||'')).sort((a,b)=>a.data.localeCompare(b.data)) }
function saveMan(){ try{ localStorage.setItem('fdb-provas',JSON.stringify(MAN)) }catch(e){} buildPR(); renderAlerts(); if(location.hash==='#provas')renderProvas() }
buildPR();
const DAY=864e5;
function today0(){ const d=new Date(); return new Date(d.getFullYear(),d.getMonth(),d.getDate()) }
const pd=s=>{ const [y,m,d]=s.split('-').map(Number); return new Date(y,m-1,d) };
const daysTo=s=>Math.round((pd(s)-today0())/DAY);
const lvl=n=>n<0?'':n<=2?'l1':n<=7?'l2':n<=14?'l3':'';
const cdTxt=n=>n===0?'hoje':n===1?'amanhã':n<0?(-n===1?'ontem':'há '+(-n)+' dias'):'em '+n+' dias';
const MES=['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
const SEM=['dom','seg','ter','qua','qui','sex','sáb'];
let pF='';
function upcoming(lim){ return PR.filter(x=>x.tipo!=='reserva'&&daysTo(x.data)>=0&&(lim==null||daysTo(x.data)<=lim)) }
function renderAlerts(){
  const up=upcoming(14); const box=document.getElementById('alerts');
  box.innerHTML=up.slice(0,3).map(x=>{ const n=daysTo(x.data);
    return '<a class="alert '+lvl(n)+'" href="#provas" title="'+esc(x.mat.nome+' · '+x.titulo+' · '+cdTxt(n)+' · '+fdate(x.data))+'"><span class="cd">'+(n===0?'hoje':n)+(n?'<small>'+(n===1?'dia':'dias')+'</small>':'')+'</span><span><b>'+esc(x.mat.sigla)+'</b><span class="t">'+esc(x.titulo.replace(/ \+ .*/,''))+' · '+fdate(x.data).slice(0,5)+'</span></span></a>' }).join('');
  const b=document.getElementById('tabBadge'), n7=upcoming(7).length; b.hidden=!n7; b.textContent=n7;
}
function provRow(x){ const n=daysTo(x.data), d=pd(x.data), past=n<0, res=x.tipo==='reserva';
  const pill=past?(x.nota!=null?'nota '+x.nota:'feita'):cdTxt(n);
  return '<div class="prow'+(past?' past':'')+(res?' reserva':'')+'" style="--mc:'+esc(x.mat.cor)+'"><div class="dt"><b>'+String(d.getDate()).padStart(2,'0')+'</b><span>'+SEM[d.getDay()]+'</span></div>'+
    '<h3><em>'+esc(x.mat.sigla)+'</em>'+esc(x.titulo)+(x.valor?' · '+x.valor+' pts':'')+'</h3><span class="pill2 '+(past||res?'':lvl(n))+'">'+pill+'</span>'+
    ((x.conteudo||x.material||x.manual)?'<p>'+esc(x.conteudo||'')+(x.material?' <a href="'+esc(x.material)+'">Estudar →</a>':'')+(x.manual?' <span class="mtag">incluída por você</span> <button type="button" class="rm" data-mid="'+esc(x.mid)+'">remover</button>':'')+'</p>':'')+'</div>' }
function renderProvas(){
  const mats=[...new Set(PR.map(x=>x.materia))].map(id=>MATS.find(m=>m.id===id));
  document.getElementById('pFilter').innerHTML='<button data-f="" class="'+(pF?'':'on')+'">Todas</button>'+mats.map(m=>'<button data-f="'+m.id+'" class="'+(pF===m.id?'on':'')+'">'+esc(m.sigla)+'</button>').join('');
  document.querySelectorAll('#pFilter button').forEach(b=>b.onclick=()=>{ pF=b.dataset.f; renderProvas() });
  const L=PR.filter(x=>!pF||x.materia===pF);
  const nx=L.find(x=>x.tipo!=='reserva'&&daysTo(x.data)>=0), nb=document.getElementById('nextBox');
  if(nx){ const n=daysTo(nx.data), d=pd(nx.data);
    nb.innerHTML='<div class="next" style="--mc:'+(n<=2?'var(--bad)':n<=7?'var(--accent)':esc(nx.mat.cor))+'"><div class="big">'+(n===0?'Hoje':n)+'<small>'+(n===0?'é o dia':n===1?'dia':'dias')+'</small></div>'+
      '<span class="k">Próxima prova · '+SEM[d.getDay()]+', '+d.getDate()+' de '+MES[d.getMonth()]+'</span><h2>'+esc(nx.mat.nome)+' · '+esc(nx.titulo)+'</h2><p>'+(nx.valor?nx.valor+' pontos. ':'')+esc(nx.conteudo||'')+'</p>'+
      '<div class="act">'+(nx.material?'<a class="btnl" href="'+esc(nx.material)+'">Estudar agora</a>':'')+'<a class="btnl gh" href="#m-'+esc(nx.mat.id)+'">Materiais de '+esc(nx.mat.sigla)+'</a></div></div>' }
  else nb.innerHTML='<div class="blank"><b>Nenhuma prova pela frente</b>Quando chegarem os cronogramas do próximo semestre, as datas aparecem aqui.</div>';
  let cur='', h='';
  L.filter(x=>daysTo(x.data)>=0).forEach(x=>{ const d=pd(x.data), k=MES[d.getMonth()]+' '+d.getFullYear(); if(k!==cur){ cur=k; h+='<div class="month">'+k+'</div>' } h+=provRow(x) });
  const past=L.filter(x=>daysTo(x.data)<0).reverse();
  if(past.length) h+='<details class="pastbox"><summary class="month">Já realizadas · '+past.length+'</summary>'+past.map(provRow).join('')+'</details>';
  document.getElementById('plist').innerHTML=h||'<div class="blank"><b>Sem provas cadastradas</b>Me mande o cronograma da matéria.</div>';
}
function ics(){ const pad=n=>String(n).padStart(2,'0'), f=d=>d.getFullYear()+pad(d.getMonth()+1)+pad(d.getDate());
  const ev=PR.filter(x=>daysTo(x.data)>=0).map(x=>{ const d=pd(x.data), e=new Date(d.getTime()+DAY);
    return ['BEGIN:VEVENT','UID:'+x.materia+'-'+x.data+'@faculdade-de-bolso','DTSTAMP:'+f(new Date())+'T000000Z','DTSTART;VALUE=DATE:'+f(d),'DTEND;VALUE=DATE:'+f(e),
      'SUMMARY:'+(x.mat.sigla+' · '+x.titulo).replace(/[,;]/g,' '),'DESCRIPTION:'+((x.valor?x.valor+' pts. ':'')+(x.conteudo||'')).replace(/[,;]/g,' '),
      ...(x.tipo==='reserva'?[]:['BEGIN:VALARM','TRIGGER:-P7D','ACTION:DISPLAY','DESCRIPTION:Prova em 7 dias','END:VALARM','BEGIN:VALARM','TRIGGER:-P1D','ACTION:DISPLAY','DESCRIPTION:Prova amanhã','END:VALARM']),'END:VEVENT'].join('\r\n') });
  return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Faculdade de Bolso//PT-BR','CALSCALE:GREGORIAN',...ev,'END:VCALENDAR'].join('\r\n') }
document.getElementById('icsBtn').onclick=()=>{ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([ics()],{type:'text/calendar'})); a.download='provas-faculdade-de-bolso.ics'; document.body.appendChild(a); a.click(); a.remove();
  document.getElementById('icsMsg').textContent='Arquivo baixado. Abra no celular ou no Google/Outlook Agenda: cada prova vem com lembrete 7 dias e 1 dia antes.' };

(function(){ const sel=document.getElementById('pfMat'); const cur=MATS.filter(m=>m.status==='cursando'), rest=MATS.filter(m=>m.status!=='cursando'&&!m.extra);
  sel.innerHTML=(cur.length?'<optgroup label="Cursando">'+cur.map(m=>'<option value="'+m.id+'">'+esc(m.sigla)+'</option>').join('')+'</optgroup>':'')+'<optgroup label="Todas">'+rest.map(m=>'<option value="'+m.id+'">'+m.periodo+'º · '+esc(m.sigla)+'</option>').join('')+'</optgroup>' })();
document.getElementById('pForm').addEventListener('submit',e=>{ e.preventDefault(); const g=id=>document.getElementById(id).value.trim();
  const v=g('pfVal').replace(',','.'); MAN.push({mid:Date.now().toString(36),materia:g('pfMat'),titulo:g('pfTit'),data:g('pfData'),...(v&&isFinite(+v)?{valor:+v}:{}),...(g('pfCont')?{conteudo:g('pfCont')}:{})});
  saveMan(); ['pfTit','pfData','pfVal','pfCont'].forEach(i=>document.getElementById(i).value=''); document.getElementById('pfMsg').textContent='Prova incluída.' });
document.addEventListener('click',e=>{ const b=e.target.closest('.rm'); if(!b)return; MAN=MAN.filter(x=>x.mid!==b.dataset.mid); saveMan(); if(location.hash.startsWith('#m-'))renderMat(location.hash.slice(3)) });
renderHome(); renderAlerts(); renderToday(); revBadge(); setInterval(renderToday,60000); addEventListener('hashchange',route);


/* ===== v2: aulas, oficinas, exercícios, laboratórios, sobre, menu do usuário ===== */
const AUL=window.FDB_AULAS||{}, LABF=window.FDB_LABS_FUTUROS||[];
const PROVA=['','1ª prova','2ª prova','3ª prova'];
const curMats=()=>{ const cn=(D.periodos.find(p=>p.atual)||{}).numero; return MATS.filter(m=>(m.periodo===cn||m.extra)&&AUL[m.id]) };
const ofUrl=(m,h,ir)=>{ const a=AUL[m.id]; return a?a.pag+(ir?'?ir='+ir:'')+(h?'#'+h:''):'#m-'+m.id };
function cardM(m,href,sub,extra){ return '<a class="qcard" style="--mc:'+esc(m.cor)+'" href="'+href+'"><span class="qi">'+icon(m.icone)+'</span><span class="qt"><b>'+esc(m.sigla)+'</b><small>'+sub+'</small>'+(extra||'')+'</span><span class="qa" aria-hidden="true">→</span></a>' }
function provaDe(m,n){ return (typeof PR!=='undefined'?PR:[]).filter(x=>x.materia===m.id&&x.tipo!=='reserva').find(x=>new RegExp('^'+n+'\\D').test(x.titulo||'')) }
function renderAulas(id){ const box=document.getElementById('aulas'); const ms=curMats().filter(m=>!AUL[m.id].continua);
  if(!id){ box.innerHTML='<header class="phead"><div class="eyebrow">Aulas</div><h1>Aulas por matéria</h1><p>Escolha a matéria. As aulas ficam separadas por prova: Módulo 1, 2 e 3, e dentro de cada módulo as aulas na ordem em que entraram no site.</p></header>'+
      '<div class="qgrid">'+ms.map(m=>{ const n=Object.values(AUL[m.id].modulos||{}).reduce((a,l)=>a+l.length,0); return cardM(m,'#aulas-'+m.id,esc(m.nome),'<span class="qm">'+n+' aula'+(n===1?'':'s')+'</span>') }).join('')+'</div>'+
      (curMats().some(m=>AUL[m.id].continua)?'<div class="sech"><h3>Cursos contínuos</h3></div><div class="qgrid">'+curMats().filter(m=>AUL[m.id].continua).map(m=>cardM(m,ofUrl(m),esc(m.nome),'<span class="qm">trilha própria</span>')).join('')+'</div>':''); return }
  const m=MATS.find(x=>x.id===id), a=AUL[id]; if(!m||!a){ location.hash='aulas'; return }
  let k=0; const mods=[1,2,3].map(n=>{ const L=(a.modulos||{})[n]||[]; const pv=provaDe(m,n);
    const head='<div class="modh"><span class="mn">Módulo '+n+'</span><span class="mp">'+PROVA[n]+(pv?' · '+fdate(pv.data)+(daysTo(pv.data)>=0?' · '+cdTxt(daysTo(pv.data)):''):'')+'</span></div>';
    if(!L.length) return '<section class="modb vazio">'+head+'<p class="hint">'+(n===1?'Conteúdo da 1ª prova ainda não entrou no site.':'As aulas aparecem aqui conforme forem acontecendo.')+'</p></section>';
    return '<section class="modb">'+head+'<ol class="aulist">'+L.map(([h,t,d])=>{ k++; return '<li><div class="an">Aula '+k+'</div><div class="at"><b>'+esc(t)+'</b><small>'+esc(d)+'</small></div>'+
      '<div class="ab"><a class="abtn" href="'+ofUrl(m,h)+'">📖 Aula</a><a class="abtn o" href="'+ofUrl(m,h,'pratica')+'">🧪 Oficina</a><a class="abtn e" href="'+ofUrl(m,h,'exercicios')+'">✍️ Exercícios</a></div></li>' }).join('')+'</ol></section>' }).join('');
  box.innerHTML='<a class="back" href="#aulas">← Todas as matérias</a><div class="mhead" style="--mc:'+esc(m.cor)+'"><span class="ic">'+icon(m.icone)+'</span><div><div class="eyebrow">Aulas · '+esc(m.sigla)+'</div><h1>'+esc(m.nome)+'</h1><p>Cada aula tem a explicação, o atalho para a parte prática na oficina e os exercícios.</p></div></div>'+mods }
function renderOficinas(){ const ms=curMats();
  document.getElementById('oficinas').innerHTML='<header class="phead"><div class="eyebrow">Oficinas</div><h1>Oficinas por matéria</h1><p>A parte prática de cada matéria: modelos 2D e 3D, simuladores, fórmulas explicadas letra por letra, cola e quiz.</p></header>'+
    '<div class="qgrid">'+ms.map(m=>{ const a=AUL[m.id]; return cardM(m,ofUrl(m),esc(m.nome),'<span class="qm">'+(a.continua?'curso contínuo':'oficina aberta')+'</span>') }).join('')+'</div>' }
function renderExercicios(){ const ms=curMats();
  const row=(m)=>{ const a=AUL[m.id]; const it=[];
    if(a.lista) it.push('<a class="xi" href="'+ofUrl(m,a.lista)+'"><b>📋 Lista da professora</b><small>resolvida passo a passo</small></a>');
    if(a.modulos) it.push('<a class="xi" href="#aulas-'+m.id+'"><b>✍️ Treino</b><small>exercícios com gabarito no fim de cada aula</small></a>');
    if(a.quiz) it.push('<a class="xi" href="'+ofUrl(m,a.quiz)+'"><b>❓ Quiz</b><small>perguntas com explicação</small></a>');
    it.push('<span class="xi breve"><b>🏭 Casos reais da indústria</b><small>em breve: problemas do dia a dia de engenharia</small></span>');
    return '<section class="xrow" style="--mc:'+esc(m.cor)+'"><div class="xh"><span class="qi">'+icon(m.icone)+'</span><b>'+esc(m.nome)+'</b></div><div class="xis">'+it.join('')+'</div></section>' };
  document.getElementById('exercicios').innerHTML='<header class="phead"><div class="eyebrow">Exercícios</div><h1>Exercícios</h1><p>Três tipos: as listas dos professores resolvidas, exercícios extras para treinar e casos reais que um engenheiro encontra no dia a dia da indústria.</p></header>'+ms.filter(m=>!AUL[m.id].continua).map(row).join('') }
function renderLabs(){ const ms=curMats();
  document.getElementById('labs').innerHTML='<header class="phead"><div class="eyebrow">Laboratórios</div><h1>Laboratórios</h1><p>Lugares para mexer, testar e descobrir: você monta, o sistema reage e o que você descobre vira coleção.</p></header>'+
    '<div class="lgrid">'+ms.filter(m=>AUL[m.id].lab_nome).map(m=>{ const a=AUL[m.id]; return '<a class="lcard'+(a.lab_estrela?' star':'')+'" style="--mc:'+esc(m.cor)+'" href="'+ofUrl(m,a.lab_hash||a.lab)+'"><span class="qi">'+icon(m.icone)+'</span><small>'+esc(m.sigla)+(a.lab_estrela?' · ⭐ destaque':'')+'</small><b>'+esc(a.lab_nome)+'</b><p>'+esc(a.lab_desc)+'</p><span class="lgo">Abrir →</span></a>' }).join('')+'</div>'+
    (LABF.length?'<div class="sech"><h3>Em construção</h3></div><div class="lgrid">'+LABF.map(l=>{ const m=MATS.find(x=>x.id===l.mat)||{cor:'#888',icone:'livro',sigla:l.mat}; return '<div class="lcard breve" style="--mc:'+esc(m.cor)+'"><span class="qi">'+icon(m.icone)+'</span><small>'+esc(m.sigla)+' · em breve</small><b>'+esc(l.nome)+'</b><p>'+esc(l.desc)+'</p></div>' }).join('')+'</div>':'') }
function renderSobre(){ document.getElementById('sobre').innerHTML='<div class="sobre"><div class="eyebrow">Sobre</div><h1>Sobre a Faculdade de <span>Bolso</span></h1>'+
  '<p>A Faculdade de Bolso é uma iniciativa para ajudar o aluno a se organizar nos estudos, revisar o conteúdo das provas e tirar dúvidas das matérias do curso, tudo num só lugar e na palma da mão.</p>'+
  '<p>Cada matéria tem as <b>aulas</b> explicadas de forma simples, <b>oficinas</b> com modelos 2D e 3D para ver a teoria funcionando, <b>exercícios</b> resolvidos passo a passo, casos reais da indústria e <b>laboratórios</b> para aprender mexendo.</p>'+
  '<p>O conteúdo cresce junto com o semestre: a cada aula, uma parte nova entra no site.</p>'+
  '<div class="autor"><span class="av">GB</span><div><b>Guilherme dos Santos Braz</b><small>Técnico de processos e estudante de engenharia mecânica · IFMG Campus Betim</small><a href="https://www.linkedin.com/in/guilherme-santos-66b8162a0" target="_blank" rel="noopener">LinkedIn →</a></div></div></div>' }
function renderQuick(){ const ms=curMats(); const q=document.getElementById('quick'); if(!q) return;
  const rv=window.FDB_ANKI?FDB_ANKI.contarDue(revMats()):0;
  q.innerHTML=ms.map(m=>{ const a=AUL[m.id]; const n=Object.values(a.modulos||{}).reduce((x,l)=>x+l.length,0); return cardM(m,a.continua?ofUrl(m):'#aulas-'+m.id,esc(m.nome),'<span class="qm">'+(a.continua?'curso contínuo':n+' aulas')+'</span>') }).join('')+
    '<a class="qcard rev" href="#revisao"><span class="qi">🔁</span><span class="qt"><b>Revisão</b><small>cartas do dia</small>'+(rv?'<span class="qm hot">'+rv+' para hoje</span>':'<span class="qm">em dia</span>')+'</span><span class="qa" aria-hidden="true">→</span></a>'+
    (VIS?'':'<a class="qcard" href="#horario"><span class="qi">🗓️</span><span class="qt"><b>Horário</b><small>grade da semana</small></span><span class="qa" aria-hidden="true">→</span></a>') }
function renderHcard(){ const el=document.getElementById('hpCard'); if(!el) return;
  const ms=MATS.filter(m=>!m.extra), ok=ms.filter(m=>m.status==='aprovada'); const T=ms.reduce((a,m)=>a+(m.ch||0),0), Dn=ok.reduce((a,m)=>a+(m.ch||0),0); const p=T?Math.round(Dn/T*100):0, C=2*Math.PI*46;
  let last=null; try{ last=JSON.parse(localStorage.getItem('fdb-last')||'null') }catch(e){}
  el.innerHTML='<h4>📊 Progresso no curso</h4><div class="row"><div class="ring"><svg viewBox="0 0 110 110"><circle cx="55" cy="55" r="46" fill="none" stroke="var(--line)" stroke-width="11"/><circle cx="55" cy="55" r="46" fill="none" stroke="var(--c1)" stroke-width="11" stroke-linecap="round" stroke-dasharray="'+(C*p/100).toFixed(1)+' '+C.toFixed(1)+'"/></svg><b>'+p+'%</b></div><div class="md"><span>Matérias aprovadas</span><strong>'+ok.length+' de '+ms.length+'</strong></div></div>'+
    (last?'<a class="nx" href="'+esc(last.u)+'"><div><small>Último estudo</small><span>'+esc(last.t)+'</span></div><i aria-hidden="true">›</i></a>':'<a class="nx" href="#aulas"><div><small>Comece por aqui</small><span>Aulas do semestre</span></div><i aria-hidden="true">›</i></a>');
  const cta=document.getElementById('ctaGo'); if(cta&&last){ cta.href=last.u; cta.innerHTML='▶ Continuar de onde parou <span aria-hidden="true">→</span>'; cta.title=last.t }
  const hp=document.getElementById('hprov'); if(hp) hp.hidden=VIS||!upcoming(30).length }
function closeUser(){ const p=document.getElementById('upan'), b=document.getElementById('uav'); if(p){ p.hidden=true; b.setAttribute('aria-expanded','false') } }
(function(){ const b=document.getElementById('uav'), p=document.getElementById('upan'); if(!b) return;
  b.onclick=e=>{ e.stopPropagation(); p.hidden=!p.hidden; b.setAttribute('aria-expanded',!p.hidden) };
  document.addEventListener('click',e=>{ if(!e.target.closest('.umenu')) closeUser() });
  const ub=document.getElementById('uBadge'); const n=(VIS?0:upcoming(7).length)+(window.FDB_ANKI?FDB_ANKI.contarDue(revMats()):0); ub.hidden=!n; ub.textContent=n })();
renderQuick(); renderHcard();
route();
if('scrollRestoration' in history) history.scrollRestoration='manual'; addEventListener('load',()=>{ if(location.hash.length>1) setTimeout(()=>scrollTo(0,0),0) });

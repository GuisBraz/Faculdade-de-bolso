/* Gera as cartas de inglês em dados/cartas.js a partir de dados/ingles.js.
   Uso: node scripts/gerar-cartas-ingles.js */
const fs=require('fs'), path=require('path');
global.window={}; require(path.join(__dirname,'../dados/ingles.js')); const I=window.FDB_INGLES;
const slug=s=>s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40);
const q=s=>JSON.stringify(s);
const lines=[], ids=new Set();
const add=(id,u,t,f,v)=>{ let k=id, n=2; while(ids.has(k)) k=id+'-'+(n++); ids.add(k); lines.push('  { id:'+q(k)+', m:"ingl", lang:"en", '+(u?'u:'+q(u)+', ':'')+'t:'+q(t)+', f:'+q(f)+', v:'+q(v)+' },') };
I.unidades.forEach((u,i)=>{
  u.vocab.forEach(([en,pt])=>add('ingl-'+u.id+'-'+slug(en),u.id,'Unidade '+(i+1)+' · '+u.titulo,en,pt));
  u.frases.slice(0,3).forEach(([en,pt])=>add('ingl-'+u.id+'-f-'+slug(en),u.id,'Unidade '+(i+1)+' · frase',en,pt));
});
I.tecnico.forEach(([en,pt])=>add('ingl-tec-'+slug(en),'tecnico','Inglês técnico',en,pt));
const ini='  /* ===== INGLÊS (gerado por scripts/gerar-cartas-ingles.js · não edite à mão) ===== */', fim='  /* ===== FIM INGLÊS ===== */';
const p=path.join(__dirname,'../dados/cartas.js'); let s=fs.readFileSync(p,'utf8');
const bloco=ini+'\n'+lines.join('\n')+'\n'+fim;
if(s.includes(ini)) s=s.slice(0,s.indexOf(ini))+bloco+s.slice(s.indexOf(fim)+fim.length);
else { const k=s.lastIndexOf('];'); s=s.slice(0,k).replace(/\s*$/,'')+(s.slice(0,k).trim().endsWith(',')?'':',')+'\n'+bloco+'\n'+s.slice(k) }
fs.writeFileSync(p,s); console.log(lines.length+' cartas de inglês');

/* FACULDADE DE BOLSO · páginas só para quem tem conta (Inglês, Desenho artístico)
   Sem sessão guardada neste aparelho → volta para o hub, já na tela de "Entrar".
   Fica no <head>, antes de tudo, para a página nem aparecer. */
(function(){
  var ok=false;
  try{ for(var i=0;i<localStorage.length;i++){ var k=localStorage.key(i); if(/^sb-.*-auth-token$/.test(k)){ var v=JSON.parse(localStorage.getItem(k)); if(v&&v.user){ ok=true; break } } } }catch(e){}
  if(ok) return;
  var s=document.currentScript, raiz=s?new URL('../',s.src):new URL('/',location.href);
  document.documentElement.style.visibility='hidden';
  location.replace(new URL('index.html?entrar',raiz).href);
})();

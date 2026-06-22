window.BDE_QUESTIONS=[];
window.BDE_QUESTIONS_READY=(async()=>{
  const b64=(window.__BDE_Q_CHUNKS||[]).join('');
  const bytes=Uint8Array.from(atob(b64),c=>c.charCodeAt(0));
  if(!('DecompressionStream' in window)){
    console.error('Tu navegador no soporta DecompressionStream. Actualiza Chrome/Safari/Edge.');
    return;
  }
  const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  const text=await new Response(stream).text();
  window.BDE_QUESTIONS=JSON.parse(text);
})();

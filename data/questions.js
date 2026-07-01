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
  const base=JSON.parse(text);
  const extra=Array.isArray(window.BDE_EXTRA_QUESTIONS)?window.BDE_EXTRA_QUESTIONS:[];
  const seen=new Set(base.map(q=>q.id));
  const merged=[...base,...extra.filter(q=>q&&q.id&&!seen.has(q.id))];
  window.BDE_QUESTIONS=merged.map(enrichExplanation);
})();
function enrichExplanation(q){
  if(q.explanation&&String(q.explanation).includes('Por qué'))return q;
  return {...q,explanation:q.explanation&&String(q.explanation).trim()?`${q.explanation} ${autoDistractors(q)}`:autoExplanation(q)};
}
function optionText(q,key){return ((q.options||[]).find(o=>o.key===key)||{}).text||''}
function autoExplanation(q){
  const answer=q.answer||'?';
  const correct=optionText(q,answer);
  return `Respuesta correcta: ${answer}${correct?` — ${correct}`:''}. ${topicHint(q)} ${autoDistractors(q)}`.trim();
}
function autoDistractors(q){
  const wrong=(q.options||[]).filter(o=>o.key!==q.answer);
  if(!wrong.length)return '';
  return 'Por qué fallan las otras: '+wrong.map(o=>`${o.key}) ${wrongHint(q,o)}`).join(' ');
}
function topicHint(q){
  const x=normTxt([q.section,q.topic,q.question,optionText(q,q.answer)].join(' '));
  if(has(x,['is-lm','curva lm','curva is']))return 'La clave es identificar primero el mercado afectado: fiscal desplaza IS; monetaria desplaza LM. Después mira si el movimiento es expansivo o contractivo.';
  if(has(x,['oferta agregada','demanda agregada','oa-da','da-oa']))return 'La clave es separar shocks de demanda y de oferta: la demanda mueve producción y precios en el mismo sentido; una oferta adversa suele subir precios y reducir producción.';
  if(has(x,['balanza de pagos','tipo de cambio','divisa','economia abierta']))return 'La clave es distinguir cuenta corriente, cuenta de capital y cuenta financiera, y recordar que exportar servicios genera ingresos frente al exterior.';
  if(has(x,['dinero','fisher','inflacion','politica monetaria','bce','banco central']))return 'La clave es distinguir instrumento, objetivo y canal de transmisión: los tipos y la liquidez afectan crédito, demanda, expectativas e inflación.';
  if(has(x,['solow','crecimiento','estado estacionario']))return 'La clave es separar nivel y tasa de crecimiento: en Solow sin progreso técnico, el ahorro cambia el nivel de largo plazo, no el crecimiento permanente per cápita.';
  if(has(x,['preferencias','utilidad','consumidor','restriccion presupuestaria','rms','sustitucion','renta']))return 'La clave es separar preferencias, restricción presupuestaria y decisión óptima; no confundas utilidad ordinal con una medida cardinal absoluta.';
  if(has(x,['elasticidad']))return 'La clave es pensar en porcentajes: si la cantidad responde menos proporcionalmente que el precio, la demanda es inelástica.';
  if(has(x,['competencia perfecta','precio aceptante','empresa competitiva']))return 'La clave es que la empresa competitiva toma el precio como dado: produce donde P = CMg si cubre costes variables, y cierra si P no cubre el CVMe mínimo.';
  if(has(x,['monopolio']))return 'La clave es que el monopolista enfrenta la demanda de mercado: para vender más debe bajar precio, por eso el ingreso marginal queda por debajo del precio.';
  if(has(x,['oligopolio','cournot','bertrand','stackelberg']))return 'La clave es identificar la variable estratégica: Cournot compite en cantidades, Bertrand en precios y Stackelberg introduce liderazgo secuencial.';
  if(has(x,['mco','regresion','coeficiente','r2','residuo','heterocedasticidad','autocorrelacion','instrumento','serie temporal','estacionaria']))return 'La clave es distinguir interpretación, supuestos e inferencia: un buen ajuste no prueba causalidad y los problemas de error afectan sobre todo a sesgo o errores estándar según el caso.';
  if(has(x,['probabilidad','esperanza','varianza','normal','contraste','p-valor','intervalo']))return 'La clave es aplicar la definición exacta: media, varianza, p-valor, significación e intervalo de confianza no significan lo mismo.';
  return 'La clave es leer qué concepto pide el enunciado y no elegir una opción que solo sea parecida: la correcta debe encajar exactamente con la definición o mecanismo.';
}
function wrongHint(q,o){
  const x=normTxt([q.section,q.topic,q.question].join(' '));
  const y=normTxt(o.text);
  if(y.includes('ninguna'))return '“Ninguna” solo vale si no existe una alternativa precisa; aquí sí hay una opción que responde al mecanismo pedido.';
  if(has(y,['siempre','nunca','automaticamente','todos']))return 'usa un absoluto demasiado fuerte; en estos modelos casi siempre hay condiciones o supuestos detrás.';
  if(has(x,['is-lm','curva lm','curva is']))return 'confunde el mercado que se desplaza o el sentido del desplazamiento.';
  if(has(x,['oferta agregada','demanda agregada','oa-da','da-oa']))return 'confunde un shock de demanda con uno de oferta, o cambia el signo esperado de precios/producción.';
  if(has(x,['balanza de pagos','tipo de cambio','divisa','economia abierta']))return 'mezcla partidas exteriores distintas o interpreta al revés ingreso/pago frente al exterior.';
  if(has(x,['dinero','fisher','inflacion','politica monetaria','bce','banco central']))return 'mezcla objetivo, instrumento o canal monetario; no responde al efecto causal concreto del enunciado.';
  if(has(x,['solow','crecimiento','estado estacionario']))return 'confunde crecimiento transitorio de transición con crecimiento permanente de largo plazo.';
  if(has(x,['preferencias','utilidad','consumidor','restriccion presupuestaria','rms']))return 'confunde preferencias con renta/precios o interpreta la utilidad como una magnitud cardinal absoluta.';
  if(has(x,['elasticidad']))return 'invierte la relación entre variación porcentual de precio, cantidad e ingreso total.';
  if(has(x,['competencia perfecta','precio aceptante','empresa competitiva']))return 'atribuye poder de mercado a una empresa que, por hipótesis, toma el precio como dado.';
  if(has(x,['monopolio']))return 'trata al monopolista como si fuese precio-aceptante o ignora que IMg queda por debajo del precio.';
  if(has(x,['oligopolio','cournot','bertrand','stackelberg']))return 'usa otro modelo estratégico o cambia precios por cantidades.';
  if(has(x,['mco','regresion','coeficiente','r2','residuo','heterocedasticidad','autocorrelacion','instrumento','serie temporal','estacionaria']))return 'mezcla interpretación del coeficiente, ajuste, supuestos o inferencia; no ataca el concepto econométrico exacto.';
  return 'es un distractor plausible, pero no responde de forma exacta a lo que pregunta el enunciado.';
}
function normTxt(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function has(txt,keys){return keys.some(k=>txt.includes(normTxt(k)))}

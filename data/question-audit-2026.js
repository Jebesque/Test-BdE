(()=>{
const previous=window.BDE_QUESTIONS_READY||Promise.resolve();
const norm=s=>String(s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]+/g," ").trim();
const optionText=(q,key)=>((q.options||[]).find(o=>o.key===key)||{}).text||"";
const oldGenerated=q=>/^BDE_MORE_|^BDE_EXTRA400_/.test(String(q.id||""))||/400 preguntas originales|drive\/checklist bde · repaso dirigido/i.test(String(q.source||""));
const lengthBias=q=>{
  const correct=optionText(q,q.answer).trim().length;
  const wrong=(q.options||[]).filter(o=>o.key!==q.answer).map(o=>String(o.text||"").trim().length).sort((a,b)=>b-a);
  return wrong.length&&correct>=32&&correct>Math.max(1,wrong[0])*1.30;
};
window.BDE_QUESTIONS_READY=(async()=>{
  await previous;
  const input=Array.isArray(window.BDE_QUESTIONS)?window.BDE_QUESTIONS:[];
  const seenQuestion=new Set(),seenOptions=new Set(),out=[];
  let removedGenerated=0,removedDuplicate=0,removedLengthBias=0;
  for(const q of input){
    if(!q||!q.id||!q.question||!Array.isArray(q.options)||q.options.length!==4)continue;
    if(oldGenerated(q)){removedGenerated++;continue;}
    const qKey=`${norm(q.section)}|${norm(q.question)}`;
    const oKey=`${norm(q.section)}|${norm(q.topic)}|${(q.options||[]).map(o=>norm(o.text)).sort().join("|")}`;
    if(seenQuestion.has(qKey)||seenOptions.has(oKey)){removedDuplicate++;continue;}
    if(!q.official&&/banco ampliado/i.test(String(q.source||""))&&lengthBias(q)){removedLengthBias++;continue;}
    seenQuestion.add(qKey);seenOptions.add(oKey);out.push(q);
  }
  const bySection={},answers={A:0,B:0,C:0,D:0},biased=[];
  for(const q of out){bySection[q.section]=(bySection[q.section]||0)+1;if(answers[q.answer]!==undefined)answers[q.answer]++;if(!q.official&&lengthBias(q))biased.push(q.id);}
  window.BDE_QUESTIONS=out;
  window.BDE_AUDIT_REPORT={before:input.length,after:out.length,removedGenerated,removedDuplicate,removedLengthBias,bySection,answers,remainingStrongLengthBias:biased.length,remainingStrongLengthBiasIds:biased.slice(0,25),version:"2026-07-10-final-audit"};
  console.info("BdE question audit",window.BDE_AUDIT_REPORT);
})();
})();
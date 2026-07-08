(()=>{
const bad=/^BDE_EXTRA400_EST_00(8|9)_/;
window.BDE_EXTRA_QUESTIONS=(Array.isArray(window.BDE_EXTRA_QUESTIONS)?window.BDE_EXTRA_QUESTIONS:[]).filter(q=>q&&q.id&&!bad.test(q.id));
const stems=[
'En relación con {t}, ¿qué afirmación es correcta?',
'Sobre {t}, señala la opción correcta:',
'Caso de repaso: {c}. ¿Qué respuesta elegirías sobre {t}?',
'Pregunta tipo simulacro sobre {t}: {c}. Señala la opción más precisa.'
];
const orders=[[0,1,2,3],[1,0,2,3],[2,1,0,3],[3,1,2,0]];
const fixed=[
{n:8,topic:'Probabilidad condicionada',caso:'sabes que ocurre B',correct:'P(A dado B)=P(A intersección B)/P(B), siempre que P(B)>0.',wrong:['Es P(A)+P(B).','Siempre vale uno.','No depende de B.'],hint:'Condicionar significa restringir el espacio muestral al suceso que se sabe ocurrido. Por eso el denominador pasa a ser P(B).'},
{n:9,topic:'Independencia',caso:'B no informa sobre A',correct:'Si A y B son independientes, P(A dado B)=P(A).',wrong:['Significa incompatibilidad entre A y B.','Exige que P(A)=P(B).','Implica probabilidad cero.'],hint:'Independencia no es incompatibilidad: significa que saber que B ocurre no cambia la probabilidad de A.'}
];
const extra=[];
fixed.forEach((it,k)=>{for(let v=0;v<4;v++){const opts=[it.correct,...it.wrong];const ord=orders[(k*4+v)%orders.length];const texts=ord.map(j=>opts[j]);const ans='ABCD'[ord.indexOf(0)];extra.push({id:`BDE_EXTRA400_EST_${String(it.n).padStart(3,'0')}_${v+1}`,source:'Banco ampliado · 400 preguntas originales de repaso · julio 2026 · corregida',number:(it.n-1)*4+v+1,type:'conocimientos',section:'Estadística',topic:it.topic,question:stems[v].replace('{t}',it.topic).replace('{c}',it.caso),options:texts.map((text,j)=>({key:'ABCD'[j],text})),answer:ans,explanation:`Respuesta correcta: ${ans}. ${it.hint}`,official:false});}});
window.BDE_EXTRA_QUESTIONS=[...window.BDE_EXTRA_QUESTIONS,...extra];
window.BDE_EXTRA400_FIX_VERSION='2026-07-08-conditional-probability';
})();
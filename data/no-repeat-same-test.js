(()=>{
function nrtNorm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/\s+/g,' ').trim()}
function nrtUniqueById(pool){const seen=new Set();return (pool||[]).filter(q=>{if(!q||!q.id||seen.has(q.id))return false;seen.add(q.id);return true})}
function nrtKey(q){return `${nrtNorm(q.section)}|${nrtNorm(q.topic||q.question)}`}
function nrtShuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function nrtPickNoTopicRepeat(list,target,chosen=[],usedKeys=new Set()){
 const out=[...chosen];
 const rest=[];
 for(const q of list){
  if(out.length>=target)break;
  const k=nrtKey(q);
  if(!usedKeys.has(k)){out.push(q);usedKeys.add(k)}else rest.push(q);
 }
 if(out.length<target){
  const usedIds=new Set(out.map(q=>q.id));
  for(const q of rest){if(out.length>=target)break;if(!usedIds.has(q.id)){out.push(q);usedIds.add(q.id)}}
 }
 return out;
}
selectPool=function(pool,cfg){
 pool=nrtUniqueById(pool);
 const target=Math.min(cfg.num,pool.length);
 if(cfg.tipo==='fallos')return nrtShuffle(pool).slice(0,target);
 const recent=new Set((state&&state.recentQuestions)||[]);
 const fresh=nrtShuffle(pool.filter(q=>!recent.has(q.id)));
 const old=nrtShuffle(pool.filter(q=>recent.has(q.id)));
 if(!cfg.noRepeat){return nrtPickNoTopicRepeat([...fresh,...old],target)}
 const first=nrtPickNoTopicRepeat(fresh,target);
 if(first.length>=target)return first;
 const usedKeys=new Set(first.map(nrtKey));
 return nrtPickNoTopicRepeat(old,target,first,usedKeys);
};
window.BDE_NO_REPEAT_SAME_TEST_VERSION='2026-07-08';
})();
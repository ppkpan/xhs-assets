window.__xhsFill = async function(dir){
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const base='https://raw.githubusercontent.com/ppkpan/xhs-assets/main/'+dir+'/';
for(let k=0;k<30 && !document.querySelector('input[type=file]');k++) await sleep(500);
const meta=await fetch(base+'meta.json',{cache:'no-store'}).then(r=>r.json());
const inp=document.querySelector('input[type=file].upload-input')||document.querySelector('input[type=file]');
const dt=new DataTransfer();
for(let i=1;i<=meta.n;i++){const n=String(i).padStart(2,'0'); const b=await fetch(base+n+'.jpg').then(r=>{if(!r.ok)throw new Error('img '+n);return r.blob()}); dt.items.add(new File([b],n+'.jpg',{type:'image/jpeg'}));}
inp.files=dt.files; inp.dispatchEvent(new Event('change',{bubbles:true}));
let ti=null; for(let k=0;k<40 && !(ti=document.querySelector('input[placeholder="填写标题会有更多赞哦"]'));k++) await sleep(500);
await sleep(1500);
const title=(await fetch(base+'title.txt').then(r=>r.text())).trim();
const body=(await fetch(base+'body.txt').then(r=>r.text())).trim();
Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(ti,title); ti.dispatchEvent(new Event('input',{bubbles:true}));
const ed=document.querySelector('.tiptap.ProseMirror'); ed.focus();
const ps=body.split(/\n\n+/);
ps.forEach((p,i)=>{document.execCommand('insertText',false,p); if(i<ps.length-1){document.execCommand('insertParagraph');document.execCommand('insertParagraph');}});
const topics=(await fetch(base+'topics.txt').then(r=>r.text())).trim().split('\n').map(s=>s.replace(/^#/,''));
ed.focus(); const sel=getSelection(), rg=document.createRange(); rg.selectNodeContents(ed); rg.collapse(false); sel.removeAllRanges(); sel.addRange(rg);
document.execCommand('insertParagraph'); document.execCommand('insertParagraph');
const miss=[];
for(const t of topics){ document.execCommand('insertText',false,'#'+t); await sleep(1500);
  const hit=[...document.querySelectorAll('.items .item')].filter(e=>e.offsetParent).find(e=>e.innerText.trim().split('\n')[0].replace(/^#/,'')===t);
  if(hit){hit.click(); await sleep(600);} else {for(let i=0;i<=t.length;i++)document.execCommand('delete'); miss.push(t);} }
const cb=document.querySelector('.post-time-switch-container .d-switch input[type=checkbox]'); cb.click(); await sleep(800);
const on=document.querySelector('.post-time-switch-container .d-switch-simulator').className.includes('checked');
await sleep(1500);
const imgCount=(document.body.innerText.match(/图片编辑\s*(\d+)\/18/)||[])[1];
window.__meta=meta;
return {id:meta.id, when:meta.when, n:meta.n, imgCount, titleOk:ti.value===title, title, edLen:ed.innerText.length, miss, on};
};
window.__xhsPick=async function(when){const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const getIn=()=>[...document.querySelectorAll('input.d-text')].find(i=>/20\d\d-/.test(i.value));
const [d,hm]=when.split(' '); const day=String(+d.split('-')[2]); const [hh,mm]=hm.split(':');
const cell=[...document.querySelectorAll('.d-datepicker-cell-main')].filter(e=>!e.className.includes('disabled') && !e.parentElement.className.includes('disabled')).find(e=>e.textContent.trim()===day);
if(!cell) return 'no day'; cell.click(); await sleep(500);
const bars=[...document.querySelectorAll('.d-timepicker-timebar')];
for(const [bar,v] of [[bars[0],hh],[bars[1],mm]]){const it=[...bar.querySelectorAll('.d-timepicker-time')].find(e=>/^\d+$/.test(e.textContent.trim()) && +e.textContent.trim()===+v); if(!it) return 'no '+v+' have:'+[...bar.querySelectorAll('.d-timepicker-time')].map(e=>e.textContent.trim()).slice(0,6).join(','); it.scrollIntoView({block:'center'}); it.click(); await sleep(400);}
document.body.click(); await sleep(400);
const on=document.querySelector('.post-time-switch-container .d-switch-simulator').className.includes('checked');
return {v:getIn().value, ok:getIn().value===when && on};};
'ok';

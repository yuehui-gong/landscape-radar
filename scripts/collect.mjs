import fs from 'node:fs/promises';
import {parseRSS,parseASLA,merge} from './normalize.mjs';
const sources=JSON.parse(await fs.readFile('config/sources.json','utf8'));
const now=new Date().toISOString();
let previous={items:[],sources:[],lastSuccess:null};
try{previous=JSON.parse(await fs.readFile('public/data/opportunities.json','utf8'))}catch(e){if(e.code!=='ENOENT')throw e}
const incoming=[];const reports=[];
for(const source of sources){try{const r=await fetch(source.url,{headers:{'User-Agent':'LandscapeRadar/1.0 (+https://github.com/yuehui-gong/landscape-radar)'},signal:AbortSignal.timeout(30000)});if(!r.ok)throw Error('HTTP '+r.status);const text=await r.text();const rows=(source.kind==='rss'?parseRSS:parseASLA)(text,source,now);incoming.push(...rows);reports.push({...source,status:'ok',checkedAt:now,count:rows.length,lastSuccess:now});console.log(source.name+': '+rows.length+' listings')}catch(e){const old=previous.sources.find(s=>s.id===source.id);reports.push({...source,status:'error',checkedAt:now,lastSuccess:old?.lastSuccess||null,count:0,error:e.message});console.error(source.name+': '+e.message)}}
const successful=reports.filter(s=>s.status==='ok').length;
const items=merge(previous.items,incoming).sort((a,b)=>(b.publishedAt||b.firstSeen).localeCompare(a.publishedAt||a.firstSeen));
await fs.mkdir('public/data',{recursive:true});
await fs.writeFile('public/data/opportunities.json',JSON.stringify({lastAttempt:now,lastSuccess:successful?now:previous.lastSuccess,status:successful===sources.length?'ok':successful?'partial':'error',sources:reports,items},null,2)+'\n');
console.log(items.length+' total unique listings; '+successful+'/'+sources.length+' sources checked successfully');
if(!successful)process.exitCode=1;

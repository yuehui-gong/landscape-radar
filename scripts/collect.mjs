import fs from 'node:fs/promises';
import {parseRSS,parseASLA,parseLandezine,merge} from './normalize.mjs';
import {permittedRequest} from './access.mjs';
import {collectTED} from './ted.mjs';
import {collectYAC} from './yac.mjs';
import {parseArchinect} from './archinect.mjs';
import {collectArchDaily} from './archdaily.mjs';
const sources=JSON.parse(await fs.readFile('config/sources.json','utf8'));
const now=new Date().toISOString();
let previous={items:[],sources:[],lastSuccess:null};
try{previous=JSON.parse(await fs.readFile('public/data/opportunities.json','utf8'))}catch(e){if(e.code!=='ENOENT')throw e}
const incoming=[];const reports=[];
for(const source of sources){try{let rows,extra={};if(source.kind==='archdaily'){rows=await collectArchDaily(source,now)}else if(source.kind==='yac'){const result=await collectYAC(source,now);rows=result.items;extra={detailFailures:result.detailFailures,detailLimit:result.detailLimit}}else if(source.kind==='ted'){const result=await collectTED(source,now);rows=result.items;extra={matched:result.matched,limited:result.limited}}else{const r=await permittedRequest(source.url);if(!r.ok)throw Error('HTTP '+r.status);const text=await r.text();const parser={rss:parseRSS,asla:parseASLA,landezine:parseLandezine,archinect:parseArchinect}[source.kind];if(!parser)throw Error('Unsupported adapter: '+source.kind);rows=parser(text,source,now)}incoming.push(...rows);reports.push({...source,...extra,status:'ok',checkedAt:now,count:rows.length,lastSuccess:now});console.log(source.name+': '+rows.length+' listings')}catch(e){const old=previous.sources.find(s=>s.id===source.id);reports.push({...source,status:'error',checkedAt:now,lastSuccess:old?.lastSuccess||null,count:0,error:e.message});console.error(source.name+': '+e.message)}}
const successful=reports.filter(s=>s.status==='ok').length;
// Removed or permission-paused sources are no longer republished. Failed enabled sources retain prior records.
const enabled=new Set(sources.map(s=>s.id));
const items=merge(previous.items.filter(r=>enabled.has(r.sourceId)),incoming).sort((a,b)=>(b.publishedAt||b.firstSeen).localeCompare(a.publishedAt||a.firstSeen));
await fs.mkdir('public/data',{recursive:true});
await fs.writeFile('public/data/opportunities.json',JSON.stringify({lastAttempt:now,lastSuccess:successful?now:previous.lastSuccess,status:successful===sources.length?'ok':successful?'partial':'error',sources:reports,items},null,2)+'\n');
console.log(items.length+' total unique listings; '+successful+'/'+sources.length+' sources checked successfully');
if(!successful)process.exitCode=1;

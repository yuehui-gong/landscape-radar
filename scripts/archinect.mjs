import {XMLParser} from 'fast-xml-parser';
import {normalize,plain} from './normalize.mjs';

// Archinect permits feed access, not automated article/directory scraping.
// Conservative announcement discovery: do not turn roundups or results into calls.
export function parseArchinect(text,source,now){
  const doc=new XMLParser({ignoreAttributes:false,processEntities:true}).parse(text);
  if(!doc.feed)throw Error('Response is not an Atom feed');
  const entries=doc.feed.entry||[];
  return (Array.isArray(entries)?entries:[entries]).flatMap(entry=>{
    const title=plain(entry.title?.['#text']||entry.title);
    if(/results?|winners?|shortlist|finalists?|awarded|announced the winners|new architecture and design competitions/i.test(title))return [];
    if(!/competition\s+(imagines|invites|calls|seeks|opens|launches)|launch(?:es|ed)?\s+.{0,60}competition|call for (entries|proposals|submissions)/i.test(title))return [];
    const links=Array.isArray(entry.link)?entry.link:[entry.link];
    const href=links.find(l=>l?.['@_rel']==='alternate')?.['@_href'];
    if(!href)return [];
    const url=new URL(href);
    if(url.hostname!=='archinect.com'||!url.pathname.startsWith('/news/'))return [];
    const published=entry.published||entry.updated;
    return [normalize({title,url:url.href,type:'Competition',publishedAt:published&&!Number.isNaN(Date.parse(published))?new Date(published).toISOString():null},source,now)];
  });
}

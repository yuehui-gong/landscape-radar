import {load} from 'cheerio';
import {parseRSS,normalize,plain,exactDate} from './normalize.mjs';
import {checkRobots} from './access.mjs';

export function parseIAB(text,source,now){
  return parseRSS(text,source,now).filter(r=>/architectural design competition/i.test(r.title)&&/Bangladesh|Dhaka/i.test(r.title)&&!/results?|winners?|shortlist/i.test(r.title)).map(r=>({...r,type:'Competition',location:'Bangladesh',region:'Asia'}));
}

export function parseGeBIZ(html,source,now){
  const $=load(html),rows=new Map();
  if(!/BUSINESS OPPORTUNITY LISTING/i.test($.text()))throw Error('GeBIZ search page was not recognized');
  const anchors=$('a[href*="/opportunity/directlink.xhtml"]');
  if(!anchors.length&&!/No opportunity found/i.test($.text()))throw Error('GeBIZ listing layout changed');
  anchors.each((_,el)=>{
    const a=$(el),title=plain(a.text());
    if(!/landscape|urban|master\s?plan|architectur|public realm|park|waterfront|riverfront/i.test(title)||!/consultan|design|planning/i.test(title))return;
    if(/maintenance|grass cutting|horticultur|cleaning|supply of plants/i.test(title)&&!/consultancy|consultant/i.test(title))return;
    const url=new URL(a.attr('href'),source.url);
    if(url.hostname!=='www.gebiz.gov.sg'||!url.searchParams.get('docCode'))return;
    const card=a.closest('.formColumns_MAIN');
    const text=plain(card.text());
    const raw=text.match(/Closing on\s*(\d{1,2}\s+[A-Za-z]{3}\s+20\d{2})/i)?.[1];
    const parts=raw?.match(/(\d{1,2})\s+([A-Za-z]{3})\s+(20\d{2})/);
    const deadline=parts?exactDate(`${parts[2]} ${parts[1]}, ${parts[3]}`):null;
    if(deadline&&deadline<now.slice(0,10))return;
    rows.set(url.href,normalize({title,url:url.href,type:'RFP / RFQ',location:'Singapore',region:'Asia',deadlineText:deadline||'Check source',deadlineEvidence:raw?`GeBIZ closing date: ${raw}; confirm Singapore cutoff time and amendments`:null},source,now));
  });
  return [...rows.values()];
}

export async function collectGeBIZ(source,now){
  const rules=await checkRobots(source.url);
  if(rules.allowed!==true)throw Error('GeBIZ robots unresolved or disallowed');
  const {chromium}=await import('playwright');
  const browser=await chromium.launch({headless:true,...(process.env.GEBIZ_BROWSER_CHANNEL?{channel:process.env.GEBIZ_BROWSER_CHANNEL}:{})});
  try{
    const page=await browser.newPage();
    await page.route('**/*',async route=>{
      const req=route.request();
      if(req.isNavigationRequest()&&req.frame()===page.mainFrame()&&req.url()!==source.url){if((await checkRobots(req.url())).allowed!==true)return route.abort()}
      if(['image','media','font'].includes(req.resourceType()))return route.abort();
      return route.continue();
    });
    const rows=new Map();
    for(const query of source.queries){
      const response=await page.goto(source.url,{waitUntil:'domcontentloaded',timeout:45000});
      if(!response?.ok())throw Error('GeBIZ HTTP '+response?.status());
      await page.getByPlaceholder('Enter keywords',{exact:true}).fill(query);
      await Promise.all([page.waitForNavigation({waitUntil:'domcontentloaded',timeout:45000}),page.locator('input[id$="searchBar_BUTTON-GO"]').click()]);
      await page.locator('body').filter({hasText:'Search Terms: '+query}).waitFor({timeout:15000});
      for(const row of parseGeBIZ(await page.content(),source,now))rows.set(row.url,row);
    }
    return [...rows.values()];
  }finally{await browser.close()}
}

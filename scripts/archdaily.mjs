import {load} from 'cheerio';
import {normalize,plain,classify} from './normalize.mjs';
import {checkRobots} from './access.mjs';

export function parseArchDaily(html,source,now){
  const $=load(html), rows=new Map();
  $('a.afd-search-list__link[href]').each((_,el)=>{
    const a=$(el), heading=plain(a.find('.afd-search-list__title').text());
    if(!heading)return;
    const title=plain(a.find('img[alt]').first().attr('alt'))||heading;
    const url=new URL(a.attr('href'),source.url);
    if(url.hostname!=='www.archdaily.com'||!/^\/\d+\/[^/]+\/?$/.test(url.pathname))return;
    if(/\b(winners?|results?|shortlist|finalists?)\b/i.test(title))return;
    rows.set(url.href,normalize({title,url:url.href,type:classify(title)},source,now));
  });
  if(!rows.size)throw Error('ArchDaily returned no recognizable competition cards; page may be blocked or changed');
  return [...rows.values()];
}

export async function collectArchDaily(source,now){
  const robots=await checkRobots(source.url);
  if(robots.allowed!==true)throw Error(robots.allowed===false?'Robots disallows this path':'Robots could not be verified');
  const {chromium}=await import('playwright');
  const browser=await chromium.launch({headless:true,...(process.env.ARCHDAILY_BROWSER_CHANNEL?{channel:process.env.ARCHDAILY_BROWSER_CHANNEL}:{})});
  try{
    const page=await browser.newPage();
    let accessError;
    await page.route('**/*',async route=>{
      const request=route.request();
      if(request.isNavigationRequest()&&request.frame()===page.mainFrame()&&request.url()!==source.url){
        const rules=await checkRobots(request.url());
        if(rules.allowed!==true){accessError='Redirect robots access could not be verified or was disallowed';return route.abort()}
      }
      if(['image','media','font'].includes(request.resourceType()))return route.abort();
      return route.continue();
    });
    const response=await page.goto(source.url,{waitUntil:'domcontentloaded',timeout:45000});
    if(!response?.ok())throw Error('ArchDaily HTTP '+response?.status());
    await page.locator('a.afd-search-list__link .afd-search-list__title').first().waitFor({timeout:25000});
    if(accessError)throw Error(accessError);
    return parseArchDaily(await page.content(),source,now);
  }finally{await browser.close()}
}

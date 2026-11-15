import {load} from 'cheerio';
import {normalize,plain} from './normalize.mjs';
import {checkRobots} from './access.mjs';

export function parseNonA(html,source,now){
  const $=load(html);
  const tabs=$('.gutena-tabs-tab .gutena-tab-title').filter((_,el)=>plain($(el).text()).toUpperCase()==='OPEN');
  if(tabs.length!==1)throw Error('Non-A Open tab could not be identified');
  const id=tabs.attr('data-tab');
  const panel=tabs.closest('.wp-block-gutena-tabs').find('.gutena-tab-block').filter((_,el)=>$(el).attr('data-tab')===id);
  if(panel.length!==1)throw Error('Non-A Open panel could not be identified');
  const rows=new Map();
  panel.find('h2,h3').each((_,el)=>{
    const title=plain($(el).text());
    if(!title||/coming soon|results?|winners?|congratulations/i.test(title))return;
    const card=$(el).closest('.wp-block-columns');
    if(!card.length||/see results|congratulations|winners? have been announced/i.test(card.text()))return;
    const links=card.find('a[href]').filter((_,a)=>/^(to the brief|view brief|read more|learn more|join|enter|register|submit|apply|participate)(\b|$)/i.test(plain($(a).text())));
    const urls=links.map((_,a)=>{try{const u=new URL($(a).attr('href'),source.url);return u.protocol==='https:'&&u.hostname==='www.non-a.com'&&u.pathname!=='/'&&!/\/(members|membership|login|register|cart|checkout|portfolio)(\/|$)/i.test(u.pathname)?u.href:null}catch{return null}}).get();
    const unique=[...new Set(urls)];
    if(unique.length!==1)return;
    rows.set(unique[0],normalize({title,url:unique[0],type:'Competition'},source,now));
  });
  if(!rows.size&&!/new competitions coming soon/i.test(panel.text()))throw Error('Non-A Open panel changed or has no recognizable competition cards');
  return [...rows.values()];
}

export async function collectNonA(source,now){
  const robots=await checkRobots(source.url);
  if(robots.allowed!==true)throw Error(robots.allowed===false?'Robots disallows this path':'Robots could not be verified');
  const {chromium}=await import('playwright');
  const browser=await chromium.launch({headless:true,...(process.env.NON_A_BROWSER_CHANNEL?{channel:process.env.NON_A_BROWSER_CHANNEL}:{})});
  try{
    const page=await browser.newPage();
    await page.route('**/*',async route=>{
      const request=route.request();
      if(request.isNavigationRequest()&&request.frame()===page.mainFrame()&&request.url()!==source.url){
        if((await checkRobots(request.url())).allowed!==true)return route.abort();
      }
      if(['image','media','font'].includes(request.resourceType()))return route.abort();
      return route.continue();
    });
    const response=await page.goto(source.url,{waitUntil:'domcontentloaded',timeout:45000});
    if(!response?.ok())throw Error('Non-A HTTP '+response?.status());
    await page.locator('.gutena-tabs-tab .gutena-tab-title').first().waitFor({timeout:25000});
    return parseNonA(await page.content(),source,now);
  }finally{await browser.close()}
}

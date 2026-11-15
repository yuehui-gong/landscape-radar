import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseIAB,parseGeBIZ,collectGeBIZ} from '../scripts/asia.mjs';
const source={id:'gebiz',name:'GeBIZ',url:'https://www.gebiz.gov.sg/ptn/opportunity/BOListing.xhtml?origin=search',homepage:'https://www.gebiz.gov.sg/',metadataOnly:true,official:true,region:'Asia'};
const card=(title,code,date='26 Nov 2026')=>`<div class="formColumns_MAIN"><a href="/ptn/opportunity/directlink.xhtml?docCode=${code}">${title}</a><div>Closing on${date}04:00PM</div></div>`;
test('GeBIZ selects design consultancy, deduplicates and excludes maintenance and expired notices',()=>{
  const html='BUSINESS OPPORTUNITY LISTING'+card('Landscape architectural consultancy','A')+card('Landscape architectural consultancy','A')+card('Landscape maintenance services','B')+card('Urban design consultancy','C','01 Jan 2025')+card('IT consultancy','D');
  const rows=parseGeBIZ(html,source,'2026-11-15T00:00:00Z');
  assert.equal(rows.length,1);assert.equal(rows[0].deadline,'2026-11-26');assert.equal(rows[0].location,'Singapore');assert.equal(rows[0].region,'Asia');assert.equal(rows[0].summary,'');assert.equal(rows[0].participationStatus,'Unverified');assert.equal(rows[0].type,'RFP / RFQ');
});
test('GeBIZ explicit empty search succeeds and blocked/changed pages fail',()=>{
  assert.deepEqual(parseGeBIZ('BUSINESS OPPORTUNITY LISTING No opportunity found.',source,'now'),[]);
  assert.throws(()=>parseGeBIZ('Verify you are human',source,'now'),/not recognized/);
  assert.throws(()=>parseGeBIZ('BUSINESS OPPORTUNITY LISTING unexpected markup',source,'now'),/layout changed/);
});
test('IAB retains Bangladesh design calls without importing congress papers or overseas calls',()=>{
  const item=title=>`<item><title>${title}</title><link>https://iab.org.bd/call/</link><pubDate>Mon, 26 Oct 2026 14:44:03 +0000</pubDate></item>`;
  const xml='<rss><channel>'+item('Open Architectural Design Competition on Climate-Resilient Rural Housing within Bangladesh')+item('CALL FOR SUBMISSION Congress 2026')+item('Open Architectural Design Competition in Europe')+'</channel></rss>';
  const rows=parseIAB(xml,{...source,id:'iab'},'2026-11-15T00:00:00Z');assert.equal(rows.length,1);assert.equal(rows[0].location,'Bangladesh');assert.equal(rows[0].deadline,null);assert.equal(rows[0].eligibility,null);
});
test('GeBIZ enforces robots before launching a browser',async t=>{
  t.mock.method(globalThis,'fetch',async()=>new Response('User-agent: *\nDisallow: /'));
  await assert.rejects(collectGeBIZ(source,'now'),/robots unresolved or disallowed/);
});

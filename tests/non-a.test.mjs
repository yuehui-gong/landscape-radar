import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseNonA,collectNonA} from '../scripts/non-a.mjs';
const source={id:'non-architecture',name:'Non-A',url:'https://www.non-a.com/open-architecture-competitions/',official:true,metadataOnly:true};
const card=(title,label='TO THE BRIEF',url='https://www.non-a.com/future-garden')=>`<div class="wp-block-columns"><h2>${title}</h2><a href="${url}">${label}</a><p>Description not copied</p></div>`;
const page=(open,past='')=>`<div class="wp-block-gutena-tabs"><ul class="gutena-tabs-tab"><li class="gutena-tab-title" data-tab="7">OPEN</li><li class="gutena-tab-title" data-tab="8">PAST</li></ul><div class="gutena-tab-block" data-tab="7">${open}</div><div class="gutena-tab-block" data-tab="8">${past}</div></div>`;
test('explicit empty Open panel does not import past briefs',()=>{
  assert.deepEqual(parseNonA(page('<h2>new competitions coming soon…</h2>',card('Botanical Turn')),source,'now'),[]);
});
test('Open cards retain factual metadata and exclude results and account links',()=>{
  const rows=parseNonA(page(card('Future Garden')+card('Future Garden')+card('Past Garden','SEE RESULTS')+card('Sign up','REGISTER','https://www.non-a.com/register/')),source,'now');
  assert.equal(rows.length,1);assert.equal(rows[0].title,'Future Garden');assert.equal(rows[0].deadline,null);assert.equal(rows[0].summary,'');assert.equal(rows[0].eligibility,null);assert.equal(rows[0].participationStatus,'Unverified');assert.equal(rows[0].official,true);
});
test('layout changes and challenge pages fail rather than report zero',()=>{
  assert.throws(()=>parseNonA('<html>Verify you are human</html>',source,'now'),/Open tab/);
  assert.throws(()=>parseNonA(page('<h2>Unknown new layout</h2>'),source,'now'),/changed/);
});
test('Non-A enforces robots before launching browser',async t=>{
  t.mock.method(globalThis,'fetch',async()=>new Response('User-agent: *\nDisallow: /'));
  await assert.rejects(collectNonA(source,'now'),/Robots disallows/);
});

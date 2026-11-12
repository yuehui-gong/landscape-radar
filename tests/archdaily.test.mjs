import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseArchDaily,collectArchDaily} from '../scripts/archdaily.mjs';
const source={id:'archdaily',name:'ArchDaily',url:'https://www.archdaily.com/search/competitions/en',homepage:'https://www.archdaily.com/search/competitions/en',metadataOnly:true};
const card=(title,href='/123456/garden-competition')=>`<a class="afd-search-list__link" href="${href}"><img alt="${title}"><h2 class="afd-search-list__title">Shortened...</h2></a>`;
test('ArchDaily uses full title metadata, deduplicates cards and preserves unknown participation',()=>{
  const rows=parseArchDaily(card('Garden Design Competition')+card('Garden Design Competition')+card('Competition Winners','/123457/winners')+card('Wrong host','https://example.org/123458/other'),source,'2026-11-11T00:00:00Z');
  assert.equal(rows.length,1);
  assert.equal(rows[0].title,'Garden Design Competition');
  assert.equal(rows[0].type,'Competition');
  assert.equal(rows[0].summary,'');
  assert.equal(rows[0].deadline,null);
  assert.equal(rows[0].publishedAt,null);
  assert.equal(rows[0].participationStatus,'Unverified');
  assert.equal(rows[0].organizerUrl,null);
});
test('ArchDaily blocked or changed page is an error rather than a successful empty collection',()=>{
  assert.throws(()=>parseArchDaily('<html>Please verify you are human</html>',source,'now'),/no recognizable/);
});
test('ArchDaily checks robots before launching a browser',async t=>{
  t.mock.method(globalThis,'fetch',async()=>new Response('User-agent: *\nDisallow: /search/'));
  await assert.rejects(collectArchDaily(source,'now'),/Robots disallows/);
});

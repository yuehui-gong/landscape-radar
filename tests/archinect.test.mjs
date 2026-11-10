import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parseArchinect} from '../scripts/archinect.mjs';
const source={id:'archinect',name:'Archinect',homepage:'https://archinect.com/competitions',metadataOnly:true};
const entry=(title,href='https://archinect.com/news/bustler/123/call')=>`<entry><title type="text">${title}</title><link rel="alternate" href="${href}"/><published>2026-11-09T10:00:00Z</published><content>Copied description; deadline tomorrow</content></entry>`;
const feed=entries=>`<feed xmlns="http://www.w3.org/2005/Atom">${entries}</feed>`;
test('Atom announcement discovery preserves uncertainty and excludes other competition news',()=>{
  const text=feed([
    entry('La Pyramide Architecture Competition imagines a future'),
    entry('New architecture and design competitions: Four calls'),
    entry('Designers among shortlist for Sydney competition'),
    entry('Competition launches with winners already announced'),
    entry('Competition invites submissions','https://other.example/news/call'),
    entry('University launches a design competition','https://archinect.com/news/123/other')
  ].join(''));
  const rows=parseArchinect(text,source,'2026-11-10T00:00:00Z');
  assert.equal(rows.length,2);
  assert.equal(rows[0].summary,'');
  assert.equal(rows[0].deadline,null);
  assert.equal(rows[0].participationStatus,'Unverified');
  assert.equal(rows[0].organizerUrl,null);
  assert.equal(rows[0].official,false);
  assert.equal(rows[0].publishedAt,'2026-11-09T10:00:00.000Z');
});
test('an empty Atom feed is valid but an HTML error is not',()=>{
  assert.deepEqual(parseArchinect(feed(''),source,'now'),[]);
  assert.throws(()=>parseArchinect('<html>Unavailable</html>',source,'now'),/not an Atom feed/);
});

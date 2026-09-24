import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

test('Original-Staging bleibt projektisoliert und überschreibt keine unveränderte Kopie',()=>{
  for(const file of ['stage-photo-review.ps1','stage-kayak-gallery.ps1']){
    const source=readFileSync(new URL(`../tools/${file}`,import.meta.url),'utf8');
    assert.match(source,/review\\selected-originals/);
    assert.match(source,/Get-FileHash/);
    assert.match(source,/if \(\$copyHash -ne \$sourceHash\)/);
    assert.doesNotMatch(source,/Copy-Item[^\r\n]*-Force/);
    assert.doesNotMatch(source,/Remove-Item[^\r\n]*-Recurse/);
  }
});

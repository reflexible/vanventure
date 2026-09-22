import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import YAML from 'yaml';
test('Docker configuration isolates database and production ports, development uses localhost',()=>{
  const base=YAML.parse(readFileSync('compose.yaml','utf8')),dev=YAML.parse(readFileSync('compose.override.yaml','utf8'));
  assert.equal(base.services.db.image,'postgres:18-bookworm');assert.equal(base.services.db.ports,undefined);
  assert.deepEqual(base.services.web.ports,['127.0.0.1:18082:8787']);assert.equal(base.services.web.environment.EDITOR_SECURE_COOKIE,'true');
  assert.deepEqual(base.services.proxy.ports,['80:80','443:443','443:443/udp']);
  assert.deepEqual(dev.services.web.ports,['127.0.0.1:8080:8787']);assert.equal(dev.services.web.environment.NODE_ENV,'development');
  assert.equal(base.services.web.depends_on.db.condition,'service_healthy');assert.equal(base.networks.database.internal,true);
});

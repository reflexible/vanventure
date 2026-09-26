import test from 'node:test';
import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { localCheckEnvironment, selectProjectCheckProfiles, projectCheckInvocation, projectFastCheckCommands } from './project-check-profiles.mjs';

test('CMS cannot inherit external database or Node preload settings, including Windows case variants', () => {
  const source = { PATH: 'test-path', SystemRoot: 'test-system', TEST_DATABASE_URL: 'postgres://remote',
    test_database_url: 'postgres://other', DATABASE_URL: 'postgres://production', PGHOST: 'production',
    NODE_OPTIONS: '--import malicious.mjs', NODE_PATH: '/untrusted', OPENAI_API_KEY: 'secret', HTTPS_PROXY: 'remote', TEMP: 'test-temp' };
  const env = localCheckEnvironment(source);
  assert.deepEqual(env, { PATH: 'test-path', SYSTEMROOT: 'test-system', TEMP: 'test-temp', NODE_ENV: 'test' });
  assert.equal(source.TEST_DATABASE_URL, 'postgres://remote');
  const command = projectCheckInvocation('cms-persistence-local', resolve('.'), source);
  assert.deepEqual(command.options.env, env);
  assert.equal(command.options.shell, false);
  assert.equal(command.options.windowsHide, true);
  assert.deepEqual(command.args, ['--test', 'editor/postgres.test.mjs', 'editor/editor.test.mjs']);
});
test('module scope selects explicit maintained tests, deduplicates shared profiles and preserves gaps', () => {
  const selected = selectProjectCheckProfiles(['design-guide', 'analytics', 'responsive-templates', 'design-guide', 'unregistered']);
  assert.deepEqual(selected.profiles.map(p => p.id), ['public-structure-local']);
  assert.deepEqual(selected.profiles[0].requested_modules, ['responsive-templates', 'design-guide']);
  assert.deepEqual(selected.unresolved.map(p => p.module_id), ['analytics', 'unregistered']);
  assert.match(selected.unresolved[0].reason, /runtime checker/);
  assert.equal(selected.complete_semantic_coverage, false);
});
test('FAST commands route through env-sanitizing adapter and never select rollout or backup', () => {
  const result = projectFastCheckCommands(['scrum-core', 'sot-architecture', 'cms-content', 'release-governance']);
  assert.equal(result.test_commands.length, 2);
  for (const command of result.test_commands) {
    assert.equal(command.command, process.execPath);
    assert.equal(command.args[0], command.ref);
    assert.equal(command.args[1], '--run-profile');
    assert.equal(command.args.length, 3);
    const invocation = projectCheckInvocation(command.args[2], resolve('.'));
    assert.ok(invocation.args.slice(1).every(ref => ref.endsWith('.test.mjs')));
    assert.ok(invocation.args.every(arg => !/release-check|backup|restore|deploy\.mjs/.test(arg)));
  }
  assert.equal(result.unresolved[0].module_id, 'release-governance');
});
test('input cannot supply arbitrary shell commands, paths, flags or mutate maintained profiles', () => {
  for (const id of ['cms-persistence-local; npm run check:release', '../deploy/release-check.mjs', '--eval', '__proto__']) {
    assert.throws(() => projectCheckInvocation(id, resolve('.')), /Unknown maintained/);
  }
  assert.throws(() => projectCheckInvocation('cms-persistence-local', '.'), /Absolute/);
  assert.throws(() => selectProjectCheckProfiles([]), /Explicit/);
  const first = selectProjectCheckProfiles(['cms-content']); first.profiles[0].refs.push('malicious.mjs');
  assert.ok(!projectCheckInvocation('cms-persistence-local', resolve('.')).args.includes('malicious.mjs'));
});

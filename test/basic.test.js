// basic.test.js: smoke tests, no test framework required
// Run with: node test/basic.test.js

'use strict';

const e = require('../index.js');

let passed = 0;
let failed = 0;

function assert(label, condition) {
  if (condition) {
    console.log(`  ✓  ${label}`);
    passed++;
  } else {
    console.error(`  ✗  ${label}`);
    failed++;
  }
}

function throws(fn) {
  try { fn(); return false; } catch (err) { return true; }
}

function section(name) {
  console.log(`\n${name}`);
}

const all = e.getAllTypes();

// ─── Types ───────────────────────────────────────────────────────────────────
section('Types');
assert('nine types',                          all.length === 9);
assert('numbered 1 to 9',                     all.map(t => t.type).join('') === '123456789');
assert('getType accepts strings',             e.getType('4').name === 'Individualist');
assert('unknown type throws',                 throws(() => e.getType(10)));
assert('every type has fear, desire and a description',
  all.every(t => t.fear && t.desire && t.summary && t.behaviour && t.under_stress && t.at_ease && t.signs.length === 3));

// ─── Wings and lines ─────────────────────────────────────────────────────────
section('Wings and lines');
assert('wings are the neighbours',            e.getWings(5).join() === '4,6');
assert('wings wrap round the circle',         e.getWings(1).join() === '9,2' && e.getWings(9).join() === '8,1');
// The two stress sequences: 1-4-2-8-5-7-1 and 3-9-6-3.
const stressNext = { 1: 4, 4: 2, 2: 8, 8: 5, 5: 7, 7: 1, 3: 9, 9: 6, 6: 3 };
assert('stress lines follow 1-4-2-8-5-7-1 and 3-9-6-3', all.every(t => e.getStress(t.type) === stressNext[t.type]));
assert('growth is stress reversed',           all.every(t => e.getStress(e.getGrowth(t.type)) === t.type));

// ─── Groups ──────────────────────────────────────────────────────────────────
section('Groups');
const groupsCover = (g) => Object.keys(g).filter(k => k !== 'groupNote').flatMap(k => g[k].types).sort().join('') === '123456789';
assert('centres cover each type once',        groupsCover(e.data.groups.centres));
assert('Hornevian groups cover each type once', groupsCover(e.data.groups.hornevian));
assert('Harmonic groups cover each type once', groupsCover(e.data.groups.harmonic));
assert('centre agrees with each type',        all.every(t => e.getCentre(t.type).name === t.centre));
assert('centres: gut 8 9 1, heart 2 3 4, head 5 6 7',
  e.getCentre('gut').types.join() === '8,9,1' && e.getCentre('Heart').types.join() === '2,3,4' && e.getCentre('head').types.join() === '5,6,7');
assert('Hornevian: assertive 3 7 8, compliant 1 2 6, withdrawn 4 5 9',
  e.getHornevian('Assertive').types.join() === '3,7,8' && e.getHornevian('compliant').types.join() === '1,2,6' && e.getHornevian('Withdrawn').types.join() === '4,5,9');
assert('Harmonic: positive 2 7 9, competency 1 3 5, emotional realness 4 6 8',
  e.getHarmonic('Positive outlook').types.join() === '2,7,9' && e.getHarmonic('competency').types.join() === '1,3,5' && e.getHarmonic('Emotional realness').types.join() === '4,6,8');
assert('type objects carry their groups',     e.getType(8).hornevian === 'Assertive' && e.getType(8).harmonic === 'Emotional realness');
assert('group lookup by type',                e.getHornevian(9).name === 'Withdrawn');
assert('unknown group throws',                throws(() => e.getCentre('Spleen')));

// ─── Instincts ───────────────────────────────────────────────────────────────
section('Instincts');
assert('three instincts',                     e.getAllInstincts().map(i => i.code).join() === 'sp,so,sx');
assert('by code, case-insensitive',           e.getInstinct('SX').name === 'One-to-one');
assert('unknown instinct throws',             throws(() => e.getInstinct('xx')));

// ─── Wording ─────────────────────────────────────────────────────────────────
section('Wording');
const text = JSON.stringify(require('../data/types.json')) + JSON.stringify(require('../data/groups.json'));
assert('no em dashes',                        !text.includes('—'));
// The typing interview never asks about or records health, diet, weight or
// eating, so the descriptions it reads stay off those topics too.
assert('descriptions stay off health, diet, weight and eating',
  !/\b(health|diet|weight|eat|eating|ate|food|meals?|illness|medical|gluttony)\b/i.test(JSON.stringify(require('../data/types.json').types)));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);

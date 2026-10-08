'use strict';

const typesData  = require('./data/types.json');
const groupsData = require('./data/groups.json');

const TYPE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// ─── Internal helpers ────────────────────────────────────────────────────────

function assertType(n) {
  const t = Number(n);
  if (!typesData.types[String(t)]) throw new Error(`Unknown enneagram type: "${n}". Valid types: 1 to 9`);
  return t;
}

// The two neighbours on the circle: 1's wings are 9 and 2, 9's are 8 and 1.
function wingsOf(t) {
  return [t === 1 ? 9 : t - 1, t === 9 ? 1 : t + 1];
}

function groupOf(groups, t) {
  return Object.keys(groups).find(k => k !== 'groupNote' && groups[k].types.includes(t));
}

function findGroup(groups, kind, nameOrType) {
  if (typeof nameOrType === 'number' || /^\d$/.test(String(nameOrType))) {
    return groups[groupOf(groups, assertType(nameOrType))];
  }
  const key = Object.keys(groups).find(k => k !== 'groupNote' && k.toLowerCase() === String(nameOrType).toLowerCase().trim());
  if (!key) throw new Error(`Unknown ${kind}: "${nameOrType}". Valid: ${Object.keys(groups).filter(k => k !== 'groupNote').join(', ')}`);
  return groups[key];
}

function buildType(t) {
  const base = typesData.types[String(t)];
  return Object.assign({}, base, {
    wings: wingsOf(t),
    hornevian: groupOf(groupsData.hornevian, t),
    harmonic: groupOf(groupsData.harmonic, t)
  });
}

const builtTypes = TYPE_NUMBERS.reduce((acc, t) => { acc[t] = buildType(t); return acc; }, {});

// ─── Types ───────────────────────────────────────────────────────────────────

/**
 * Returns a type (1 to 9) with its centre, fear, desire, lines, wings, groups
 * and description.
 * @param {number|string} n
 * @returns {object}
 */
function getType(n) {
  return builtTypes[assertType(n)];
}

/** @returns {object[]} the nine types, 1 to 9 */
function getAllTypes() {
  return TYPE_NUMBERS.map(t => builtTypes[t]);
}

/** @returns {number[]} the two wings of a type */
function getWings(n) {
  return wingsOf(assertType(n));
}

/** The type a type moves towards under stress (the line of disintegration). */
function getStress(n) {
  return getType(n).stress;
}

/** The type a type moves towards in growth (the line of integration). */
function getGrowth(n) {
  return getType(n).growth;
}

// ─── Groups ──────────────────────────────────────────────────────────────────

/** A centre by name ('Gut', 'Heart', 'Head') or by type number. */
function getCentre(nameOrType) {
  return findGroup(groupsData.centres, 'centre', nameOrType);
}

/** A Hornevian group ('Assertive', 'Compliant', 'Withdrawn') or a type's. */
function getHornevian(nameOrType) {
  return findGroup(groupsData.hornevian, 'Hornevian group', nameOrType);
}

/** A Harmonic group ('Positive outlook', 'Competency', 'Emotional realness') or a type's. */
function getHarmonic(nameOrType) {
  return findGroup(groupsData.harmonic, 'Harmonic group', nameOrType);
}

/** An instinct by code ('sp', 'so', 'sx'). */
function getInstinct(code) {
  const c = String(code).toLowerCase().trim();
  const i = groupsData.instincts[c];
  if (!i || c === 'groupnote') throw new Error(`Unknown instinct: "${code}". Valid: sp, so, sx`);
  return i;
}

/** @returns {object[]} the three instincts */
function getAllInstincts() {
  return ['sp', 'so', 'sx'].map(c => groupsData.instincts[c]);
}

module.exports = {
  getType, getAllTypes, getWings, getStress, getGrowth,
  getCentre, getHornevian, getHarmonic,
  getInstinct, getAllInstincts,
  TYPE_NUMBERS,
  data: {
    types: builtTypes,
    groups: groupsData,
    status: typesData.status
  }
};

# enneagram-core

Enneagram data and query library. Covers the nine types with their core fear and desire, the three centres, wings, the lines of stress and growth, the Hornevian and Harmonic groups, and the three instincts, with a description of each type, structured for use in any JavaScript project.

No dependencies. No build step. Works in Node.js 12+.

```bash
npm install enneagram-core
```

> **Status: 0.1, draft.** The structure (centres, wings, lines and groups) follows the common modern account of the Enneagram and is checked by the tests. The descriptions are original and are a first draft awaiting review.

---

## Quick start

```js
const enneagram = require('enneagram-core');

const five = enneagram.getType(5);
console.log(five.name);       // 'Investigator'
console.log(five.centre);     // 'Head'
console.log(five.fear);       // 'Being helpless, incapable or overwhelmed.'
console.log(five.wings);      // [4, 6]
console.log(five.stress);     // 7
console.log(five.growth);     // 8
console.log(five.hornevian);  // 'Withdrawn'
console.log(five.harmonic);   // 'Competency'

enneagram.getCentre('Gut').types;  // [8, 9, 1]
enneagram.getHornevian(3).name;    // 'Assertive'
enneagram.getInstinct('sp').name;  // 'Self-preservation'
```

---

## API at a glance

| Area | Functions |
|------|-----------|
| Types | `getType`, `getAllTypes`, `getWings`, `getStress`, `getGrowth` |
| Groups | `getCentre`, `getHornevian`, `getHarmonic` |
| Instincts | `getInstinct`, `getAllInstincts` |
| Raw data | `data` (`types`, `groups`), `TYPE_NUMBERS` |

---

## API

### Types

#### `getType(n)` → object
Accepts 1 to 9 (number or string).

```js
{
  type: 5,
  name: 'Investigator',
  centre: 'Head',
  fear: 'Being helpless, incapable or overwhelmed.',
  desire: 'To be capable and competent.',
  stress: 7,
  growth: 8,
  summary: 'Observant and independent, focused on understanding.',
  behaviour: 'They gather knowledge and like to understand something thoroughly before acting. ...',
  signs: ['Researches before committing', 'Needs time alone to recharge', 'Keeps their inner life private'],
  under_stress: 'Scatters into restless distraction, ...',
  at_ease: 'Acts decisively on what they know ...',
  wings: [4, 6],
  hornevian: 'Withdrawn',
  harmonic: 'Competency'
}
```

`wings`, `hornevian` and `harmonic` are derived in code from the circle and `data/groups.json`, so they can't disagree with the groups.

| Type | Name | Centre | Wings | Stress | Growth | Hornevian | Harmonic |
|------|------|--------|-------|--------|--------|-----------|----------|
| 1 | Reformer | Gut | 9, 2 | 4 | 7 | Compliant | Competency |
| 2 | Helper | Heart | 1, 3 | 8 | 4 | Compliant | Positive outlook |
| 3 | Achiever | Heart | 2, 4 | 9 | 6 | Assertive | Competency |
| 4 | Individualist | Heart | 3, 5 | 2 | 1 | Withdrawn | Emotional realness |
| 5 | Investigator | Head | 4, 6 | 7 | 8 | Withdrawn | Competency |
| 6 | Loyalist | Head | 5, 7 | 3 | 9 | Compliant | Emotional realness |
| 7 | Enthusiast | Head | 6, 8 | 1 | 5 | Assertive | Positive outlook |
| 8 | Challenger | Gut | 7, 9 | 5 | 2 | Assertive | Emotional realness |
| 9 | Peacemaker | Gut | 8, 1 | 6 | 3 | Withdrawn | Positive outlook |

The names are the most widely used labels; other schools use other names.

#### `getAllTypes()` → object[]
#### `getWings(n)`, `getStress(n)`, `getGrowth(n)`
The two wings, and the type each moves towards under stress (disintegration) and in growth (integration). The stress lines run 1-4-2-8-5-7-1 and 3-9-6-3; growth runs the other way.

### Groups

#### `getCentre(nameOrType)`, `getHornevian(nameOrType)`, `getHarmonic(nameOrType)` → object
Accept a group name (case-insensitive) or a type number.

- **Centres:** Gut (8, 9, 1), Heart (2, 3, 4), Head (5, 6, 7).
- **Hornevian groups**, after Karen Horney: Assertive (3, 7, 8), Compliant (1, 2, 6), Withdrawn (4, 5, 9).
- **Harmonic groups:** Positive outlook (2, 7, 9), Competency (1, 3, 5), Emotional realness (4, 6, 8).

### Instincts

#### `getInstinct(code)`, `getAllInstincts()`
Self-preservation (`sp`), Social (`so`) and One-to-one (`sx`). The 27 instinctual subtypes are not described.

---

## What's not included

The passions and fixations, and the 27 instinctual subtypes, are left out: their best-known descriptions belong to particular authors, and this package keeps to structure and original descriptions. The descriptions also stay off health, diet, weight and eating (the tests check), so they can be used directly in a typing interview that never asks about those topics.

For socionics and psychosophy data in the same style, see [socionics-core](https://github.com/sstern42/socionics-core) and [psychosophy-core](https://github.com/sstern42/psychosophy-core).

---

## Licence

MIT

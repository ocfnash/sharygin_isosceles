import {addTriangles, xyFromAB, bFromA, cubicIdentityComponent} from '../triangle-utils.js';

const p = (a: number, b: number): number => a*a*a + a*a*b + a*b*b + b*b*b + a*a + a*b + b*b - (a + b + 1);

test('adding triangles produces point on elliptic curve', () => {
  const P = {a: 0.79162694, b: 0.46};
  const Q = {a: 0.95367672, b: 0.15};
  const R = addTriangles(P, Q);
  expect(p(R.a, R.b)).toBeCloseTo(0, 6);
});

test('bFromA', () => {
  const i = 200;
  const as = cubicIdentityComponent.xs;
  const bs = cubicIdentityComponent.ys;
  expect(bFromA(as[i])).toEqual(bs[i]);
});

test('xyFromAB consistent with Pythagoras', () => {
  const i = 200;
  const a = cubicIdentityComponent.xs[i];
  const b = cubicIdentityComponent.ys[i];
  const {x, y} = xyFromAB(a, b);
  expect(x*x + y*y).toBeCloseTo(b*b, 6);
  expect((1-x)*(1-x) + y*y).toBeCloseTo(a*a, 6);
})

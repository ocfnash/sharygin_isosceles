// @flow
export const cubicIdentityComponent = require('../public/assets/sharygin-cubic-identity-component.json');
export const cubicSecondComponent = require('../public/assets/sharygin-cubic-second-component.json');

type CubicPoint = {
  a: number,
  b: number,
};

export const bFromA = (a: number): number => {
  const i = cubicIdentityComponent.xs.findIndex(x => x >= a);
  return cubicIdentityComponent.ys[i];
};

export const PointFromIndex = (i: number): CubicPoint => (
  {
    a: cubicIdentityComponent.xs[i],
    b: cubicIdentityComponent.ys[i],
  }
);

export function xyFromAB(a: number, b: number): {x: number, y: number} {
  const x = (b*b - a*a + 1)/2;
  let y = Math.sqrt(b*b-x*x);
  if (a < 0 || b < 0) y = -y;
  return {x, y};
};

export function doubleTriangle(P: CubicPoint): CubicPoint {
  const x = P.a;
  const y = P.b;
  const Fx = 3 * x**2 + 2 * x * y + y ** 2 + 2 * x + y - 1
  const Fy = 3 * y**2 + 2 * x * y + x ** 2 + 2 * y + x - 1
  const c2 = Fx**2*x + 3*Fx**2*y + Fx**2 - 2*Fx*Fy*x - 2*Fx*Fy*y - Fx*Fy + 3*Fy**2*x + Fy**2*y + Fy**2
  const c3 = -(Fx**3) + Fx**2*Fy - Fx*Fy**2 + Fy**3
  const t = -c2/c3
  return {
    a: y - t * Fx,
    b: x + t * Fy,
  }
}

export function addTriangles(P: CubicPoint, Q: CubicPoint): CubicPoint {
  const a1 = P.a;
  const b1 = P.b;
  const a2 = Q.a;
  const b2 = Q.b;
  // TODO Tidy up the expressions below.
  const u = 3*a2*a2*a2 + a1*a1*(1 + 3*a2 + b2) + (b1 - b2)*(b1 - b2)*(1 + 3*b2) +
            a2*a2*(1 - 2*b1 + 3*b2) + a2*(-b1 + b1*b1 + b2 - 4*b1*b2 + 3*b2*b2) -
            a1*(6*a2*a2 - (b1 - b2)*(1 + 2*b2) + a2*(2 - 2*b1 + 4*b2));
  const v = a1*a1*a1 - a2*a2*a2 + a1*(3*a2*a2 - 2*a2*(b1 - b2) + (b1 - b2)*(b1-b2)) +
            a2*a2*(b1-b2) - a2*(b1-b2)*(b1-b2) + (b1-b2)*(b1-b2)*(b1-b2) +
            a1*a1*(-3*a2 + b1 - b2);
  const t = -u/v - 1;
  return {
    a: t*b1 + (1-t)*b2,
    b: t*a1 + (1-t)*a2,
  }
}

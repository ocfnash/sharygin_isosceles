import React, { Component } from 'react';
import {cubicIdentityComponent, cubicSecondComponent} from '../triangle-utils.js';

const minX = Math.min(...cubicIdentityComponent.xs);
const maxX = Math.max(...cubicIdentityComponent.xs);
const minY = Math.min(...cubicIdentityComponent.ys);
const maxY = Math.max(...cubicIdentityComponent.ys);
const diag = Math.sqrt((maxX - minX)*(maxX - minX) + (maxY - minY)*(maxY - minY));
const scale = 35;
const plot = (x, y) => [scale * (x - minX), scale * (maxY - y)];

const xAxis = [[minX, 0], [maxX, 0]].map(p => plot(p[0], p[1]));
const yAxis = [[0, minY], [0, maxY]].map(p => plot(p[0], p[1]));

const getScaledPointsList = pointsDict => {
  const {xs, ys} = pointsDict;
  return xs.map((x, i) => plot(x, ys[i]));
};

const getLongLine = (x1, y1, x2, y2) => {
  let dx, dy;
  if (x1 !== x2 && y1 !== y2) {
    dx = x1 - x2;
    dy = y1 - y2;
  }
  else {
    const c = 1 - (x1 + y1) * (x1 + y1 + 1)
    dx = c - y1 * (2 * y1 + 1)
    dy = c + x1 * (2 * x1 + 1)
  }
  const r = Math.sqrt(dx*dx + dy*dy);
  const pt = t => plot(x1 + t*dx/r, y1 + t*dy/r);
  return [pt(-diag), pt(diag)];
};

class SharyginCubicGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // The filtering below is adhoc to reduce aliasing problems that manifest on lower dpi displays.
      idCompPointsStr: getScaledPointsList(cubicIdentityComponent).filter((x, i) => i % 10 === 0).join(' '),
      secCompPointsStr: getScaledPointsList(cubicSecondComponent).filter((x, i) => i % 3 === 0).join(' '),
    };
  }
  render() {
    const _P = plot(this.props.P.a, this.props.P.b);
    const _Q = plot(this.props.Q.a, this.props.Q.b);
    const _R = plot(this.props.R.a, this.props.R.b);
    const _Rneg = plot(this.props.R.b, this.props.R.a);
    const l = getLongLine(this.props.P.a, this.props.P.b, this.props.Q.a, this.props.Q.b);
    return (
      <div className="sharygin-cubic-graph-container">
        <svg className="sharygin-cubic-graph-svg">
          <polyline fill="none" stroke="black" points={this.state.idCompPointsStr} />
          <polygon fill="none" stroke="black" points={this.state.secCompPointsStr} />
          <line fill="none" stroke="black" x1={xAxis[0][0]} y1={xAxis[0][1]} x2={xAxis[1][0]} y2={xAxis[1][1]} />
          <line fill="none" stroke="black" x1={yAxis[0][0]} y1={yAxis[0][1]} x2={yAxis[1][0]} y2={yAxis[1][1]} />
          <line fill="none" stroke="black" x1={l[0][0]} y1={l[0][1]} x2={l[1][0]} y2={l[1][1]} />
          <circle cx={_Rneg[0]} cy={_Rneg[1]} stroke="black" r="5" />
          <circle cx={_P[0]} cy={_P[1]} r="5" className="sharygin-p-point" />
          <circle cx={_Q[0]} cy={_Q[1]} r="5" className="sharygin-q-point" />
          <circle cx={_R[0]} cy={_R[1]} r="5" className="sharygin-r-point" />
        </svg>
      </div>
    );
  }
}

export default SharyginCubicGraph;

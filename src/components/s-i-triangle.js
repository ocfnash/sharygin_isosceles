import React, { Component } from 'react';
import {xyFromAB} from '../triangle-utils';

class SITriangle extends Component {
  triangleCoordsString() {
    const {x, y} = xyFromAB(this.props.a, this.props.b);
    const scale = 100;
    const minX = 1;
    const isoscelesSideLength = (1 + Math.sqrt(17))/8;
    const maxY = xyFromAB(isoscelesSideLength, isoscelesSideLength).y; // Math.sqrt((1+Math.sqrt(17))/2)/4
    const plot = (x, y) => [scale * (x + minX), scale * (maxY - y) + 5];
    return [[0, 0], [1, 0], [x, y]].map(l => plot(...l)).join(' ');
  }
  getPolygonClassNames()
  {
    return `${this.props.polygonClassName} sharygin-triangle`;
  }
  render() {
    return (
      <div className="sharygin-isosceles-triangle-container">
        <svg className="sharygin-triangle-svg-container">
          <polygon points={this.triangleCoordsString()} className={this.getPolygonClassNames()} />
        </svg>
      </div>
    );
  }
}

export default SITriangle;

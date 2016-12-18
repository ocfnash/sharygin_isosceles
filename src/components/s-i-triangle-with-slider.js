import React, { Component } from 'react';
import SITriangle from './s-i-triangle.js';
import SISlider from './s-i-slider.js'
import {PointFromIndex} from '../triangle-utils.js';

class SITriangleWithSlider extends Component {
  render() {
    const {index, polygonClassName} = this.props;
    const {a, b} = PointFromIndex(index);
    return (
      <div className="sharygin-isosceles-triangle-with-slider-container">
        <SISlider onUpdate={this.props.onSliderUpdate} index={index} />
        <SITriangle a={a} b={b} polygonClassName={polygonClassName} />
      </div>
    );
  }
}

export default SITriangleWithSlider;

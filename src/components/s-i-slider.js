import React, { Component } from 'react';
import Rcslider from 'rc-slider';
import {cubicIdentityComponent, bFromA} from '../triangle-utils.js';

const tipFormatter = i => `(${cubicIdentityComponent.xs[i].toFixed(2)},${cubicIdentityComponent.ys[i].toFixed(2)})`;
const firstXsIndex = v => cubicIdentityComponent.xs.findIndex(x => x >= v);
const minXLimit = -3;
const maxXLimit = bFromA(minXLimit);
const marks={
  [firstXsIndex(minXLimit)]: `(${minXLimit.toFixed(2)}, ${bFromA(minXLimit).toFixed(2)})`,
  [firstXsIndex((1 + Math.sqrt(17))/8)]: <div><sup>{"(1+\u221A17)"}</sup>&frasl;<sub>8</sub></div>,
  [firstXsIndex(maxXLimit)]: `(${maxXLimit.toFixed(2)}, ${bFromA(maxXLimit).toFixed(2)})`,
};

class SISlider extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleUpdate(i) {
    this.props.onUpdate(i);
  }
  render() {
    return (
      <div className="sharygin-isosceles-slider-outer-container">
        <div className="sharygin-isosceles-slider-inner-container">
          <Rcslider
            min={firstXsIndex(minXLimit) - 20}
            max={firstXsIndex(maxXLimit) + 20}
            value={this.props.index}
            tipFormatter={tipFormatter}
            marks={marks}
            onChange={this.handleUpdate} />
        </div>
      </div>
    );
  }
}

export default SISlider;

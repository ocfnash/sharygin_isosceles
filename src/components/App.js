import React, { Component } from 'react';
import SharyginCubicGraph from './sharygin-cubic-graph.js';
import SITriangleWithSlider from './s-i-triangle-with-slider.js';
import SITriangle from './s-i-triangle.js';
import {doubleTriangle, addTriangles, PointFromIndex} from '../triangle-utils.js';
import '../css/App.css';
import 'rc-slider/assets/index.css';

const PQRFromPQ = (iP, iQ) => (
  {
    iP,
    iQ,
    R: iP === iQ ? doubleTriangle(PointFromIndex(iP)) : 
      addTriangles(PointFromIndex(iP), PointFromIndex(iQ)),
  }
);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = PQRFromPQ(520, 700);
    this.handleUpdateP = this.handleUpdateP.bind(this);
    this.handleUpdateQ = this.handleUpdateQ.bind(this);
  }
  handleUpdateP(iP) {
    this.setState(PQRFromPQ(iP, this.state.iQ));
  }
  handleUpdateQ(iQ) {
    this.setState(PQRFromPQ(this.state.iP, iQ));
  }
  render() {
    const {iP, iQ, R} = this.state;
    const P = PointFromIndex(iP);
    const Q = PointFromIndex(iQ);
    return (
      <div className="sharygin-isosceles-container">
        <SharyginCubicGraph P={P} Q={Q} R={R} />
        <div className="sharygin-triangle-equation-container">
          <div className="triangle-equation-block">
            <SITriangleWithSlider index={iP} polygonClassName="sharygin-p-point" onSliderUpdate={this.handleUpdateP} />
          </div>
          <div className="triangle-equation-symbol">
            +
          </div>
          <div className="triangle-equation-block">
            <SITriangleWithSlider index={iQ} polygonClassName="sharygin-q-point" onSliderUpdate={this.handleUpdateQ} />
          </div>
          <div className="triangle-equation-symbol">
            =
          </div>
          <div className="triangle-equation-block">
            <div className="sharygin-isosceles-missing-slider-container"></div>
            <SITriangle a={R.a} b={R.b} polygonClassName="sharygin-r-point" />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

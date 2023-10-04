// Import stylesheets
import './style.css';

import { wrapWithProxy } from './componentProxy.js';
import { Component } from './ComponentAbstract.js';

class DropdownComponent extends Component {
  state = false;

  constructor(selector) {
    super(selector);
  }

  onTogglerClick(payload) {
    this.state = !this.state;
    console.log(payload);
  }
}

const reactiveComponent = wrapWithProxy(new DropdownComponent('#dropdown'));

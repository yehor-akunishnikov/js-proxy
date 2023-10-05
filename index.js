// Import stylesheets
import './style.css';

import { proxifyProperty } from './componentProxy.js';
import { Component } from './ComponentAbstract.js';

class MyComponent extends Component {
  state = proxifyProperty(
    {
      name: '',
      surname: '',
    },
    this.directives,
    this
  );

  constructor(selector) {
    super(selector);
  }

  onChanges(...props) {
    // console.log(props);
  }

  onTogglerClick() {
    this.state.toggleState = !this.state.toggleState;
  }

  onSubmit(event) {
    event.preventDefault();

    const formValue = Object.fromEntries(new FormData(event.target));

    this.state.name = formValue.name;
    this.state.surname = formValue.surname;

    // console.log(formValue);
  }
}

const reactiveComponent = new MyComponent('#componentRoot');

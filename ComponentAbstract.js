export class Component {
  directives = {};

  constructor(selector) {
    const container = document.querySelector(selector);

    this.registerDirectives(container);
  }

  registerDirectives(container) {
    const directives = {};
    const allDomElements = [
      container,
      ...Array.from(container.querySelectorAll('[data-show]')),
      ...Array.from(container.querySelectorAll('[data-binding]')),
      ...Array.from(container.querySelectorAll('[data-event]')),
    ];

    allDomElements.forEach((domElement) => {
      Array.from(domElement.attributes).forEach(({ name, value }) => {
        const directiveMeta = this.directives[name];

        switch (name) {
          case 'data-show':
            this.patchShowDirectiveMeta(directiveMeta, name, value, domElement);
            break;
          case 'data-binding':
            this.patchBindingDirectiveMeta(directiveMeta, name, domElement);
            break;
          case 'data-event':
            const [eventName, methodName, propsString] = value.split(':');
            const props = propsString ? propsString.split(',') : [];

            this.applyEventDirective(eventName, methodName, props, domElement);
            break;
          default:
            break;
        }
      });

      this.directives = directives;
    });
  }

  patchShowDirectiveMeta(existingMeta, directiveKey, bindedTo, domElement) {
    const isNegated = bindedTo.includes('!');

    this.directives[directiveKey] = existingMeta
      ? [
          ...existingMeta,
          { bindedTo: bindedTo.replace(/!/g, ''), domElement, isNegated },
        ]
      : [{ bindedTo: bindedTo.replace(/!/g, ''), domElement, isNegated }];
  }

  patchBindingDirectiveMeta(existingMeta, directiveKey, domElement) {
    this.directives[directiveKey] = existingMeta
      ? [...existingMeta, { domElement, template: domElement.innerText }]
      : [{ domElement, template: domElement.innerText }];
  }

  applyEventDirective(eventName, methodName, props, domElement) {
    domElement.addEventListener(eventName, (e) => {
      this[methodName].call(this, e, ...props);
    });
  }
}

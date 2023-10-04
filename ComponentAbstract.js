export class Component {
  directives = {};

  constructor(selector) {
    const container = document.querySelector(selector);

    this.registerDirectives(container);
  }

  registerDirectives(container) {
    const directives = {};
    const allDomElements = [container, ...Array.from(container.children)];

    allDomElements.forEach((domElement) => {
      Array.from(domElement.attributes).forEach(({ name, value }) => {
        const directiveMeta = this.directives[name];

        switch (name) {
          case 'data-show':
            this.patchShowDirectiveMeta(directiveMeta, name, value, domElement);
            break;
          case 'data-event':
            const [eventName, methodName, propsString] = value.split(':');
            const props = propsString ? propsString.split(', ') : [];

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
    this.directives[directiveKey] = existingMeta
      ? [...existingMeta, { bindedTo, domElement }]
      : [{ bindedTo, domElement }];
  }

  applyEventDirective(eventName, methodName, props, domElement) {
    domElement.addEventListener(
      eventName,
      this[methodName].bind(this, ...props)
    );
  }
}

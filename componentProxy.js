import { handleShow } from './directiveHelpers.js';

export const wrapWithProxy = (component) => {
  const reactiveComponent = new Proxy(component, {
    set(target, name, value) {
      Object.keys(target.directives).forEach((directiveName) => {
        switch (directiveName) {
          case 'data-show': {
            handleShow(target.directives[directiveName], name, value);
          }
        }
      });

      return Reflect.set(target, name, value);
    },
  });

  return reactiveComponent;
};

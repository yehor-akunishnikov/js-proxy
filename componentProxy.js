import { handleShow, handleBinbing } from './directiveHelpers.js';

export const proxifyProperty = (property, directives, component) => {
  return new Proxy(property, {
    set(target, name, value) {
      component?.onChanges(name, value);

      Object.keys(directives).forEach((directiveName) => {
        switch (directiveName) {
          case 'data-show':
            {
              if (target[name] !== value) {
                handleShow(directives[directiveName], name, value);
              }
            }
            break;
          case 'data-binding':
            {
              if (target[name] !== value) {
                handleBinbing(directives[directiveName], {
                  ...target,
                  [name]: value,
                });
              }
            }
            break;
          default:
            break;
        }
      });

      return Reflect.set(target, name, value);
    },
    get(target, name) {
      return Reflect.get(target, name);
    },
  });
};

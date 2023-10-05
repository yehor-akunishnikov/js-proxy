export const handleShow = (directiveMeta, key, value) => {
  directiveMeta.forEach((directiveMetaItem) => {
    if (directiveMetaItem.bindedTo === key) {
      const shouldShow = directiveMetaItem.isNegated ? !value : !!value;

      if (shouldShow) {
        directiveMetaItem.domElement.classList.remove('hidden');
      } else {
        directiveMetaItem.domElement.classList.add('hidden');
      }
    }
  });
};

export const handleBinbing = (directiveMeta, state) => {
  directiveMeta.forEach((directiveMetaItem) => {
    patchTemplate(directiveMetaItem, state);
  });
};

export const patchTemplate = (directiveMetaItem, state) => {
  const { domElement, template } = directiveMetaItem;

  let updatedText = template;

  Object.keys(state).forEach((key) => {
    if (updatedText?.includes(`{{${key}}}`)) {
      updatedText = template.replace(`{{${key}}}`, state[key]);
    }
  });

  domElement.innerText = updatedText;
};

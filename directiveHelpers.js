export const handleShow = (directiveMeta, bindedTo, value) => {
  directiveMeta.forEach((directiveMetaItem) => {
    if (directiveMetaItem.bindedTo === bindedTo) {
      if (value) {
        directiveMetaItem.domElement.classList.remove('hidden');
      } else {
        directiveMetaItem.domElement.classList.add('hidden');
      }
    }
  });
};

export const applyEventHandler = (directiveMeta, bindedTo, value) => {
  directiveMeta.forEach((directiveMetaItem) => {
    if (directiveMetaItem.bindedTo === bindedTo) {
      if (value) {
        directiveMetaItem.domElement.classList.remove('hidden');
      } else {
        directiveMetaItem.domElement.classList.add('hidden');
      }
    }
  });
};
// so you dont have spelling errors
const TEXT_ELEMENT = 'TEXT ELEMENT';

function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];

  props.children = rawChildren
    // filter out null, undefined, and false args
    .filter(child => child !== null || child !== false)
    // map over to decide whether to create a jsx element or text element
    .map(child => (child instanceof Object ? child : createTextElement(child)));

  return { type, props };
}

// utility func that transforms text into a jsx node style object
function createTextElement(value) {
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}

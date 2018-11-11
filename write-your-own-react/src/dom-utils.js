const TEXT_ELEMENT = 'TEXT ELEMENT';

// utility for checking props that are events
const isEvent = name => name.startsWith('on');

// utility for assigning attributes that arent children or style
const isAttribute = name =>
  !isEvent(name) && name !== 'children' && name !== 'style';

// predicate to detect whether or not a key is new
const isNew = (prev, next) => key => prev[key] !== next[key];

// predicate to detect whether or not a key is missing
const isGone = (prev, next) => key => !(key in next);

function updateDomProperties(dom, prevProps, nextProps) {
  // remove event listeners
  Object.keys(prevProps)
    .filter(isEvent)
    .filter(key => !(key in nextProps) || isNew(prevProps, nextProps)(key))
    .forEach(name => {
      // remove the on and low case the event name
      const eventType = name.toLowerCase().substring(2);
      dom.removeEventListener(eventType, prevProps[name]);
    });

  // remove attributes
  Object.keys(prevProps)
    .filter(isAttribute)
    .filter(isGone(prevProps, nextProps))
    .forEach(name => {
      dom[name] = null;
    });

  // set attributes
  Object.keys(nextProps)
    .filter(isAttribute)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      dom[name] = nextProps[name];
    });

  // set style
  prevProps.style = prevProps.style || {};
  nextProps.style = nextProps.style || {};
  Object.keys(nextProps.style)
    .filter(isNew(prevProps.style, nextProps.style))
    .forEach(key => {
      dom.style[key] = nextProps.style[key];
    });
  Object.keys(prevProps.style)
    .filter(isGone(prevProps.style, nextProps.style))
    .forEach(key => {
      dom.style[key] = '';
    });

  // add event listeners
  Object.keys(nextProps)
    .filter(isEvent)
    .filter(isNew(prevProps, nextProps))
    .forEach(name => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, nextProps[name]);
    });
}

function createDomElement(fiber) {
  const isTextElement = fiber.type === TEXT_ELEMENT;
  const dom = isTextElement
    ? document.createTextNode('')
    : document.createElement(fiber.type);
  updateDomProperties(dom, [], fiber.props);
  return dom;
}

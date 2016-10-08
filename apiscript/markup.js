/*eslint max-statements: "off"*/
/*eslint quotes: "off"*/

let modalElem = null;
let formElem = null;
let commentInputElem = null;
let toInputElem = null;
let fromInputElem = null;
let titleInputElem = null;
let buttonElem = null;
let selectedText = '';

const apiEndpoint = 'http://getmarkup.com/api/annotate';
const elemPrefix = 'frolicking-tuba-modal';

const hideModal = () => {
  modalElem.parentNode.removeChild(modalElem);
  modalElem = null;
  formElem = null;
};

const submitForm = (event) => {
  event.preventDefault();

  const request = new XMLHttpRequest();

  request.open('POST', apiEndpoint, true);
  request.setRequestHeader('Content-Type', 'application/json');

  request.send(JSON.stringify({
    title: titleInputElem.value,
    comment: commentInputElem.value,
    to: toInputElem.value,
    from: fromInputElem.value,
    selected: selectedText,
    key: '%KEY%',
    location: location.href
  }));

  hideModal();
};

const buildModal = () => {
  modalElem = document.createElement('div');
  modalElem.id = elemPrefix;

  formElem = document.createElement('form');
  formElem.id = `${elemPrefix}-feedback`;

  titleInputElem = document.createElement('input');
  titleInputElem.id = `${elemPrefix}-title-input`;
  titleInputElem.type = 'text';
  titleInputElem.minlength = 1;
  titleInputElem.placeholder = 'Title';

  commentInputElem = document.createElement('textarea');
  commentInputElem.id = `${elemPrefix}-comment`;
  commentInputElem.minlength = 1;
  commentInputElem.placeholder = 'Enter your comments here';

  toInputElem = document.createElement('input');
  toInputElem.id = `${elemPrefix}-to-input`;
  toInputElem.type = 'text';
  toInputElem.minlength = 1;
  toInputElem.placeholder = 'Message to';

  fromInputElem = document.createElement('input');
  fromInputElem.id = `${elemPrefix}-from-input`;
  fromInputElem.type = 'text';
  fromInputElem.minlength = 1;
  fromInputElem.placeholder = 'Message from';

  const submitElem = document.createElement('input');

  submitElem.id = `${elemPrefix}-submit`;
  submitElem.type = 'submit';
  submitElem.value = 'send';

  modalElem.appendChild(formElem);
  formElem.appendChild(titleInputElem);
  formElem.appendChild(commentInputElem);
  formElem.appendChild(toInputElem);
  formElem.appendChild(fromInputElem);
  formElem.appendChild(submitElem);

  formElem.onsubmit = submitForm;

  return modalElem;
};

const takeShot = (area, html) => {
  const shotData = {
    html: html || document.documentElement.innerHTML,
    browserWidth: window.innerWidth,
    browserHeight: window.innerHeight,
    url: location.href,
    clipX: area.xoffset || window.scrollX,
    clipY: area.yoffset || window.scrollY,
    clipWidth: area.width || window.innerWidth,
    clipHeight: area.height || window.innerHeight,
    userAgent: navigator.userAgent
  };

  const req = new Request('http://52.43.21.187:3000', {
    method: 'POST',
    body: JSON.stringify(shotData)
  });

  fetch(req)
    .then((response) =>
      response.text()
    )
    .then((response) => {
      const image = document.createElement('img');

      image.src = response;
      image.style.position = 'absolute';
      image.style.top = `${shotData.clipY}px`;
      image.style.left = `${shotData.clipX}px`;
      image.style.width = 'auto';
      image.style.height = 'auto';
      image.style['z-index'] = 999999;
      image.style.background = '#ffffff';

      document.body.appendChild(image);
    });
};

const startDrag = (event) => {
  event.preventDefault();

  let xPos = 0;
  let yPos = 0;
  let width = 0;
  let height = 0;

  const selectionElem = document.createElement('div');

  selectionElem.style.position = 'absolute';
  selectionElem.style.border = 'solid rgba(30,136,229, .5) 1px';
  selectionElem.style.background = 'rgba(30,136,229, .125)';

  document.body.appendChild(selectionElem);

  document.addEventListener('mousemove', (moveEvent) => {
    const xdiff = moveEvent.pageX - event.pageX;
    const ydiff = moveEvent.pageY - event.pageY;

    xPos = (xdiff < 0) ? moveEvent.pageX : event.pageX;
    yPos = (ydiff < 0) ? moveEvent.pageY : event.pageY;

    width = Math.abs(xdiff);
    height = Math.abs(ydiff);

    selectionElem.style.width = `${width}px`;
    selectionElem.style.height = `${height}px`;
    selectionElem.style.left = `${xPos}px`;
    selectionElem.style.top = `${yPos}px`;
  });

  document.addEventListener('mouseup', () => {
    document.body.removeChild(selectionElem);
    takeShot({ xoffset: xPos, yoffset: yPos, width, height });
  });
};

const showModal = () => {
  if (!modalElem) {
    document.body.appendChild(buildModal());
  }

  setTimeout(() => {
    modalElem.style.opacity = 1;
    modalElem.style.transform = 'translate(0, 0)';
  });

  document.addEventListener('mousedown', startDrag);
};

const clicked = (event) => {
  const selection = window.getSelection();

  if (selection) {
    selectedText = selection;
    showModal(event);
  } else if (modalElem && !event.target.id.startsWith(elemPrefix)) {
    hideModal();
  }
};

const buildButton = () => {
  buttonElem = document.createElement('div');
  buttonElem.id = 'frolicking-tuba-open-button';

  buttonElem.addEventListener('click', clicked);

  return buttonElem;
};

document.addEventListener('DOMContentLoaded', () => {
  const modalStyleElem = document.createElement('style');

  modalStyleElem.innerHTML = `%CSS%`;
  document.body.appendChild(modalStyleElem);

  document.body.appendChild(buildButton());
});

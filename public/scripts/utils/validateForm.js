import {createElement} from "./createElement";

export const validateForm = (input) => {
  let parent = input.parentElement;
  let warn = parent.querySelector('.form__warning');

  if (input.value === '') {
    if (warn !== null) return;

    createElement(
      'span',
      {
        className: 'form__warning',
        textContent: 'Поле не заполнено',
      },
      {
        parent: parent,
      }
    );
  } else {
    if (warn === null) return;

    warn.remove();
  }
};

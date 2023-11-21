import { createElement } from './utils/createElement';

export function renderList(data) {
  let ul = createElement('ul', {
    className: 'roster__list',
  });
  data.users.forEach((element) => {
    let [id, content] = [element];

    createElement(
      'li',
      {
        className: 'roster__item',
        dataId: id,
      },
      {
        parent: ul,
      }
    );

    createElement(
      'span',
      {
        className: 'roster__text',
        textContent: `${content.name}`
      },
      {
        parent: li,
      }
    );
    createElement(
      'span',
      {
        className: 'roster__text',
        textContent: `${content.mail}`,
      },
      {
        parent: li,
      }
    );
    createElement(
      'span',
      {
        className: 'roster__text',
        textContent: `${content.date}`,
      },
      {
        parent: li,
      }
    );
    createElement(
      'span',
      {
        className: 'roster__text',
        textContent: `${content.editDate}`,
      },
      {
        parent: li,
      }
    );
  });
  return ul;
}
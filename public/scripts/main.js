const saveBtn = document.querySelector('.info__btn_modal');
const formModal = document.querySelector('.info__modal');
const backBtn = document.querySelector('.info__btn_back');
const inputs = document.querySelectorAll('.info__input');
const listBlock = document.querySelector('.roster__container');
const editBtns = document.querySelectorAll('.roster__edit');
const name = document.querySelector('#inputName');
const mail = document.querySelector('#inputMail');
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

const isEmailValid = (value) => {
return EMAIL_REGEXP.test(value);
}

if (saveBtn !== null) {
  saveBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let isEmpty = false;

    if (mail.value === '') {
      mail.placeholder = 'Поле не заполнено';
      mail.style.borderColor = 'red';
      isEmpty = true;
    } else if (isEmailValid(mail.value)) {
      mail.style.borderColor = '#bdbdbd';
    } else {
      mail.style.borderColor = 'red';
      mail.value = '';
      mail.placeholder = 'Не правильный формат почты';
      isEmpty = true;
    }

    if (name.value === '') {
      name.placeholder = 'Поле не заполнено';
      name.style.borderColor = 'red';
      isEmpty = true;
    } else {
      name.style.borderColor = '#bdbdbd';
    }

    if (!isEmpty) {
      formModal.classList.add('info__modal_active');
      inputs.forEach((elem) => {
        elem.readOnly = true;
      });
    }
  });
}

if (backBtn !== null) {
  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    formModal.classList.remove('info__modal_active');
    inputs.forEach((elem) => {
      elem.readOnly = false;
    });
  });
}
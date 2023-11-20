const saveBtn = document.querySelector('.info__btn_modal');
const formModal = document.querySelector('.info__modal');
const backBtn = document.querySelector('.info__btn_back');
const inputs = document.querySelectorAll('.info__input');

saveBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  formModal.classList.add('info__modal_active');
  inputs.forEach(elem => {
    elem.readOnly = true;
  });
})

backBtn.addEventListener('click', (e)=> {
  e.preventDefault();
  formModal.classList.remove('info__modal_active');
  inputs.forEach((elem) => {
    elem.readOnly = false;
  });
})

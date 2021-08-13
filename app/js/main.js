(function () {
  const calcBox = $('.income__calc'); 
  const cropSelect = calcBox.find('#crop');
  const yieldInput = calcBox.find('#yield');
  const priceInput = calcBox.find('#price');
  const areaInput = calcBox.find('#area');

  const incomeText = $('#income');

  let isAllInputsSuccess = false;
  const objDataCalc = {
    crop: 0,
    yield: 0,
    price: 0,
    area: 0
  };

  document.addEventListener('DOMContentLoaded', () =>
    checkFields([yieldInput, priceInput, areaInput])
  );

  function checkRequired(inputArr) {
    inputArr.forEach((input) => {
      if (input.val().trim() === '') {
        showError(input, 'Поле не может быть пустым!');
      } else if (+input.val() <= 0) {
        showError(input, 'Значение не может быть меньше или равно нулю!');
      } else if (!isNumber(+input.val())) {
        showError(input, 'Значение не является числом!');
      } else {
        showSuccess(input);
      }
    });
  }

  cropSelect.on('change', (event) => {
    const value = +$(event.target).val();
    objDataCalc.crop = value;

    if (isAllInputsSuccess) {
      calcIncome(objDataCalc);
    }
  });

  calcBox.on('input', () => {
    checkRequired([yieldInput, priceInput, areaInput]);
  });

  function checkFields(inputArr) {
    inputArr.forEach((input) => {
      input.on('input', (event) => {
        const value = +$(event.target).val();
        if (isNumber(value)) {
          objDataCalc[event.target.id] = value;
          calcIncome(objDataCalc);
        }
      });
    });
  }

  function calcIncome({ crop, yield, price, area }) {
    const result = crop + yield + price + area;
    incomeText.text(result);
  }

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  function showError(input, message) {
    const formControl = input.parent();
    formControl.removeClass('success').addClass('error');

    isAllInputsSuccess = false;

    const small = formControl.find('small');
    small.text(message);
    incomeText.text(0);
  }

  function showSuccess(input) {
    const formControl = input.parent();
    formControl.removeClass('error').addClass('success');

    isAllInputsSuccess = true;
  }
})();

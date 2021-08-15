(function () {
  const calcContainer = $('.income__calc');
  const cropSelect = calcContainer.find('#crop');
  const yieldInput = calcContainer.find('#yield');
  const priceInput = calcContainer.find('#price');
  const areaInput = calcContainer.find('#area');
  const incomeText = calcContainer.find('#income');

  let isAllInputsSuccess = false;
  let isCropSelected = false;

  const objDataCalc = {
    crop: 0,
    yield: 0,
    price: 0,
    area: 0
  };

  document.addEventListener('DOMContentLoaded', () => {
    const inputs = [yieldInput, priceInput, areaInput];

    inputs.forEach((input) => input.on('input', checkFields));

    calcContainer.on('input', () => checkValidation(inputs));

    cropSelect.on('change', setCropDataFromSelect);
  });

  function setCropDataFromSelect(event) {
    const target = $(event.target);
    const value = +target.val();

    if (!isCropSelected) {
      showSuccess(target);
    }

    objDataCalc.crop = value;

    isCropSelected = true;

    if (isAllInputsSuccess) {
      calcIncome(objDataCalc);
    }
  }

  // Checking the correctness of the data in the fields
  function checkValidation(inputArr) {
    inputArr.forEach((input) => {
      const value = input.val();

      if (value.trim() === '') {
        showError(input, 'Поле не может быть пустым!');
      } else if (+value <= 0) {
        showError(input, 'Значение не может быть меньше или равно нулю!');
      } else if (!isNumber(+value)) {
        showError(input, 'Значение не является числом!');
      } else {
        showSuccess(input);
      }
    });
  }

  function checkFields(event) {
    const target = $(event.target);
    const value = +target.val();

    if (isNumber(value)) {
      objDataCalc[target.attr('id')] = value;
      calcIncome(objDataCalc);
    }
  }

  // Calculate total income
  function calcIncome({ crop, yield, price, area }) {
    if (isCropSelected) {
      const result = crop + yield + price + area;

      incomeText.text(result);
    } else {
      showError(cropSelect, 'Выбирите культуру!');
    }
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

/* global salesTaxData */

function outputTotalPrice(price) {
  const priceGrouped = price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
  const currency = `$${priceGrouped}`;

  $('#pizzaCost').text(currency);
}

function calculateTotalPrice(salesValue, pizzaValue) {
  const salesTax = 1 + Number(salesValue); // preferred over parseInt(salesValue, 10)
  const pizzaPrice = Number(pizzaValue);
  outputTotalPrice(salesTax * pizzaPrice);
}

function updatePrice() {
  calculateTotalPrice($('#provinces').val(), $('#price').val());
}

function calculateTax(data) {
  let taxTotal = data.taxes[0].tax;
  if (data.taxes.length === 2) {
    taxTotal += data.taxes[1].tax;
  }

  return taxTotal.toFixed(2); // fix decical to cents
}

function displayProvinces() {
  // jQuery each loop
  const $provinces = $('#provinces');

  $.each(salesTaxData.provinces, (provinceAbbr, provinceData) => {
    const tax = calculateTax(provinceData); // todo dev step #3
    $provinces.append(`<option value="${tax}">${provinceData.name}</option>`);
  });
}

function sales() {
  displayProvinces();
  $('#price').change(updatePrice);
  $('#provinces').change(updatePrice);
}

// If Node.js then export as public
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = {
    sales
  };
}

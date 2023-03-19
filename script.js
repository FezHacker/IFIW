// get elements from the DOM
const form = document.querySelector('#airport-form');
const input = document.querySelector('#airport-input');
const metarResult = document.querySelector('#metar-result');
const tafResult = document.querySelector('#taf-result');

// add event listener to the form
form.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent default form submission behavior

  // get the entered airport code
  const airportCode = input.value.trim();

  // make the API call to fetch METAR and TAF data for the airport
  fetch('/weather?airportCode=' + airportCode)
    .then(response => response.json())
    .then(data => {
      // display the METAR and TAF data
      metarResult.textContent = data.metar;
      tafResult.textContent = data.taf;
    })
    .catch(error => {
      console.error(error);
      metarResult.textContent = 'Error fetching data. Please check the airport code and try again.';
      tafResult.textContent = '';
    });
});

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
  fetch(`https://api.aviationweather.gov/metar/data?station=${airportCode}`)
    .then(response => response.text())
    .then(data => {
      // extract the METAR data from the response
      const metar = data.match(/<code>(.*?)<\/code>/)[1];
      metarResult.textContent = metar; // display the METAR data
    })
    .catch(error => {
      console.error(error);
      metarResult.textContent = 'Error fetching METAR data. Please check the airport code and try again.';
    });

  fetch(`https://api.aviationweather.gov/taf/data?station=${airportCode}`)
    .then(response => response.text())
    .then(data => {
      // extract the TAF data from the response
      const taf = data.match(/<code>(.*?)<\/code>/)[1];
      tafResult.textContent = taf; // display the TAF data
    })
    .catch(error => {
      console.error(error);
      tafResult.textContent = 'Error fetching TAF data. Please check the airport code and try again.';
    });
});

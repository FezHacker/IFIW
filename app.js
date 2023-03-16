const wifiSelect = document.querySelector('#wifi-select');
const wifiPassword = document.querySelector('#wifi-password');
const findPasswordButton = document.querySelector('#find-password-button');
const result = document.querySelector('.result');

// When the page loads, call the getWifiNetworks function
window.onload = () => {
  getWifiNetworks();
};

// Function to get a list of available wifi networks
function getWifiNetworks() {
  wifiSelect.innerHTML = '';
  wifiPassword.value = '';
  wifiPassword.disabled = true;
  findPasswordButton.disabled = true;
  result.style.display = 'none';

  // Create a new XMLHttpRequest object
  const xhr = new XMLHttpRequest();

  // Set up the request
  xhr.open('GET', '/wifi-networks');

  // Set up a handler for when the request finishes
  xhr.onload = () => {
    if (xhr.status === 200) {
      const networks = JSON.parse(xhr.responseText);

      // Loop through the list of networks and add them to the select element
      networks.forEach((network) => {
        const option = document.createElement('option');
        option.value = network.ssid;
        option.text = network.ssid;
        wifiSelect.add(option);
      });

      wifiPassword.disabled = false;
      findPasswordButton.disabled = false;
    } else {
      console.error(xhr.statusText);
    }
  };

  // Send the request
  xhr.send();
}

// Function to find the password for the selected network
function findWifiPassword() {
  const ssid = wifiSelect.value;
  const xhr = new XMLHttpRequest();

  xhr.open('POST', '/wifi-password');
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

  xhr.onload = () => {
    if (xhr.status === 200) {
      result.textContent = `Your wifi password is: ${JSON.parse(xhr.responseText).password}`;
    } else {
      console.error(xhr.statusText);
    }
  };

  xhr.send(JSON.stringify({ ssid }));
}

findPasswordButton.addEventListener('click', findWifiPassword);

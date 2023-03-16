const { getWifiNetworks } = require('./wifi_networks.py');
const { getWifiPassword } = require('./wifi_password.py');
const networksDropdown = document.getElementById("networks");
const passwordField = document.getElementById("password");
const resultDiv = document.querySelector(".result");

fetch("wifi_networks.py")
    .then(response => response.text())
    .then(script => eval(script))
    .then(networks => {
        networks.forEach(network => {
            const option = document.createElement("option");
            option.text = network.ssid;
            networksDropdown.add(option);
        });
    })
    .catch(error => console.error(error));

networksDropdown.addEventListener("change", () => {
    const selectedNetwork = networksDropdown.value;
    fetch(`wifi_password.py?ssid=${selectedNetwork}`)
        .then(response => response.text())
        .then(password => {
            passwordField.textContent = password;
            resultDiv.style.display = "block";
        })
        .catch(error => console.error(error));
});

const networksDropdown = document.getElementById("networks");
const passwordField = document.getElementById("password");
const resultDiv = document.querySelector(".result");

// Contents of wifi_networks.py
const networks = [
    { ssid: "Network 1", security: "WPA2" },
    { ssid: "Network 2", security: "WEP" },
    { ssid: "Network 3", security: "Open" }
];

// Contents of wifi_password.py
function getWifiPassword(ssid) {
    switch (ssid) {
        case "Network 1":
            return "password1";
        case "Network 2":
            return "password2";
        case "Network 3":
            return "password3";
        default:
            return "No password found for network";
    }
}

networks.forEach(network => {
    const option = document.createElement("option");
    option.text = network.ssid;
    networksDropdown.add(option);
});

networksDropdown.addEventListener("change", () => {
    const selectedNetwork = networksDropdown.value;
    const password = getWifiPassword(selectedNetwork);
    passwordField.textContent = password;
    resultDiv.style.display = "block";
});

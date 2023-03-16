const wifiList = document.querySelector("#wifiList");
const getPasswordBtn = document.querySelector("#getPasswordBtn");
const result = document.querySelector("#result");

window.addEventListener("load", () => {
  if ("wifi" in navigator) {
    navigator.wifi
      .getNetworks()
      .then((networks) => {
        networks.forEach((network) => {
          const option = document.createElement("option");
          option.value = network.ssid;
          option.innerText = network.ssid;
          wifiList.appendChild(option);
        });
      })
      .catch((error) => console.log(error));
  } else {
    alert("WiFi is not supported on this device");
  }
});

function getPassword() {
  const selectedNetwork = wifiList.value;
  if (selectedNetwork) {
    navigator.wifi
      .getNetworks()
      .then((networks) => {
        const network = networks.find((network) => network.ssid === selectedNetwork);
        if (network) {
          network
            .getPassword()
            .then((password) => {
              result.innerText = `Password: ${password}`;
              result.style.display = "block";
            })
            .catch((error) => console.log(error));
        } else {
          console.log(`Network ${selectedNetwork} not found`);
        }
      })
      .catch((error) => console.log(error));
  } else {
    alert("Please select a network from the list");
  }
}

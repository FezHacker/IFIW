const wifiList = [
	{
		name: "WiFi 1",
		strength: 90,
		password: "password1"
	},
	{
		name: "WiFi 2",
		strength: 75,
		password: "password2"
	},
	{
		name: "WiFi 3",
		strength: 80,
		password: "password3"
	},
	{
		name: "WiFi 4",
		strength: 85,
		password: "password4"
	}
];

const wifiSelect = document.getElementById("wifi-select");
const passwordField = document.getElementById("password-field");
const getPasswordBtn = document.getElementById("get-password-btn");

// Add options to the select element
for (let i = 0; i < wifiList.length; i++) {
	const option = document.createElement("option");
	option.value = wifiList[i].password;
	option.text = wifiList[i].name;
	wifiSelect.add(option);
}

// Get the selected option's password and display it
getPasswordBtn.addEventListener("click", () => {
	const selectedOption = wifiSelect.options[wifiSelect.selectedIndex];
	passwordField.value = selectedOption.value;
});


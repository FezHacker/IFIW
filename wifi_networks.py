import subprocess
import re
import json

result = subprocess.run(["netsh", "wlan", "show", "profiles"], capture_output=True, text=True)
profiles = re.findall("All User Profile     : (.*)\r", result.stdout)

networks = []

if len(profiles) != 0:
    for name in profiles:
        profile_info = subprocess.run(["netsh", "wlan", "show", "profile", name], capture_output=True, text=True)
        if re.search("Security key           : Absent", profile_info.stdout):
            continue
        else:
            profile = dict()
            profile["ssid"] = name
            network_info = subprocess.run(["netsh", "wlan", "show", "profile", name, "key=clear"], capture_output=True, text=True)
            key = re.search("Key Content            : (.*)\r", network_info.stdout)
            if key == None:
                profile["password"] = None
            else:
                profile["password"] = key[1]
            networks.append(profile)

print("Content-Type: application/json")
print()
print(json.dumps(networks))

import subprocess
import re
import cgi

form = cgi.FieldStorage()
ssid = form.getvalue("ssid")

result = subprocess.run(["netsh", "wlan", "show", "profile", ssid, "key=clear"], capture_output=True, text=True)
password = re.search("Key Content            : (.*)\r", result.stdout)[1]

print("Content-Type: text/plain")
print()
print(password)

from flask import Flask, render_template, request
app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/get_password', methods=['POST'])
def get_password():
    wifi = request.form['wifi']
    password = "password for " + wifi
    return password

if __name__ == '__main__':
    app.run(debug=True)

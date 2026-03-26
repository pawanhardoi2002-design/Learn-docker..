from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/')
def home():
    return "Flask Backend Running!"

@app.route('/submit', methods=['POST'])
def submit():
    data = request.json
    name = data.get('name')
    age = data.get('age')

    return jsonify({
        "message": f"Hello {name}, you are {age} years old!"
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
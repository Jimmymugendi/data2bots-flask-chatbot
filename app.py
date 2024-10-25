from flask import Flask, render_template, request, jsonify
import json


# Initialize the Flask application
app = Flask(__name__)

#load responses from JSON
def load_responses():
    with open('responses.json', 'r') as file:
        return json.load(file)

responses = load_responses()


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def get_bot_response():
    user_input = request.json.get("message", "").lower()
    responses = load_responses()  # Reload responses for each request
    for keyword, response in responses.items():
        if keyword in user_input:
            return jsonify(response=response)
    return jsonify(response="I'm not sure how to respond to that. Can you try asking something else?")


if __name__ == "__main__":
    app.run(debug=True)
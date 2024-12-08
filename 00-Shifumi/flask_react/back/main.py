from flask import Flask, request, jsonify
from flask_cors import CORS
from random import randint

app = Flask(__name__)
CORS(app)

@app.route('/computer', methods=["POST", "GET"])
def against_computer():
    cards = ['paper', 'rock', 'cisors']
    player_choice = request.json.get('choice')

    random_choice = randint(0, len(cards) - 1)
    computer_choice = cards[random_choice]

    # Logique du jeu
    if computer_choice == player_choice:
        result = 'tie'
    elif (computer_choice == 'paper' and player_choice == 'cisors') or \
         (computer_choice == 'cisors' and player_choice == 'rock') or \
         (computer_choice == 'rock' and player_choice == 'paper'):
        result = 'player'
    else:
        result = 'computer'

    return jsonify({'result': result, 'computer_choice': computer_choice})

if __name__ == "__main__":
    app.run(debug=True, port=5002)
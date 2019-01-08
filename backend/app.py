from flask import Flask, jsonify, request, session
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config['SECRET_KEY'] = 'super secret'

users = {"Frank": "password", "Casey": "otherPassword"}
names = {"Frank Soucy": "Default", "Jonas Kantola": "Default"}

@app.route('/logIn', methods=['POST'])
def logIn():
    print("Got to this endpoint")
    data = json.loads(request.data.decode('utf-8'))
    if not 'username' in data or not 'password' in data:
        return jsonify({"logInAttempt": False})
    username = data['username']
    password = data['password']
    if username in users and users[username] == password:
        session['loggedIn'] = username
        return jsonify({"logInAttempt": True, "username": username})
    return jsonify({"logInAttempt": False, "username": "Not logged in"})

@app.route('/isLoggedIn', methods=['GET'])
def isLoggedIn():
    if 'loggedIn' in session:
        return jsonify({'isLoggedIn': True, 'username': session['loggedIn']})
    return jsonify({"isLoggedIn": False, "username": "Not logged in"})

@app.route('/logOut', methods=['GET'])
def logOut():
    loggedInAlready = 'loggedIn' in session
    if not loggedInAlready:
        return jsonify({"loggedOut": False})
    session.pop('loggedIn', None)
    return jsonify({"loggedOut": True})

@app.route('/addName', methods=['POST'])
def addName():
    data = json.loads(request.data.decode('utf-8'))
    if 'loggedIn' in session:
        username = session['loggedIn']
        if 'name' in data:
            name = data['name']
            if not name in names:
                names[name] = username
    namesList = [name for name in names]
    return jsonify({"names": namesList})

@app.route('/removeName', methods=['POST'])
def removeName():
    data = json.loads(request.data.decode('utf-8'))
    if 'loggedIn' in session:
        username = session['loggedIn']
        if 'name' in data:
            name = data['name']
            if name in names:
                originalUsername = names[name]
                if username == originalUsername:
                    names.pop(name, None)
    namesList = [name for name in names]
    return jsonify({"names": namesList})

@app.route('/getNames', methods=['GET'])
def getNames():
    namesList = [name for name in names]
    return jsonify({"names": namesList})

app.run(host="0.0.0.0", port=8080, threaded=True)

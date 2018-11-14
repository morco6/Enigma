import { Enigma } from './enigma.js';

var path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
var AsyncProfile = require('async-profile');
app.use(express.static(path.join(__dirname, '/css'))); //public
app.use("/styles", express.static(__dirname + '/css'));//allow css in invitation page (public)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));





app.post('/setPlugBoard', (req, res) => {
    let plugBoard = req.body.plugBoard;
    
    res.json({
        plugBoard: plugBoard,
        note: true
    });
});

app.post('/initEnigma', (req, res) => {
    let plugBoard = req.body.plugBoard;
    let rotors = req.body.rotors;
    let input_string = req.body.plainText;
    console.log(rotors);
    let enigmaMachine = new Enigma(rotors, plugBoard);

    let encrypted_message = enigmaMachine.inputValidation(input_string);
    console.log(rotors);
    console.log(encrypted_message);

    res.json({
        encryptedMessage: encrypted_message,
        note: true
    });
});




const port = process.env.PORT || process.argv[2];
//const port = process.env.PORT;
app.listen(port, function () {
    console.log('listening to port: ' + port);
});


app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});


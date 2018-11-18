import { Enigma } from './enigma.js';

var path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
var AsyncProfile = require('async-profile');
app.use(express.static(path.join(__dirname, '/css'))); //public
app.use("/styles", express.static(__dirname + '/css'));//allow css (public)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

///////////////////////////////////////////////////////
/* -Init plugBoard- */
app.post('/setPlugBoard', (req, res) => {
    let plugBoard = req.body.plugBoard;
    res.json({
        plugBoard: plugBoard,
        note: true
    });
});

///////////////////////////////////////////////////////
/* -Init and calculation the enigma machine- */
app.post('/initEnigma', (req, res) => {
    let plugBoard = req.body.plugBoard;
    let rotors = req.body.rotors;

    let proc = {
        pb: "",
        rr: "",
        rl: "",
        out_r: "",
        mr: "",
        ml: "",
        out_m: "",
        lr: "",
        ll: "",
        out_l: "",

        rev_rr: "",
        rev_rl: "",
        rev_out_r: "",
        rev_mr: "",
        rev_ml: "",
        rev_out_m: "",
        rev_lr: "",
        rev_ll: "",
        rev_out_l: "",

        ref: "",
        text: ""
    };
    let obj = {
        letter: "",
        proc: proc
    };
    let input_string = req.body.plainText;
    console.log(rotors);
    let enigmaMachine = new Enigma(rotors, plugBoard);

    obj = enigmaMachine.inputValidation(input_string, obj);

    res.json({
        encryptedMessage: obj.proc.text,
        proc: obj.proc,
        note: true
    });
});



///////////////////////////////////////////////////////
/* -listen to port using express- */
const port = process.env.PORT || process.argv[2];
app.listen(port, function () {
    console.log('listening to port: ' + port);
});

///////////////////////////////////////////////////////
/* -response of index.html- */
app.get('/', (req, res) => {
    res.sendFile('./index.html', { root: __dirname });
});


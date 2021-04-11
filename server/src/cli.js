require('dotenv').config({path: '../.env'})
const cli = require('./helpers/cli');
const file = require('./helpers/file');

cli.commandValidate();
const commandProps = cli.commandParse();
file.createFiles(commandProps);

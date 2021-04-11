require('dotenv').config({path: '../../.env'})
const chalk = require('chalk');
const table = require('text-table');
const commands = require('./cli-commands');

const cli = {
	commandValidate: () => {
		if (process.argv.length > 2) {
			const index = commands.findIndex(item => item.name.toLowerCase() === process.argv[2]);
			if (index === -1) { cli.error('\nInvalid command.\n') }
			cli.pathValidate();
		} else { cli.error('\nPlease, type a command.\n') }
	},
	pathValidate: () => {
		if (process.argv.length > 3) {
			const path = process.argv[3].split('/');
			if (path.length != 4) { cli.error('\nThe path must have 4 levels (group/category/subject/filename).\n') }
		} else { cli.error('\nThe path is missing.\n') }
	},
	commandParse: () => {
		const props = {};

		if (process.argv[2]) {
			props.command = process.argv[2];
			props.template = process.argv[2].split('-')[1]
		}

		if (process.argv[3]) {
			const file = process.env.READDATAFOLDER + process.argv[3];
			let folders = file.split('/');
			props.filename = folders.pop();
			props.pathChecklist = folders.join('/') + '/checklists/'
			props.pathNotes = folders.join('/') + '/notes/'
		}
		return props;
	},
	showCommands: () => {
		const data = [];
		commands.map(command => data.push([chalk.cyan(command.name), chalk.yellow(command.description)]))
		console.error(table(data));
	},
	error: (message) => {
		console.error(chalk.red(message));
		cli.showCommands();
		process.exit(1);
	}
}

module.exports = cli;
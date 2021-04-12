const fs = require('fs');
const path = require('path');
const cli = require('./cli');
const chalk = require("chalk");

const files = {
	templateProps: (commandProps, template) => {
		let file = '';
		let source = '';
		let fullPath = '';

		if (template == 'checklist') {
			file = path.resolve(`${commandProps.pathChecklist}checklist-${commandProps.filename}.json`);
			fullPath = path.resolve(commandProps.pathChecklist);
			source = path.resolve('../templates/checklist.json');
		}

		if (template == 'notes') {
			file = path.resolve(`${commandProps.pathNotes}${commandProps.filename}.json`);
			fullPath = path.resolve(commandProps.pathNotes);
			source = path.resolve('../templates/notes.json');
		}
		return {file, source, path: fullPath}
	},
	createFiles: (commandProps) => {
		if (commandProps.command == 'new-both') {
			files.copyTemplate(files.templateProps(commandProps, 'checklist'));
			files.copyTemplate(files.templateProps(commandProps, 'notes'));
		} else {
			files.copyTemplate(files.templateProps(commandProps, commandProps.template));
		}
	},
	copyTemplate: (templateProps) => {
		if (!fs.existsSync(templateProps.file)) {
			fs.mkdir(path.resolve(templateProps.path), { recursive: true }, (err) => {
				if (err) throw err;
				fs.copyFile(templateProps.source, templateProps.file, error => error && console.log(error));
				console.log(chalk.yellow('The file ') + chalk.cyan(templateProps.file) + chalk.yellow(' was created successfully.'))
			});
		}
		else { cli.error('\nThe file already exists.\n')}
	},
	removeHiddenFiles: (list) => list.filter(item => (!item.startsWith('.')) && item),
}

module.exports = files;
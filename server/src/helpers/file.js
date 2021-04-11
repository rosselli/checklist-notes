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
	}


















	// read: (filename) => {
	// 	const file = path.resolve(__dirname, '../', 'cache', filename);
	// 	const data = fs.readFileSync(file);
	// 	return JSON.parse(data);
	// },
	// write: (content, filename) => {
	// 	const file = path.resolve(__dirname, '../', 'cache', filename);
	// 	fs.writeFile(file, content, (error) => error && console.log(error.message));
	// },
	// copy: (req, res) => {
	// 	const files = ['counter.json', 'all-projects-total.json', 'issues.json', 'projects.json', 'repos.json', 'gists.json', 'gist.json'];
	// 	const output = [];
	// 	files.forEach(item => {
	// 		const source = path.resolve(__dirname, 'cache', item);
	// 		const destination = path.resolve(__dirname, '..', 'client', 'src', 'cache', item);
	// 		fs.copyFile(source + item, destination + item, error => error && console.log(error));
	// 		output.push(`The cache file (${item}) was copied to ${destination}.`);
	// 	});
	// 	res.send(JSON.stringify(output));
	// },
	// updateProjectsJSON: (counter, label, filename) => {
	// 	let json = cache.read(filename);
	// 	json.data.projects.map(item => {
	// 		if (item.name === label) {
	// 			item.counter.issues = counter.issues;
	// 			item.counter.tasks = counter.tasks;
	// 		}
	// 	})
	// 	cache.write(JSON.stringify(json), filename);
	// },
	// updateCounterJSON: (counter, label, filename) => {
	// 	const json = cache.read(filename);
	// 	json.currentLabel.label = label;
	// 	json.currentLabel.issues = counter.issues;
	// 	json.currentLabel.tasks = counter.tasks;
	// 	cache.write(JSON.stringify(json), filename);
	// },
}

module.exports = files;
const pathResolve = require('path').resolve;
require('dotenv').config({path: pathResolve(__dirname, '../.env')})
const fs = require('fs');
const files = require('./helpers/file');
const lists = require('./helpers/list');
const base = process.env.READDATAFOLDER;

const structure = {
	groups: [],
	paths: [],
	files: {
		checklists: [],
		notes: []
	}}

const getStructure = {
	getFiles: (path, type) => {
		if (fs.existsSync(path + '/' + type)) {
			const filesList = files.removeHiddenFiles(fs.readdirSync(path + '/' + type));
			if (filesList) {
				const list = [];
				filesList.map(item => {
					const filePath = path + type + '/' + item;
					if (filePath.endsWith('.json')) {
						structure.files[type].push(filePath);
						const content = getStructure.getFileContent(filePath, type);
						const counter = lists.parseChecklists(content.items);
						list.push({ title: content.title, counter, fileName: item, filePath })
					}
				});
				return list;
			}
		}
	},
	readFolders: () => {
		const groups = files.removeHiddenFiles(fs.readdirSync(base));
		groups.map((group, groupIndex) => {
			structure.groups.push({ title: group, categories: []})

			const categoriesBase = base + group;
			const categories = files.removeHiddenFiles(fs.readdirSync(categoriesBase));
			categories.map((category, categoryIndex) => {
				structure.groups[groupIndex].categories.push({ title: category, subjects: []})

				const subjectsBase = categoriesBase + '/' + category;
				const subjects = files.removeHiddenFiles(fs.readdirSync(subjectsBase));
				subjects.map(subject => {
					const filesDefault = [];
					structure.groups[groupIndex].categories[categoryIndex].subjects.push({
						title: subject,
						checklists: getStructure.getFiles(subjectsBase + '/' + subject + '/', 'checklists') || filesDefault,
						notes: getStructure.getFiles(subjectsBase + '/' + subject + '/', 'notes') || filesDefault
					});
					structure.paths.push(subjectsBase + '/' + subject);
				})
			})
		})
	},
	getFileContent: (filePath, type) => {
		const json = fs.readFileSync(filePath);
		return JSON.parse(json);
	},
	exportJSON: () => {
		getStructure.readFolders();
		return JSON.stringify(structure);
	},
}

module.exports = getStructure;

// console.log(getStructure.exportJSON());
// const util = require('util');
// console.log(util.inspect(structure, false, null, true));

// console.log(getStructure.exportJSON());
// console.log(getStructure.readFolders());
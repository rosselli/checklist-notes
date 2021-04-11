const description = (command) => `node cli ${command} <group/category/subject/filename>`;

module.exports = [
	{ name: 'new-checklist', description: description('new-checklist')},
	{ name: 'new-notes', description: description('new-notes')},
	{ name: 'new-both', description: description('new-both') },
];

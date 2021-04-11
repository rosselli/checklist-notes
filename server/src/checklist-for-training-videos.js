const chalk = require("chalk");

const videosList = (times) => {
	let checklist = '\t"items": [\n';
	JSON.parse(times).map((item, index) => {
		for (i = 0; i < item; i++) {
			checklist += `\t\t["", "${index+1}.${i+1}: "],\n`;
		}
		checklist = checklist.slice(0, -2);
		checklist += ',\n';
	});

	checklist = checklist.slice(0, -2);
	checklist += '\n\t]\n'
	console.log(checklist);
}

const pattern = /(\[)(\d{1,2},?)+(\])/;
if (process.argv.length > 2 && pattern.test(process.argv[2])) {
	videosList(process.argv[2])
} else {
	console.error(chalk.red('\nThe parameter is missing.'))
	console.error(chalk.cyan('node create-videos-list'), chalk.yellow(' [9,99,9,999]') + '\n')
}
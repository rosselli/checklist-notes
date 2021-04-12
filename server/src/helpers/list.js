const list = {
	parseChecklists: (list) => {
		let toDo = 0;
		let done = 0;
		list.map(item => {
			if (item[0] === 'x') { done ++ }
			else { toDo ++ }
		})
		return {total: toDo + done, toDo, done, percentage: 0, of: `${done} of ${toDo + done}`}
	},
}

module.exports = list;
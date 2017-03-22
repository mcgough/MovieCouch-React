const utils = {
	checkContent: (str) => {
		return str !== 'N/A' ? str : '';
	},
	filterResults: (arr) => {
		let results;
		if (arr !== undefined) {
			results = arr.filter((el) => {
				if (el.Poster !== 'N/A') {
					return el;
				}
			});
		} else {
			results = [];
		}
		return results;
	}
};

export default utils;
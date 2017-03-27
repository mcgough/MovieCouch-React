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
	},
	setSearchTerms: (term,arr) => {
		let newArr;
		if (arr === null) {
			return JSON.stringify([term]);
		} else {
			if (arr.length < 5) {
				arr.unshift(term);
				return JSON.stringify(arr);
			} else {
				newArr = arr.slice(0,4);
				newArr.unshift(term);
				return JSON.stringify(newArr);
			}
		}
	},
	storageCheck: () => {
		return typeof(Storage) !== undefined;
	}
};

export default utils;
export default {
	checkContent: (str) => {
		return str !== 'N/A' ? str : '';
	},
	setSearchTerms: (term, arr) => {
		let newArr;
		if (arr.length < 5) {
			arr.unshift(term);
			return arr;
		} else {
			newArr = arr.slice(0,4);
			newArr.unshift(term);
			return newArr;
		}
	},
	storageCheck: () => {
		return typeof(Storage) !== undefined;
	},
};
var fs = require('fs');

function restoreOriginalData() {
    fs.writeFileSync('boba.json', fs.readFileSync('boba_original.json'));
}

function loadData() {
    return JSON.parse(fs.readFileSync('boba.json'));
}

function saveData(data) {
	// boba.json stores the boba place array under key "boba", 
	// so we are recreating the same structure with this object
	var obj = {
		boba: data
	};

	fs.writeFileSync('boba.json', JSON.stringify(obj));
}

module.exports = {
    restoreOriginalData: restoreOriginalData,
    loadData: loadData,
    saveData: saveData,
}
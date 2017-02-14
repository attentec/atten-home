export function mathMean(rowData){
	var sum = 0;
	var res;
	for (var i = 0; i<rowData.value.length; i++) {
		sum += rowData.value[i];
	}
	res = sum/rowData.value.length;
	res = res*10;
	res = Math.round(res);
	res = res/10;
	return res;
}

export default styling = {
		a_bread_font: 'lato',
		a_header_font: 'merriweather',
		a_black: "#323944",
		a_red: "#910B26",
		a_white: "#f8f9fa",
		a_grey: "#71777A",
		ios_separator: "#C8C7CC"
	};

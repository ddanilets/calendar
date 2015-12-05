var events=[];
var _date=[];
var _timeName=[];
function pullTimeName(){
	if (localStorage.getItem('TimeName')){
		var serTimeName=localStorage["TimeName"];
		_timeName=JSON.parse(serTimeName);
		return 1;
	}
	else{
		return 0;
	}
}
function pushTimeName(){
	var serTimeName=JSON.stringify(_timeName);
	localStorage["TimeName"]=serTimeName;
}
function pullDate(){
	if (localStorage.getItem('Date')){
		var serDate=localStorage["Date"];
		_date=JSON.parse(serDate);
		return 1;
	}
	else{
		return 0;
	}
}
function pushDate(){
	var serDate = JSON.stringify(_date);
	localStorage["Date"]=serDate;
}
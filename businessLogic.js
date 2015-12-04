function Event(date,name,visitors,description){
	this.name=name;
	this.date=date;
	this.visitors=visitors;
	this.description=description;
}
function CheckForTodayAndSet(){
	var thisDate=new Date();
	for (var i=1;i<43;i++)
	{
		if (document.getElementById("d"+i).getAttribute("month")==thisDate.getMonth()){
			if (document.getElementById("d"+i).getAttribute("day")==thisDate.getDate()){
				if (document.getElementById("d"+i).getAttribute("year")==thisDate.getFullYear()){
					document.getElementById("d"+i).setAttribute("today",true);
				}
			}
		}
	}
}
function AddEvent(date,name,visitors,description){
	events[events.length]=new Event(date,name,visitors,description);
	pushEvents();
}
function showEvents(){
	if (pullEvents())
	{
	events.forEach(function(value,key,events){
		setEventOnDate(value);
	});
	}
}
function eventDelete(day,month,year){
	if (pullEvents())
	{
	var newEvents=events;
	events.forEach(function(value,key,events){
		var evYear=parseInt(value.date.slice(0,4));
		var evMonth=parseInt(value.date.slice(5,7));
		var evDay=parseInt(value.date.slice(8,10));
		if(day==evDay&&month==evMonth&&year==evYear)
			newEvents.splice(key,1);
	});
	events=newEvents;
	pushEvents();
	}
}
function eventSearch(day,month,year){
	if (pullEvents())
	{
		var res;
	events.forEach(function(value,key,events){
		var evYear=parseInt(value.date.slice(0,4));
		var evMonth=parseInt(value.date.slice(5,7));
		var evDay=parseInt(value.date.slice(8,10));
		if(day==evDay&&month==evMonth&&year==evYear)
			res= value;
	});
	}
	return res;
}

var months=["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь"];
var days=["Понедельник","Вторник","Среда","Четверг","Пятница","Суббота","Воскресенье"]
function drawOn(){
	
	var string="";
	for (var i=1;i<43;i++){
		if(i==1||i==8||i==15||i==22||i==29||i==36){
			string+="<tr>";
		}
		string+='<td id="d'+i+'"></td>';
		if(i==7||i==14||i==21||i==28||i==35||i==42){
			string+="</tr>";
		}
	}
	document.getElementById("calendar-table-base").innerHTML=string;
	if (_date[0]==undefined||_date[1]==undefined){
		if (pullDate()){}
	}
	if (_date[0]==undefined||_date[1]==undefined){
		_date[0]=new Date().getMonth();
		_date[1]=new Date().getFullYear();
		pushDate();
	}
	MakeCalendar();
	hideAddEvent();
	if(pullTimeName()==1)
	{
		CurrentDay(document.getElementById("d"+_timeName[2]));
		localStorage.removeItem("TimeName");
	}

}
function hideAddFast(){
	document.getElementById("addButtonTrigger").style.display="none";
}
function showAddFast(){
	document.getElementById("addButtonTrigger").style.display="block";
}
function MakeCalendar(){
	pullDate();
	var elem=document.getElementById("date");
	var attr=elem.attributes;
		attr[1].value=_date[0];
		attr[2].value=_date[1];
	elem.innerHTML=months[attr[1].value]+" "+attr[2].value;
	for (var i=1;i<43;i++)
	{
		document.getElementById("d"+i).innerHTML="";
		document.getElementById("d"+i).setAttribute("day",0);
		document.getElementById("d"+i).setAttribute("month",0);
		document.getElementById("d"+i).setAttribute("year",0);
		document.getElementById("d"+i).removeAttribute("today");
		document.getElementById("d"+i).removeAttribute("event");
		document.getElementById("d"+i).setAttribute("onclick","CurrentDay(this)");
		if(document.getElementById("d"+i).style.background=="rgb(229, 241, 249)")
		{
		document.getElementById("d"+i).style.background="rgb(255,255,255)";
		}
	}
	var attr=elem.attributes;
	var thisDate=new Date(attr[2].value,attr[1].value);
	if (thisDate.getDay()==0)
	{
		dayOfWeek=7;
	}
	else
	{
	dayOfWeek=thisDate.getDay();
	}
	var lastDay = new Date(thisDate.getFullYear(), thisDate.getMonth() + 1, 0);
	var lastDayPrevMonth = new Date(thisDate.getFullYear(), thisDate.getMonth(),0);	
	var lastDayNextMonth = new Date(thisDate.getFullYear(), thisDate.getMonth()+2,0);	
	var z=1;
	for (var i=1;i<43;i++)
	{
		var string="";
		if (i>=1&&i<8)
		{
			string+=days[i-1]+", ";
		}
		if (i<dayOfWeek)
		{
			string+=lastDayPrevMonth.getDate()-dayOfWeek+i+1;
			document.getElementById("d"+i).setAttribute("day",lastDayPrevMonth.getDate()-dayOfWeek+i+1);
			document.getElementById("d"+i).setAttribute("month",lastDayPrevMonth.getMonth());
			document.getElementById("d"+i).setAttribute("year",lastDayPrevMonth.getFullYear());
		}
		if (i>=dayOfWeek&&i<=parseInt(lastDay.getDate())+dayOfWeek-1)
		{
			string+=i-dayOfWeek+1;
			document.getElementById("d"+i).setAttribute("day",i-dayOfWeek+1);
			document.getElementById("d"+i).setAttribute("month",thisDate.getMonth());
			document.getElementById("d"+i).setAttribute("year",thisDate.getFullYear());
		}
		if (i>lastDay.getDate()-1+dayOfWeek)
		{
			string+=z;
			document.getElementById("d"+i).setAttribute("day",z);
			document.getElementById("d"+i).setAttribute("month",lastDayNextMonth.getMonth());
			document.getElementById("d"+i).setAttribute("year",lastDayNextMonth.getFullYear());
			z+=1;
		}
		document.getElementById("d"+i).innerHTML=string;
		
	}
	
	CheckForTodayAndSet();
	showEvents();
}
function MoveLeft() {
	var elem=document.getElementById("date");
	var attr=elem.attributes;
	if (attr[1].value==0){
		_date[0]=11;
		_date[1]-=1;
	}
	else{
		_date[0]-=1;
	}
	pushDate();
	MakeCalendar();
}
function Today(){
	var thisDate=new Date();
	_date[0]=thisDate.getMonth();
	_date[1]=thisDate.getFullYear();
	pushDate();
	MakeCalendar();
	CheckForTodayAndSet();
	
}
function MoveRight(){
	var elem=document.getElementById("date");
	var attr=elem.attributes;
	if (attr[1].value==11){
		_date[0]=0;
		_date[1]+=1;
		}
		else{
			_date[0]+=1;
	}
	pushDate();
	MakeCalendar();
}
function hideAddEvent(){
	document.getElementById("addEvent").style.left="200%";
	document.getElementById("closeAddEvent").style.display="none";
	a=[];
	_timeName=a;
}
function callAddEventForm(parent_elem){
	hideOpenEvent()
	var coords=parent_elem.getBoundingClientRect();
	elem=document.getElementById("addEvent");
	close=document.getElementById("closeAddEvent");
	bottom=document.getElementById("calendar-table-base").getBoundingClientRect().bottom;
	if (coords.left>document.documentElement.clientWidth-(coords.right-coords.left)*3){
		
		elem.style.left=coords.left-elem.offsetWidth+"px";
		close.style.left=coords.left-document.documentElement.clientWidth/250+"px";
	}
	else
	{
		elem.style.left=parseInt(12.5+coords.right)+"px";
		close.style.left=coords.right+elem.offsetWidth-document.documentElement.clientWidth/250+"px";
		
	}
	if (coords.bottom+elem.offsetHeight/2.25>bottom)
	{
		elem.style.top=bottom-elem.offsetHeight+"px";
		close.style.top=bottom-elem.offsetHeight+"px";
	}
	else{
		elem.style.top=coords.top-elem.offsetHeight/2.25+"px";
		close.style.top=coords.top-elem.offsetHeight/2.25+"px";
	}
	elem.style.display="block";
	close.style.display="block";
	var day=parseInt(parent_elem.getAttribute("day"));
	var month=parseInt(parent_elem.getAttribute("month"))+1;
	var year=parseInt(parent_elem.getAttribute("year"));
	if (day<10)
		day="0"+day;
	if (month<10)
		month="0"+month;
	if(pullTimeName()==1)
	{
		document.getElementById("addEventEventName").setAttribute("value",_timeName[1]);
		document.getElementById("addEventEventTime").setAttribute("value",_timeName[0]);
		a=[];
		_timeName=a;
	}
	document.getElementById("addEventEventDate").setAttribute("value",day+"."+month+"."+year);
	
}
function createEventWithForm(form){
	form=form.elements;
	if(form.eventName.value!=""){
		var name=form.eventName.value;
	}
	else
	{
		var name="Новое событие";
	}
	if(form.date.value!=""){
		var date=new Date(parseInt("20"+form.date.value.slice(8,10)),form.date.value.slice(3,5)-1,form.date.value.slice(0,2));
		date.setHours(12);
		if (form.time.value!="")
		{
			date.setHours(parseInt(form.time.value.slice(0,2))+2);
			date.setMinutes(form.time.value.slice(3,5));
		}
	}
	else
	{
		var date=new Date();
		date.setHours(12);
		if (form.time.value!="")
		{
			date.setHours(form.time.value.slice(0,2));
			date.setMinutes(form.time.value.slice(3,5));
		}
	}
	if(form.visitors.value!=""){
		var visitors=form.visitors.value;
	}
	else
	{
		var visitors="Я";
	}
	if(form.description.InnerHTML!=""){
		var description=form.description.value;
	}
	else
	{
		var description="";
	}
	AddEvent(date,name,visitors,description);
}
function setEventOnDate(event){
	var year=parseInt(event.date.slice(0,4));
	var month=parseInt(event.date.slice(5,7));
	var day=parseInt(event.date.slice(8,10));
	var hours=parseInt(event.date.slice(11,13));
	var minutes=parseInt(event.date.slice(14,16));
	if(hours<=12){
		var partOfDay="AM";
	}
	else{
		var partOfDay="PM";
	}
	if(minutes<10){
		minutes="0"+minutes;
	}
	var string='<p id="eventName">'+event.name+'</p><p>'+event.visitors+'</p><p>'+hours+':'+minutes+' '+partOfDay+'</p>';
	for (var i=1;i<43;i++){
		if (document.getElementById("d"+i).getAttribute("year")==year){
			if (document.getElementById("d"+i).getAttribute("month")==month-1){
				if (document.getElementById("d"+i).getAttribute("day")==day){
					document.getElementById("d"+i).setAttribute("event",1);
					document.getElementById("d"+i).innerHTML=document.getElementById("d"+i).innerHTML+string;
				}
					
				}
			}

		}
	}
function CurrentDay(elem){
	for (var i=1;i<43;i++)
	{
		if(document.getElementById("d"+i).hasAttribute("style")){
			document.getElementById("d"+i).removeAttribute("style");
		}
		
	}
	document.getElementById("addEventEventName").setAttribute("value","");
	document.getElementById("addEventEventTime").setAttribute("value","");
	elem.style.background="rgb(229,241,249)";
	CheckForTodayAndSet();
	if (elem.hasAttribute("event"))
	{
		callOpenEventForm(elem);
	}
	else{
		callAddEventForm(elem);
	}
}
function addFast(form){
	form=form.elements;
	hideAddFast();
	var string=form.addFastText.value;
	var regex=/[0-3][0-9].[0-1][0-9].[0-9][0-9]/g;
	var date=string.match(regex);
	if (date!=null)
	{
		date=date[0];
	}
	else {
		date="";
	}
	regex=/[0-2][0-9]:[0-6][0-9]/g;
	var time=string.match(regex);
	if (time!=null)
	{
		time=time[0];
	}
	else {
		time="12:00";
	}
	string=string.replace(/[0-9]/g,"");
	string=string.replace(/\./g,"");
	var name=string.replace(/\:/g,"");
	if (name=="")
	{
		name="Новое событие";
	}
	if(date!=""){
		var userDate=new Date(parseInt("20"+date.slice(6,8)),date.slice(3,5)-1,date.slice(0,2));
		userDate.setHours(time.slice(0,2));
		userDate.setMinutes(time.slice(3,5));
	}
	else {
		var userDate=new Date();
	}
	var dayOfWeek=new Date(userDate.getFullYear(),userDate.getMonth()).getDay();
	 if (dayOfWeek==0){
		 dayOfWeek=7;
	}
	_date[0]=userDate.getMonth();
	_date[1]=userDate.getFullYear();
	pushDate();
	_timeName[0]=time;
	_timeName[1]=name;
	_timeName[2]=parseInt(userDate.getDate()+dayOfWeek-1);
	pushTimeName();
	MakeCalendar();
}
function openEvent(){
	
}
function callOpenEventForm(parent_elem){
	hideAddEvent();
	var coords=parent_elem.getBoundingClientRect();
	elem=document.getElementById("openEvent");
	close=document.getElementById("closeOpenEvent");
	bottom=document.getElementById("calendar-table-base").getBoundingClientRect().bottom;
	if (coords.left>document.documentElement.clientWidth-(coords.right-coords.left)*3){
		
		elem.style.left=coords.left-elem.offsetWidth+"px";
		close.style.left=coords.left-document.documentElement.clientWidth/250+"px";
	}
	else
	{
		elem.style.left=parseInt(12.5+coords.right)+"px";
		close.style.left=coords.right+elem.offsetWidth-document.documentElement.clientWidth/250+"px";
		
	}
	if (coords.bottom+elem.offsetHeight/2.25>bottom)
	{
		elem.style.top=bottom-elem.offsetHeight+"px";
		close.style.top=bottom-elem.offsetHeight+"px";
	}
	else{
		elem.style.top=coords.top-elem.offsetHeight/2.25+"px";
		close.style.top=coords.top-elem.offsetHeight/2.25+"px";
	}
	elem.style.display="block";
	close.style.display="block";
	var day=parseInt(parent_elem.getAttribute("day"));
	var month=parseInt(parent_elem.getAttribute("month"))+1;
	var year=parseInt(parent_elem.getAttribute("year"));
	if (day<10)
		day="0"+day;
	if (month<10)
		month="0"+month;
	if(pullTimeName()==1)
	{
		
	}
	var event=eventSearch(day,month,year);
	document.getElementById("openEventEventDate").innerHTML=day+"."+month+"."+year;
	document.getElementById("openEventEventName").innerHTML=event.name;
	document.getElementById("openEventEventTime").innerHTML=event.date.slice(11,16);
	document.getElementById("openEventEventVisitors").innerHTML=event.visitors;
	document.getElementById("openEventTextField").innerHTML=event.description;
}
function hideOpenEvent(){
	document.getElementById("openEvent").style.left="200%";
	document.getElementById("closeOpenEvent").style.display="none";
}
function deleteEventWithForm(){
	var evDate=document.getElementById("openEventEventDate").innerHTML;
	var day=evDate.slice(0,2);
	var month=evDate.slice(3,5);
	var year=evDate.slice(6,10);
	eventDelete(day,month,year);
	hideOpenEvent();
	MakeCalendar();
}
function editEventWithForm(form){
	var evDate=document.getElementById("openEventEventDate").innerHTML;
	var evTime=document.getElementById("openEventEventTime").innerHTML;
	var day=evDate.slice(0,2);
	var month=evDate.slice(3,5);
	var year=evDate.slice(6,10);
	var hours=parseInt(evTime.slice(0,2))+2;
	var minutes=evTime.slice(3,5);
	var event=eventSearch(day,month,year);
	eventDelete(day,month,year);
	var description=form.elements.openEventTextField.value;
	eDate=new Date(year,month-1,day,hours,minutes);
	AddEvent(eDate,event.name,event.visitors,description);
	hideOpenEvent();
	MakeCalendar();
}

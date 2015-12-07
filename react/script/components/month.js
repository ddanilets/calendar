/** @jsx React.DOM */
var Calendar = function(){
	this.itermonthdates=function(year,month)
	{
		month-=1;
		var date=new Date(year,month);
		var lastDay=new Date(year,month+1,0);
		var dayOfWeek=new Date(year,month).getDay();
		var days=[];
		if (dayOfWeek==0)
			dayOfWeek=7;
		if ((dayOfWeek==6&&lastDay.getDate()==31)||(dayOfWeek==7&&lastDay.getDate()>=30)){
			var numOfDays=43;
		}
		else{
			var numOfDays=36;
		}
		for (var i=1;i<numOfDays;i++)
		{
			var day={};		
			curDate=new Date(year,month,i-dayOfWeek+1);
			day.year=curDate.getFullYear();
			day.monthNum=curDate.getMonth();
			day.monthName=_months[curDate.getMonth()];
			day.num=curDate.getDate();
			days[i]=day;
		}
		return days;
	}
}
var Month = React.createClass({
	handleUpdateMonth: function(update) {
		calendarActions.updateMonth(update);
	},
	render: function() {
		var self=this;
		var calendar = new Calendar();
		pullTasks();
		var days1 = calendar.itermonthdates(this.props.moment.year, this.props.moment.num);
		var days = calendar.itermonthdates(this.props.moment.year, this.props.moment.num);
		days.forEach(function(value,index,days){
			value={
				year: days1[index].year,
				monthNum: days1[index].monthNum + 1,
				monthName: days1[index].monthName,
				num: days1[index].num,
			}
		});
		var self=this;
		var tasks = days.map(function(day, index) {
				var allTasks=self.props.tasks;
				var dayTasks=allTasks.filter( function(item,key,allTasks){
					var i=item.year==day.year&&item.monthNum==day.monthNum&&item.num==day.num;
					return i;
				})
				if (dayTasks.length==0)
					dayTasks=[{}];
				return( {
					year: day.year,
					monthNum: day.monthNum,
					monthName: day.monthName,
					num: day.num,
					tasks: dayTasks[0]
				})
		});
		return (
			<div>
				<div className="month">
					<div className="month-header">
						<span className="left" onClick={this.handleUpdateMonth.bind(null, -1)}>&#171;</span><h2>{this.props.moment.name} &#183; {this.props.moment.year}</h2><span className="right" onClick={this.handleUpdateMonth.bind(null, 1)}>&#187;</span>
					</div>
					<div id="days-header">
							<ul>
								<li>Понедельник</li>
								<li>Вторник</li>
								<li>Среда</li>
								<li>Четверг</li>
								<li>Пятница</li>
								<li>Суббота</li>
								<li>Воскресенье</li>
							</ul>
					</div>
					<Days moment={this.props.moment} days={tasks} selectedDay={this.props.selectedDay} />
				</div>
				<div className="task-list">
					<TaskList moment={this.props.moment} days={tasks} selectedDay={this.props.selectedDay}/>
				</div>
				<div className="task-search">
					<TaskSearch search={this.props.search} days={self.props.tasks}/>
				</div>
				<div className="add-task">
					<AddTask selectedDay={this.props.selectedDay}/>
				</div>
			</div>
		)
	}
});
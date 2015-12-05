/** @jsx React.DOM */
var Calendar = function(){
	this.itermonthdates=function(year,month)
	{
		month-=1;
		var day={};
		var date=new Date(year,month);
		var lastDay=new Date(year,month,0);
		var dayOfWeek=new Date(year,month).getDay();
		var days=[];
		if (dayOfWeek=0)
			dayOfWeek=7;
		var k=dayOfWeek-1;
		for (var i=1;i<lastDay.getDate()+k+7-lastDay.getDay();i++)
		{
			if (i<=k)	
			{			
				curDate=new Date(year,month,k-i);
			}
			else{
				curDate=new Date(year,month,i+k-7);
			}
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

		var calendar = new Calendar();

		var days = calendar.itermonthdates(this.props.moment.year, this.props.moment.num).map(function(item) {
			return(
				{
				year: moment(item).year(),
				monthNum: moment(item).month() + 1,
				monthName: moment(item).format('MMMM'),
				num: moment(item).format('D'),
				holiday: moment(item).holiday(),
				
				}
			)
		});

		var tasks = days.map(function(day, index) {
			if (index % 2 == 0) {
				return( {
					year: day.year,
					monthNum: day.monthNum,
					monthName: day.monthName,
					num: day.num,
					holiday: day.holiday,
					occasions: [],
					tasks: [
						{
							taskName: 'Ride to hockey',
							help: false
						}
					]
				})
			}
			else if (index % 3 == 0 ) {
				return( {
					year: day.year,
					monthNum: day.monthNum,
					monthName: day.monthName,
					num: day.num,
					holiday: day.holiday,
					occasions: [
						{
							occasionName: 'Birthday'
						}
					],
					tasks: [
						{
							taskName: 'Walk the dogs',
							help: false

						},
						{
							taskName: 'Dinner for tonight',
							help: true
						}
					]
				})

			}
			else {
				return ( {
					year: day.year,
					monthNum: day.monthNum,
					monthName: day.monthName,
					num: day.num,
					holiday: day.holiday,
					occasions: [],
					tasks: [
						{
							taskName: 'Doctor appt',
							help: false
						},
						{
							taskName: 'Shovel snow',
							help: true
						}
					]

				})
				
			}
		});

		return (
			<div>
				<div className="month">
					<div className="month-header">
						<span className="left" onClick={this.handleUpdateMonth.bind(null, -1)}>&#171;</span><h2>{this.props.moment.name} &#183; {this.props.moment.year}</h2><span className="right" onClick={this.handleUpdateMonth.bind(null, 1)}>&#187;</span>
					</div>
					<div id="days-header">
							<ul>
								<li>Sunday</li>
								<li>Monday</li>
								<li>Tuesday</li>
								<li>Wednesday</li>
								<li>Thursday</li>
								<li>Friday</li>
								<li>Saturday</li>
							</ul>
					</div>
					<Days moment={this.props.moment} days={tasks} selectedDay={this.props.selectedDay} />
				</div>
				<div className="task-list">
					<TaskList moment={this.props.moment} days={tasks} selectedDay={this.props.selectedDay}/>
				</div>
				<div className="task-search">
					<TaskSearch search={this.props.search} days={tasks}/>
				</div>
			</div>
		)
	}
});
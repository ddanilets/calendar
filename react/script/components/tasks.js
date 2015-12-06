/** @jsx React.DOM */
var Tasks = React.createClass({
	render: function() {
		if (this.props.tasks.length > 0) {
			var classes = "task"
			var tasks=[];
			var allTasks=this.props.tasks;
			allTasks.forEach(function(task,i,allTasks) {
					tasks[tasks.lenght]=(<h3 className={classes}>{task.taskName}</h3>);
			});

		}
		else {
			var tasks = [];
		}
	
		return (
			<div>
				{tasks[0]}
			</div>
		)
	}
})

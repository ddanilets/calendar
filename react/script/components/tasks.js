/** @jsx React.DOM */
var Tasks = React.createClass({
	handleDeleteTask: function(task){
		calendarActions.deleteTask(task);
	},
	render: function() {
		var self=this;
		if (this.props.tasks.tasks!=undefined){
			if (this.props.tasks.tasks.length > 0) {
				var classes = "task";
				var task1=self.props.tasks;
				var tasks=this.props.tasks.tasks.map(function(task){
					return (<h3 className={classes}><span id="taskName">{task.taskName}</span><span id="taskHolders">{task.taskHolders}</span><span id="delete" onclick={self.handleDeleteTask.bind(null,task1)}></span></h3>);
				});
	
			}
			else {
				var tasks = [];
			}
		}
		else{
			var tasks=[];
		}
	
		return (
			<div>
				{tasks}
			</div>
		)
	}
})

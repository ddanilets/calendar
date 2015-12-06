/** @jsx React.DOM */
var Tasks = React.createClass({
	render: function() {
		if (this.props.tasks!=undefined){
			if (this.props.tasks.length > 0) {
				var classes = "task";
				var tasks=this.props.tasks.map(function(task){
					return (<h3 className={classes}><span id="taskName">{task.taskName}</span><span id="taskHolders">{task.taskHolders}</span><span id="taskDescription">{task.taskDescription}</span></h3>);
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

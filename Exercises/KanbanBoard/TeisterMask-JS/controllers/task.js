const Task = require('../models/Task');

module.exports = {
	index: (req, res) => {
        Task.find().then(tasks=>{
            res.render(
            	'task/index',
				{
					'openTasks': tasks.filter(t=>t.status === "Open"),
                    'inProgressTasks': tasks.filter(t=>t.status === "In Progress"),
                    'finishedTasks': tasks.filter(t=>t.status === "Finished")
				}
				);
        });
	},
	createGet: (req, res) => {
        res.render('task/create')
	},

	createPost: (req, res) => {
        let taskArgs = req.body;

        Task.create(taskArgs).then(task =>
		{res.redirect('/');})
			.catch(err =>
			{taskArgs.error = "Cannot create task.";
		res.render("task/create", taskArgs);})
	},

	editGet: (req, res) => {
        let id = req.params.id;

        Task.findById(id).then(task=>{
            if (!task){
                res.redirect('/');
                return;
            }
            res.render('task/edit', task);
        })
	},
	editPost: (req, res) => {
        let id = req.params.id;
        let task = req.body;

        Task.findByIdAndUpdate(id,task, {runValidators: true} ).then(task=>{
            res.redirect('/');
            return;
        }).catch(arr => {
        	task.id = id;
        	task.error = "Cannot edit task.";
        	return res.render("task/edit",task);
		})
    }
};
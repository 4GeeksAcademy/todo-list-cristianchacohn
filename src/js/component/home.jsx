import React, { useState } from "react";


const Home = () => {

	const [tasks, setTasks] = useState([
		{ completed: false, name: 'Make the bed', id: Math.random() * 10 },
		{ completed: false, name: 'Wash my hands', id: Math.random() * 10 },
		{ completed: false, name: 'Eat', id: Math.random() * 10 },
		{ completed: false, name: 'Walk the dog', id: Math.random() * 10 }
	]);

	const [inputValue, setInputValue] = useState('');

	const addTask = (e) => {
		e.preventDefault();
		if (inputValue.trim() === '') return;
		setTasks([
			...tasks,
			{ name: inputValue.trim(), completed: false, id: Math.random() * 10 }
		]);
		setInputValue('');
	};

	const removeTask = (id) => {
		setTasks(tasks.filter(task => task.id !== id));
	};

	const renderTasks = tasks.map(task => (
		<li key={task.id} className="task-item">
			<div className="view">
				<label>{task.name}</label>
				<button className="destroy" onClick={() => removeTask(task.id)}>
					<i className="fa fa-trash"></i>
				</button>
			</div>
		</li>
	));

	return (
		<section className="todoapp">
			<header className="header">
				<h1>Task Manager</h1>
				<form onSubmit={addTask}>
					<input
						autoFocus={true}
						className="new-todo"
						placeholder="What needs to be done?"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</form>
			</header>
			<section className="main">
				<ul className="todo-list">
					{renderTasks}
				</ul>
				<div>
					{tasks.length === 0 ? 'No tasks, please add a new one' : tasks.length + ' tasks'}
				</div>
			</section>
		</section>
	);
};

export default Home;

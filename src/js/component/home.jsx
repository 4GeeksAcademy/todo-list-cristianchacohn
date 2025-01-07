import React, { useState, useEffect } from "react";

const Home = () => {
	const API_URL = "https://playground.4geeks.com/todo/user/cristianchacohn";

	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");

	// Fetch para obtener las tareas al cargar la aplicación
	useEffect(() => {
		fetch(API_URL)
			.then((resp) => resp.json())
			.then((data) => {
				if (data.length) {
					setTasks(data);
				} else {
					console.log("No tasks found on the server.");
				}
			})
			.catch((error) => console.error("Error fetching tasks:", error));
	}, []);

	// Función para actualizar la lista de tareas en el servidor
	const syncTasksWithServer = (updatedTasks) => {
		fetch(API_URL, {
			method: "PUT",
			body: JSON.stringify(updatedTasks),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((resp) => {
				if (resp.ok) {
					console.log("Tasks successfully synced with the server.");
				}
			})
			.catch((error) => console.error("Error syncing tasks:", error));
	};

	// Añadir una tarea
	const addTask = (e) => {
		e.preventDefault();
		if (inputValue.trim() === "") return;

		const newTasks = [
			...tasks,
			{ name: inputValue.trim(), completed: false },
		];
		setTasks(newTasks);
		setInputValue("");
		syncTasksWithServer(newTasks);
	};

	// Eliminar una tarea específica
	const removeTask = (taskIndex) => {
		const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
		setTasks(updatedTasks);
		syncTasksWithServer(updatedTasks);
	};

	// Limpiar todas las tareas
	const clearAllTasks = () => {
		setTasks([]);
		syncTasksWithServer([]);
	};

	// Renderizar las tareas
	const renderTasks = tasks.map((task, index) => (
		<li key={index} className="task-item">
			<div className="view">
				<label>{task.name}</label>
				<button className="destroy" onClick={() => removeTask(index)}>
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
				<ul className="todo-list">{renderTasks}</ul>
				<div>
					{tasks.length === 0
						? "No tasks, please add a new one"
						: tasks.length + " tasks"}
				</div>
				<button className="clear-all" onClick={clearAllTasks}>
					Clear All Tasks
				</button>
			</section>
		</section>
	);
};

export default Home;

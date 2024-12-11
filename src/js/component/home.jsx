import React, { useState } from "react";


const Home = () => {
	const [inputValue, setInputValue] = useState("")
	console.log(inputValue);

	const [taskList, setTaskList] = useState([])
	 

	return (
		<div className="container">
			<header className="header">
				<h1>todos</h1>
				<form >
					<input
						autoFocus={true}
						className="new-todo"
						placeholder="What needs to be done?"
						onChange={(e) => setInputValue(e.target.value)}
						onKeyDown={(e)=>{console.log(e.key);
						}}
					/>
				</form>
			</header>
			<ul className="todo-list">

			</ul>
		</div>
	);
};

export default Home;

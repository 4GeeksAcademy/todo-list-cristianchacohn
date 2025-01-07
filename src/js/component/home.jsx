import React, { useEffect, useState } from "react";

export const Home = () => {
  const API_URL = 'https://playground.4geeks.com/todo';
  const USERNAME = 'cristianchacohn';
  const [editingMode, setEditingMode] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [taskList, setTaskList] = useState([]);
  const [taskBeingEdited, setTaskBeingEdited] = useState({});
  const [editLabel, setEditLabel] = useState('');
  const [editStatus, setEditStatus] = useState(false);

  // Agregar tareas
  const handleAddTask = async (event) => {
    event.preventDefault();
    const taskData = {
      label: newTask,
      is_done: false,
    };
    const endpoint = `${API_URL}/todos/${USERNAME}`;
    const options = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taskData),
    };

    const response = await fetch(endpoint, options);
    if (!response.ok) {
      console.error('Error:', response.status, response.statusText);
      return;
    }

    setNewTask('');
    fetchTasks();
  };

  
  const handlePrepareEdit = (task) => {
    setEditingMode(true);
    setTaskBeingEdited(task);
    setEditLabel(task.label);
    setEditStatus(task.is_done);
  };

  // Guardar los cambios del put de una task
  const handleSaveEdit = async (event) => {
    event.preventDefault();
    const updatedTaskData = {
      label: editLabel,
      is_done: editStatus,
    };
    const endpoint = `${API_URL}/todos/${taskBeingEdited.id}`;
    const options = {
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTaskData),
    };

    const response = await fetch(endpoint, options);
    if (!response.ok) {
      console.error('Error:', response.status, response.statusText);
      return;
    }

    setEditingMode(false);
    setTaskBeingEdited({});
    setEditLabel('');
    setEditStatus(false);
    fetchTasks();
  };

  // Eliminar tarea
  const handleDeleteTask = async (taskId) => {
    const endpoint = `${API_URL}/todos/${taskId}`;
    const options = {
      method: 'DELETE',
    };

    const response = await fetch(endpoint, options);
    if (!response.ok) {
      console.error('Error:', response.status, response.statusText);
      return;
    }

    fetchTasks();
  };

  // get de las tareas del user
  const fetchTasks = async () => {
    const endpoint = `${API_URL}/users/${USERNAME}`;
    const options = {
      method: 'GET',
    };

    const response = await fetch(endpoint, options);
    if (!response.ok) {
      console.error('Error:', response.status, response.statusText);
      if (response.status === 404) {
        console.warn('User does not exist. Consider creating it.');
      }
      return;
    }

    const data = await response.json();
    setTaskList(data.todos);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const renderTasks = taskList.map((task, index) => (
    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
      <div className="view">
        <label className="mb-0">{task.label}</label>
        <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteTask(task.id)}>
          <i className="fa fa-trash"></i>
        </button>
        <button className="btn btn-sm btn-primary ms-2" onClick={() => handlePrepareEdit(task)}>
          <i className="fa fa-edit"></i>
        </button>
      </div>
    </li>
  ));

  return (
    <div className="todoapp container my-5">
      <header className="header text-center">
        <h1 className="text-primary">Task Manager</h1>
        {editingMode ? (
          <form onSubmit={handleSaveEdit} className="mb-4">
            <input
              autoFocus
              type="text"
              className="form-control mb-3"
              value={editLabel}
              onChange={(event) => setEditLabel(event.target.value)}
              placeholder="Edit your task..."/>
            <div className="form-check mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={editStatus}
                onChange={(event) => setEditStatus(event.target.checked)}
              />
              <label className="form-check-label">Completed</label>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-primary me-2">Save</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingMode(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleAddTask}>
            <input
              autoFocus
              type="text"
              className="form-control mb-3"
              value={newTask}
              onChange={(event) => setNewTask(event.target.value)}
              placeholder="What needs to be done?"
            />
            <button type="submit" className="btn btn-success w-100">Add Task</button>
          </form>
        )}
      </header>
      <section className="main">
        <ul className="list-group mt-4 mb-4">{renderTasks}</ul>
        <div className="text-center">
          {taskList.length === 0 ? (
            <p className="text-muted">No tasks, please add a new one</p>
          ) : (
            <p>{taskList.length} task(s)</p>
          )}
          {taskList.length > 0 && (
            <button className="btn btn-danger" onClick={() => setTaskList([])}>
              Clear All Tasks
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;

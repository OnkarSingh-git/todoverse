import React from "react";

const TaskList = ({ tasks, handleEditTask, handleDeleteTask }) => {
  if (!tasks || tasks.length === 0) {
    return (
      <p className="mt-4 text-center text-gray-600">
        No tasks available. Please add a task.
      </p>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 bg-white shadow rounded-md flex justify-between items-center"
        >
          <div className="flex flex-col">
            <h2 className="font-bold text-xl">{task.title}</h2>
            {task.description && (
              <p className="text-gray-600 mt-1">{task.description}</p>
            )}
            {task.createdAt && task.createdAt.seconds && (
              <span className="text-gray-500 text-sm">
                {new Date(task.createdAt.seconds * 1000).toLocaleString()}
              </span>
            )}
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => handleEditTask(task)}
              className="text-blue-500 hover:text-blue-700"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;

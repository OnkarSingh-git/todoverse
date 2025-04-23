"use client";

import { motion } from "framer-motion";

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="p-4 bg-white shadow-lg rounded-lg flex justify-between items-center mb-4"
    >
      <div className="flex-1">
        <h2 className="text-xl font-semibold text-gray-800">{task.title}</h2>
        {task.description && (
          <p className="text-gray-600 mt-2 text-sm">{task.description}</p>
        )}
        {task.createdAt && (
          <p className="text-gray-400 text-xs mt-2">
            Created: {task.createdAt.toLocaleDateString()} {task.createdAt.toLocaleTimeString()}
          </p>
        )}
      </div>
      <div className="flex gap-3 ml-4">
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 text-blue-600 hover:text-blue-800 transition-colors"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 text-red-600 hover:text-red-800 transition-colors"
        >
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default TaskCard;
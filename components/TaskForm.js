"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/_utils/firebase";
import { toast } from "react-toastify";

export default function TaskForm({ editingTask, handleUpdateTask, setEditingTask }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    if (editingTask) {
      setValue("title", editingTask.title);
      setValue("description", editingTask.description);
    }
  }, [editingTask, setValue]);

  const onSubmit = async (data) => {
    try {
      if (editingTask) {
        await handleUpdateTask({ ...editingTask, ...data });
        toast.success("Task updated successfully!");
      } else {
        const user = auth.currentUser;
        if (!user) {
          toast.error("Authentication required!");
          return;
        }
        
        await addDoc(collection(db, "tasks"), {
          title: data.title,
          description: data.description,
          uid: user.uid,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        toast.success("Task added successfully!");
      }
      reset({ title: "", description: "" });
      setEditingTask(null);
    } catch (error) {
      console.error("Operation failed:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 flex flex-col gap-4">
      <input
        type="text"
        placeholder="Task Title"
        {...register("title", { required: "Title is required" })}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
      />
      {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}

      <textarea
        placeholder="Description (Optional)"
        {...register("description")}
        className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        rows={3}
      />

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 text-white rounded-md ${
            isSubmitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          } transition-colors`}
        >
          {editingTask ? "Update Task" : "Add Task"}
        </button>
        
        {editingTask && (
          <button
            type="button"
            onClick={() => {
              setEditingTask(null);
              reset({ title: "", description: "" });
            }}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "@/_utils/firebase";
import TaskList from "@/components/TaskList";
import TaskForm from "@/components/TaskForm";
import { toast } from "react-toastify";

export default function Dashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    let unsubscribeTasks = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
        return;
      }

      const q = query(collection(db, "tasks"), where("uid", "==", user.uid));

      unsubscribeTasks = onSnapshot(
        q,
        (snapshot) => {
          const tasksData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate(),
            updatedAt: doc.data().updatedAt?.toDate(),
          }));
          setTasks(tasksData);
        },
        (error) => {
          if (error.code === "permission-denied") {
            setTasks([]);
          }
        }
      );
    });

    return () => {
      unsubscribeAuth();
      unsubscribeTasks(); 
    };
  }, [router]);

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
      if (editingTask?.id === taskId) setEditingTask(null);
      toast.success("Task deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete task");
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateDoc(doc(db, "tasks", updatedTask.id), {
        title: updatedTask.title,
        description: updatedTask.description,
        updatedAt: serverTimestamp(),
      });
      toast.success("Task updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update task");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Tasks</h1>
      <TaskForm
        editingTask={editingTask}
        handleUpdateTask={handleUpdateTask}
        setEditingTask={setEditingTask}
      />
      <TaskList
        tasks={tasks}
        handleEditTask={setEditingTask}
        handleDeleteTask={handleDeleteTask}
      />
    </div>
  );
}

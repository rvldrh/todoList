'use client';

import { addTodo, completeTodo, deleteTodo } from "@/redux/slices/todoSlice";
import { FormEvent, useState, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface Todo {
  text: string;
  completed: boolean;
}

export default function Home() {
  const [task, setTask] = useState<string>("");

  const dispatch = useDispatch();

  // Mengambil semua tugas dari store Redux
  const taskList = useSelector((state: RootState) => state.tasks.todos);

  // Menyaring hanya tugas yang belum diselesaikan (completed: false)
  const incompleteTasks = taskList.filter((todo: Todo) => !todo.completed);
  
  // Menyaring tugas yang sudah diselesaikan (completed: true)
  const completedTasks = taskList.filter((todo: Todo) => todo.completed);

  // Handle submit untuk menambahkan tugas baru
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (task.trim() !== "") {
      dispatch(addTodo({
        text: task,
        completed: false,
      }));
      setTask("");
    }
  };

  // Handle untuk perubahan input
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  // Handle check untuk menyelesaikan tugas
  const handleCheck = (text: string) => {
    dispatch(completeTodo(text)); // Mengubah status menjadi completed
  };

  // Handle untuk menghapus tugas
  const handleDelete = (text: string) => {
    dispatch(deleteTodo(text)); // Menghapus tugas
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-16">
      <div className="px-4 py-2">
        <h1 className="text-gray-800 font-bold text-2xl uppercase">To-Do List</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm mx-auto px-4 py-2">
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add a task"
            value={task}
            onChange={handleInputChange}
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add
          </button>
        </div>
      </form>

      {/* Daftar tugas yang belum selesai */}
      <ul className="divide-y divide-gray-200 px-4">
        {incompleteTasks.length > 0 ? (
          incompleteTasks.map((todo: Todo, index: number) => (
            <li key={index} className="py-4">
              <div className="flex items-center">
                <input
                  id={`todo-${index}`}
                  name={`todo-${index}`}
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleCheck(todo.text)}
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label
                  htmlFor={`todo-${index}`}
                  className="ml-3 block text-gray-900"
                >
                  <span className="text-lg font-medium">{todo.text}</span>
                </label>
              </div>
            </li>
          ))
        ) : (
          <li className="py-4">
            <p className="text-gray-500 text-center">No tasks yet</p>
          </li>
        )}
      </ul>

      {/* Daftar tugas yang sudah selesai */}
      {completedTasks.length > 0 && (
        <div className="px-4 py-2">
          <h2 className="text-gray-800 font-semibold text-xl uppercase mt-4">Completed Tasks</h2>
          <ul className="divide-y divide-gray-200">
            {completedTasks.map((todo: Todo, index: number) => (
              <li key={index} className="py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id={`completed-${index}`}
                    name={`completed-${index}`}
                    type="checkbox"
                    checked={todo.completed}
                    readOnly // Checkbox will not be toggleable in this section
                    className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor={`completed-${index}`}
                    className="ml-3 block text-gray-900"
                  >
                    {/* Apply strikethrough to completed tasks */}
                    <span className="text-lg font-medium line-through text-gray-500">{todo.text}</span>
                  </label>
                </div>

                {/* Tombol untuk menghapus task */}
                <button
                  onClick={() => handleDelete(todo.text)}
                  className="flex-shrink-0 bg-red-500 hover:bg-red-700 text-white text-sm py-1 px-2 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

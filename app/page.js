"use client";
import React, { useState } from 'react';

const Page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [mainTask, setMainTask] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const submitHandler = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedTasks = mainTask.map((task, index) => 
        index === editingIndex ? { title, desc } : task
      );
      setMainTask(updatedTasks);
      setEditingIndex(null);
    } else {
      setMainTask([...mainTask, { title, desc }]);
    }
    setTitle("");
    setDesc("");
  };

  const deleteHandler = (index) => {
    const updatedTasks = mainTask.filter((_, i) => i !== index);
    setMainTask(updatedTasks);
  };

  const editHandler = (index) => {
    setEditingIndex(index);
    setTitle(mainTask[index].title);
    setDesc(mainTask[index].desc);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="bg-slate-700 rounded-[12px] text-white text-center p-5 font-bold text-5xl w-full md:w-2/3">My Todo List</h1>
      <form className="flex flex-col md:flex-row justify-center items-center w-full md:w-2/3 p-5" onSubmit={submitHandler}>
        <input
          className="border-2 border-gray-300 px-4 py-2 rounded-xl m-2 w-full md:w-1/3 focus:outline-none focus:border-blue-500"
          placeholder="Enter title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}/>
        <input
          className="border-2 border-gray-300 px-4 py-2 rounded-xl m-2 w-full md:w-1/3 focus:outline-none focus:border-blue-500"
          placeholder="Enter description"
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}/>
        <button
          className="bg-blue-500 text-white p-2 rounded-xl m-2 hover:bg-blue-600 transition duration-200"
        >
          {editingIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </form>

      <div className="bg-white shadow-md rounded-lg p-6 w-full md:w-2/3 mt-5">
        {mainTask.length === 0 ? (
          <h2 className="text-center text-gray-500">No Tasks Available.</h2>
        ) : (
          <ul className="space-y-4">
            {mainTask.map((task, index) => (
              <li key={index} className="flex justify-between items-center border-b border-gray-200 pb-2">
                <div className="flex-1">
                  <h5 className="text-2xl font-semibold">{index + 1}. {task.title}</h5>
                  <h6 className="text-lg text-gray-600">{task.desc}</h6>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="bg-yellow-500 text-white rounded-xl px-3 py-2 hover:bg-yellow-600 transition duration-200"
                    onClick={() => editHandler(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white rounded-xl px-3 py-2 hover:bg-red-600 transition duration-200"
                    onClick={() => deleteHandler(index)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
export default Page;
import React, { useState, useEffect } from "react";
import Tag from "./Tag";
import { stack } from "../utils/stackdata";

const getCurrentDateTime = () => {
  const now = new Date();
  console.log("local date string",now.toLocaleString());
  return now.toLocaleString(); 
};

function Taskform({ settaskinfo, editTask, updateTask }) {
  const [taskdata, setTaskdata] = useState({
    task: '',
    status: 'todo',
    tags: [],
    createdAt: '', 
    lastUpdated: '' 
  });

  // Update form when editTask changes
  useEffect(() => {
    if (editTask) {
      setTaskdata(editTask);
    } else {
      // Reset form with empty values and current timestamp for new task
      setTaskdata({
        task: '',
        status: 'todo',
        tags: [],
        createdAt: getCurrentDateTime(),
        lastUpdated: getCurrentDateTime()
      });
    }
  }, [editTask]);

  const selectTag = (tagname) => {
    setTaskdata((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagname) 
        ? prev.tags.filter((item) => item !== tagname)
        : [...prev.tags, tagname]
    }));
  };

  function handleTask(e) {
    setTaskdata((prev) => ({ 
      ...prev, 
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editTask) {
      const updatedTask = {
        ...taskdata,
        lastUpdated: getCurrentDateTime()
      };
      updateTask(updatedTask);
    } else {
      // Create new task with both timestamps
      const newTask = {
        ...taskdata,
        createdAt: getCurrentDateTime(),
        lastUpdated: getCurrentDateTime()
      };
      settaskinfo((prev) => {
        const updatedTasks = [...prev, newTask];
        // Save to localStorage
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        return updatedTasks;
      });
    }
    
    // Reset form
    setTaskdata({
      task: '',
      status: 'todo',
      tags: [],
      createdAt: '',
      lastUpdated: ''
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-2xl mx-auto transform transition-all duration-300 hover:shadow-xl">
      <h1 className="text-2xl font-bold text-gray-700 text-center mb-4">
        {editTask ? 'Edit Task' : 'Add New Task'} - TaskTrek
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Task Input */}
        <div>
          <input
            type="text"
            placeholder="What needs to be done?"
            name="task"
            value={taskdata.task}
            onChange={handleTask}
            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-gray-700 placeholder-gray-400"
            required
          />
        </div>

        {/* Status Selection */}
        <div className="flex flex-wrap items-center gap-4">
          <select 
            name="status" 
            value={taskdata.status}
            onChange={handleTask} 
            className="p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 cursor-pointer transition-all duration-300"
          >
            <option value="todo">To-Do</option>
            <option value="doing">Doing</option>
            <option value="complete">Complete</option>
          </select>

          <button 
            type="submit"
            className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 font-medium"
          >
            {editTask ? 'Update Task' : 'Add Task'}
          </button>
        </div>

        {/* Tags Section */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">Select Tags:</p>
          <div className="flex flex-wrap gap-2">
            {stack.map((data, index) => (
              <Tag 
                techstack={data} 
                key={index} 
                selectechtag={selectTag} 
                selectcolor={taskdata.tags.includes(data.title) ? data.color : "#E5E7EB"} 
              />
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Taskform;


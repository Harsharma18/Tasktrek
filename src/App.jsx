import { useEffect, useState } from "react";
import Taskform from "./components/Taskform";
import TaskInfo from "./components/TaskInfo";
const savedTasks = localStorage.getItem('tasks');
function App() {
  const [taskinfo, settaskinfo] = useState(JSON.parse(savedTasks)|| []);
  const [editTask, setEditTask] = useState(null);
   const handledeletetask = (taskindex)=>{
    settaskinfo(taskinfo.filter((item)=>item.createdAt!=taskindex));

   }
 

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(taskinfo));
  }, [taskinfo]);

  const getISTTimeStamp = () => {
    const now = new Date();
    
    const ISTOffset = 5.5 * 60 * 60 * 1000; 
    const ISTTime = new Date(now.getTime() + ISTOffset);
    
    return ISTTime.toISOString().replace("T", " ").slice(0, 19);
};

console.log(getISTTimeStamp());

console.log("All Tasks:", taskinfo);

// Function to handle editing a task
const handleEditTask = (taskToEdit) => {
  setEditTask(taskToEdit);
};

// Function to update the edited task
const updateTask = (updatedTask) => {
  settaskinfo(prevTasks => 
    prevTasks.map(task => 
      task === editTask ? updatedTask : task
    )
  );
  setEditTask(null); 
};

const taskStatuses = ["Todo", "Doing", "Complete"];

return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 md:p-8">
    {/* Header */}
    <header className="text-center mb-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-2">
        TaskTrek
      </h1>
      <p className="text-gray-600">Manage your tasks efficiently</p>
    </header>

    <div className="max-w-7xl mx-auto">
      {/* Task Form */}
      <div className="mb-8">
        <Taskform 
          settaskinfo={settaskinfo} 
          editTask={editTask}
          updateTask={updateTask}
          deletetask={handledeletetask}
        />
      </div>
      
      {/* Task Columns */}
      <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {taskStatuses.map((status) => (
          <TaskInfo 
            key={status} 
            taskstatus={status} 
            taskinfo={taskinfo}
            onEditTask={handleEditTask} 
            deletetask={handledeletetask}
          />
        ))}
      </main>
    </div>
  </div>
);
}

export default App;

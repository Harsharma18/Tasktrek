import React from "react";
import Taskcard from "./Taskcard";

function TaskInfo({ taskstatus, taskinfo, onEditTask,deletetask }) {
    // Function to get status color
    const getStatusColor = (item) => {
        switch(item.toLowerCase()) {
            case 'todo': return 'bg-violet-50 border-violet-200';
            case 'doing': return 'bg-blue-50 border-blue-200';
            case 'complete': return 'bg-green-50 border-green-200';
            default: return 'bg-gray-50 border-gray-200';
        }
    };

    // Filter tasks for this status
    const filteredTasks = taskinfo.filter(
        (data )=> data.status.toLowerCase() === taskstatus.toLowerCase()
    );

    return (
        <div className={`rounded-xl border-2 ${getStatusColor(taskstatus)} p-4 sm:p-6`}>
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">
                    {taskstatus}
                </h2>
                <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-600 shadow-sm">
                    {filteredTasks.length}
                </span>
            </div>

            {/* Task List */}
            <div className="space-y-4">
                {filteredTasks.map((data) => (
                    <Taskcard 
                        key={data.createdAt} 
                        taskinfo={data} 
                        deletetask={()=>deletetask(data.createdAt)}
                        onEdit={() => onEditTask(data)}
                    />
                ))}
                
                {/* Empty State */}
                {filteredTasks.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No tasks in this status</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default TaskInfo;

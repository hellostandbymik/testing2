"use client"

import { useState, useEffect } from "react"

const Test = ()=>{

    const todoTasks = [
        { id: 1, task:'อ่าน', completed: false},
        { id: 2, task:'คิด', completed: false},
        { id: 3, task:'ทำ', completed: false},
    ]

    const [task, setTask] = useState([])
    const [showAdd, setShowAdd] = useState(false)
    const [newTask, setNewTask] = useState('')

    const handleToggle = (id)=> {   
        
        setTask((prev)=>
            prev.map((item) =>
            item.id === id ? { ...item, completed: item.completed ? false : true } : item
         )
        )

        handleUpdateStorage(id)
    }

    const handleDelete = (id)=> {
        setTask((prev)=>
            prev.filter((item) =>
            item.id != id
        ))
        handleDeleteStorage(id)
    }

    const changeTextNewTask = (e)=>{
        console.log(e.target.value)
        setNewTask(e.target.value)
    }

    const handleUpdateStorage = (id)=>{
        const newData = task.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
        );

        setTask(newData)
        localStorage.setItem("task", JSON.stringify(newData))

        // localStorage.setItem("task", JSON.stringify(task));
    }

    const handleDeleteStorage = (id)=>{
        const newData = []
        task.forEach(item => {
            if (item.id !== id) {
              newData.push(item)
            }
          });
        localStorage.setItem("task", JSON.stringify(newData))
    }

    const handleAdd = ()=>{
        console.log(newTask)
        const text = newTask.trim();

        const lastId = task[task.length - 1].id
        setTask((prev) => [
          ...prev,
          { id: lastId+1, task: text, completed: false },
        ]);
        handleAddLocal(lastId,text)
        setNewTask("");
    }

    const handleAddLocal = (lastId,text)=>{

        localStorage.setItem("task", JSON.stringify([...task,{ id: lastId+1, task: text, completed: false }]));
            // setTask(JSON.parse(taskInlocal));
    }

    const ElementAdd = ()=>{

        return(
            <>
                <input placeholder="เพิ่ม Task ใหม่..." value={newTask} onChange={(e)=>setNewTask(e.target.value)}/>
                <button onClick={handleAdd}>
                บันทึก
                </button> | 
                <button>
                ❌
                </button>
            </>
        )
    }

    // ดึง task localStorage
    useEffect(() => {
        const taskInlocal = localStorage.getItem("task");
        if (taskInlocal) {
          setTask(JSON.parse(taskInlocal));
        }
    }, []);

     // set task localStorage
    useEffect(() => {
        const taskInlocal = localStorage.getItem("task");
        if (!taskInlocal) {
            localStorage.setItem("task", JSON.stringify(todoTasks));
            setTask(todoTasks);
        }
    }, []);


    console.log(task)
    if(!task) return

    return(

        <>
           <h2 className="text-xl font-bold mb-4 text-center"> Todo List</h2>
           {/* <button
            onClick={()=>{setShowAdd(true)}}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
            >
            ➕ Add
            </button> */}
            <ElementAdd/>
            <ul className="space-y-3">
                {task.map((item) => (
                <li
                    key={item.id}
                    className="flex items-center justify-between p-3 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
                >
                    <label className="flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={item.completed}
                        onChange={() => handleToggle(item.id)}
                        className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span
                        className={`ml-3 ${
                        item.completed ? "line-through text-gray-400" : "text-gray-800"
                        }`}
                    >
                        {item.task}
                    </span>
                    </label>
                    <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-700 font-medium"
                    >
                    ✕
                    </button>

                </li>
                ))}
            </ul>
        </>
    )
}

export default Test
import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

function Todo() {
    const [tasks, setTasks] = useState([])

    const [taskInput, setTaskInput] = useState("")

    const [editId, setEditId] = useState("")
    const [editValue, setEditValue] = useState("")

    const getTasks = () => {
        axios.get("http://localhost:3000")
        .then(res => {
            setTasks(res.data)
        })
    }

    useEffect(()=>{
        getTasks()
    }, [])

    const addTask = () => {
        let data = {
            "task": taskInput,
            "isCompleted": false,
            "user": "New user"
        }
        axios.post("http://localhost:3000", {data})
        .then(res => {
            alert("Added successfully")
            getTasks()
        })
        .catch(err => {
            alert("Something went wrong")
        })
    }

    const inputChanged = (event) => {
        setTaskInput(event.target.value)
    }

    const deleteTask = (id) => {
        axios.delete("http://localhost:3000/"+id)
        .then(res => {
            alert("Task deleted")
            getTasks()
        })
        .catch(err => {
            alert("Something went wrong")
        })
    }

    const editTask = (task) => {
        setEditId(task._id)
        setEditValue(task.task)
    }

    const updateTask = () => {
        axios.put("http://localhost:3000/"+editId, {task: editValue})
        .then(res => {
            alert("Updated")
            setEditId("")
            setEditValue("")
            getTasks()
        })
    }

    return (
        <>
            <h1>Todo App</h1>
            <input type = "text" onChange={inputChanged}/>
            <button onClick = {addTask}>Add task</button>

            <ul>
                {tasks.map((task, index) => {
                    return (
                        <>
                            {editId == task._id
                                ?<>
                                    <input type='text' value = {editValue} onChange = {(event)=> setEditValue(event.target.value)}/><button onClick = {updateTask}>Save</button>
                                </>
                                :<li key = {index}>{task.task} <button onClick={()=>deleteTask(task._id)}>Delete</button> <button onClick={()=>editTask(task)}>Edit</button></li>

                            }
                        </>
                    )
                })}
            </ul>
        </>
    )
}

export default Todo
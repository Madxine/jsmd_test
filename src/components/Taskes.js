import { hover } from '@testing-library/user-event/dist/hover';
import React from 'react';
import { useState, useEffect } from 'react';

const LOCAL_KEY = "jsmd_test.tasks";

function Taskes() {
        const [tasks, setTasks] = useState([]);
        const [title, setTitle] = useState("");
        const [dueDate, setDueDate] = useState("");
    
        useEffect(() => {
            const stored = localStorage.getItem(LOCAL_KEY);
            if (stored) setTasks(JSON.parse(stored));
        }, []);
    
        useEffect(() => {
            localStorage.setItem(LOCAL_KEY, JSON.stringify(tasks));
        }, [tasks]);
    
        //Frage 1 : Aufgabe mit Title und Fällichkeitsdatum hinzufügen
        const addTask = () => {
            if (!title || !dueDate) return;
    
            const newTask = {
                id: Date.now(),
                title,
                dueDate,
            };
    
            setTasks([...tasks, newTask]);
            setTitle("");
            setDueDate("");
        };
    
        const isOverdue = (date) => {
            const today = new Date();    //Heute
            today.setHours(0, 0, 0, 0); 
            const due = new Date(date);  //task.dueDate
            due.setHours(0, 0, 0, 0); 
            return due < today;
        };

  return (
    <div style={{ padding: "20px" }}>
    <h1>To-do Liste (ohne Backend)</h1>
    <input
        type="text"
        placeholder="Titel"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
    />
    <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
    />
    <button onClick={addTask}>Hinzufügen</button>
    <p style={{visibility:"hidden"}}>Frage 2 : Alle gespeicherten Aufgaben anzeigen</p>
    <p style={{visibility:"hidden"}}>Frage 3 : Aufgaben als „überfällig“ kennzeichnen, wenn das Fälligkeitsdatum vor dem aktuellen Datum liegt</p>
    <ul>
        {tasks.map((task) => (
            <li key={task.id}>
                {task.title} (Fällig: {task.dueDate}){" "}
                {isOverdue(task.dueDate) ? "❗ Überfällig" : "✅"}
            </li>
        ))}
    </ul>
</div>
  )
}

export default Taskes
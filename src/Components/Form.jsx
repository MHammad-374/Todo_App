import React, { useState, useEffect } from 'react'
import './Form.css'

function Form() {
    useEffect(() => {
        const storedArray = localStorage.getItem('myArray');
        if (storedArray) {
            setTodoArr(JSON.parse(storedArray));
        }
    }, []);


    const [todoArr, setTodoArr] = useState([]);
    const [todoInput, setTodoInput] = useState('')

    let todoVar;
    let handleOnChange = (e) => {
        todoVar = e.target.value;
        setTodoInput(todoVar)
    }

    let newArr;
    let saveTodo = () => {
        if (todoInput.trim() !== '') {
            let newTodo = {
                id: (todoArr.length) + 1,
                title: todoInput
            }
            newArr = [...todoArr, newTodo]
            setTodoArr(newArr);
        }
        localStorage.setItem('myArray', JSON.stringify(newArr));
        setTodoInput('')
    }


    let deleteTodo = (elem) => {
        let filteredArr = todoArr.filter(e => {
            return e.id !== elem.id
        })
        // console.log(filteredArr)
        setTodoArr(filteredArr)
        localStorage.setItem('myArray', JSON.stringify(filteredArr));
    }
    let editTodo = (elem) => {
        let filterArr = todoArr.filter(e => {
            return e.id !== elem.id
        })

        setTodoArr(filterArr)
        setTodoInput(elem.title)
    }

    

    return (
        <>
            <div className='form'>
                <input className='enterTodo' type="text" value={todoInput} onChange={handleOnChange} placeholder='Enter Todo...' />
                <button
                    type="button"
                    onClick={saveTodo}
                    className="saveBtn btn btn-primary">Save</button>
            </div>
            <h2>Your Todos</h2>
            <div className='todoSection'>
                {(todoArr.length > 0) ? (
                    todoArr.map((todo, index) => {
                        return (
                            <div className="todoBox" key={todo.title}>
                                <input
                                    className='check'
                                    type="checkbox"
                                />
                                <div className="title">{todo.title}</div>
                                <button className="edit" onClick={() => editTodo(todo)}>Edit</button>
                                <button className="delete" onClick={() => deleteTodo(todo)}>
                                    <svg className="icon" width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <h5>No Todos to display.</h5>
                )}
            </div>
        </>

    )
}

export default Form

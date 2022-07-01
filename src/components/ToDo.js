import { useState, useEffect } from 'react';
import axios from 'axios';
import { BiEdit } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
const ToDo = () => {
    const [todoText, setTodoText] = useState('');
    const [todoList, setTodoList] = useState([]);
    const [isUpdating, setIsUpdating] = useState('');
    const [updateTodoText, setUpdateTodoText] = useState('');

    const addItem = async (e) => {
        e.preventDefault();
        const todo = {
            item: todoText
        }
        console.log(todo)
        try {
            const res = await axios.put('http://localhost:5000/',
                todo)
                setTodoList(prev => [...prev, res.data]);
            setTodoText('');
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getItemsList = async () => {
            try {
                const res = await axios.get('http://localhost:5000/')
                setTodoList(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getItemsList()
    }, []);


    const deleteItem = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/${id}`)
            const newListItems = todoList.filter(item => item._id !== id);
            setTodoList(newListItems);
        } catch (err) {
            console.log(err);
        }
    }

    const updateItem = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:5000/${isUpdating}`, { item: updateTodoText })
            console.log(res.data)
            const updatedItemIndex = todoList.findIndex(item => item._id === isUpdating);
            const updatedItem = todoList[updatedItemIndex].item = updateTodoText;
            setUpdateTodoText('');
            setIsUpdating('');
        } catch (err) {
            console.log(err);
        }
    }

    const updateTodohandle = () => (
        <form className="p-4 flex shadow-lg border mb-6" onSubmit={(e) => { updateItem(e) }} >
            <label>
                <input type="checkbox" class="checkbox" />
            </label>
            <input className="input input-bordered w-full ml-4" type="text" placeholder="New Item" onChange={e => { setUpdateTodoText(e.target.value) }} value={updateTodoText} />
            <button className="btn ml-4 bg-indigo-700" type="submit">Update</button>
        </form>
    )

    const updateTodo = (todo) => {
        const data = { id: todo._id, done: !todo.done };
        axios.post('http://localhost:5000/', data)
            .then(() => {
                const newTodos = todoList.map(t => {
                    if (t._id === todo._id) {
                        t.done = !t.done;
                    }
                    return t;
                });
                console.log(newTodos)
                setTodoList([...newTodos]);
            });
    }



    return (
        <div className='mx-auto mt-12 w-[400px] lg:w-[800px] lg:px-24 '>
            <h1 className='text-xl font-bold capitalize mb-6 text-center'>Todo List</h1>
            <form className="mx-auto block lg:flex" onSubmit={e => addItem(e)}>
                <input type="text" className='input input-bordered w-full mb-6 lg:mb-0' placeholder='Add Todo Item' onChange={e => { setTodoText(e.target.value) }} value={todoText} />
            </form>
            <div className="overflow-x-auto mx-auto mt-12">
                {
                    todoList.map((todo) => (
                        <div className="">
                            {
                                isUpdating === todo._id
                                    ? updateTodohandle()
                                    :
                                    <div className='flex justify-between p-5 shadow-lg border mb-6'>
                                        <div className='flex'>
                                            <label>
                                                <input type={'checkbox'}
                                                    checked={todo.done}
                                                    onClick={() => updateTodo(todo)}
                                                />
                                            </label>
                                            <p className="item-content ml-4 capitalize"> {todo.done ? <del>{todo.item}</del> : todo.item}</p>
                                        </div>
                                        <div className='ml-8'><button className="text-2xl" onClick={() => { setIsUpdating(todo._id) }}>{todo.done ? '' :<BiEdit />}</button>
                                            <button className="ml-4 text-2xl" onClick={() => { deleteItem(todo._id) }}><RiDeleteBin5Line /></button>
                                        </div>
                                    </div>
                            }
                        </div>
                    ))
                }

            </div>
        </div>
    );
}

export default ToDo;
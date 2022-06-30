import { useState, useEffect } from 'react';
import axios from 'axios';

function ToDo() {
    const [itemText, setItemText] = useState('');
    const [newDate, setNewDate] = useState('');
    const [listItems, setListItems] = useState([]);
    const [isUpdating, setIsUpdating] = useState('');
    const [updateItemText, setUpdateItemText] = useState('');


    const addItem = async (e) => {
        e.preventDefault();
        const todo = {
            item: itemText,
            date: newDate,

        }
        console.log(todo)
        try {
            const res = await axios.post('http://localhost:5000/',
            todo)
            setListItems(prev => [...prev, res.data]);
            setItemText('');
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const getItemsList = async () => {
            try {
                const res = await axios.get('http://localhost:5000/')
                setListItems(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        getItemsList()
    }, []);


    const deleteItem = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/${id}`)
            const newListItems = listItems.filter(item => item._id !== id);
            setListItems(newListItems);
        } catch (err) {
            console.log(err);
        }
    }

    const updateItem = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.put(`http://localhost:5000/${isUpdating}`, { item: updateItemText })
            console.log(res.data)
            const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
            const updatedItem = listItems[updatedItemIndex].item = updateItemText;
            setUpdateItemText('');
            setIsUpdating('');
        } catch (err) {
            console.log(err);
        }
    }

    const updateTodohandle = () => (
        <form className="p-4" onSubmit={(e) => { updateItem(e) }} >
            <label>
                <input type="checkbox" class="checkbox" />
            </label>
            <input className="input input-bordered w-full max-w-xs ml-4" type="text" placeholder="New Item" onChange={e => { setUpdateItemText(e.target.value) }} value={updateItemText} />
            <button className="btn ml-4" type="submit">Update</button>
        </form>
    )

    return (
        <div className="App">
            <h1 className='text-xl font-bold capitalize mt-12 mb-6'>Todo List</h1>
            <form className="form" onSubmit={e => addItem(e)}>
                <input type="text" className='input input-bordered w-full max-w-xs' placeholder='Add Todo Item' onChange={e => { setItemText(e.target.value) }} value={itemText} />
                <input type="date" className='input input-bordered w-full max-w-xs'  onChange={e => { setNewDate(e.target.value) }} value={newDate} />
                <button className='px-6 py-2.5 ml-2 rounded-lg bg-green-500 text-white font-bold' type="submit">Add</button>
            </form>
            <div className="overflow-x-auto mx-auto mt-12 w-[400px] lg:w-[1000px] lg:px-24">
                <table class="table w-full">
                    <thead>
                        <th className='grid grid-cols-3 gap-12'>
                            <span className='ml-12 col-span-2'>Name</span>
                            <div>
                                <span className='ml-8'>Update</span>
                                <span className='ml-8'>Delete</span>
                            </div>
                        </th>
                    </thead>
                    <tbody>
                        {
                            listItems.map(item => (
                                <div className="todo-item">
                                    {
                                        isUpdating === item._id
                                            ? updateTodohandle()
                                            : <tr className='grid grid-cols-3 gap-6'>
                                                <td className='flex col-span-2'>
                                                    <label>
                                                        <input type="checkbox" class="checkbox" />
                                                    </label>
                                                    <p className="item-content ml-4">{item.item}</p>
                                                    <p>{item.date}</p>
                                                </td>
                                                <td className='ml-8'><button className="update-item" onClick={() => { setIsUpdating(item._id) }}>Update</button>
                                                    <button className="ml-4" onClick={() => { deleteItem(item._id) }}>Delete</button></td>
                                            </tr>
                                    }
                                </div>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default ToDo;
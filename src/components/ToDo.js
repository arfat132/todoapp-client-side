import { useState } from 'react';
import axios from 'axios';

function ToDo() {
    const [itemText, setItemText] = useState('');
    const [listItems, setListItems] = useState([]);
    const [isUpdating, setIsUpdating] = useState('');

    //add new todo item to database
    const addItem = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/', { item: itemText })
            setListItems(prev => [...prev, res.data]);
            setItemText('');
        } catch (err) {
            console.log(err);
        }
    }



  
   

    return (
        <div className="App">
            <h1 className='text-xl font-bold capitalize mt-12 mb-6'>Todo List</h1>
            <form className="form" onSubmit={e => addItem(e)}>
                <input type="text" className='input input-bordered w-full max-w-xs' placeholder='Add Todo Item' onChange={e => { setItemText(e.target.value) }} value={itemText} />
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
                                    { <tr className='grid grid-cols-3 gap-6'>
                                                <td className='flex col-span-2'>
                                                    <label>
                                                        <input type="checkbox" class="checkbox" />
                                                    </label>
                                                    <p className="item-content ml-4">{item.item}</p>
                                                </td>
                                                <td className='ml-8'><button className="update-item" onClick={() => { setIsUpdating(item._id) }}>Update</button>
                                                <button className="ml-4">Delete</button></td>
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
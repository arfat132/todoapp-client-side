import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CompletedTask = () => {
    const [listItems, setListItems] = useState([]);

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


    return (
        <div>
            <div className="overflow-x-auto mx-auto mt-12 w-[400px] lg:w-[900px] ">
                <table class="table w-full">
                    <thead>
                        <th className='grid grid-cols-2 gap-12'>
                            <span className=''>Name</span>
                            <span className=''>Time</span>
                        </th>
                    </thead>
                    <tbody>
                        {
                            listItems.map((item, index) => (
                                <div className="todo-item">
                                    {<tr className='grid grid-cols-4 gap-6'>
                                        <td className='flex col-span-2'>
                                            <p className="item-content ml-4">{item.item}</p>
                                        </td>
                                        <td> <p>{item.date}</p></td>

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
};

export default CompletedTask;
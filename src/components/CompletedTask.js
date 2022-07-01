import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CompletedTask = () => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        const getItemsList = async () => {
            try {
                const res = await axios.get('http://localhost:5000/')
                setTodoList(res.data.filter(d => d.done === true));
            } catch (err) {
                console.log(err);
            }
        }
        getItemsList()
    }, []);



    return (
        <div className=" mx-auto mt-12 px-90 w-[400px] lg:w-[800px] lg:px-24 ">
            <h1 className='text-2xl font-bold my-6 text-center'>Completed Task </h1>
            {
                todoList.map((item) => (
                    <div className="">
                        {<div className='p-5 shadow-lg border mb-6'>
                            <div className='flex justify-between'>
                                <p className="item-content ml-4 capitalize">{item.item}</p>
                                <p className="item-content ml-4 capitalize">Completed</p>
                            </div>
                        </div>
                        }
                    </div>
                ))
            }

        </div>
    );
};

export default CompletedTask;
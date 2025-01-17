import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addLists, fetchLists } from '../feature/todoSlice'

function Addtodo({ closeForm }) {
    const dispatch = useDispatch()
    const [text, setText] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const saveLists = async() => {
       
        if (text) {
            dispatch(addLists(text)).then(() => {
              dispatch(fetchLists());
              closeForm();
            });
          }
    }
    return (
        <div className='flex justify-center sm:items-center bg-white px-10 py-10 h-full'>

            <div className='px-5 py-4 w-full sm:w-3/5 bg-gray-200 rounded '>
                <h2 className='mb-4 font-semibold text-xl text-center'>Add Todo</h2>
                <form onSubmit={handleSubmit} className='sm:w-full items-center'>
                    <input className='w-full h-10 border border-blue-500 outline-none px-2 hover:scale-105 hover:transition-all ease-in-out duration-500' type='text' placeholder="Enter a new todo" onChange={(e) => setText(e.target.value)} />
                    <div className='flex justify-between'>
                        <button className='mt-10 bg-blue-500 px-4 py-2 rounded text-white sm:font-semibold hover:scale-105 sm:hover:bg-blue-600 sm:hover:transition-all ease-in-out duration-500' onClick={saveLists}>Save</button>
                        <button className='mt-10 bg-red-500 px-4 py-2 rounded text-white sm:font-semibold hover:scale-105 sm:hover:bg-red-600 sm:hover:transition-all ease-in-out duration-500' onClick={closeForm}>Cancel</button>
                    </div>
                </form>
            </div>

        </div>
    )
}

export default Addtodo
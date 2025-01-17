import React, { useEffect, useState } from 'react'
import { fetchLists, addLists, deleteLists, updateLists, isCompleted } from '../feature/todoSlice'
import { useSelector, useDispatch } from 'react-redux';
import Addtodo from './Addtodo';
import Updatetodo from './Updatetodo';
const Alltodo = () => {
  const { lists } = useSelector((state) => state.todo)
  const dispatch = useDispatch();
  const [addForm, setAddForm] = useState(false)
  const [updateForm, setUpdateForm] = useState(false)
  const [currentTodo, setCurrentTodo] = useState('')

  const addTodo = async() => {
    setAddForm(true)
    setUpdateForm(false)
  }

  const closeForm = () => {
    setAddForm(false)
    setUpdateForm(false)
  }
  
  const deleteList = (id) => {
     dispatch(deleteLists(id)).then(()=> {
      dispatch(fetchLists())
     })
  }

  const updateTask = (list)=> {
   setUpdateForm(true)
   setAddForm(false)
   setCurrentTodo(list)
  }

  const isCompletedTodo = (todo_id) => {
  dispatch(isCompleted({id:todo_id})).then(()=> {
    dispatch(fetchLists())
  })
  }

  useEffect(() => {
    dispatch(fetchLists())
  }, [dispatch]) 
  console.log('list is ',lists.length)
  return (
    <div className="flex bg-gray-200 justify-center sm:px-20 h-screen py-2">
      <div className='flex flex-col w-full sm:w-3/5 bg-gray-100 px-3 py-3 rounded sm:h-full'>
        {
          addForm ? <Addtodo closeForm={closeForm} /> :
          updateForm ? <Updatetodo closeForm = {closeForm} currentTodo={currentTodo} /> :
            <div className='flex flex-col bg-white px-10 py-10 h-full'>
              <h1 className='text-2xl font-bold text-center mb-2'>Todo Lists</h1>
              <div className='flex justify-end'>
                <button onClick={() => addTodo()} className='bg-green-600 px-5 py-1 sm:px-10 sm:py-2 justify-items-end rounded text-white text-lg font-medium hover:scale-110 transform transition-transform duration-300 active:bg-green-500'>Add</button>
              </div>
              <ul className='flex flex-col mt-4 overflow-auto'>
                {
                  lists.length === 0 ?
                  <p className='text-xl text-center mt-2'>No task available</p>:
                  
                  lists.map((list) => (
                    <li className='flex justify-between items-center'>
                      <div className='flex'>
                        <input type="checkbox" onChange={()=> isCompletedTodo(list.todo_id)} checked = {list.completed} />
                        <p className={`ml-1 font-light text-sm sm:text-lg ${list.completed? "line-through":""}`}>{list.description}</p>
                      </div>
                      <div className='flex'>
                        <button onClick={()=>deleteList(list.todo_id)} className='mx-2 my-2 text-sm sm:text-lg bg-red-600 px-3 py-1 rounded hover:scale-105 active:bg-red-700'>Delete</button>
                        <button onClick={()=> updateTask(list)} className='mx-2 my-2 text-sm sm:text-lg bg-yellow-300 px-3 py-1 rounded hover:scale-105 active:bg-yellow-400'>Update</button>
                      </div>
                    </li>
                  ))
                }

              </ul>
            </div>

        }

      </div>

    </div>
  )
}

export default Alltodo
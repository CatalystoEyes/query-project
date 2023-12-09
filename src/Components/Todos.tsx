import { FC, useState, SyntheticEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Check from './Check'
import { Link } from 'react-router-dom'
import { IoArrowBackCircle } from "react-icons/io5";


  const Todos: FC = () => {
    const [title, setTitle] = useState('')

    const submitHandler = (e: SyntheticEvent) => {
      e.preventDefault()
      console.log(title)
      setTitle("")
      axios.post('https://jsonplaceholder.typicode.com/todos/', {
        title,
        userId: 1,
        completed: false
      })
      alert("The request was successfully sent to the server.")
    }
    const { status, data, error } = useQuery({
      queryKey: ['todos'],
      queryFn: async () => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos/', {
          params: {
            _limit: 5
          }
        });
        return res.data
      },
    })

  if (status === 'pending') return <h1 className='text-slate-100 text-center mt-5'>Loading...</h1>
  if (status === 'error') return <span className='text-slate-100 text-center mt-5'>Error: {error.message}</span>

    return (
      <>
      <div className='text-slate-100 text-xl mt-3'><Link className="text-white flex ml-3 text-lg transition-all hover:text-indigo-200" to={"/home"}>
                    <IoArrowBackCircle />
                    Go back
                </Link></div>
      <h1 className='text-slate-100 text-center text-3xl'>Todos:</h1>
      <form className='mt-5'>
        <input
          placeholder="Enter something"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border-2 rounded-lg bg-inherit px-4 py-1 outline-none text-slate-100 ml-3 mb-1'
        />
        <button onClick={submitHandler} className='bg-stone-700 px-2 py-1 ml-2 rounded-md text-slate-100 border-2 border-slate-200 hover:bg-slate-100 hover:text-stone-700' >Submit</button>
      </form>
      <>
      <div className='flex text-lg ml-3'> 
            <ul>
              {data?.map((todo: { id: number; title: string}) => (
                <div key={todo.id} style={{display: 'flex'}} className='text-slate-100 my-1'>
                  
                  <Check />
                  <li key={todo.id} style={{listStyleType: 'none', display: 'flex'}}>Todo: {todo.title}</li>
                </div>))}
            </ul>
        </div></>
        <div>
        
      </div>
        </>
    );
}

export default Todos;

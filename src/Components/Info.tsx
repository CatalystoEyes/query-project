import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoArrowBackCircle } from "react-icons/io5";

const Info = () => {
    const { isPending, error, data, isFetching } = useQuery({
        queryKey: ['repoData'],
        queryFn: () =>
          axios
            .get('https://api.github.com/repos/tannerlinsley/react-query')
            .then((res) => res.data),
      })

    if (isPending) return <div className='text-3xl text-slate-100 text-center mt-2'>Loading...</div>

    if (error) return <div className='text-3xl text-slate-100 mt-2'>An error has occurred: {error.message}</div>

    return (
        <div>
      <div className='text-slate-100 text-xl'><Link className="text-white  mt-3 flex ml-3 text-lg transition-all hover:text-indigo-200" to={"/home"}>
                    <IoArrowBackCircle />
                    Go back
                </Link></div>  
      <h1 className='text-slate-100 text-center text-3xl'>{data.name}</h1>
      <p className='text-center text-xl text-slate-100 mt-4'>{data.description}</p>
      <div className='text-slate-100 flex justify-center mt-2'>
        <strong className='mx-2'>👀 {data.subscribers_count}</strong>{' '}
        <strong className='mx-2'>✨ {data.stargazers_count}</strong>{' '}
        <strong className='mx-2'>🍴 {data.forks_count}</strong>
      </div>
      <div className='text-slate-100 text-center'>{isFetching ? 'Updating...' : ''}</div>
    </div>
    )
}

export default Info

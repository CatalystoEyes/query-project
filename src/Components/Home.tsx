import { Link } from 'react-router-dom'

const Home = () => {
    return (
      <>
        <div className="flex flex-col justify-center items-center h-screen text-slate-100">
          <h1 className="text-3xl mr-3">✨React Query</h1>
          <div className="flex justify-center text-xl mt-2">
          <div className="hover:underline hover:decoration-indigo-500 mx-2">
            <Link to={'/todos'}>Todos</Link>
          </div>
          <div className="hover:underline hover:decoration-pink-500 mx-2">
            <Link to={'/info'}>TanStack Query</Link>
          </div>
          <div className="hover:underline hover:decoration-green-500 mx-2">
            <Link to={'/posts'}>Posts</Link>
          </div>
          </div>
        </div>
      </>
    )
  }
  
export default Home
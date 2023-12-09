import { Link } from 'react-router-dom'
import { IoArrowBackCircle } from "react-icons/io5";
import {QueryClient, QueryClientProvider, useQuery, useQueryClient, QueryFunctionContext } from '@tanstack/react-query'
import axios from 'axios';
import {Dispatch, SetStateAction, useState} from 'react'

const defaultQueryFn = async ({ queryKey }: QueryFunctionContext) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com${queryKey[0]}`,
  )
  return data
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
})

const Pages = () => {
  const [postId, setPostId] = useState(-1)
  return (
    <>
    <QueryClientProvider client={queryClient}>

        {postId > -1 ? (
        <Post postId={postId} setPostId={setPostId} />
      ) : (
        <Posts setPostId={setPostId} />
      )}
    </QueryClientProvider>
    </>
  )
}


function Posts({ setPostId }: { setPostId: Dispatch<SetStateAction<number>> }) {
  const queryClient = useQueryClient()

  const { status, data, error, isFetching } = useQuery<Post[]>({
    queryKey: ['/posts'],
  })

  return (
    <div>
      <div className='text-slate-100 text-lg mt-3'>
        <Link className="flex ml-3 transition-all hover:text-indigo-200" to={"/home"}>
          <IoArrowBackCircle />Go back</Link></div>
        <h1 className="text-slate-100 text-center text-4xl mt-2">Posts</h1>
      <div>
        {status === 'pending' ? (
          <div className='text-slate-100 text-2xl mt-3 text-center'>Loading...</div>
        ) : status === 'error' ? (
          <div className='text-slate-100 text-xl mt-3'>Error: {error.message}</div>
        ) : (
          <>
            <div className='mt-6 mb-4'>
              {data.map((post) => (
                <p key={post.id} className='my-2 text-center text-slate-100'>
                <a className='hover:text-indigo-400 text-lg'
                    onClick={() => setPostId(post.id)}
                    href="#"
                    style={
                      queryClient.getQueryData(['post', post.id])
                        ? {
                            fontWeight: 'bold',
                            color: 'green',
                          }
                        : {}
                    }
                  >
                    {post.title}
                  </a>
                </p>
              ))}
            </div>
            <div>{isFetching ? 'Background Updating...' : ' '}</div>
          </>
        )}
      </div>
    </div>
  )
}

function Post({ postId, setPostId }: { setPostId: Dispatch<SetStateAction<number>>, postId: Dispatch<SetStateAction<number>> }) {
  const { status, data, error, isFetching } = useQuery({
    queryKey: [`/posts/${postId}`],
    enabled: !!postId,
  })

  return (
    <div>
      <div className='text-slate-100 text-lg mt-3 flex'>
          <a onClick={() => setPostId(-1)} href="#" className='flex hover:text-indigo-200'>
          <IoArrowBackCircle />Go back
        </a>
      </div>
      {!postId || status === 'pending' ? (
        <div className='text-center text-slate-100 text-3xl'>Loading...</div>
      ) : status === 'error' ? (
        <div className='text-center text-slate-100 text-3xl'>Error: {error.message}</div>
      ) : (
        <>
          <h1 className='text-slate-100 text-3xl text-center mt-3'>{data.title}</h1>
          <div className='text-slate-100 text-center text-lg mt-3'>
            <p>{data.body}</p>
          </div>
          <div className='text-slate-100 text-lg text-center'>{isFetching ? 'Background Updating...' : ' '}</div>
        </>
      )}
    </div>
  )
}

export default Pages

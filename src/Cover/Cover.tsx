import { FC, PropsWithChildren } from 'react'

const Cover: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className='bg-zinc-900 h-screen overflow-y-auto'>
      {children}
    </div>
  )
}

export default Cover

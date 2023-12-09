import Todos from './Components/Todos.tsx'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from './Components/Home.tsx'
import Info from './Components/Info.tsx'
import Posts from './Components/Posts.tsx'

const General = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Navigate to="/home"/>}/>
            <Route path="/home" element={<Home />} />
            <Route path="/todos" element={<Todos />} />
            <Route path="/info" element={<Info />} />
            <Route path="/posts" element={<Posts />} />
            <Route />
        </Routes>
    </BrowserRouter>
  )
}

export default General


import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './components/login'
import Home from './components/Home/Home'
import ProtectRoutes from './components/ProtectRoutes/ProtectedRoutes'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route element={<ProtectRoutes/>}>
          <Route path='/home' element={<Home />} />

        </Route>
      </Routes>
      <div>

      </div>
    </>
  )
}

export default App


import './App.css'
import { Routes,Route } from 'react-router-dom'
import Login from './components/login'
import Home from './components/Home/Home'
function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route  element={<ProtectRoutes/>}>

      </Route>
    </Routes>
    </>
  )
}

export default App

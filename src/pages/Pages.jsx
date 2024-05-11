import Home from "./Home"
import {Route, Routes} from 'react-router-dom'
import Cuisines from './Cuisines.jsx'
import Searched from "./Searched"
import Recipe from "./Recipe"
function Pages() {
  return (
    <>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='/cuisines/:type' element={<Cuisines/>}/>
        <Route path='/searched/:item' element={<Searched/>}/>
        <Route path='/recipe/:dishId' element={<Recipe/>}/>
      </Routes>
    </>
  )
}

export default Pages
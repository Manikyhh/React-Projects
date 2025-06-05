
import react from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Create from './components/create'
import Update from "./components/Update";
import Read from "./components/Read";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} ></Route>
      <Route path='/create' element={<Create />} ></Route>
      <Route path='/update/:id' element={<Update />} ></Route>
      <Route path='/read/:id' element={<Read />} ></Route>

    </Routes>
    </BrowserRouter>
 
  );
}

export default App;

// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import ForkliftForm from './component/forklift_form';
import ForkliftGrid from './component/forklift_grid';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route exact path='/grid' element={<ForkliftGrid/>}></Route>
        <Route path='/form' element={<ForkliftForm />}></Route>
        <Route path='/form/:id' element={<ForkliftForm />}></Route>
        <Route path='/form/:view/:id' element={<ForkliftForm />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App;

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Board from './pages/Board';
import Nav from './pages/Nav';
import BoardCreate from './pages/BoardCreate';
import BoardDetail from './pages/BoardDetail';

function App() {
    return (
        <BrowserRouter>
            <Nav/>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/login' element={<Login />}/>
                <Route path='/signUp' element={<SignUp />}/>
                <Route path='/board' element={<Board />}/>
                <Route path='/boardCreate' element={<BoardCreate />}/>
                <Route path='/boardDetail/:id' element={<BoardDetail />}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

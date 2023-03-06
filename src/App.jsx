import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Nav from "./pages/Nav";
import React, { Suspense } from "react";
import PageLoading from "./components/PageLoading";
import axios from "axios";

//전역으로 쿠키를 주고 받을 수 있게 설정
axios.defaults.withCredentials = true;

const App = () => {
  const Home = React.lazy(() => import("./pages/Home"));
  const MyPage = React.lazy(() => import("./pages/MyPage"));
  const Login = React.lazy(() => import("./pages/Login"));
  const SignUp = React.lazy(() => import("./pages/SignUp"));
  const Board = React.lazy(() => import("./pages/Board"));
  const BoardCreate = React.lazy(() => import("./pages/BoardCreate"));
  const BoardDetail = React.lazy(() => import("./pages/BoardDetail"));
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoading />}>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/board" element={<Board />} />
          <Route path="/boardDetail/:id" element={<BoardDetail />} />
          <Route path="/boardCreate" element={<BoardCreate />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./css/App.css";
import Nav from "./components/common/Nav";
import React, { Suspense } from "react";
import PageLoading from "./components/common/PageLoading";
import axios from "axios";
import Edit from "./pages/Edit";

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
          <Route path="/myPage/:id" element={<MyPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/edit" element={<Edit />} />
          <Route path="/board" element={<Board />} />
          <Route path="/boardDetail/:id" element={<BoardDetail />} />
          <Route path="/boardCreate" element={<BoardCreate />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;

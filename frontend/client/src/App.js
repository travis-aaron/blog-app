import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "features/user";

import HomePage from "containers/HomePage";
import LoginPage from "containers/Login";
import RegisterPage from "containers/RegisterPage";
import Detail from "containers/Detail";


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  return (  

    <Router>
      <Routes>
        <Route path="/" element={<HomePage/>} exact />
        <Route path="/detail/:slug" element={<Detail />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </Router>

  );
};

export default App;

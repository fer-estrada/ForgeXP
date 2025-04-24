import { Routes, Route } from "react-router-dom";
import { useState } from "react";

import Layout from "./components/Layout";
import Homepage from "./components/HomePage/Homepage";
import AllGames from "./components/Games/AllGames";
import SingleGame from "./components/Games/SingleGame";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account/Account";
import Community from "./components/Community/Community";
import Uploads from "./components/Account/Uploads";
import CreatePost from "./components//Community/CreatePost";
import SingleUser from "./components/SingleUser/SingleUser";
import SinglePost from "./components/Community/SinglePost"

function App() {
  const [token, setToken] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
        <Route path="login" element={<Login setToken={setToken} />} />
        <Route
          path="register"
          element={<Register setToken={setToken} token={token} />}
        />
        <Route path="all-games" element={<AllGames />} />
        <Route path="games/:id" element={<SingleGame />} />
        <Route path="account" element={<Account />} />
        <Route path="community" element={<Community />} />
        <Route path="createpost" element={<CreatePost />} />
        <Route path="uploads" element={<Uploads />} />
        <Route path="user/:id" element={<SingleUser />} />
        <Route path="single/:id" element={<SinglePost />} />
      </Route>
    </Routes>
  );
}

export default App;

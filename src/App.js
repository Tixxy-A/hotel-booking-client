import React from "react";
import { Routes, Route } from 'react-router-dom';
import Layout from "./component/Layout";
import Indexpage from "./pages/Indexpage";
import Loginpage from "./pages/Loginpage";
import Registerpage from "./pages/Registerpage";
import { UserContextProvider } from "./context/Ursecontext";
import Account from "./pages/Account";
import Singlepage from "./pages/Singlepage";
import axios from "axios";

axios.defaults.withCredentials=true;

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Indexpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/account/:subpage?" element={<Account />} />
          <Route path="/account/:subpage/:action" element={<Account />} />
          <Route path="place/:id" element={<Singlepage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}
export default App;
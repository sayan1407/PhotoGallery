
import {  Route,Routes} from "react-router";
import Home from "./Home";
import Register from "./Register";
import Header from './Header';
import Login from "./Login";

function App() {
  return (
    <div>
      <Header/>
      <Routes>
          <Route path="/" element={<Home/>}></Route>
           <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
        </Routes>
    </div>
  );
}

export default App;

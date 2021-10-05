import { BrowserRouter, Route } from "react-router-dom";
import Home from "./Screens/Home";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/">
          <Home></Home>
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;

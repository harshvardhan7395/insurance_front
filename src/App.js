import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Customer from "./components/Customer";
import Dashboard from "./components/dashboard";
import EditPolicy from "./components/EditPolicy";
import Login from "./components/Login";
import Policies from "./components/Policies";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/policy/edit" exact component={EditPolicy} />
          <Route path="/customer" exact component={Customer} />
          <Route path="/policies" exact component={Policies} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/" exact component={Login} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

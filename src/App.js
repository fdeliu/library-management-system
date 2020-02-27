import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "materialize-css/dist/css/materialize.min.css";
import "./App.css";
import { AuthProvider } from "./context/Auth";

import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import BookDetails from "./components/BookDetails";
import AddBook from "./components/AddBook";
import Footer from "./components/Footer";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Switch>
          <Fragment>
            <div className="content">
              <Route exact path="/" component={Login} />
              <Route exact path="/books" component={Dashboard} />
              <Route exact path="/book/:id" component={BookDetails} />
              <Route exact path="/add/book" component={AddBook} />
            </div>
          </Fragment>
        </Switch>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;

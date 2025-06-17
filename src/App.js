import React, { Component } from "react";
import PhotoContextProvider from "./context/PhotoContext";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Item from "./components/Item";
import Search from "./components/Search";
import NotFound from "./components/NotFound";
import {withLDProvider} from "launchdarkly-react-client-sdk";
import Observability from '@launchdarkly/observability';

class App extends Component {
  // Prevent page reload, clear input, set URL and push history on submit
  handleSubmit = (e, history, searchInput, pageNumber) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${searchInput}`;
    history.push(url);
  };

  render() {
    return (
      <PhotoContextProvider>
        <HashRouter basename="/SnapScout">
          <div className="container">
            <Route
              render={props => (
                <Header
                  handleSubmit={this.handleSubmit}
                  history={props.history}
                />
              )}
            />
            <Switch>
              <Route
                exact
                path="/"
                render={() => <Redirect to="/mountain" />}
              />

              <Route
                path="/mountain"
                render={() => <Item searchTerm="mountain" />}
              />
              <Route path="/beach" render={() => <Item searchTerm="beach" />} />
              <Route path="/bird" render={() => <Item searchTerm="bird" />} />
              <Route path="/food" render={() => <Item searchTerm="food" />} />
              <Route
                path="/search/:searchInput"
                render={props => (
                  <Search searchTerm={props.match.params.searchInput} />
                )}
              />
              <Route component={NotFound} />
            </Switch>
          </div>
        </HashRouter>
      </PhotoContextProvider>
    );
  }
}

const LaunchDarklyContainer = () => {
  
  const LDProvider = withLDProvider({
    clientSideID: '68439e7a7a0cb90a5bfd49fa',
    context: {
      "kind": "multi",
      "user": {
        "key": "user-key-123abc",
        "name": "Sandy Smith",
        "email": "sandy@example.com"
      },
      "device": {
        "key": window.navigator?.userAgentData ? window.navigator?.userAgentData?.brands[0]?.brand : "InValid"
      }
     
    },
    options: {
      // the observability plugins require React Web SDK v3.7+
      plugins: [
        new Observability()
      ],
      // other options...
    }
  })(App);

  return <LDProvider />;

}


export default LaunchDarklyContainer;

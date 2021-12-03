import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export class App extends Component {
  pageSize = 8;
  api_key = process.env.REACT_APP_NEWS_API_KEY;
  country = "in";

  constructor() {
		super();
		this.state = {
      progress: 0
    }
	}

  setProgress = (progress) =>{
    this.setState({progress: progress});
  }

  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
          />
          <Switch>
            <Route exact path="/">
              <News setprogress={this.setProgress} key="general" country={this.country} category="general" api_key={this.api_key} pageSize={this.pageSize} />
            </Route>
            <Route exact path="/business">
              <News setprogress={this.setProgress} key="business" country={this.country} category="business" api_key={this.api_key} pageSize={this.pageSize} />
            </Route>
            <Route exact path="/entertainment">
              <News setprogress={this.setProgress} key="entertainment" country={this.country} category="entertainment" api_key={this.api_key} pageSize={this.pageSize} />
            </Route>
            <Route exact path="/health">
              <News setprogress={this.setProgress} key="health" country={this.country} category="health" api_key={this.api_key} pageSize={this.pageSize} />
            </Route>
            <Route exact path="/science">
              <News setprogress={this.setProgress} key="science" country={this.country} category="science" api_key={this.api_key} pageSize={this.pageSize} />
            </Route>
            <Route exact path="/sports">
              <News setprogress={this.setProgress} key="sports" country={this.country} category="sports" api_key={this.api_key} pageSize={this.pageSize} />
            </Route>
            <Route exact path="/technology">
              <News setprogress={this.setProgress} key="technology" country={this.country} category="technology" api_key={this.api_key} pageSize={this.pageSize} />
            </Route>
            </Switch>
        </Router>
      </div>
    )
  }
}

export default App

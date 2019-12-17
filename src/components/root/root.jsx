import React from 'react';
import Mainpage from '../mainpage/mainpage';
import Cocktailcompage from '../cocktailcompage/cocktailcompage';
import Favoriterecipespage from '../favoriterecipespage/favoriterecipespage';
import Createrecipepage from '../createrecipepage/createrecipepage';
import Loginpage from '../loginpage/loginpage';
import { Route, Switch } from 'react-router-dom';
import UserContext from '../../contexts/user-context';
import Myrecipespage from '../myrecipespage/myrecipespage';
import Fullrecipe from '../fullrecipe/fullrecipe';

import './root.css';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { auth: false, username: "", user: {}};;
    this.handleChange = this.userAuth.bind(this);
  }

  static contextType = UserContext;
  
  userAuth = (username, user) => {
    this.setState({ auth: true, username: username, user: user });
    sessionStorage.setItem('user', JSON.stringify(this.state.user));
  }
  
  render() {
    return (
    <UserContext.Provider value={{auth: this.state.auth, username: this.state.username, userAuth: this.userAuth, user: this.state.user }}>
    <div>
      <Switch>
          <Route exact path='/' component={Loginpage} />
          <Route path='/maincatalog' component={Mainpage} />
          <Route path='/myrecipes' component={Myrecipespage} />
          <Route path='/favoriterecipes' component={Favoriterecipespage} />
          <Route path='/cocktailcom' component={Cocktailcompage} />
          <Route path='/createrecipepage' component={Createrecipepage} />
          <Route path='/fullrecipepage/:recipeId' component={Fullrecipe} />
       </Switch>
    </div>
    </UserContext.Provider>
    );
  }
};

export default Root;

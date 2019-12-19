import React from 'react';
import { Link } from 'react-router-dom';
import './header.scss';

class Header extends React.Component {
  state = { user: JSON.parse(sessionStorage.getItem('user')) }
  
  logOut() {
    sessionStorage.setItem('user', JSON.stringify({}));
  }

  render() {
    return(
    <div>
      <div className="c-header-main">
        <div className="o-title-service">
          My Cocktail
        </div>
        <div className="o-block-user">
          <div className="o-avatar"></div>
          <div className="c-nameuser-and-logout">
            <article>Hello, {this.state.user.username}</article>
            <Link to="/" className="o-button-logout" onClick={this.logOut}>Log out</Link>
          </div>
        </div>
      </div>
      <nav className="c-nav">
        <ul>
          <Link to='/maincatalog' className="c-nav__o-li">Main Catalog</Link>
          <Link to='/myrecipes' className="c-nav__o-li">My recipes</Link>
          <Link to='/favoriterecipes' className="c-nav__o-li">Favorite Recipes</Link>
          <Link to='/cocktailcom' className="c-nav__o-li">TheCocktail.com</Link>
        </ul>
      </nav>
      <div className="c-search-add-form">
        <div>
          <input placeholder="Search recipe..." className="o-input" type='text' />
          <button className="o-button-search">Search</button>
        </div>
        <Link to='/createrecipepage' className="o-button-add-recipe">Create Recipe</Link>
      </div>
    </div>
    );
  }
}

export default Header;
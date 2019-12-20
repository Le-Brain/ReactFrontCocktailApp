import React from 'react';
import Cardofrecipe from '../cardofrecipe/cardofrecipe';
import classNames from 'classnames';
import './cocktailcompage.scss';
import requestPublicApi from '../../api/requestPublicApi';
import Header from '../header/header';
import UserContext from '../../contexts/user-context';

class Cocktailcompage extends React.Component {
    
  state = { searchInput: "", recipes: [], loading: false, page: "cocktailcompage", user: JSON.parse(sessionStorage.getItem('user')) };
  static contextType = UserContext;

  componentDidMount() {
    this.setState({ loading: true });
    requestPublicApi.get('?f=a').then(response => {
      const recipes = response.data.drinks;
      this.setState({ recipes, loading: false });
    })
  }

  searchInputHandler = (e) => {
    this.setState({ searchInput: e.target.value });
  }

  searchCocktails = (e) => {
    this.setState({ loading: true });
    requestPublicApi.get(`?s=${this.state.searchInput}`).then(response => {
      const recipes = response.data.drinks;
      this.setState({ recipes, loading: false });
    })
  }

  render() {
    const { loading } = this.state;

    return(
    <div>
      <Header 
        page={this.state.page}
        searchCocktails={this.searchCocktails}
        searchInputHandler={this.searchInputHandler}
      />
      <section className={classNames('c-main')}>
        <div className="o-block-search-form-for-cocktailcompage">
          <input placeholder="Search recipe..." value={this.state.searchInput} className="o-input" type='text' onChange={this.searchInputHandler}/>
          <button className="o-button-search" onClick={this.searchCocktails}>Search</button>
        </div>
        <div className={classNames({ 'c-main__loading_block': loading })}>
          <div className={classNames({ 'c-main__loading_inner': loading })} />
        </div>
        {this.state.recipes!==null && this.state.recipes.map((
        { idDrink,
          userId,
          strDrink, 
          strAlcoholic,  
          strCategory, 
          strDrinkThumb,  
          strGlass,
          strInstructions,
          strIngredient1,
          strIngredient2,
          strIngredient3,
          strIngredient4,
          strIngredient5,
          strIngredient6,
          strIngredient7,
          strMeasure1,
          strMeasure2,
          strMeasure3,
          strMeasure4,
          strMeasure5,
          strMeasure6,
          strMeasure7,
          dateModified }
        ) => (
        <Cardofrecipe
          idDrink={idDrink}
          userId={userId}
          strDrink={strDrink}
          strAlcoholic={strAlcoholic}
          strCategory={strCategory}
          strDrinkThumb={strDrinkThumb}
          strGlass={strGlass}
          strInstructions={strInstructions}
          strIngredient1={strIngredient1}
          strIngredient2={strIngredient2}
          strIngredient3={strIngredient3}
          strIngredient4={strIngredient4}
          strIngredient5={strIngredient5}
          strIngredient6={strIngredient6}
          strIngredient7={strIngredient7}
          strMeasure1={strMeasure1}
          strMeasure2={strMeasure2}
          strMeasure3={strMeasure3}
          strMeasure4={strMeasure4}
          strMeasure5={strMeasure5}
          strMeasure6={strMeasure6}
          strMeasure7={strMeasure7}
          dateModified={dateModified}
          page={this.state.page}
          key={idDrink}
        />
      ))}
      {this.state.recipes===null && this.state.loading===false &&
        <div className="o-empty-block">
          <div className="o-empty-list">
            Recipes Not Found
          </div>
        </div>
      }
      </section>
    </div>
    );
  };

};

export default Cocktailcompage;
import React from 'react';
import Cardofrecipe from '../cardofrecipe/cardofrecipe';
import classNames from 'classnames';
import './mainpage.scss';
import requestMyAPI from '../../api/request';
import Header from '../header/header';
import UserContext from '../../contexts/user-context';

class Mainpage extends React.Component {
    
  state = { recipes: [], loading: false, page: 'mainpage', user: JSON.parse(sessionStorage.getItem('user')), message: '' };

  static contextType = UserContext;

  componentDidMount() {
    this.setState({ loading: true });
    requestMyAPI.get('/recipes').then(response => {
      const recipes = response.data.data;
      this.setState({ recipes, loading: false });
    })
  }

  addRecipeToFavorite = (e) => {
    const { user } = this.state;
    const userId = user.userId;
    const { id } = e.target.dataset;
    this.setState({ loading: true });
    requestMyAPI.post('/users/favoriterecipes/add/', { userId: userId, recipeId: id }).then((res) => {
      this.setState({ message: res.data.message });
      requestMyAPI.get('/recipes').then(response => {
        const recipes = response.data.data;
        this.setState({ recipes, loading: false });
      })
    })
    .catch(err => console.log(err) );
  }

  render() {
    const { loading } = this.state;

    return(
    <div>
      <Header />
      <section className={classNames('c-main')}>
        {this.state.message === 'USER_ALREADY_HAVE_RECIPE' && loading===false && 
          <div className="o-message-error-block">
            <div className="o-message-error">
              Error: You already added this recipe to your favorites
            </div>
          </div>
        }
        {loading === true ? (<div className={classNames({ 'c-main__loading_block': loading })}>
          <div className={classNames({ 'c-main__loading_inner': loading })} />
        </div> ) : (
          this.state.recipes.map((
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
              addRecipeToFavorite={this.addRecipeToFavorite}
              key={idDrink}
            />
            ))
          )}
          {this.state.recipes.length === 0 && loading=== false && 
            <div className="o-empty-block">
              <div className="o-empty-list">
                Recipes not found
              </div>
            </div>
          }
      </section>
    </div>
    );
  };
};

export default Mainpage;
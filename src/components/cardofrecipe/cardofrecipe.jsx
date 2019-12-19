import React from 'react';
import './cardofrecipe.scss';
import { withRouter } from 'react-router-dom';
import requestMyAPI from '../../api/request';

class Cardofrecipe extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      namepage: "",
      user: JSON.parse(sessionStorage.getItem('user')),
      userId: this.props.userId,
      userWhoCreate: {}
    };
  }

  componentDidMount() {
    requestMyAPI.get(`/users/getById/${this.state.userId}`).then(response => {
      const user = response.data.data;
      this.setState({ userWhoCreate: user });
    })
  }

  render() {
    return (
      <div className="c-main__o-recipe">
        <img className="o-image" src={this.props.strDrinkThumb} alt="" width="230" height="220" />
        <div className="o-block-information">
          <div className="o-block-articles">
            <article className="o-title-1">{this.props.strDrink}</article>
            <article className="o-title">Type: {this.props.strAlcoholic}</article>
            <article className="o-title">Category: {this.props.strCategory}</article>
          </div>
          <div className="o-block-ingredients">
            <article className="o-ingredients">Ingredients:   </article>
            {
              [1, 2, 3, 4, 5, 6, 7].map(item => {
                const ingr = this.props[`strIngredient${item}`];
                return ingr ? <article key={item} className="o-article-ingredient">{ingr}</article> : null
              })
            }
          </div>
        </div>
        <article className="o-date-recipe">{this.props.dateModified}</article>
        {this.props.page !== 'cocktailcompage' && 
          <article className="o-user-who-create">{this.state.userWhoCreate.username}</article>}
        {this.props.page === 'mainpage' && this.props.userId !== this.state.user.userId && 
          <button className="o-button-add" data-id={this.props.idDrink} 
          onClick={this.props.addRecipeToFavorite}>Add to Favorite</button>}
        {this.props.page === 'myrecipespage' && 
          <button className="o-button-delete" data-id={this.props.idDrink} 
          onClick={this.props.deleteRecipe}>Delete</button>}
        {this.props.page === 'favoriterecipespage' && 
          <button className="o-button-delete" data-id={this.props.idDrink} 
          onClick={this.props.deleteFavoriteRecipe}>Delete</button>}
        {this.props.page !== 'cocktailcompage' ?
          (<button className="o-button-about" onClick={() => 
            this.props.history.push(`/fullrecipepage/${this.props.idDrink}`)}>Show recipe</button>) :
          (<button className="o-button-about" onClick={() => 
          this.props.history.push(`/fullrecipepage/${this.props.idDrink}`)}>Show recipe</button>)
        }
        {this.props.page === 'myrecipespage' && <div className="o-edit"></div>}
      </div>
    );
  };
}

export default withRouter(Cardofrecipe);
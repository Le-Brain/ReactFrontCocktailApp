import React from 'react';
import './cardofrecipe.scss';
import { withRouter } from 'react-router-dom';

class Cardofrecipe extends React.Component {
	constructor(props) {
        super(props);
		this.state = { namepage: "",
					   user: JSON.parse(sessionStorage.getItem('user')),
					   userId: this.props.userId
           };
      }

	componentDidMount() {
		/*requestMyAPI.get(`/users/getById/${this.state.userId}`).then(response => {
            const user = response.data.data;
            this.setState({ user: user });
            console.log(this.state);
        }) */
	} 

    render() {
        return(
        <div className="c-main__o-recipe">
			<img className="o-image" src={this.props.strDrinkThumb} alt="" width="230" height="220"/>
			<div className="o-block-information">
				<div className="o-block-articles">
					<article className="o-title-1">{this.props.strDrink}</article>
					<article className="o-title">Type: {this.props.strAlcoholic}</article>
					<article className="o-title">Category: {this.props.strCategory}</article>
				</div>
				<div className="o-block-ingredients">
					<article className="o-ingredients">Ingredients:   </article>
					{(this.props.strIngredient1!=null&&this.props.strIngredient1!=="") ? <article className="o-article-ingredient">{this.props.strIngredient1}</article> : ""}
					{(this.props.strIngredient2!=null&&this.props.strIngredient2!=="") ? <article className="o-article-ingredient">{this.props.strIngredient2}</article> : ""}
					{(this.props.strIngredient3!=null&&this.props.strIngredient3!=="") ? <article className="o-article-ingredient">{this.props.strIngredient3}</article> : ""}
					{(this.props.strIngredient4!=null&&this.props.strIngredient4!=="") ? <article className="o-article-ingredient">{this.props.strIngredient4}</article> : ""}
					{(this.props.strIngredient5!=null&&this.props.strIngredient5!=="") ? <article className="o-article-ingredient">{this.props.strIngredient5}</article> : ""}
					{(this.props.strIngredient6!=null&&this.props.strIngredient6!=="") ? <article className="o-article-ingredient">{this.props.strIngredient6}</article> : ""}
					{(this.props.strIngredient7!=null&&this.props.strIngredient7!=="") ? <article className="o-article-ingredient">{this.props.strIngredient7}</article> : ""}
				</div>
			</div>
			<article className="o-date-recipe">{this.props.dateModified}</article>
			{this.props.page === 'mainpage' && this.props.userId !== this.state.user.userId && <button className="o-button-add" data-id={this.props.idDrink} onClick={this.props.addRecipeToFavorite}>Add to Favorite</button>}
			{this.props.page === 'myrecipespage' && <button className="o-button-delete" data-id={this.props.idDrink} onClick={this.props.deleteRecipe}>Delete</button>}
			{this.props.page === 'favoriterecipespage' && <button className="o-button-delete" data-id={this.props.idDrink} onClick={this.props.deleteFavoriteRecipe}>Delete</button>}
			<button className="o-button-about">Show recipe</button>
		</div>
        );
    };
}

export default withRouter(Cardofrecipe);
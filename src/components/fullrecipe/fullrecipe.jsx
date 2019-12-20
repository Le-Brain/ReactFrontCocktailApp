import React from 'react';
import Header from '../header/header';
import requestMyApi from '../../api/request';
import axios from 'axios';
import classNames from 'classnames';
import './fullrecipe.scss';

class Fullrecipe extends React.Component {
    
  state = { recipe: {}, user: JSON.parse(sessionStorage.getItem('user')), loading: false }
  
  componentDidMount() {
    this.setState({ loading: true })
    if (this.props.match.params.recipeId.length === 8) {
      requestMyApi.get(`recipes/${this.props.match.params.recipeId}`).then((response => {
        const recipe = response.data.data;
        this.setState({ recipe: recipe, loading: false });
      }));
    }
    else {
      axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.props.match.params.recipeId}`).then((response => {
        const recipe = response.data.drinks[0];
        this.setState({ recipe: recipe, loading: false });
      }));
    } 
  }

  render() {
    const { loading } = this.state;
    
    return(
    <div>
      <Header />
      {loading === false ? (
      <div className={classNames("c-create-recipe-block", {
          "c-create-none-background" : loading
      })}> 
        <div className="c-first-container">
          <div className="c-image-upload-block">
            <img id="imageOfRecipe" src={this.state.recipe.strDrinkThumb} className="c-image-upload" width="300" height="300" alt=""/>
            <div className="example-1">
              <article className="o-header-title-instructions">How to cook it?</article>
              <article className="o-instructions-fullrecipe">{this.state.recipe.strInstructions}</article>
            </div>
          </div>
          <div className="c-form-container">
            <div className="o-input-and-article">
              <div className="o-header-title-basic">Cocktail Name:</div>
              <article className="o-article-fullrecipe">{this.state.recipe.strDrink}</article>
            </div>
            <div className="o-input-and-article">
              <div className="o-header-title-basic">Category:</div>
              <article className="o-article-fullrecipe">{this.state.recipe.strCategory}</article>
            </div>
            <div className="o-input-and-article">
              <div className="o-header-title-basic">Alcoholic:</div>
              <article className="o-article-fullrecipe">{this.state.recipe.strAlcoholic}</article>
            </div>
            <div className="o-input-and-article">
              <div className="o-header-title-basic">Glass:</div>
              <article className="o-article-fullrecipe">{this.state.recipe.strGlass}</article>
            </div>
            <article className="o-title">Ingredients</article>
            {this.state.recipe.strIngredient1!=="" && this.state.recipe.strIngredient1!==null && <div className="o-input-and-article">
              <div className="o-header-title-ingredient">Ingredient1: </div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strIngredient1}</article>
              <div className="o-header-title-measure">Measure1</div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strMeasure1}</article>
            </div>}
            {this.state.recipe.strIngredient2!=="" && this.state.recipe.strIngredient2!==null && <div className="o-input-and-article">
              <div className="o-header-title-ingredient">Ingredient2: </div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strIngredient2}</article>
              <div className="o-header-title-measure">Measure2</div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strMeasure2}</article>
            </div>}
            {this.state.recipe.strIngredient3!=="" && this.state.recipe.strIngredient3!==null && <div className="o-input-and-article">
              <div className="o-header-title-ingredient">Ingredient3: </div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strIngredient3}</article>
              <div className="o-header-title-measure">Measure3</div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strMeasure3}</article>
            </div>}
            {this.state.recipe.strIngredient4!=="" && this.state.recipe.strIngredient4!==null && <div className="o-input-and-article">
              <div className="o-header-title-ingredient">Ingredient4: </div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strIngredient4}</article>
              <div className="o-header-title-measure">Measure4</div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strMeasure4}</article>
            </div>}
            {this.state.recipe.strIngredient5!=="" && this.state.recipe.strIngredient5!==null && <div className="o-input-and-article">
              <div className="o-header-title-ingredient">Ingredient5: </div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strIngredient5}</article>
              <div  className="o-header-title-measure">Measure5</div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strMeasure5}</article>
            </div>}
            {this.state.recipe.strIngredient6!=="" && this.state.recipe.strIngredient6!==null && <div className="o-input-and-article">
              <div className="o-header-title-ingredient">Ingredient6: </div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strIngredient6}</article>
              <div className="o-header-title-measure">Measure6</div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strMeasure6}</article>
            </div>}
            {this.state.recipe.strIngredient7!=="" && this.state.recipe.strIngredient7!==null && <div className="o-input-and-article">
              <div className="o-header-title-ingredient">Ingredient7: </div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strIngredient7}</article>
              <div className="o-header-title-measure">Measure7</div>
              <article className="o-article-small-fullrecipe">{this.state.recipe.strMeasure7}</article>
            </div>}
          </div>
        </div>
      </div>
          ) : (<div className="c-main">
                  <div className={classNames({ 'c-main__loading_block': loading })}>
                  <div className={classNames({ 'c-main__loading_inner': loading })}></div>
                  </div>
              </div>)}
    </div>
    );
  }
}

export default Fullrecipe;
import React from 'react';
import Header from '../header/header';
import requestMyApi from '../../api/request';
import classNames from 'classnames';

class Fullrecipe extends React.Component {
    
    state = { recipe: {}, user: JSON.parse(sessionStorage.getItem('user')), loading: false }
    
    componentDidMount() {
        this.setState({ loading: true })
        requestMyApi.get(`recipes/${this.props.match.params.recipeId}`).then((response => {
            const recipe = response.data.data;
            this.setState({ recipe: recipe, loading: false });
        }));
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
                                <article className="o-title-input o-title-long-input">Instructions</article>
                                <article className="o-text-area">{this.state.recipe.strInstructions}</article>
                        </div>
                    </div>
                    <div className="c-form-container">
                        <div className="o-input-and-article">
                            <div className="o-title-input">Cocktail Name</div>
                            <article className="o-input o-input_createrecipe">{this.state.recipe.strDrink}</article>
                        </div>
                        <div className="o-input-and-article">
                            <div className="o-title-input">Category</div>
                            <article className="o-input o-input_createrecipe">{this.state.recipe.strCategory}</article>
                        </div>
                        <div className="o-input-and-article">
                            <div className="o-title-input">Alcoholic</div>
                            <article className="o-input o-input_createrecipe">{this.state.recipe.strAlcoholic}</article>
                        </div>
                        <div className="o-input-and-article">
                            <div className="o-title-input">Glass</div>
                            <article className="o-input o-input_createrecipe">{this.state.recipe.strGlass}</article>
                        </div>
                        <article className="o-title">Ingredients</article>
                        {this.state.recipe.strIngredient1!=="" && <div className="o-input-and-article">
                            <div className="o-title-input">Ingredient1</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strIngredient1}</article>
                            <div className="o-title-input">Measure1</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strIngredient1}</article>
                        </div>}
                        {this.state.recipe.strIngredient2!=="" && <div className="o-input-and-article">
                            <div className="o-title-input">Ingredient2</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strIngredient2}</article>
                            <div className="o-title-input">Measure2</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strMeasure2}</article>
                        </div>}
                        {this.state.recipe.strIngredient3!=="" && <div className="o-input-and-article">
                            <div className="o-title-input">Ingredient3</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strIngredient3}</article>
                            <div className="o-title-input">Measure3</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strMeasure3}</article>
                        </div>}
                        {this.state.recipe.strIngredient4!=="" && <div className="o-input-and-article">
                            <div className="o-title-input">Ingredient4</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strIngredient4}</article>
                            <div className="o-title-input">Measure4</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strMeasure4}</article>
                        </div>}
                        {this.state.recipe.strIngredient5!=="" && <div className="o-input-and-article">
                            <div className="o-title-input">Ingredient5</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strIngredient5}</article>
                            <div  className="o-title-input">Measure5</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strMeasure5}</article>
                        </div>}
                        {this.state.recipe.strIngredient6!=="" && <div className="o-input-and-article">
                            <div className="o-title-input">Ingredient6</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strIngredient6}</article>
                            <div className="o-title-input">Measure6</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strMeasure6}</article>
                        </div>}
                        {this.state.recipe.strIngredient7!=="" && <div className="o-input-and-article">
                            <div className="o-title-input">Ingredient7</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strIngredient7}</article>
                            <div className="o-title-input">Measure7</div>
                            <article className="o-input o-input_createrecipe o-input-small">{this.state.recipe.strMeasure7}</article>
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
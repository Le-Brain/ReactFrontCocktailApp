import React from 'react';
import Cardofrecipe from '../cardofrecipe/cardofrecipe';
import classNames from 'classnames';
import './myrecipespage.scss';
import requestMyAPI from '../../api/request';
import Header from '../header/header';
import UserContext from '../../contexts/user-context';

class Myrecipespage extends React.Component {
    
    state = { recipes: [], loading: false, page: "myrecipespage", user: JSON.parse(sessionStorage.getItem('user')) };

    static contextType = UserContext;

    componentDidMount() {
        this.setState({ loading: true });
        requestMyAPI.get(`/recipes/ofuser/${this.state.user.userId}`).then(response => {
            const recipes = response.data.data;
            this.setState({ recipes, loading: false });
        })
    }

    deleteRecipe = (e) => {
        const { user } = this.state;
		const userId = user.userId;
        const { id } = e.target.dataset;
        this.setState({ loading: true });
		requestMyAPI.get(`/users/favoriterecipes/deleteall/${id}`).then(response => {
			const resp = response.data.status;
            console.log(resp);
		});
		requestMyAPI.delete(`/recipes/${id}`).then(response => {
            const resp = response.data.status;
			console.log(resp);
			requestMyAPI.get(`/recipes/ofuser/${userId}`).then(response => {
                const recipes = response.data.data;
                this.setState({ recipes, loading: false });
            })
		});
	}

    render() {
        const { loading } = this.state;

        return(
            <div>
            <Header />
            <section className={classNames('c-main')}>
            {loading === true ? (
            <div className={classNames({ 'c-main__loading_block': loading })}>
                <div className={classNames({ 'c-main__loading_inner': loading })}>
                </div>
            </div>) : (
            this.state.recipes.map((
                {   idDrink,
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
                        deleteRecipe={this.deleteRecipe}
                        page={this.state.page}
                        key={idDrink}
                    />
                    ))
                )}
                </section>
            </div>
        );
    };
};

export default Myrecipespage;
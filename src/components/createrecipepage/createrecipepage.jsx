import React from 'react';
import './createrecipepage.scss';
import Header from '../header/header';
import classNames from 'classnames';
import requestMyAPI from '../../api/request';
import UserContext from '../../contexts/user-context';

class Createrecipepage extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { loading: false, 
      user: JSON.parse(sessionStorage.getItem('user')),
      page: "createrecipepage", 
      file: "", 
      validate: false,
      strDrinkThumb: "", 
      strDrink: "", 
      strGlass: "",
      strCategory: "", 
      strAlcoholic: "", 
      strIngredient1: "",
      strIngredient2: "",
      strIngredient3: "",
      strIngredient4: "",
      strIngredient5: "",
      strIngredient6: "",
      strIngredient7: "",
      strMeasure1: "",
      strMeasure2: "",
      strMeasure3: "",
      strMeasure4: "",
      strMeasure5: "",
      strMeasure6: "",
      strMeasure7: "",
      strInstructions: "",
      };
    this.validateForm = this.validateForm.bind(this);
    }

  static contextType = UserContext;

  componentDidMount() {
    this.setState({ validate: false });
  }

  validateForm() {
    if (this.state.strDrink !== "" &&
      this.state.strCategory !== "" &&
      this.state.strAlcoholic !== "" &&
      this.state.strGlass !== "" && 
      this.state.strIngredient1 !== "" &&
      this.state.strMeasure1 !== "" &&
      this.state.strIngredient2 !== "" &&
      this.state.strMeasure2 !== "" &&
      this.state.strInstructions !== "" &&
      this.state.file instanceof Object) 
    this.setState({ validate: true });
  }

  handleInput = (e) => {
    let nameKey = e.target.name;
    this.setState({ [nameKey] : e.target.value });
    this.validateForm();
  };

  handleUpload = (e) => {
    this.setState({ file: e.target.files[0] });
    let reader = new FileReader();
    reader.mycontext = this;
    let img = document.querySelector('#imageOfRecipe');
    reader.onload = function(event) {
      img.setAttribute('src', event.target.result);
      this.mycontext.validateForm();
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ loading: true});
    let formData = new FormData();
    formData.append("file", this.state.file);
    requestMyAPI.post('/upload', formData).then((res) => {
    this.setState({ strDrinkThumb: `http://localhost:8080/${res.data.filename}`});
      requestMyAPI.post('/recipes', {
        userId: this.state.user.userId,
        strDrink: String(this.state.strDrink),
        strCategory: String(this.state.strCategory),
        strAlcoholic: String(this.state.strAlcoholic),
        strGlass: String(this.state.strGlass),
        strInstructions: String(this.state.strInstructions),
        strDrinkThumb: String(this.state.strDrinkThumb),
        strIngredient1: String(this.state.strIngredient1),
        strIngredient2: String(this.state.strIngredient2),
        strIngredient3: String(this.state.strIngredient3),
        strIngredient4: String(this.state.strIngredient4),
        strIngredient5: String(this.state.strIngredient5),
        strIngredient6: String(this.state.strIngredient6),
        strIngredient7: String(this.state.strIngredient7),
        strMeasure1: String(this.state.strMeasure1),
        strMeasure2: String(this.state.strMeasure2),
        strMeasure3: String(this.state.strMeasure3),
        strMeasure4: String(this.state.strMeasure4),
        strMeasure5: String(this.state.strMeasure5),
        strMeasure6: String(this.state.strMeasure6),
        strMeasure7: String(this.state.strMeasure7),
        dateModified: String(this.msToTime(Date.now()))
        }).then((res) => {
          console.log(res.data);
          this.setState({ loading: false});
      })
      .catch(err => console.log(err) );
    })
    .catch(err => console.log(err) );
  }

  msToTime(duration) {
    const date = new Date(duration);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const seconds = date.getSeconds();
    return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + seconds;
  }

  render() {
    const { loading } = this.state;
    return(
    <div>
      <Header 
        page={this.state.page}
      />
      {loading === false ? (
      <div className={classNames("c-create-recipe-block", {
          "c-create-none-background" : loading
      })}> 
        <div className="c-first-container">
          <div className="c-image-upload-block">
            <img id="imageOfRecipe" src={this.state.strDrinkThumb} className="c-image-upload" width="300" height="300" alt=""/>
            <div className="example-1">
              <form id = "uploadForm"
                encType = "multipart/form-data"
                onSubmit={this.handleSubmit}
                className="form-group">
                <label className="label">
                  <i className="material-icons"></i>
                  <span className="title">Choose File</span>
                  <input className="input-file" type="file" name="file" onChange={this.handleUpload}/>
                </label>
                <article className="o-title-input o-title-long-input">Instructions</article>
                <textarea placeholder="Try to describe how to make your cocktail..." className="o-text-area" 
                cols="42" rows="7" name="strInstructions" onChange={this.handleInput}></textarea>
                <input disabled={!this.state.validate} type="submit" className="o-aprrove-form" value="Create recipe" name="submit" />
              </form>
            </div>
          </div>
            <div className="c-form-container">
              <div className="o-input-and-article">
                <div className="o-title-input">Cocktail Name</div>
                <input placeholder="(Important) example: Blood Marry" className="o-input o-input_createrecipe" 
                name="strDrink" type="text" onChange={this.handleInput} />
              </div>
              <div className="o-input-and-article">
                <div className="o-title-input">Category</div>
                <input placeholder="(Important) example: Ordinary" className="o-input o-input_createrecipe" 
                name="strCategory" type="text" onChange={this.handleInput} />
              </div>
              <div className="o-input-and-article">
                <div className="o-title-input">Alcoholic</div>
                <input placeholder="(Important) example: Alcoholic" className="o-input o-input_createrecipe" 
                name="strAlcoholic" type="text" onChange={this.handleInput} />
              </div>
              <div className="o-input-and-article">
                <div className="o-title-input">Glass</div>
                <input placeholder="(Important) example: Cocktail Glass" className="o-input o-input_createrecipe" 
                name="strGlass" type="text" onChange={this.handleInput} />
              </div>
              <article className="o-title">Ingredients</article>
              <div className="o-input-and-article">
                <div className="o-title-input">Ingredient1</div>
                <input placeholder="(Important) ex: Apple" className="o-input o-input_createrecipe o-input-small" 
                name="strIngredient1" type="text" onChange={this.handleInput} />
                <div className="o-title-input">Measure1</div>
                <input placeholder="(Important) ex: 1/4" className="o-input o-input_createrecipe o-input-small" 
                name="strMeasure1" type="text" onChange={this.handleInput} />
              </div>
              <div className="o-input-and-article">
                <div className="o-title-input">Ingredient2</div>
                <input placeholder="(Important) ex: Salt" className="o-input o-input_createrecipe o-input-small" 
                name="strIngredient2" type="text" onChange={this.handleInput} />
                <div className="o-title-input">Measure2</div>
                <input placeholder="(Important) ex: 1.5 gr" className="o-input o-input_createrecipe o-input-small" 
                name="strMeasure2" type="text" onChange={this.handleInput} />
              </div>
              <div className="o-input-and-article">
                <div className="o-title-input">Ingredient3</div>
                <input placeholder="(Additional Value)" className="o-input o-input_createrecipe o-input-small" 
                name="strIngredient3" type="text" onChange={this.handleInput} />
                <div className="o-title-input">Measure3</div>
                <input placeholder="(Additional Value)" className="o-input o-input_createrecipe o-input-small" 
                name="strMeasure3" type="text" onChange={this.handleInput} />
              </div>
              <div className="o-input-and-article">
                <div className="o-title-input">Ingredient4</div>
                <input placeholder="(Additional Value)" className="o-input o-input_createrecipe o-input-small" 
                name="strIngredient4" type="text" onChange={this.handleInput} />
                <div className="o-title-input">Measure4</div>
                <input placeholder="(Additional Value)" className="o-input o-input_createrecipe o-input-small" 
                name="strMeasure4" type="text" onChange={this.handleInput} />
              </div>
              <div className="o-input-and-article">
                <div className="o-title-input">Ingredient5</div>
                <input placeholder="(Additional Value)" className="o-input o-input_createrecipe o-input-small" 
                name="strIngredient5" type="text" onChange={this.handleInput} />
                <div  className="o-title-input">Measure5</div>
                <input placeholder="(Additional Value)" className="o-input o-input_createrecipe o-input-small" 
                name="strMeasure5" type="text" onChange={this.handleInput} />
              </div>
              <div className="o-input-and-article">
                <div className="o-title-input">Ingredient6</div>
                <input placeholder="(Additional Value)" className="o-input o-input_createrecipe o-input-small" 
                name="strIngredient6" type="text" onChange={this.handleInput} />
                <div className="o-title-input">Measure6</div>
                <input placeholder="(Additional Value)" className="o-input o-input_createrecipe o-input-small" 
                name="strMeasure6" type="text" onChange={this.handleInput} />
              </div>
              <div className="o-input-and-article">
                <div className="o-title-input">Ingredient7</div>
                <input placeholder="(Additional Value)" className="o-input o-input_createrecipe o-input-small" 
                name="strIngredient7" type="text" onChange={this.handleInput} />
                <div className="o-title-input">Measure7</div>
                <input placeholder="(Additional Value)" className="o-input o-input_createrecipe o-input-small" 
                name="strMeasure7" type="text" onChange={this.handleInput} />
              </div>
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

export default Createrecipepage;
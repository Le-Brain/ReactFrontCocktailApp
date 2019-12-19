import React from 'react';
import UserContext from '../../contexts/user-context';
import RequestMyApi from '../../api/request';
import { Link } from 'react-router-dom';
import ClassNames from 'classnames';
import './loginpage.scss';

class Loginpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", user: {}, validate: false, loading: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  static contextType = UserContext;

  update(username) {
    RequestMyApi.get(`/users/getByUserName/${username}`).then(response => {
      const user = response.data.data;
      this.setState({ username: username, user: user, validate: true });
      this.context.userAuth(this.state.username, this.state.user);
    })
  }

  handleChange = (e) => {
    this.update(e.target.value );
  }

  handleSubmit(event) {
    this.context.userAuth(this.state.username, this.state.user);
    event.preventDefault();
  }

  render() {
    const { validate } = this.state;
    return(
    <div className="c-main">
      <div className="c-header-main">
        My Cocktail
      </div>
      <div className="c-form-login">
        <form>
          <select className="o-select" value={this.state.username} onChange={this.handleChange}>
            <option disabled={true} value=""></option>
            <option value="firstUser">firstUser</option>
            <option value="secondUser">secondUser</option>
            <option value="thirdUser">thirdUser</option>
          </select>
          <Link to='/maincatalog' className={ClassNames('o-button-login', { 'o-disabled-button' : !validate})}></Link>
        </form>
      </div>
    </div>
    );
  }
}

export default Loginpage;
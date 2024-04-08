import {Component} from 'react'
import {v4 as uuid4} from 'uuid'
import './index.css'
import Password from '../Password'

// 4 test cases are failed
// When a new password is added and "Show passwords" is checked, then the page should consist of an HTML paragraph element with text content as password provided
// When new passwords are added and a non-empty value is provided in the search input element, the password items should be filtered irrespective of the case
// When new passwords are added and a non-empty value is provided in the search input element, and no password item includes the value given in the search input, then the page should consist of an HTML image element with alt attribute value as "no passwords" and src as the given no passwords image URL
// When a new password is added and a non-empty value is provided in the search input element, and no password item includes the value given in the search input, then the page should consist of an HTML paragraph element with text content as "No Passwords"

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    listOfPasswords: [],
    count: 0,
    searchInput: '',
    checkboxStatus: false,
  }

  //  mistake1 here i need to update the add the password container
  onClickDetailsSubmit = () => {
    this.setState(prevState => ({
      count: prevState.count + 1,
    }))
  }

  // mistake2 i added this function in button onClick
  onAddPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPassword = {
      id: uuid4(),
      websiteInput,
      usernameInput,
      passwordInput,
    }

    this.setState(prevState => ({
      listOfPasswords: [...prevState.listOfPasswords, newPassword],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  onChangeWebsiteInput = event => {
    this.setState({
      websiteInput: event.target.value,
    })
  }

  onChangeUsernameInput = event => {
    this.setState({
      usernameInput: event.target.value,
    })
  }

  onChangePasswordInput = event => {
    this.setState({
      passwordInput: event.target.value,
    })
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  // mistake4 i wrote like this eachPassword.id === id
  deleteBtn = id => {
    const {listOfPasswords} = this.state
    const updateList = listOfPasswords.filter(
      eachPassword => eachPassword.id !== id,
    )

    this.setState({
      listOfPasswords: updateList,
    })

    this.setState(prevState => ({
      count: prevState.count - 1,
    }))
  }

  onClickCheckboxStatus = () => {
    this.setState(prevState => ({
      checkboxStatus: !prevState.checkboxStatus,
    }))
  }

  render() {
    const {count, listOfPasswords, searchInput, checkboxStatus} = this.state
    const {websiteInput, usernameInput, passwordInput} = this.state

    // mistake5 something wrong in this function 10 test cases are failed
    const searchResults = listOfPasswords.filter(eachPassword =>
      eachPassword.websiteInput
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    // mistake6 no passwords status
    // i wrote like count > 0 { list of passwords containers :  nopasswords image }
    // that was wrong

    const noPasswordsStatus = searchResults.length === 0

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          className="app-logo"
          alt="app logo"
        />

        <div className="card1">
          <form className="user-input" onSubmit={this.onAddPassword}>
            <h1 className="heading1">Add New Password</h1>
            <div className="box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                className="logo"
                alt="website"
              />

              <input
                type="text"
                className="input"
                placeholder="Enter Website"
                value={websiteInput}
                onChange={this.onChangeWebsiteInput}
              />
            </div>

            <div className="box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                className="logo"
                alt="username"
              />

              <input
                type="text"
                className="input"
                placeholder="Enter Username"
                value={usernameInput}
                onChange={this.onChangeUsernameInput}
              />
            </div>

            <div className="box">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                className="logo"
                alt="password"
              />

              <input
                type="password"
                className="input"
                placeholder="Enter Password"
                value={passwordInput}
                onChange={this.onChangePasswordInput}
              />
            </div>
            <div className="add-button-container">
              <button
                type="submit"
                className="add-btn"
                onClick={this.onClickDetailsSubmit}
              >
                Add
              </button>
            </div>
          </form>

          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            className="pm-img"
            alt="password manager"
          />
        </div>

        <div className="card2">
          <div className="card-22">
            <div className="your-passwords-card">
              <h1 className="heading1">Your Passwords </h1>
              <p className="count-box">{count}</p>
            </div>

            <div className="search-box">
              {/*
              When new passwords are added and a non-empty value is provided in the search input element,
               the password items should be filtered irrespective of the case
               */}
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                className="search-img"
                alt="search img"
              />

              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="show-p-container">
            {/* 4 test cases are failed 
              1 When values are provided for a website, username, and password and the Add button is clicked,
               then the page should consist of an HTML image element with alt attribute value as "stars" and src as the given stars image URL
            */}
            <input
              type="checkBox"
              id="myCheckBox"
              onClick={this.onClickCheckboxStatus}
            />
            <label htmlFor="myCheckBox" className="heading2">
              Show Passwords
            </label>
          </div>

          {noPasswordsStatus ? (
            <div className="no-passwords">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                className="no-passwords-img"
                alt="no passwords"
              />
              <p className="heading1">No Passwords</p>
            </div>
          ) : (
            <ul className="password-container">
              {searchResults.map(eachPassword => (
                <Password
                  key={eachPassword.id}
                  confidentialDetails={eachPassword}
                  deleteBtn={this.deleteBtn}
                  checkboxStatus={checkboxStatus}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager

import './index.css'

const Password = props => {
  const {confidentialDetails, deleteBtn, checkboxStatus} = props
  const {id, websiteInput, usernameInput, passwordInput} = confidentialDetails

  const onClickDeleteBtn = () => {
    deleteBtn(id)
  }

  return (
    <li className="password-card">
      <div className="fl-container">
        <p>{websiteInput[0].toUpperCase()}</p>
      </div>
      <div className="inputs-container">
        <p>{websiteInput}</p>
        <p>{usernameInput}</p>

        {checkboxStatus ? (
          <p>{passwordInput}</p>
        ) : (
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
            className="stars"
            alt="stars"
          />
        )}
      </div>

      <button
        onClick={onClickDeleteBtn}
        data-testid="delete"
        className="delete-btn"
        type="button"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          className="delete-img"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default Password

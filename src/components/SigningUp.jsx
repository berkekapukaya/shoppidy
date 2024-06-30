import React from "react";


const SigningUp = ({error, errorEmail, errorPassword, errorConfirmPassword, errorName,handleSignUpSubmit, name, email, password, confirmPassword, handleChange, loginState, setLoginState}) => {


    return (
        <>
            <h2>Kayıt Ol</h2>
            <div className="login-container">
                <h2 className="sign-logo">Shoppidy</h2>
                <form onSubmit={handleSignUpSubmit}>
                    <input className="login-input"
                           type="text"
                           name="name"
                           placeholder="İsim"
                           value={name}
                           onChange={handleChange}
                    />
                    {errorName}
                    <input className="login-input"
                           name="email"
                           type="text"
                           placeholder="E-mail"
                           value={email}
                           onChange={handleChange}
                    />
                    {errorEmail}
                    <input className="login-input"
                           name="password"
                           type="password"
                           placeholder="Şifre"
                           value={password}
                           onChange={handleChange}
                    />
                    {errorPassword}
                    <input className="login-input"
                           name="confirmPassword"
                           type="password"
                           placeholder="Şifreyi Onayla"
                           value={confirmPassword}
                           onChange={handleChange}
                    />
                    {errorConfirmPassword}
                    {error && <h4 className="error-login">{error}</h4>}
                    <button onClick={handleSignUpSubmit} className="submit-login-btn" type="submit">Kayıt Ol</button>
                    <p onClick={() => setLoginState(!loginState)} className="link-signin">Zaten hesabınız var mı ? Oturum açın</p>
                </form>
            </div>
        </>
    )
}

export default SigningUp;
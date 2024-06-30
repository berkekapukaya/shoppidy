import React from "react";


const LoggingIn = ({handleLoginSubmit, email, password, setEmail, setPassword, error, errorEmail, errorPassword, loginState, setLoginState}) => {
    return (
        <>
            <h2>Giriş Yap</h2>
            <div className="login-container">
                <h2 className="sign-logo">Shoppidy</h2>
                <form onSubmit={handleLoginSubmit}>
                    <input className="login-input"
                           type="text"
                           placeholder="E-mail"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />
                    {errorEmail}
                    <input className="login-input"
                           type="password"
                           placeholder="Şifre"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />
                    {errorPassword}
                    {error && <h4 className="error-login">{error}</h4>}
                    <button className="submit-login-btn" type="submit">Giriş Yap</button>
                    <p onClick={() => setLoginState(!loginState)} className="link-signin">Hesabınız yok mu ? Buradan kaydolun</p>
                </form>
            </div>
        </>
    )
}

export default LoggingIn;
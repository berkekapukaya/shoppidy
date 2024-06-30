import '../css/Login.css'
import React, { useState} from 'react';
import axios from "axios";
import LoggingIn from "./LoggingIn";
import SigningUp from "./SigningUp";

const Login = ({ onClose, onLogin }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loginState, setLoginState] = useState(true);
    const [error, setError] = useState('');
    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('')


    const handleChange = (event) => {
        const {name, value} = event.target;

        setUser((prevValue) => {
            return {
                ...prevValue,
                [name]: value,
            };
        });
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        setErrorEmail('')
        setErrorPassword('')

        if(!email && !password){
            setErrorEmail(<h4 className="error-login">E-mail boş olamaz</h4>)
            setErrorPassword(<h4 className="error-login">Şifre boş olamaz</h4>)
        }else if(email && !password){
            setErrorPassword(<h4 className="error-login">Şifre boş olamaz</h4>)
            setEmail('')
        }else if(!email && password){
            setErrorEmail(<h4 className="error-login">E-mail boş olamaz</h4>)
            setPassword('')
        }else{
            setErrorEmail('')
            setErrorPassword('')
        }
        if(email && password){
            try {
                const response = await axios.post('api/users/auth', {
                    email,
                    password,
                });

                // Assuming the backend returns a token upon successful login
                const token = response.data.token;
                const isAdmin = response.data.isAdmin;

                onLogin(email, token, isAdmin);

                // Redirect the user to a protected route or perform any other necessary actions
            } catch (error) {
                setError('Geçersiz e-mail veya şifre. Lütfen tekrar deneyin.');
                setEmail('')
                setPassword('')
            }

        }
    };

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();

        setErrorName('')
        setErrorEmail('')
        setErrorPassword('')
        setErrorConfirmPassword('')
        setError('')

        if(!user.name && !user.email && !user.password && !user.confirmPassword){
            setError(<h4 className="error-login">Tüm alanlar zorunludur</h4>)
        }else if (user.password !== user.confirmPassword){
            setErrorConfirmPassword(<h4 className="error-login">Parolalar uyuşmuyor</h4>)
            setUser(prevValue => {
                return {
                    ...prevValue,
                    password: '',
                    confirmPassword: '',
                }
            })
        }else if(!user.name){
            setErrorName(<h4 className="error-login">İsim boş olamaz</h4>)
            setUser(prevValue => {
                return {
                    ...prevValue,
                    name: '',
                }
            })
        }else if(!user.email){
            setErrorEmail(<h4 className="error-login">E-posta boş olamaz</h4>)
            setUser(prevValue => {
                return {
                    ...prevValue,
                    email: '',
                }
            })
        }else if(!user.password){
            setErrorPassword(<h4 className="error-login">Şifre boş olamaz</h4>)
            setUser(prevValue => {
                return {
                    ...prevValue,
                    password: '',
                }
            })
        }else if(!user.confirmPassword){
            setErrorConfirmPassword(<h4 className="error-login">Lütfen şifreyi onaylayın</h4>)
            setUser(prevValue => {
                return {
                    ...prevValue,
                    confirmPassword: '',
                }
            })
        }else{
            const {confirmPassword, ...rest} = user;

            try {
                const response = await axios.post('api/users/create', rest);

                console.log(response.data)
                // Assuming the backend returns a token upon successful login
                setLoginState(true)

                // Redirect the user to a protected route or perform any other necessary actions
            } catch (error) {
                setError('Kullanıcı oluşturulamadı. Lütfen tekrar deneyin.');
                console.log(error)
                setUser({
                    name: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                })
            }
        }

    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {loginState ? <LoggingIn
                    handleLoginSubmit={handleLoginSubmit}
                    email={email}
                    password={password}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    error={error}
                    errorEmail={errorEmail}
                    errorPassword={errorPassword}
                    loginState={loginState}
                    setLoginState={setLoginState}
                /> : <SigningUp
                    handleSignUpSubmit={handleSignUpSubmit}
                    name={user.name}
                    email={user.email}
                    password={user.password}
                    confirmPassword={user.confirmPassword}
                    handleChange={handleChange}
                    loginState={loginState}
                    setLoginState={setLoginState}
                    error={error}
                    errorName={errorName}
                    errorEmail={errorEmail}
                    errorPassword={errorPassword}
                    errorConfirmPassword={errorConfirmPassword}
                /> }

            </div>
        </div>
    );
};


export default Login;
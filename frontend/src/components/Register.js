import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Register(props) {
    
    const [formValue, setFormData] = useState({email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formValue,
            [name]: value,e 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleRegister(formValue);
    };

    return (
    <section className='auth'>
        <h2 className='auth__title'>Регистрация</h2>
        <form onSubmit={handleSubmit} className='auth__form' name='auth-login'>
            <input
                value={formValue.email}
                onChange={handleChange}
                className='auth__input'
                name='email'
                type='email'
                placeholder='Email'
                minLength='2'
                maxLength='40'
                required
            />
            <input
                value={formValue.password}
                onChange={handleChange}
                className='auth__input'
                name='password'
                type='password'
                placeholder='Пароль'
                minLength='4'
                maxLength='10'
                required
            />
            <button className='auth__btn-submit' type='submit' >Зарегистрироваться</button>
            <Link to='/sign-in' className='auth__link'>Уже зарегистрированы? Войти</Link>
        </form>
    </section>
    );
}

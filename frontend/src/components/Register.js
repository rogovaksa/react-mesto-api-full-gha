import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function Register(props) {
    
    const [formData, setFormData] = useState({email: '', password: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ 
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.handleRegister(formData);
    };

    return (
    <section className='auth'>
        <h2 className='auth__title'>Регистрация</h2>
        <form onSubmit={handleSubmit} className='auth__form' name='auth-login'>
            <input
                value={formData.email}
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
                value={formData.password}
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
            <Link to='/signin' className='auth__link'>Уже зарегистрированы? Войти</Link>
        </form>
    </section>
    );
}

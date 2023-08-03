import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = React.useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateUser({
          name,
          about: description,
        });
    } 

    function handleChangeUserName(e) {
        setName(e.target.value);
    }

    function handleChangeUserDescription(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm 
            name='edit'
            title='Редактировать профиль'
            buttonName='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>

            <input
                required
                id='input-userName'
                className='popup__input popup__input_type_name'
                type='text'
                name='name'
                placeholder='Имя'
                minLength='2'
                maxLength='40'
                value={name || ''}
                onChange={handleChangeUserName}
            ></input>
            <span className='popup__error' id='input-userName-error'></span>
            <input
                required
                id='input-description'
                className='popup__input popup__input_type_descr'
                type='text'
                name='about'
                placeholder='Описание'
                minLength='2'
                maxLength='200'
                value={description || ''}
                onChange={handleChangeUserDescription}
            ></input>
            <span className='popup__error' id='input-description-error'></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
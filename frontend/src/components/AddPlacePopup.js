import React from 'react';
import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link,
        });
    }

    function handleAddName(e) {
        setName(e.target.value);
    }

    function handleAddLink(e) {
        setLink(e.target.value);
    }

    return (
        <PopupWithForm 
            name='add'
            title='Новое место'
            buttonName='Создать'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            >
            
            <input
                required
                id='input-name'
                className='popup__input popup__input_card_name'
                type='text'
                name='name'
                placeholder='Название'
                minLength='2'
                maxLength='40'
                value={name} 
                onChange={handleAddName}
            ></input>
            <span className='popup__error' id='input-name-error'></span>
            <input
                required
                id='input-link'
                className='popup__input popup__input_card_link'
                type='url'
                name='link'
                placeholder='Ссылка на картинку'
                value={link} 
                onChange={handleAddLink}
            ></input>
                  <span className='popup__error' id='input-link-error'></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
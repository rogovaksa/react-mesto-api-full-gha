import React from 'react';
import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    const avatarRef = React.useRef();

    useEffect(() => {
        avatarRef.current.value = '';
      }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    }
    
    return(

        <PopupWithForm 
            name='avatar'
            title='Обновить аватар'
            buttonName='Сохранить'
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            
            <input 
                className='popup__input popup__input_avatar_link' 
                id='avatar' 
                type='url' 
                name='link' 
                required  
                placeholder='Ссылка на картинку'
                ref={avatarRef}>
            </input>
            <span className='popup__error' id='avatar-error'></span>
        </PopupWithForm>

    );
}

export default EditAvatarPopup;
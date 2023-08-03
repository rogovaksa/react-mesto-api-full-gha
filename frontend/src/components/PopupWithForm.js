import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : false}`}>
            <div className={`popup__container popup__container_type_${props.name}`}>
              <button type='button' aria-label='Закрыть' className='popup__close' onClick={props.onClose}></button>
                <h2 className='popup__title'>{props.title}</h2>
                <form className='popup__form popup__form-edit' name={props.name} action='#' method='post' autoComplete='off' onSubmit={props.onSubmit} >
                    {props.children}
                    <button type='submit' className='popup__save'>{props.buttonName}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
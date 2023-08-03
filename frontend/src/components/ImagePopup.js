import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_picture ${card ? 'popup_opened' : ''}`}>
            <div className='popup__container popup__container_type_picture'>
            <button type='button' aria-label='Закрыть' className='popup__close popup__close-picture' onClick={onClose}></button>
            <img className='popup__picture' src={card?.link} alt={card?.name} />
            <p className='popup__picture-descr'>{card?.name}</p>
            </div>
        </div>
    );
}

export default ImagePopup;
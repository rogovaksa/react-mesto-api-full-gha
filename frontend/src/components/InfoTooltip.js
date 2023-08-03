import React from 'react';
import success from '../images/success.svg';
import fail from '../images/fail.svg';


export function InfoTooltip({ isOpen, isConfirm, onClose }) {

  return (
    <section className={`popup popup_type_info ${isOpen && "popup_opened"}`}>
      <div className="popup__container popup__container_type_info">
        <img className="popup__picture popup__picture_type_info" src={isConfirm ? success : fail} alt='Результат регистрации' />
        <h3 className={`popup__title popup__title_type_info`}>{isConfirm ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! Попробуйте еще раз.'}</h3>
        <button 
          onClick={onClose} 
          className="popup__close" 
          type="button" 
          aria-label="Закрыть" 
        />
      </div>
    </section>
  )
}
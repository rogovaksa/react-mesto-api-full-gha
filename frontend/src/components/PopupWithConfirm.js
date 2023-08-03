import React from 'react';

function PopupWithConfirm() {
    return(
        <div className='popup popup_type_confirm'>
        <div className='popup__container popup__container_type_confirm'>
          <form className='popup__form popup__form-confirm'>
            <button type='button' aria-label='Закрыть' className='popup__close'></button>
            <h2 className='popup__title'>Вы уверены?</h2>
            <button className='popup__save popup__save_type_confirm' type='submit' aria-label='Подтвердить удаление'>Да</button>
          </form>
        </div>
      </div>
    )
}

export default PopupWithConfirm;
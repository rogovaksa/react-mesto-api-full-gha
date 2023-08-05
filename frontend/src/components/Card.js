import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

// function Card({card, onCardClick, onCardDelete, onCardLike}) {
function Card(props) {

    const currentUser = React.useContext(CurrentUserContext);
    
    const isOwn = props.card.owner === currentUser._id;

    const isLiked = props.card.likes.some(i => i === currentUser._id);

    const cardLikeButtonClassName = ( 
        `element__like-button ${isLiked && 'element__like-button_active'}` 
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    return (
        <article id='element-template'>
            <div className='element'>
            <img className='element__picture' src={props.card.link} alt={props.card.name} onClick={handleClick} />
            {isOwn && <button type='button' aria-label='Удалить' className='element__delete' onClick={handleDeleteClick}></button>} 
            <div className='element__line'>
                <h2 className='element__description'>{props.card.name}</h2>
                <div className='element__like-container'>
                    <button type='button' aria-label='Нравится' className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className='element__like-counter'>{props.card.likes.length}</p>
                </div>
            </div>
            </div>
      </article>
    );
}

export default Card;
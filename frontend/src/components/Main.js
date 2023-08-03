import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, cards}) {
    
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className='content'>
            <section className='profile'>
                <div className='profile__user-info'>
                    <div className='profile__avatar-pic'>
                      <img src={currentUser.avatar} alt='Аватар' className='profile__avatar' />
                      <button className='profile__edit-avatar-button' type='button' aria-label='Редактировать аватар' onClick={onEditAvatar}></button>
                    </div>
                    <div className='profile__info'>
                        <div className='profile__main-line'>
                            <h1 className='profile__name'>{currentUser.name}</h1>
                            <button type='button' aria-label='Редактировать' className='profile__edit-button' onClick={onEditProfile}></button>
                        </div>
                        <p className='profile__description'>{currentUser.about}</p>
                    </div>
                </div>
                <button type='button' aria-label='Добавить' className='profile__add-button' onClick={onAddPlace}></button>
            </section>

            <section className='elements' >
                {cards.map((card) => {
                    return(<Card
                        key={card._id}
                        card={card}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                        />)
                })}
            </section>
        </main>
    );
}

export default Main;
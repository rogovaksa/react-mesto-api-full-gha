import React from 'react';
import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Login } from './Login';
import { ProtectedRouteElement } from './ProtectedRoute';
import { Register } from './Register';
import { InfoTooltip } from './InfoTooltip';
import * as auth from './../utils/Auth';
import header__logo from '.././images/header__logo.svg';


function App() {

const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

const [selectedCard, setSelectedCard] = useState(null);
const [currentUser, setCurrentUser] = useState({});
const [cards, setCards] = useState([]);

const navigate = useNavigate();
const [isLoggedIn, setIsLoggedIn] = useState();
const [userEmail, setUserEmail] = useState('');
const [isInfoTooltip, setIsInfoTooltip] = useState(false);

// useEffect(() => {
//   api.getUserInfo()
//   .then((data) => {
//     setCurrentUser(data);
//   })
//   .catch((err) => { console.log(err) });

//   api.getInitialCards()
//   .then((cards) => {
//     setCards(cards)
//   })
//   .catch((err) => { console.log(err) });
// }, []);

useEffect(() => {
  const token = localStorage.getItem('jwt');
  if (token) {
  if (isLoggedIn) {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([currentUser, cards]) => {
        setCurrentUser(currentUser);
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }
}
}, [isLoggedIn]);

useEffect(() => {
  handleCheckToken();
}, []);

function handleEditProfileClick() {
  setIsEditProfilePopupOpen(true);
}

function handleAddPlaceClick() {
  setIsAddPlacePopupOpen(true);
}

function handleEditAvatarClick() {
  setIsEditAvatarPopupOpen(true);
}

function handleCardClick(card) {
  setSelectedCard(card);
}

function openInfoTooltip() {
  setIsInfoTooltipOpen(true);
}

function closeAllPopups() {
  setIsEditProfilePopupOpen(false);
  setIsAddPlacePopupOpen(false);
  setIsEditAvatarPopupOpen(false);
  setSelectedCard(null);
  setIsInfoTooltipOpen(false);
}

function handleCardLike(card) {
  const isLiked = card.likes.some(i => i._id === currentUser._id);
  
  api.changeLikeCardStatus(card._id, !isLiked)
  .then((newCard) => {
    setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
  })
  .catch((err) => { console.log(err) }
  );
}

function handleCardDelete(card) {
  api.deleteCard(card._id)
  .then(() => {
    setCards(cards => cards.filter((c) => c._id !== card._id));
    // closeAllPopups();
  })
  .catch((err) => { console.log(err) }
  );
}

function handleUpdateUser(data) {
  api.patchUserInfo(data)
  .then((res) => {
    setCurrentUser(res)
    closeAllPopups()
  })
  .catch((err) => { console.log(err) }
  );
}

function handleUpdateAvatar(src) {
  api.patchAvatar(src)
  .then((res) => {
    setCurrentUser(res)
    closeAllPopups()
  })
  .catch((err) => { console.log(err) });
}

function handleAddPlaceSubmit(data) {
  api.createNewCard(data)
  .then((newCard) => {
    setCards([newCard, ...cards])
    closeAllPopups()
  })
  .catch((err) => { console.log(err) });
}

function handleRegister(data) {
  auth.register(data)
    .then(() => {
      setIsInfoTooltip(true);
      navigate('/sign-in', { replace: true }); 
    })
    .catch((err) => {
      console.log(err);
      setIsInfoTooltip(false);
    })
    .finally(openInfoTooltip);
}

function handleLogin(data) {
  auth.authorize(data.password, data.email)
    .then((data) => {
      localStorage.setItem('jwt', data.token);
      setIsLoggedIn(true);
      navigate('/', { replace: true });
    })
    .catch((err) => {
      setIsInfoTooltip(false);
      openInfoTooltip();
      console.log(err);
    })
    .finally(() => setUserEmail(data.email));
}

function handleLogOut() {
  localStorage.removeItem('jwt');
  setIsLoggedIn(false);
  navigate('/sign-in');
}

function handleCheckToken() {
  const token = localStorage.getItem('jwt');
  if (token) {
    auth
      .checkToken()
      .then((res) => {
        setUserEmail(res.email);
        setIsLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => console.log(err));
  } else {
    return;
  }
}



return (
  <CurrentUserContext.Provider value={currentUser}>
    <div className='page'>

        <Header 
          src={header__logo}
          loggedIn={isLoggedIn}
          userEmail={userEmail}
          onLogOut={handleLogOut}
          alt='Логотип Место'
        />
        
        <Routes>

          <Route
            path='/'
            element={
              <ProtectedRouteElement
                element={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                cards={cards}
                loggedIn={isLoggedIn}
              />
            }
          ></Route>

          <Route
            path='/sign-up'
            element={<Register 
              handleRegister={handleRegister} 
            />}
          />
          <Route
            path='/sign-in'
            element={<Login 
              handleLogin={handleLogin} 
              onLogin={userEmail} 
            />}
          />

        </Routes>

        <Footer />

        <EditProfilePopup 
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
        />

        <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          isConfirm={isInfoTooltip}
          onClose={closeAllPopups}
        />

    </div>
  </CurrentUserContext.Provider>
);
}

export default App;

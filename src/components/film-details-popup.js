import { formatDate, getFilmDuration } from '../utils/common.js';
import AbstractSmartComponent from './abstract-smart-component';

const createImageEmojiTemplate = (emojiSrc) => {
  return emojiSrc ? (`<img src="${emojiSrc}" width="55" height="55" alt="emoji">`) : ``;
};

const createCommentTemplate = (comments) => {
  return comments
  .map((el) => {
    return `<li class="film-details__comment">
<span class="film-details__comment-emoji">
  <img src="${el.imgName}" width="55" height="55" alt="emoji">
</span>
<div>
  <p class="film-details__comment-text">${el.text}</p>
  <p class="film-details__comment-info">
    <span class="film-details__comment-author">${el.author}</span>
    <span class="film-details__comment-day">${el.date}</span>
    <button class="film-details__comment-delete">Delete</button>
  </p>
</div>
</li>`;
  }).join(`\n`);
};

const createFilmDetailsPopupTemplate = (card, option = {}) => {
  const { title, poster, age, director, writers, actors, country, rating, description, date, duration, genre, commentsCount, commentsText, isWatched, isFavorite, isInWatchlist } = card;
  const { emojiSrc } = option;
  const writersSummary = writers.slice(0, -2);
  const actorsSummary = actors.slice(0, -2);
  const randomFilmDateAndYear = formatDate(date);
  const filmDuration = getFilmDuration(duration);

  const getGenresName = genre.length > 1 ? `Genres` : `Genre`;
  const isWatchedFilm = isWatched ? `checked` : ``;
  const isFavoriteFilm = isFavorite ? `checked` : ``;
  const isInWatchlistFilm = isInWatchlist ? `checked` : ``;

  const rateFilm = isWatched ? `<div class="form-details__middle-container">
  <section class="film-details__user-rating-wrap">
    <div class="film-details__user-rating-controls">
      <button class="film-details__watched-reset" type="button">Undo</button>
    </div>
    <div class="film-details__user-score">
      <div class="film-details__user-rating-poster">
        <img src="${poster}" alt="film-poster" class="film-details__user-rating-img">
      </div>
      <section class="film-details__user-rating-inner">
        <h3 class="film-details__user-rating-title">${title}</h3>
        <p class="film-details__user-rating-feelings">How you feel it?</p>
        <div class="film-details__user-rating-score">
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
          <label class="film-details__user-rating-label" for="rating-1">1</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
          <label class="film-details__user-rating-label" for="rating-2">2</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
          <label class="film-details__user-rating-label" for="rating-3">3</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
          <label class="film-details__user-rating-label" for="rating-4">4</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
          <label class="film-details__user-rating-label" for="rating-5">5</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
          <label class="film-details__user-rating-label" for="rating-6">6</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
          <label class="film-details__user-rating-label" for="rating-7">7</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
          <label class="film-details__user-rating-label" for="rating-8">8</label>
          <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked>
          <label class="film-details__user-rating-label" for="rating-9">9</label>
        </div>
      </section>
    </div>
  </section>
</div>` : ``;
  return (
    `<section class="film-details js-film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn js-film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${age}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${title}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writersSummary}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actorsSummary}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${randomFilmDateAndYear}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${filmDuration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${getGenresName}</td>
              <td class="film-details__cell">
                <span class="film-details__genre">${genre}</span>
                <span class="film-details__genre">${genre}</span>
                <span class="film-details__genre">${genre}</span></td>
            </tr>
          </table>

          <p class="film-details__film-description">
          ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist " ${isInWatchlistFilm}>
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist js-film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatchedFilm}>
        <label for="watched" class="film-details__control-label film-details__control-label--watched js-film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavoriteFilm}>
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite js-film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>
    ${rateFilm}
    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
         <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>
         <ul class="film-details__comments-list">
         ${createCommentTemplate(commentsText)}
         </ul>
        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label js-film-details__add-emoji-label">
          ${createImageEmojiTemplate(emojiSrc)}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">Great movie!</textarea>
          </label>

          <div class="film-details__emoji-list js-film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="sleeping" checked>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img class="js-emoji-img" src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="neutral-face">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img class="js-emoji-img" src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-gpuke" value="grinning">
            <label class="film-details__emoji-label" for="emoji-gpuke">
              <img class="js-emoji-img" src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="grinning">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img class="js-emoji-img" src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`
  );
};

export default class FilmPopup extends AbstractSmartComponent {
  constructor(card) {
    super();
    this._card = card;
    this._subscribeOnEvents();
    this._emojiSrc = ``;
  }

  getTemplate() {
    return createFilmDetailsPopupTemplate(this._card, { emojiSrc: this._emojiSrc });
  }

  recoveryListeners() {
    this.setClosePopupClickHandler(this._closePopupClickHandler);
    this.setWatchedClickHandler(this._watchedClickHandler);
    this.addWatchListClickHandler(this._watchListClickHandler);
    this.addFavoriteClickHandler(this._favoriteClickHandler);
    this.setEmojiClickHandler();
    this._subscribeOnEvents();
  }

  rerender() {
    super.rerender();
  }

  setClosePopupClickHandler(handler) {
    this.getElement().querySelector(`.js-film-details__close-btn`)
      .addEventListener(`click`, handler);
    this._closePopupClickHandler = handler;
  }

  setWatchedClickHandler(handler) {
    this.getElement().querySelector(`.js-film-details__control-label--watched`)
      .addEventListener(`click`, handler);
    this._watchedClickHandler = handler;
  }

  addWatchListClickHandler(handler) {
    this.getElement().querySelector(`.js-film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);
    this._watchListClickHandler = handler;
  }

  addFavoriteClickHandler(handler) {
    this.getElement().querySelector(`.js-film-details__control-label--favorite`)
      .addEventListener(`click`, handler);
    this._favoriteClickHandler = handler;
  }

  setEmojiClickHandler() {
    this.getElement().querySelector(`.js-film-details__emoji-list`)
  .addEventListener(`click`, (evt) => {
    if (evt.target.tagName === `IMG`) {
      this._emojiSrc = evt.target.src;

      this.rerender();
    }

  });
  }
  _subscribeOnEvents() {
    const element = this.getElement();
    const resetWatchedElement = element.querySelector(`.film-details__watched-reset`);
    if (resetWatchedElement) {
      resetWatchedElement.addEventListener(`click`, () => {
        this._card.isWatched = !this._card.isWatched;
        this.rerender();
      });
    }
  }
}

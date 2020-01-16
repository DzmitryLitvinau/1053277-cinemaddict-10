import FilmCardComponent from '../components/card.js';
import FilmPopupComponent from '../components/film-details-popup.js';
import { RenderPosition, renderTemplate, replace, remove } from '../utils/render.js';

const Mode = {
  DEFAULT: `default`,
  POPUP: `popup`,
};

export default class MovieController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;

    this._mode = Mode.DEFAULT;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._closePopup = this._closePopup.bind(this);
  }

  render(card) {
    const oldfilmCardComponent = this._filmCardComponent;
    const oldfilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(card);
    this._filmDetailsComponent = new FilmPopupComponent(card);

    this._filmCardComponent.setShowPopupClickHandler(() => {
      document.addEventListener(`keydown`, this._onEscKeyDown);
      this._onViewChange();
      renderTemplate(document.body, this._filmDetailsComponent, RenderPosition.BEFOREEND);
      this._filmDetailsComponent.setClosePopupClickHandler(() =>
        this._closePopup()
      );
      this._mode = Mode.POPUP;
    });

    this._filmCardComponent.addFavoriteClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavorite: !card.isFavorite,
      }));
    });

    this._filmCardComponent.setWatchedClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched,
      }));
    });

    this._filmCardComponent.addWatchListClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isInWatchlist: !card.isInWatchlist,
      }));
    });

    this._filmDetailsComponent.addFavoriteClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isFavorite: !card.isFavorite,
      }));
      this._filmDetailsComponent.rerender();
    });

    this._filmDetailsComponent.setWatchedClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isWatched: !card.isWatched,
      }));
      this._filmDetailsComponent.rerender();
    });

    this._filmDetailsComponent.addWatchListClickHandler(() => {
      this._onDataChange(this, card, Object.assign({}, card, {
        isInWatchlist: !card.isInWatchlist,
      }));
      this._filmDetailsComponent.rerender();
    });


    this._filmDetailsComponent.setEmojiClickHandler(() => {
      this._filmDetailsComponent.rerender();
    });

    if (oldfilmDetailsComponent && oldfilmCardComponent) {
      replace(this._filmCardComponent, oldfilmCardComponent);
      replace(this._filmDetailsComponent, oldfilmDetailsComponent);
    } else {
      renderTemplate(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
    }
  }

  setDefaultView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closePopup();
    }
  }

  _closePopup() {
    remove(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);

    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      remove(this._filmDetailsComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
    this._mode = Mode.DEFAULT;
  }
}

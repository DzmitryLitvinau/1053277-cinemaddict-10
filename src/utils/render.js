import { generateComments } from '../mock/comments.js';
import CommentsComponent from '../components/comments.js';

const COMMENTS_COUNT = 5;

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

const renderTemplate = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const renderComments = (container) => {
  const comments = generateComments(COMMENTS_COUNT);
  comments.forEach((comment) => renderTemplate(container, new CommentsComponent(comment).getElement(), RenderPosition.BEFOREEND));
};

export { remove, RenderPosition, renderTemplate, renderComments };

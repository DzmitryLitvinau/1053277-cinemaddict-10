const createFilterTemplate = (filter) => {
  const { name, count } = filter;

  return (
    `<a href="#${name}" class="main-navigation__item">${name} <span class="main-navigation__item-count">${count}</span></a>`
  );
};

export const createMainNavigationTemplate = (filters) => {
  const filtersTemplate = filters.map((it, i) => createFilterTemplate(it, i === 0)).join(`\n`);

  return (
    `<nav class="main-navigation">
      ${filtersTemplate}
      <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
    </nav>`
  );
};

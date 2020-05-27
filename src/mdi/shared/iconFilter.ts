import { Icon } from "./models/icon";

function *filter(array, condition, maxSize) {
  if (!maxSize || maxSize > array.length) {
    maxSize = array.length;
  }
  let count = 0;
  let i = 0;
  while ( count< maxSize && i < array.length ) {
    if (condition(array[i])) {
      yield array[i];
      count++;
    }
    i++;
  }
}

export function iconFilter(icons: Icon[], term: string, limit: number = 5): Icon[] {
  const termRegex = new RegExp(term, 'i');
  const list = filter(
    icons,
    (icon) => {
      var match = icon.name!.match(termRegex) !== null;
      if (!match) {
        for(var i = 0, c = icon.aliases.length; i < c; i++) {
          if (icon.aliases[i].name.match(termRegex) !== null) {
            return true;
          }
        }
      }
      return match;
    },
    limit
  );
  return Array.from(list);
}
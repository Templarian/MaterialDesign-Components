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
      return icon.name!.match(termRegex);
    },
    limit
  );
  return Array.from(list);
}
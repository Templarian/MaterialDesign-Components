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
  const iconsByName = filter(
    icons,
    (icon) => {
      return icon.name!.match(termRegex) !== null;
    },
    limit
  );
  const list = Array.from(iconsByName);
  const skip: string[] = list.map(icon => icon.id);
  if (list.length < limit) {
    var iconsByAliases = filter(
      icons,
      (icon) => {
        if (skip.includes(icon.id)) {
          return false;
        }
        for(var i = 0, c = icon.aliases.length; i < c; i++) {
          if (icon.aliases[i].name == null) {
            console.log(icon.name, icon.aliases);
            return false;
          }
          if (icon.aliases[i].name.match(termRegex) !== null) {
            icon.aliases[i].match = true;
            return true;
          }
        }
        return false;
      },
      limit - list.length
    );
    const list2 = Array.from(iconsByAliases);
    list2.forEach(icon => list.push(icon));
  }
  return list;
}
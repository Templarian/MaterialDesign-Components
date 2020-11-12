export function list($list: HTMLElement, items: any[], key, add, update) {
  const elements = Array.from($list.children) as HTMLElement[];
  const current = elements.map((e: HTMLElement) => e.dataset.key);
  items.forEach(item => {
    if (current.length === 0) {
      const newItem = add(item);
      if (newItem instanceof DocumentFragment) {
        (newItem.children[0] as any).dataset.key = item[key];
      } else {
        newItem.dataset.key = item[key];
      }
      $list.appendChild(newItem);
      return;
    }
    const element = elements.find((e: HTMLElement) => e.dataset.key === current[key]);
    if (item[key] === current[key]) {
      update(item, element);
      return;
    }
    element?.remove();
  });
}

export function item<T>($list: HTMLElement, item: any[], key: string): T {
  const elements = Array.from($list.children);
  const ele = elements.find((e: HTMLElement) => e.dataset.key === item[key]);
  return ele as any;
}
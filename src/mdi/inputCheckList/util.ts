export function list($list: HTMLElement, options, key, add, update) {
  const elements = Array.from($list.children) as HTMLElement[];
  const current = elements.map((e: HTMLElement) => e.dataset.key);
  options.forEach(option => {
    if (current.length === 0) {
      const newItem = add(option);
      newItem.dataset.key = option[key];
      $list.appendChild(newItem)
      return;
    }
    const element = elements.find((e: HTMLElement) => e.dataset.key === current[key]);
    if (option[key] === current[key]) {
      update(option, element);
      return;
    }
    element?.remove();
  });
}
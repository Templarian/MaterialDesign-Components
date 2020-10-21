export interface Option {
  value: any;
  label: string;
  disabled?: boolean;
}

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

export function item($list: HTMLElement, option: Option, key: string): HTMLLIElement {
  const elements = Array.from($list.children);
  const item = elements.find((e: HTMLElement) => e.dataset.key === option[key]);
  return item as HTMLLIElement;
}
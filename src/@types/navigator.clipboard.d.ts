interface ClipboardItem {
  types: Array<string>;
  getType(type: string): Promise<void>;
}

declare var ClipboardItem: {
  prototype: ClipboardItem;
  new(data: Object): ClipboardItem;
};

// Overwrite interface to extend it with write() method
interface Clipboard extends EventTarget {
  readText(): Promise<string>;
  writeText(data: string): Promise<void>;
  write(data: Array<ClipboardItem>): Promise<void>;
}

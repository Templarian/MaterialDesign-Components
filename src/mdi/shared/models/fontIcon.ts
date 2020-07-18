export class FontIcon {
  public id: string;
  public codepoint: string;
  public font: string;

  from(tag: FontIcon): FontIcon {
    this.id = tag.id;
    this.codepoint = tag.codepoint;
    this.font = tag.font;
    return this;
  }

  to() {
    return {
      id: this.id,
      codepoint: this.codepoint,
      font: this.font
    }
  }
}
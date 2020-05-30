export class Alias {

  constructor (
    public id?: string,
    public name?: string
  ) { }

  public match: boolean = false;

  from(alias: Alias): Alias {
    this.id = alias.id;
    this.name = alias.name;
    return this;
  }

  to() {
    return {
      name: this.name
    };
  }

}
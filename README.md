# Material Design Icons - Website Components

> Note this repo is for the Material Design Icons website. If you want components for your own project look here:
>
> - [React](https://github.com/Templarian/MaterialDesign-React/)
> - [Web Component](https://github.com/Templarian/MaterialDesign-WebComponent/)

The website is made of many components, view the `src/mdi` folder to see the source.

- [View the Components](https://templarian.github.io/@mdi/components/)

## Contribute to this Project

To run the demo application locally use the following NPM commands.

```bash
npm install
npm test
npm start
# npm start [mdiButton|mdi-button]
```

Open http://localhost:8080 (port could vary)

To build just the components.

```bash
npm run build
```

## Publish

```bash
npm run publish
```

### Web Components

Web Components with a very basic wrapper. The only magic is...

- `@Prop() foo = 'Hello World`;
  - Calls `this.render()` on change.
- `@Part() $foo: HTMLDivElement;` = `<div part="foo"></div>`
  - `this.$part.innerText = 'Hello World!';`
- `@Local('default') foo;` Shorthand for localStorage.

Learn More: https://github.com/Templarian/Element
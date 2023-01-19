
class App extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    const template = this.cusTemplate()
    console.log(typeof template, template)
    this._shadowRoot.appendChild(template.content.cloneNode(true))
  }

  cusTemplate() {
    const template = document.createElement('template');
    template.innerHTML = `
    <h2>sdsadas</h2>
    <div>name-test</div>
  `
    return template
  }

}
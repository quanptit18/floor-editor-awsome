import { mount } from 'svelte'
import App from './App.svelte'
import styles from './app.css?inline'

class FloorEditor extends HTMLElement {
    constructor() {
        super()
        const shadow = this.attachShadow({ mode: 'open' })

        // Inject CSS vào shadow DOM
        const style = document.createElement('style')
        style.textContent = styles
        shadow.appendChild(style)

        // Mount Svelte 5 vào shadow DOM
        mount(App, {
            target: shadow,
            props: {}
        })
    }
}

if (!customElements.get('floor-editor')) {
    customElements.define('floor-editor', FloorEditor)
}
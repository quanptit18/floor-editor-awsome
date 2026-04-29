import { mount } from 'svelte'
import { writable } from 'svelte/store'
import App from './App.svelte'
import styles from './app.css?inline'

class FloorEditor extends HTMLElement {
    #app: any;
    #wrapper: any;
    #store = {
        floorData: writable(null),
        config: writable(null)
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' })

        const style = document.createElement('style')
        style.textContent = styles
        shadow.appendChild(style)

        this.#wrapper = document.createElement('div')
        shadow.appendChild(this.#wrapper)

        this.#app = mount(App, {
            target: this.#wrapper,
            props: {
                stores: this.#store,
                onDispatch: (eventName: string, detail: any) => {
                    this.dispatchEvent(new CustomEvent(eventName, {
                        detail,
                        bubbles: true,      // nổi lên DOM tree
                        composed: true      // vượt qua shadow DOM boundary
                    }))
                }
            }
        })
    }

    set floorData(value) {
        this.#store.floorData.set(value)
    }

    set config(value) {
        this.#store.config.set(value)
    }
}

if (!customElements.get('floor-editor')) {
    customElements.define('floor-editor', FloorEditor)
}
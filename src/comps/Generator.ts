/**
 * @module Generator
 * @category BEFORE-GAME
 * @todo Wyświetlanie na stronie planszy 
 * @param Size Sprawdź w Interfaces
 */

import { Size } from './Interfaces'

export default class Generator {
    public tab: (number | string)[][]

    constructor(Size: Size) {
        this.tab
        let tab = []
        for (let i = 0; i < Size.size; i++) {
            tab[i] = []
            for (let k = 0; k < Size.size; k++) {
                tab[i][k] = 0
                let div = document.createElement('div')
                div.classList.add('box')
                div.setAttribute('id', `${i}-${k}`)
                document.getElementById('right').appendChild(div)
            }
        }
        this.tab = tab
    }
}
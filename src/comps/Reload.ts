/**
 * @module Reload
 * @todo Obsługa przycisku do restartowania gry
 * @category IN-GAME
 */

import { Button } from './Interfaces'

@f
export default class Reload {
    constructor() {
        this.reload({ button: document.getElementById('restart'), operation: 'click' })
    }

    reload(Button: Button) {
        Button.button.addEventListener(Button.operation, function () {
            location.reload()
        })
    }
}

function f(target: Function) {
    document.getElementById('restart').addEventListener('mouseover', function (e) {
        document.getElementById('restart').classList.add('btn-styles')
    })
}
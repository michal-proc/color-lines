/**
 * @module Functions
 * @todo Funkcje statyczna(-e)
 * @category AFTER-GAME
 */

export default class Functions {

    @f
    static endGame() {
        alert('Gra skończona!')
    }
}

function f(ob: Object, name: string, desc: PropertyDescriptor) {
    desc.value = () => {
        const points = document.getElementById('points').innerText

        setTimeout(() => {
            const play = confirm(`Gra skończona!\nUzyskałeś ${points} punktów.\nGrasz jeszcze raz?`)

            if (play) location.reload()
        }, 25)
    }
}
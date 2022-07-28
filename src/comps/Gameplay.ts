/**
 * @module Gameplay
 * @category IN-GAME
 * @todo Klasa odpowiedzialna za całą rozgrywkę, poruszanie, zbijanie itp.
 * @param Main Sprawdź w Interfaces
 */

import { Main } from './Interfaces'
import Functions from './Functions'
import { collapseTextChangeRangesAcrossMultipleVersions } from '../../node_modules/typescript/lib/typescript'

export default class Gameplay {
    private tab: (number | string)[][]
    readonly colours: string[]
    private searching: boolean
    private startX: number
    private startY: number
    private endX: number
    private endY: number
    private boxes: NodeListOf<Element>
    private tmp: string

    constructor(Main: Main) {
        this.tab = Main.tab
        this.colours = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'aqua']
        this.searching = false
        this.startX
        this.startY
        this.endX
        this.endY
        this.tmp

        this.balls()
        this.place(3)

        this.boxes = document.querySelectorAll('.box')
        this.boxes.forEach((box) => {
            box.addEventListener('mouseenter', () => {
                this.endX = parseInt(box.getAttribute('id')[0].toString())
                this.endY = parseInt(box.getAttribute('id')[2].toString())
            })
            box.addEventListener('mouseleave', () => {
                for (let i = 0; i < this.tab.length; i++) {
                    for (let k = 0; k < this.tab[i].length; k++) {
                        if (this.tab[i][k] == 'M') this.tab[i][k] = 0

                        if (this.tab[i][k] > 0) this.tab[i][k] = 0

                        for (let i = 0; i < Math.sqrt(this.boxes.length); i++) {
                            for (let k = 0; k < Math.sqrt(this.boxes.length); k++) {
                                if (document.getElementById(`${i}-${k}`).style.backgroundColor == 'black') document.getElementById(`${i}-${k}`).style.backgroundColor = ''
                            }
                        }
                    }
                }
            })
            box.addEventListener('click', () => {
                if (this.searching) {
                    if (box.childNodes.length == 0) {
                        this.searching = false

                        let boolean = false
                        for (let i = 0; i < Math.sqrt(this.boxes.length); i++) {
                            for (let k = 0; k < Math.sqrt(this.boxes.length); k++) {
                                if (document.getElementById(`${i}-${k}`).style.backgroundColor != '') boolean = true
                            }
                        }

                        if (boolean) {
                            this.boxes.forEach((box2) => box2.removeEventListener('mouseenter', this.over))

                            for (let i = 0; i < Math.sqrt(this.boxes.length); i++) {
                                for (let k = 0; k < Math.sqrt(this.boxes.length); k++) {
                                    if (document.getElementById(`${i}-${k}`).style.backgroundColor == 'black') document.getElementById(`${i}-${k}`).style.backgroundColor = 'lightgray'
                                }
                            }

                            document.getElementById(`${this.endX}-${this.endY}`).appendChild(document.getElementById(`${this.startX}-${this.startY}`).childNodes[0])
                            document.getElementById(`${this.startX}-${this.startY}`).innerHTML = ''

                            const balls = document.querySelectorAll('.ball')
                            for (let i = 2; i < balls.length; i++) {
                                balls[i].classList.remove('bigger')
                            }

                            this.tab[this.endX][this.endY] = this.tmp
                            this.tab[this.startX][this.startY] = 0

                            let counter = 0
                            for (let i = 0; i < this.tab.length; i++) {
                                for (let k = 0; k < this.tab[i].length; k++) {
                                    if (typeof (this.tab[i][k]) == 'number') {
                                        this.tab[i][k] = 0
                                    } else {
                                        counter++
                                    }
                                }
                            }

                            let pointsBeforeCrash = document.getElementById('points').innerText
                            this.colours.forEach((col) => {
                                let counter = 0

                                for (let i = 0; i < this.tab.length; i++) {
                                    for (let k = 0; k < this.tab[i].length; k++) {
                                        if (col == this.tab[i][k]) counter++
                                    }
                                }

                                if (counter > 4) this.crash(col)
                            })

                            setTimeout(() => {
                                if (document.getElementById('points').innerText == pointsBeforeCrash) {
                                    if (counter < this.tab.length * this.tab.length - 3) this.place(3)
                                    else {
                                        if (counter - this.tab.length * this.tab.length == -3) this.place(3)
                                        if (counter - this.tab.length * this.tab.length == -2) this.place(2)
                                        if (counter - this.tab.length * this.tab.length == -1) this.place(1)

                                        Functions.endGame()
                                    }
                                } else this.place(0)
                            }, 150)
                        }
                    }
                }
                if (this.searching) {
                    if (box.childNodes.length == 1) {
                        if (this.tmp) {
                            for (let i = 0; i < this.tab.length; i++) {
                                for (let k = 0; k < this.tab[i].length; k++) {
                                    if (this.tab[this.startX][this.startY] == 'S') this.tab[this.startX][this.startY] = this.tmp
                                }
                            }
                        }

                        this.startX = parseInt(box.getAttribute('id')[0].toString())
                        this.startY = parseInt(box.getAttribute('id')[2].toString())

                        this.tmp = this.tab[this.startX][this.startY].toString()
                        this.tab[this.startX][this.startY] = 'S'

                        this.boxes.forEach((box2) => box2.addEventListener('mouseenter', this.over))
                    }
                }
            })
        })
    }

    crash(col: string) {
        let remove = []

        for (let i = 0; i < this.tab.length; i++) {
            for (let k = 0; k < this.tab[i].length; k++) {
                try {
                    if (
                        this.tab[i][k] == col &&
                        this.tab[i + 1][k] == col &&
                        this.tab[i + 2][k] == col &&
                        this.tab[i + 3][k] == col &&
                        this.tab[i + 4][k] == col
                    ) {
                        remove.push([i, k], [i + 1, k], [i + 2, k], [i + 3, k], [i + 4, k])
                    }
                } catch { }

                try {
                    if (
                        this.tab[i][k] == col &&
                        this.tab[i][k + 1] == col &&
                        this.tab[i][k + 2] == col &&
                        this.tab[i][k + 3] == col &&
                        this.tab[i][k + 4] == col
                    ) {
                        remove.push([i, k], [i, k + 1], [i, k + 2], [i, k + 3], [i, k + 4])
                    }
                } catch { }

                try {
                    if (
                        this.tab[i][k] == col &&
                        this.tab[i + 1][k + 1] == col &&
                        this.tab[i + 2][k + 2] == col &&
                        this.tab[i + 3][k + 3] == col &&
                        this.tab[i + 4][k + 4] == col
                    ) {
                        remove.push([i, k], [i + 1, k + 1], [i + 2, k + 2], [i + 3, k + 3], [i + 4, k + 4])
                    }
                } catch { }

                try {
                    if (
                        this.tab[i][k] == col &&
                        this.tab[i + 1][k - 1] == col &&
                        this.tab[i + 2][k - 2] == col &&
                        this.tab[i + 3][k - 3] == col &&
                        this.tab[i + 4][k - 4] == col
                    ) {
                        remove.push([i, k], [i + 1, k - 1], [i + 2, k - 2], [i + 3, k - 3], [i + 4, k - 4])
                    }
                } catch { }
            }
        }

        for (let i = 0; i < remove.length; i++) {
            if (parseInt(this.tab[remove[i][0]][remove[i][1]].toString()) != 0) {
                this.tab[remove[i][0]][remove[i][1]] = 0
                const points = parseInt(document.getElementById('points').innerText)
                document.getElementById('points').innerText = (points + 1).toString()
            }
        }
    }

    balls() {
        for (let i = 0; i < 3; i++) {
            let random = Math.floor(Math.random() * 7)

            document.getElementById(`b${i + 1}`).style.backgroundColor = this.colours[random]
        }
    }

    place(num: number) {
        const tmp = this
        for (let i = 0; i < num; i++) {
            let done
            do {
                done = false
                let random = Math.floor(Math.random() * 9)
                let random2 = Math.floor(Math.random() * 9)
                if (this.tab[random][random2] == 0) this.tab[random][random2] = document.getElementById(`b${i + 1}`).style.backgroundColor
                else done = true
            } while (done)
        }

        for (let i = 0; i < this.tab.length; i++) {
            for (let k = 0; k < this.tab[i].length; k++) {
                document.getElementById(`${i}-${k}`).innerHTML = ''
                if (this.tab[i][k] == 0) { } else {
                    let ball = document.createElement('div')
                    ball.classList.add('ball')
                    ball.style.backgroundColor = this.tab[i][k].toString()
                    ball.onclick = function () {
                        const balls = document.querySelectorAll('.ball')
                        let boolean
                        if (ball.classList.contains('bigger')) boolean = true
                        else boolean = false
                        for (let i = 2; i < balls.length; i++) {
                            balls[i].classList.remove('bigger')
                        }
                        if (boolean) {
                            tmp.boxes.forEach((box2) => box2.removeEventListener('mouseenter', tmp.over))
                            ball.classList.remove('bigger')
                            tmp.searching = false
                        }
                        else {
                            ball.classList.add('bigger')
                            tmp.searching = true
                        }
                    }
                    document.getElementById(`${i}-${k}`).appendChild(ball)
                }
            }
        }

        this.balls()
    }

    over = () => {
        for (let i = 0; i < this.tab.length; i++) {
            for (let k = 0; k < this.tab[i].length; k++) {
                if (this.tab[i][k] == 'M') this.tab[i][k] = 0

                if (this.tab[i][k] > 0) this.tab[i][k] = 0
            }
        }
        if (this.tab[this.endX][this.endY] >= 0) {
            this.tab[this.endX][this.endY] = 'M'
        }

        for (let i = 0; i < Math.sqrt(this.boxes.length); i++) {
            for (let k = 0; k < Math.sqrt(this.boxes.length); k++) {
                document.getElementById(`${i}-${k}`).style.backgroundColor = ''
            }
        }
        this.getDistance(this.startX, this.startY, 0)
        this.pathFinfing(this.endX, this.endY)
    }

    getDistance(x: number, y: number, dis: number): void {
        if (x < this.tab.length - 1 && (this.tab[x + 1][y] == 0 || this.tab[x + 1][y] > dis + 1)) {
            this.tab[x + 1][y] = dis + 1
            this.getDistance(x + 1, y, dis + 1)
        }

        if (x > 0 && (this.tab[x - 1][y] == 0 || this.tab[x - 1][y] > dis + 1)) {
            this.tab[x - 1][y] = dis + 1
            this.getDistance(x - 1, y, dis + 1)
        }

        if (y < this.tab[0].length - 1 && (this.tab[x][y + 1] == 0 || this.tab[x][y + 1] > dis + 1)) {
            this.tab[x][y + 1] = dis + 1
            this.getDistance(x, y + 1, dis + 1)
        }

        if (y > 0 && (this.tab[x][y - 1] == 0 || this.tab[x][y - 1] > dis + 1)) {
            this.tab[x][y - 1] = dis + 1
            this.getDistance(x, y - 1, dis + 1)
        }
    }

    pathFinfing(x: number, y: number) {
        if (document.getElementById(`${x}-${y}`).childNodes.length == 0) {

            let tab: (string | number)[] = []
            if (this.tab[x][y - 1]) tab.push(this.tab[x][y - 1])
            if (this.tab[x][y + 1]) tab.push(this.tab[x][y + 1])
            if (this.tab[x - 1]) tab.push(this.tab[x - 1][y])
            if (this.tab[x + 1]) tab.push(this.tab[x + 1][y])

            let best: (string | number) = this.tab.length * this.tab.length
            for (let i = 0; i < tab.length; i++) {
                if (!(this.colours.includes(tab[i].toString()) || tab[i].toString() == 'M')) {
                    if (tab[i] == 'S') best = tab[i]
                    else if (best != 'S' && tab[i] < best && tab[i] != 0) {
                        best = tab[i]
                    }
                }
            }

            let x1: number, y1: number
            if (this.tab[x][y - 1] && this.tab[x][y - 1] == best) x1 = x, y1 = y - 1
            else if (this.tab[x][y + 1] && this.tab[x][y + 1] == best) x1 = x, y1 = y + 1
            else if (this.tab[x - 1] && this.tab[x - 1][y] == best) x1 = x - 1, y1 = y
            else if (this.tab[x + 1] && this.tab[x + 1][y] == best) x1 = x + 1, y1 = y

            if ((best > 0 && best != this.tab.length * this.tab.length) || best == 'S') {
                document.getElementById(`${x}-${y}`).style.backgroundColor = 'black'
                document.getElementById(`${x1}-${y1}`).style.backgroundColor = 'black'
            }

            if (best != 'S' && best > 0 && best != this.tab.length * this.tab.length) this.pathFinfing(x1, y1)
            else if (best == 'S') document.getElementById(`${x1}-${y1}`).style.backgroundColor = 'black'
        }
    }
}
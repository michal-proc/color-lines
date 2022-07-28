export default class Table {
    tab: (number | string)[][]
    table: HTMLTableElement
    tr: HTMLTableRowElement
    td: HTMLTableCellElement
    count: number
    tab2: (number | string)[][]
    startX: number
    startY: number
    endX: number
    endY: number
    going: boolean

    constructor(tab: (number | string)[][]) {
        this.count = 0
        this.table = document.createElement('table')
        this.tab = tab
        this.tab2 = tab
        this.startX
        this.startY
        this.endX
        this.endY
        this.going = true

        this.X()
        this.html()
    }

    X(): void {
        for (let i = 0; i < 3; i++) {
            let back: boolean

            do {
                const random: number = Math.floor(Math.random() * this.tab.length)
                const random2: number = Math.floor(Math.random() * this.tab.length)
                back = false

                if (this.tab[random][random2] == 0) this.tab[random][random2] = 'X'
                else back = true

            } while (back)
        }
    }

    html(): void {

        for (let i = 0; i < this.tab.length; i++) {
            let tr = document.createElement('tr')
            for (let k = 0; k < this.tab[i].length; k++) {
                let td = document.createElement('td')
                td.innerText = this.tab[i][k].toString()
                td.setAttribute('id', `${i}-${k}`)
                td.onclick = () => this.click(td)
                tr.appendChild(td)
            }
            this.table.appendChild(tr)
        }

        document.body.appendChild(this.table)
    }

    click(el: HTMLTableCellElement): void {
        if (el.innerText == '0') {
            this.count++

            if (this.count == 1) {
                el.innerText = 'S'
                const x = el.getAttribute('id').substr(0, el.getAttribute('id').indexOf('-'))
                const y = el.getAttribute('id').substr(el.getAttribute('id').indexOf('-') + 1, el.getAttribute('id').length - el.getAttribute('id').indexOf('-') + 1)

                this.startX = parseInt(x)
                this.startY = parseInt(y)

                this.tab2 = this.tab
                this.tab2[this.startX][this.startY] = 'S'
            }

            if (this.count == 2) {
                el.innerText = 'M'
                const x = el.getAttribute('id').substr(0, el.getAttribute('id').indexOf('-'))
                const y = el.getAttribute('id').substr(el.getAttribute('id').indexOf('-') + 1, el.getAttribute('id').length - el.getAttribute('id').indexOf('-') + 1)

                this.endX = parseInt(x)
                this.endY = parseInt(y)

                this.tab2 = this.tab
                this.tab2[this.endX][this.endY] = 'M'

                this.getDistance(this.startX, this.startY, 0)

                if (this.going) this.searchWay(this.endX, this.endY)
            }
        }
    }

    getDistance(x: number, y: number, dis: number): void {
        if (x < this.tab2.length - 1 && (this.tab2[x + 1][y] == 0 || this.tab2[x + 1][y] > dis + 1)) {
            this.tab2[x + 1][y] = dis + 1
            document.getElementById(`${x + 1}-${y}`).innerText = (dis + 1).toString()
            this.getDistance(x + 1, y, dis + 1)
        }

        if (x > 0 && (this.tab2[x - 1][y] == 0 || this.tab2[x - 1][y] > dis + 1)) {
            this.tab2[x - 1][y] = dis + 1
            document.getElementById(`${x - 1}-${y}`).innerText = (dis + 1).toString()
            this.getDistance(x - 1, y, dis + 1)
        }

        if (y < this.tab2[0].length - 1 && (this.tab2[x][y + 1] == 0 || this.tab2[x][y + 1] > dis + 1)) {
            this.tab2[x][y + 1] = dis + 1
            document.getElementById(`${x}-${y + 1}`).innerText = (dis + 1).toString()
            this.getDistance(x, y + 1, dis + 1)
        }

        if (y > 0 && (this.tab2[x][y - 1] == 0 || this.tab2[x][y - 1] > dis + 1)) {
            this.tab2[x][y - 1] = dis + 1
            document.getElementById(`${x}-${y - 1}`).innerText = (dis + 1).toString()
            this.getDistance(x, y - 1, dis + 1)
        }

        if (dis == 0) {
            let isTransition = false
            for (let i = 0; i < this.tab2.length; i++) {
                for (let k = 0; k < this.tab2[i].length; k++) {
                    if (this.tab2[i][k] == 1) isTransition = true
                }
            }

            if (x < this.tab2.length - 1 && this.tab2[x + 1][y] == 'M') isTransition = true
            if (x > 0 && this.tab2[x - 1][y] == 'M') isTransition = true
            if (y < this.tab2[0].length - 1 && this.tab2[x][y + 1] == 'M') isTransition = true
            if (y > 0 && this.tab2[x][y - 1] == 'M') isTransition = true

            if (isTransition == false) {
                setTimeout(() => alert("Can't find any way, sorry..."), 10)
                this.going = false
            }
        }
    }

    searchWay(x: number, y: number): void {
        if (this.going) {
            let tmp = []
            if (x < this.tab2.length - 1 && this.tab2[x + 1][y] != 'X' && this.tab2[x + 1][y] != 0) tmp.push([x + 1, y, this.tab2[x + 1][y]])
            if (x > 0 && this.tab2[x - 1][y] != 'X' && this.tab2[x - 1][y] != 0) tmp.push([x - 1, y, this.tab2[x - 1][y]])
            if (y < this.tab2[0].length - 1 && this.tab2[x][y + 1] != 'X' && this.tab2[x][y + 1] != 0) tmp.push([x, y + 1, this.tab2[x][y + 1]])
            if (y > 0 && this.tab2[x][y - 1] != 'X' && this.tab2[x][y - 1] != 0) tmp.push([x, y - 1, this.tab2[x][y - 1]])

            if (tmp.length == 0) {
                setTimeout(() => alert("Can't find any way, sorry..."), 10)
                this.going = false
            }
            else document.getElementById(`${x}-${y}`).style.backgroundColor = 'orange'

            let less = [0, 0, this.tab2.length * this.tab2.length]
            for (let i = 0; i < tmp.length; i++) {
                if (tmp[i][2] == 'S') {
                    document.getElementById(`${tmp[i][0]}-${tmp[i][1]}`).style.backgroundColor = 'orange'
                    this.going = false
                }
                else if (tmp[i][2] != 'X' && less[2] > tmp[i][2]) {
                    less[0] = parseInt(tmp[i][0].toString())
                    less[1] = parseInt(tmp[i][1].toString())
                    less[2] = parseInt(tmp[i][2].toString())
                }
            }

            if (this.going) this.searchWay(less[0], less[1])
        }
    }
}

const socket = io();
const teams = {
    "boter": "&#128049;",
    "kaas": "&#128054;",
    "eieren": "&#129409;"
}

const colors = {
    "boter": "deepPink",
    "kaas": "green",
    "eieren": "gold"
}

socket.on('team', (team) => {

    const SIZE = 30
    const FIELD_SIZE = Math.pow(SIZE, 2);


    for (let i = 0; i < FIELD_SIZE; i++) {

        let el = document.createElement('div')
        el.className = "square"
        el.addEventListener('click', () => {
            let x = Math.floor(i / SIZE)
            let y = i % SIZE
            socket.emit('place', {
                x: x,
                y: y,
            })
        })
        document.querySelector('.field').appendChild(el)
    }

    socket.on('refresh', (data) => {
        console.log(data)
        data.field.forEach((list, x) => {
            list.forEach((field, y) => {

                i = y + SIZE * x + 1

                if (field) {
                    let el = document.querySelector(`.square:nth-child(${i})`)
                    el.innerHTML = teams[field]
                    el.style.background = colors[field]
                }
            })
        });
    })
})

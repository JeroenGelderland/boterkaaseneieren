const SIZE = 30

export default class Game{

    constructor(){

        this.team_options = ["boter", "kaas", "eieren"]
        this.players = {}
        this.field = []

        for(let i = 0; i < SIZE; i++){
            this.field.push([])
        }
    }

    start(){
        this.current = Math.floor(Math.random() * Object.keys(this.players).length)
    }

    reset(){
        this.field = []

        for(let i = 0; i < SIZE; i++){
            this.field.push([])
        }
    }

    place(pos, id){
        console.log(id)
        if(Object.keys(this.players)[this.current] === id){
            if(!this.field[pos.x][pos.y]){
                console.log(this.players[id])
                this.field[pos.x][pos.y] = this.players[id]['team']

                this.current = (this.current + 1) % Object.keys(this.players).length

                return true
            }
        }
        
        return false
    }

    join(id){
        let team = this.team_options.splice(Math.floor(Math.random() * this.team_options.length), 1)[0]
        if(team){
            this.players[id] = {}
            this.players[id]['team'] = team
            if(Math.floor(Math.random() * Object.keys(this.players).length)){
                this.start()
            }
            return team
        }
        return false
    }

    leave(id){
        if(this.players[id]){
            this.team_options.push(this.players[id]['team'])
        }
        delete this.players[id]
    }

}
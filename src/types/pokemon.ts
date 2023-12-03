export type Pokemon = {
    id: number
    name: string
    height: number
    weight: number
    description: string
    imgUrl: string
    types: string[]
    abilities: [{ ability: { name: string, url: string }, is_hidden: boolean }]
}

export type PokemonData = {
    id: number
    name: string
    description: string
    height: number
    weight: number
    sprites: { front_default: string }
    types: [{ type: { name: string } }]
    abilities: [{ ability: { name: string, url: string }, is_hidden: boolean }]
}

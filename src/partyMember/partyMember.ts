export type Equipment = {
    id: string
    name: string
    physicalDefence: number
    magicDefence: number
    physicalStrength: number
    magicStrength: number
}

export type PartyMemberDefinition = {
    hp: number
    name: string
    id: string
    equipment: Equipment[]
}

export default class PartyMember {
    hp
    maxHp
    name
    id
    physicalDefence
    magicDefence
    physicalStrength
    magicStrength

    constructor(def: PartyMemberDefinition) {
        const addUp = (attr: string) =>
            def.equipment.reduce((acc, x: any) => acc + x[attr], 0)

        this.hp = def.hp
        this.maxHp = def.hp
        this.name = def.name
        this.id = def.id
        this.physicalDefence = addUp('physicalDefence')
        this.magicDefence = addUp('magicDefence')
        this.physicalStrength = addUp('physicalStrength')
        this.magicStrength = addUp('magicStrength')
    }

    getStats() {
        return {
            hp: this.hp,
            maxHp: this.maxHp,
            name: this.name,
            id: this.id,
            physicalDefence: this.physicalDefence,
            magicDefence: this.magicDefence,
            physicalStrength: this.physicalStrength,
            magicStrength: this.magicStrength
        }
    }
}

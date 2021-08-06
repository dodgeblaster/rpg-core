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
        if (process.env.NODE_ENV !== 'test') {
            throw new Error('Not available')
        }
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

    // recieveAction(element: string, strength: number) {
    //     let str = strength
    //     if (this.element === element) {
    //         str = str * 0.9
    //     }

    //     if (this.antiElement === element) {
    //         str = str * 1.18
    //     }

    //     str =
    //         this.element === element
    //             ? str - this.defense
    //             : str - this.defense < 0
    //             ? 0
    //             : str - this.defense

    //     const final = Math.floor(str * 100 > 9999 ? 9999 : str * 100)

    //     this.hp =
    //         this.hp - final < 0
    //             ? 0
    //             : this.hp - final > this.maxHp
    //             ? this.maxHp
    //             : this.hp - final

    //     return {
    //         hp: this.hp,
    //         result: final
    //     }
    // }

    // act(situations: string[]) {
    //     const actions = this.actions.map((a) => {
    //         let xx = false
    //         for (const situation of situations) {
    //             if (situation === a.trigger) {
    //                 xx = true
    //             }
    //         }

    //         return {
    //             ...a,
    //             weight: xx ? a.triggerLikelyhood : a.likelyhood
    //         }
    //     })
    // }
}

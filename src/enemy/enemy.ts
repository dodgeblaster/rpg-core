export type Action = {
    id: string
    name: string
    strength: number
    element: string[]
    likelyhood: number
    trigger: string // event
    triggerLikelyhood: number
}

export type EnemyDefinition = {
    hp: number
    mp: number
    name: string
    id: string
    defense: number
    element: string
    antiElement: string
    actions: Action[]
}

const min0max9999 = (n: number) => {
    if (n < 0) return 0
    if (n > 9999) return 9999
    return n
}

const min9999max9999 = (n: number) => {
    if (n < -9999) return -9999
    if (n > 9999) return 9999
    return n
}

const min0max = (max: number) => (n: number) => {
    if (n < 0) return 0
    if (n > max) return max
    return n
}

export default class Enemy {
    hp
    mp
    name
    id
    defense
    element
    antiElement
    actions
    maxHp
    constructor(def: EnemyDefinition) {
        this.hp = def.hp
        this.maxHp = def.hp
        this.mp = def.mp
        this.name = def.name
        this.id = def.id
        this.defense = def.defense
        this.element = def.element
        this.antiElement = def.antiElement
        this.actions = def.actions
    }

    recieveAction(element: string, strength: number) {
        const STRONG_AGAINST_ELEMENT = this.element === element
        const WEAK_AGAINST_ELEMENT = this.antiElement === element
        const NORMAL = this.antiElement !== element && this.element !== element

        let str = strength

        if (STRONG_AGAINST_ELEMENT) {
            str = min9999max9999(str * 0.9 - this.defense)
        }

        if (WEAK_AGAINST_ELEMENT) {
            str = min0max9999(str * 1.18 - this.defense)
        }

        if (NORMAL) {
            str = min0max9999(str * 1 - this.defense)
        }

        const final = Math.floor(str * 100)
        this.hp = min0max(this.maxHp)(this.hp - final)

        return {
            hp: this.hp,
            result: final
        }
    }

    act(situations: string[]) {
        if (situations.length === 0) {
            const defaultAction = this.actions.find(
                (x) => x.trigger === 'default'
            )
            return defaultAction
        }
        const actions = this.actions.map((a) => {
            let matchesScenario = false
            for (const situation of situations) {
                if (situation === a.trigger) {
                    matchesScenario = true
                }
            }

            return {
                ...a,
                weight: matchesScenario ? a.triggerLikelyhood : a.likelyhood
            }
        })

        let chosenBestScore = 0
        let chosen = actions[0]

        actions.forEach((x) => {
            if (x.weight > chosenBestScore) {
                chosenBestScore = x.weight
                chosen = x
            }
        })

        return chosen
    }
}

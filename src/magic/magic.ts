export type Action = {
    id: string
    name: string
    strength: number
    cost: number
    element: string[]
}

type PartyMember = {
    id: string
    name: string
    mp: number
    actions: Action[]
}

type Input = {
    party: PartyMember[]
}

export default class Magic {
    mp: Record<string, number>
    maxMp: Record<string, number>
    actions: Record<string, any>

    constructor(input: Input) {
        this.mp = input.party.reduce((acc, x) => {
            acc[x.id] = x.mp
            return acc
        }, {} as Record<string, number>)

        this.maxMp = input.party.reduce((acc, x) => {
            acc[x.id] = x.mp
            return acc
        }, {} as Record<string, number>)

        this.actions = input.party.reduce((acc, x) => {
            acc[x.id] = x.actions.reduce((acc, x) => {
                acc[x.id] = x
                return acc
            }, {} as any)
            return acc
        }, {} as Record<string, any>)
    }

    cast(input: { partyMemberId: string; actionId: string }) {
        const action = this.actions[input.partyMemberId][input.actionId]

        if (action.cost > this.mp[input.partyMemberId]) {
            return {
                action,
                status: 'NOT_ENOUGH_MP',
                remainingMp: this.mp[input.partyMemberId]
            }
        }

        this.mp[input.partyMemberId] =
            this.mp[input.partyMemberId] - action.cost
        return {
            action,
            status: 'SUCCESS',
            remainingMp: this.mp[input.partyMemberId]
        }
    }

    addMp(input: { partyMemberId: string; mp: number }) {
        const mpToUpdate = this.mp[input.partyMemberId]
        const maxMp = this.maxMp[input.partyMemberId]
        const isOverMax = mpToUpdate + input.mp > maxMp
        this.mp[input.partyMemberId] = isOverMax ? maxMp : mpToUpdate + input.mp
    }

    getPartyMp() {
        return this.mp
    }
}

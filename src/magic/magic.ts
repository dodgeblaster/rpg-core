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

/**
 * This function takes an array of party members, and is interested in 2 things:
 * - party members mp
 * - party members abilities or actions
 *
 * This function loops thru all members and creates 3 maps:
 * - one map where the key is member id, and value is available MP
 * - one map where the key is member id, and value is max MP (does not change)
 * - one map where the key is member id, and the value is a map
 *      - this map has a key of action id, and value of action
 */
function buildUpMagicState(party: PartyMember[]) {
    const buildMpMap = (state: any, partyMember: PartyMember) => {
        state.mp[partyMember.id] = partyMember.mp
        return state
    }

    const buildMaxMpMap = (state: any, partyMember: PartyMember) => {
        state.maxMp[partyMember.id] = partyMember.mp
        return state
    }

    const buildActionMap = (state: any, partyMember: PartyMember) => {
        state.actions[partyMember.id] = {}
        partyMember.actions.forEach((x: Action) => {
            state.actions[partyMember.id][x.id] = x
        })
        return state
    }

    const buildUpContext = (state: any, partyMember: PartyMember) => {
        state = buildMpMap(state, partyMember)
        state = buildMaxMpMap(state, partyMember)
        state = buildActionMap(state, partyMember)
        return state
    }

    const initialState = {
        mp: {},
        maxMp: {},
        actions: {}
    }

    return party.reduce(buildUpContext, initialState)
}

export default class Magic {
    mp: Record<string, number>
    maxMp: Record<string, number>
    actions: Record<string, any>

    constructor(input: Input) {
        const result = buildUpMagicState(input.party)
        this.mp = result.mp
        this.maxMp = result.maxMp
        this.actions = result.actions
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

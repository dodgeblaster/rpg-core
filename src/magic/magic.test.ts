import MagicDS from './magic'

const mockInput = {
    party: [
        {
            id: '1',
            name: '1',
            mp: 100,
            actions: [
                {
                    id: 'fire',
                    name: 'fire',
                    cost: 10,
                    strength: 10,
                    element: ['FIRE']
                }
            ]
        },
        {
            id: '2',
            name: '2',
            mp: 100,
            actions: [
                {
                    id: 'fire',
                    name: 'fire',
                    cost: 10,
                    strength: 10,
                    element: ['FIRE']
                }
            ]
        }
    ]
}

test('magicDS can return magic at cost', () => {
    const magic = new MagicDS(mockInput)

    const result = magic.cast({
        partyMemberId: '1',
        actionId: 'fire'
    })

    expect(result).toEqual({
        action: {
            id: 'fire',
            name: 'fire',
            cost: 10,
            strength: 10,
            element: ['FIRE']
        },
        status: 'SUCCESS',
        remainingMp: 90
    })

    expect(magic.getPartyMp()).toEqual({ '1': 90, '2': 100 })
})

test('magicDS can return not enough MP if not enough mp', () => {
    const magic = new MagicDS({
        party: [
            {
                id: '1',
                name: '1',
                mp: 9,
                actions: [
                    {
                        id: 'fire',
                        name: 'fire',
                        cost: 10,
                        strength: 10,
                        element: ['FIRE']
                    }
                ]
            }
        ]
    })

    const result = magic.cast({
        partyMemberId: '1',
        actionId: 'fire'
    })

    expect(result).toEqual({
        action: {
            id: 'fire',
            name: 'fire',
            cost: 10,
            strength: 10,
            element: ['FIRE']
        },
        status: 'NOT_ENOUGH_MP',
        remainingMp: 9
    })

    expect(magic.getPartyMp()).toEqual({ '1': 9 })
})

test('magicDS can regain mp', () => {
    const magic = new MagicDS({
        party: [
            {
                id: '1',
                name: '1',
                mp: 100,
                actions: [
                    {
                        id: 'fire',
                        name: 'fire',
                        cost: 10,
                        strength: 10,
                        element: ['FIRE']
                    }
                ]
            }
        ]
    })

    magic.cast({ partyMemberId: '1', actionId: 'fire' })
    magic.addMp({ partyMemberId: '1', mp: 10 })

    expect(magic.getPartyMp()).toEqual({ '1': 100 })
})

test('magicDS can regain mp but not over their starting mp value', () => {
    const magic = new MagicDS({
        party: [
            {
                id: '1',
                name: '1',
                mp: 100,
                actions: [
                    {
                        id: 'fire',
                        name: 'fire',
                        cost: 10,
                        strength: 10,
                        element: ['FIRE']
                    }
                ]
            }
        ]
    })

    magic.cast({ partyMemberId: '1', actionId: 'fire' })
    magic.addMp({ partyMemberId: '1', mp: 12 })

    expect(magic.getPartyMp()).toEqual({ '1': 100 })
})

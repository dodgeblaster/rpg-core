import PartyMember from './partyMember'

test('PartyMember can getStats', () => {
    const member = new PartyMember({
        hp: 100,
        name: 'John',
        id: 'm_1234',
        equipment: [
            {
                id: 'helmet',
                name: 'helmet',
                physicalDefence: 10,
                magicDefence: 1,
                physicalStrength: 1,
                magicStrength: 1
            },
            {
                id: 'mail',
                name: 'mail',
                physicalDefence: 20,
                magicDefence: 1,
                physicalStrength: 1,
                magicStrength: 1
            },
            {
                id: 'sword',
                name: 'sword',
                physicalDefence: 0,
                magicDefence: 0,
                physicalStrength: 12,
                magicStrength: 1
            }
        ]
    })

    expect(member.getStats()).toEqual({
        hp: 100,
        maxHp: 100,
        name: 'John',
        id: 'm_1234',
        physicalDefence: 30,
        magicDefence: 2,
        physicalStrength: 14,
        magicStrength: 3
    })
})

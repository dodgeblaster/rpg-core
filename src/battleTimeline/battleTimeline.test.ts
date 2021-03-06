import BattleTimelineDS from './battleTimeline'

jest.mock('../_common/utils', () => ({
    randomBetween0And: () => 0
}))

test('battleTimelineDS will throw error if players is an empty array', () => {
    try {
        const timeline = new BattleTimelineDS({
            players: []
        })
    } catch (e) {
        expect(e.message).toBe('Timeline needs at least 1 player')
    }
})

test('battleTimelineDS will calculate timeline', () => {
    const timeline = new BattleTimelineDS({
        players: [
            {
                id: '1',
                name: '1',
                speed: 5
            },
            {
                id: '2',
                name: '2',
                speed: 7
            },
            {
                id: '3',
                name: '3',
                speed: 10
            }
        ]
    })

    expect(timeline.getTimeline({})).toEqual([
        '1',
        '2',
        '3',
        '3',
        '2',
        '1',
        '3',
        '2',
        '1',
        '3',
        '2',
        '1',
        '3',
        '2',
        '3',
        '1',
        '2',
        '3',
        '1',
        '3'
    ])
})

test('battleTimelineDS will calculate timeline with offset', () => {
    const timeline = new BattleTimelineDS({
        players: [
            {
                id: '1',
                name: '1',
                speed: 5
            },
            {
                id: '2',
                name: '2',
                speed: 7
            },
            {
                id: '3',
                name: '3',
                speed: 10
            }
        ]
    })

    expect(
        timeline.getTimeline({
            potentialOffset: {
                id: '2',
                offset: 10
            }
        })
    ).toEqual([
        '1',
        '3',
        '2',
        '3',
        '2',
        '1',
        '3',
        '2',
        '1',
        '3',
        '2',
        '1',
        '3',
        '2',
        '3',
        '1',
        '2',
        '3',
        '1',
        '3'
    ])
})

test('battleTimelineDS with no additional offsets, will go thru timeline correctly when turns are taken', () => {
    const timeline = new BattleTimelineDS({
        players: [
            {
                id: '1',
                name: '1',
                speed: 5
            },
            {
                id: '2',
                name: '2',
                speed: 7
            },
            {
                id: '3',
                name: '3',
                speed: 10
            }
        ]
    })

    const takeTurn = (x: string) => timeline.takeTurn({ id: x, offset: 0 })
    const expectNextTurnToBe = (x: string) =>
        expect(timeline.getTimeline({})[0]).toBe(x)

    const myTimeline = timeline.getTimeline({})
    myTimeline.forEach((id: string) => {
        expectNextTurnToBe(id)
        takeTurn(id)
    })
})

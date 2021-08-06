import EnemyDS, { EnemyDefinition, Action } from './enemy'

const defaultAction = {
    id: 'punch_12354',
    name: 'punch',
    strength: 50,
    element: [],
    likelyhood: 0,
    trigger: 'default',
    triggerLikelyhood: 0
}

test('Enemy DS can receive an attack', () => {
    const input: EnemyDefinition = {
        hp: 500,
        mp: 0,
        defense: 20,
        id: 'dog',
        name: 'Dog',
        element: 'NONE',
        antiElement: 'NONE',
        actions: [defaultAction]
    }

    const enemy = new EnemyDS(input)

    const x = enemy.recieveAction('GENERAL', 22)
    expect(x).toEqual({ hp: 300, result: 200 })

    const xx = enemy.recieveAction('GENERAL', 30)
    expect(xx).toEqual({ hp: 0, result: 1000 })
})

test('Enemy DS will be hit harder if with antiElement', () => {
    const input: EnemyDefinition = {
        hp: 500,
        mp: 0,
        defense: 20,
        id: 'dog',
        name: 'Dog',
        element: 'NONE',
        antiElement: 'ICE',
        actions: [defaultAction]
    }

    const enemy = new EnemyDS(input)
    const x = enemy.recieveAction('ICE', 22)
    expect(x).toEqual({ hp: 0, result: 595 })
})

test('Enemy DS will be hit less if with element', () => {
    const input: EnemyDefinition = {
        hp: 500,
        mp: 0,
        defense: 20,
        id: 'dog',
        name: 'Dog',
        element: 'ICE',
        antiElement: 'NONE',
        actions: [defaultAction]
    }

    const enemy = new EnemyDS(input)
    const x = enemy.recieveAction('ICE', 22)
    expect(x).toEqual({ hp: 500, result: -20 })
})

test('Enemy DS will error no default action is given', () => {
    const input: EnemyDefinition = {
        hp: 500,
        mp: 0,
        defense: 20,
        id: 'dog',
        name: 'Dog',
        element: 'ICE',
        antiElement: 'NONE',
        actions: []
    }
    try {
        const enemy = new EnemyDS(input)
    } catch (e) {
        expect(e.message).toBe(
            'Each enemy must have an action triggered by "default"'
        )
    }
})

test('Enemy DS can execute default action if there is no scenario', () => {
    const defaultAction: Action = {
        id: 'punch_12354',
        name: 'punch',
        strength: 50,
        element: [],
        likelyhood: 30,
        trigger: 'default',
        triggerLikelyhood: 100
    }
    const input: EnemyDefinition = {
        hp: 500,
        mp: 0,
        defense: 20,
        id: 'dog',
        name: 'Dog',
        element: 'ICE',
        antiElement: 'NONE',
        actions: [defaultAction]
    }

    const enemy = new EnemyDS(input)
    const x = enemy.act([])

    expect(x).toEqual({
        id: 'punch_12354',
        name: 'punch',
        strength: 50,
        element: [],
        likelyhood: 30,
        trigger: 'default',
        triggerLikelyhood: 100
    })
})

test('Enemy DS can execute scenario matching action', () => {
    const defaultAction: Action = {
        id: 'punch_12354',
        name: 'punch',
        strength: 50,
        element: [],
        likelyhood: 0,
        trigger: 'default',
        triggerLikelyhood: 0
    }
    const inWaterAction: Action = {
        id: 'splash_12354',
        name: 'splash',
        strength: 50,
        element: [],
        likelyhood: 100,
        trigger: 'inWater',
        triggerLikelyhood: 100
    }
    const input: EnemyDefinition = {
        hp: 500,
        mp: 0,
        defense: 20,
        id: 'dog',
        name: 'Dog',
        element: 'ICE',
        antiElement: 'NONE',
        actions: [defaultAction, inWaterAction]
    }

    const enemy = new EnemyDS(input)
    const x = enemy.act(['inWater'])

    expect(x).toEqual({
        id: 'splash_12354',
        name: 'splash',
        strength: 50,
        element: [],
        likelyhood: 100,
        trigger: 'inWater',
        triggerLikelyhood: 100,
        weight: 100
    })
})

import core from './index'

test('RPGCore includes BattleTimeline class', () => {
    expect(core.BattleTimeline).toBeTruthy()
})

test('RPGCore includes Enemy class', () => {
    expect(core.Enemy).toBeTruthy()
})

test('RPGCore includes Inventory class', () => {
    expect(core.Inventory).toBeTruthy()
})

test('RPGCore includes Magic class', () => {
    expect(core.Magic).toBeTruthy()
})

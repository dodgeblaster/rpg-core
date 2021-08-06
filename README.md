[![CI](https://github.com/dodgeblaster/rpg-core/actions/workflows/main.yml/badge.svg)](https://github.com/dodgeblaster/rpg-core/actions/workflows/main.yml)

# Goals of Project

The goal of this project is to provide data structures for common
usecases when creating an rpg. They are meant to be as generic
as possible so they can be used in many scenarios.

### Example:

The enemy and items datastructres just hold the data and provide
methods to access that data. How these things fit into a larger project
is determined by the code that uses these data structures. Updating UI for
example is not implemented.

### Battle Example (pseudo code representing the idea)

```js
function startBattle(input) {
    // setup data structures
    const enemies = new EnemyList(input.enemyList)
    const party = new PartyList(input.partyList)
    const inventory = new Items(input.inventory)
    const magic = new Magic(input.partyList)
    const battleTimeline = new BattleTimeline([
        ...input.enemyList,
        ...input.partyList
    ])

    // setup listeners and event emitters
    document.getElementById.addEventListener('attack', () => {
        // update timeline
        battleTimeline.takeTurn({ id: 'me', offset: 0 })
        emit('updateTimeLine', battleTimeline.getTimeline())

        // take action on enemy
        const result = enemeies.receiveAction({ str: 10, element: 'ICE' })

        // emit actors animations
        emit('requestPartyMemberAnimation', {
            id: 'me',
            animation: 'attack',
            target: 'enemey_1',
            result: result
        })
    })
}
```

import ItemsDS from './index'

describe('itemsDS', () => {
    test('works', () => {
        const items = new ItemsDS({})

        items.addItem({
            name: 'Potion',
            id: 'potion'
        })

        items.addItem({
            name: 'Potion',
            id: 'potion'
        })

        items.addItem({
            name: 'Ether',
            id: 'ether'
        })

        items.addItem({
            name: 'Ether',
            id: 'ether'
        })

        expect(items.listItems()).toEqual([
            { name: 'Potion', id: 'potion', count: 2 },
            { name: 'Ether', id: 'ether', count: 2 }
        ])

        items.useItem('potion')
        expect(items.listItems()).toEqual([
            { name: 'Potion', id: 'potion', count: 1 },
            { name: 'Ether', id: 'ether', count: 2 }
        ])

        items.useItem('potion')
        expect(items.listItems()).toEqual([
            { name: 'Ether', id: 'ether', count: 2 }
        ])

        items.dropItem('ether')
        expect(items.listItems()).toEqual([])

        const doesNotExist = items.useItem('doesNotExist')
        expect(doesNotExist).toBe(0)
    })
})

import { InventoryDSInterface } from './interface'

type Item = {
    name: string
    id: string
}

type Items = Record<
    string,
    {
        count: number
        item: Item
    }
>

export default class InventoryDS implements InventoryDSInterface {
    items: Items

    constructor(items: Items) {
        this.items = items
    }

    addItem(item: Item) {
        if (this.items[item.id]) {
            this.items[item.id].count++
        } else {
            this.items[item.id] = {
                count: 1,
                item: item
            }
        }
    }

    listItems() {
        return Object.keys(this.items).map((k) => {
            return {
                ...this.items[k].item,
                count: this.items[k].count
            }
        })
    }

    useItem(id: string) {
        if (!this.items[id]) {
            return 0
        }

        if (this.items[id].count <= 1) {
            delete this.items[id]
            return 0
        } else {
            this.items[id].count--
            return this.items[id].count
        }
    }

    dropItem(id: string) {
        delete this.items[id]
        return 0
    }
}

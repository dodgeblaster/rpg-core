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

type ItemInInventory = {
    name: string
    id: string
    count: number
}

export default class InventoryDS {
    items: Items

    constructor(items: Items) {
        this.items = items
    }

    addItem(item: Item): void {
        const itemInInvetory = this.items[item.id]

        if (itemInInvetory) {
            itemInInvetory.count++
        }

        if (!itemInInvetory) {
            this.items[item.id] = {
                count: 1,
                item: item
            }
        }
    }

    listItems(): ItemInInventory[] {
        const itemIds = Object.keys(this.items)
        return itemIds.map((id) => ({
            id: this.items[id].item.id,
            name: this.items[id].item.name,
            count: this.items[id].count
        }))
    }

    useItem(id: string): number {
        if (!this.items[id]) {
            return 0
        }

        if (this.items[id].count <= 1) {
            delete this.items[id]
            return 0
        }

        this.items[id].count--
        return this.items[id].count
    }

    dropItem(id: string): number {
        delete this.items[id]
        return 0
    }
}

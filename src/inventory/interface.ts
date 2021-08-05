type Item = {
    name: string
    id: string
}

type ItemInInventory = {
    name: string
    id: string
    count: number
}

export interface InventoryDSInterface {
    addItem: (item: Item) => void
    listItems: () => ItemInInventory[]
    useItem: (id: string) => number
    dropItem: (id: string) => number
}

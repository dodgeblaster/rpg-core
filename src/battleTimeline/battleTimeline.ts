import { randomBetween0And } from '../_common/utils'

export type Input = {
    players: {
        id: string
        name: string
        speed: number
    }[]
}

type Player = {
    id: string
    name: string
    speed: number
    offset: number
    points: number
}

type PotentialOffsetInput = {
    potentialOffset?: { id: string; offset: number }
}

export default class BattleTimelineDS {
    private players: Player[]
    private timeline: string[]

    constructor(input: Input) {
        if (!input.players || input.players.length === 0) {
            throw new Error('Timeline needs at least 1 player')
        }

        this.players = input.players.map((x) => {
            return {
                ...x,
                offset: 0,
                points: 0
            }
        })

        this.timeline = this.calculateTimeline({})
    }

    private determineHighestSpeed() {
        let highestSpeed = 0
        this.players.forEach((x) => {
            if (highestSpeed < x.speed) {
                highestSpeed = x.speed
            }
        })

        return highestSpeed
    }

    private calculateTimeline(input: PotentialOffsetInput) {
        let calculatedTimeline = []
        let highestSpeed = this.determineHighestSpeed()

        /**
         * Initialize speedState
         * This will be used on every loop to determine selection
         */
        let speedState: Record<string, any> = {}
        this.players.forEach((x) => {
            let offset = x.offset

            if (input.potentialOffset && input.potentialOffset.id === x.id) {
                offset = offset + input.potentialOffset.offset
            }

            speedState[x.id] = {
                id: x.id,
                speed: x.speed,
                points: x.points,
                offset: offset
            }
        })

        while (calculatedTimeline.length < 20) {
            /**
             * Determine who has the lowest points
             */
            let currentLowest = Infinity
            let whoHasTheLowest: Record<string, boolean> = {}
            Object.keys(speedState).forEach((k) => {
                const item = speedState[k]
                const points = item.points + item.offset

                if (points < currentLowest) {
                    whoHasTheLowest = {}
                    currentLowest = points
                    whoHasTheLowest[item.id] = true
                } else if (item.points === currentLowest) {
                    whoHasTheLowest[item.id] = true
                }
            })

            /**
             * Select someone among the lowest point group
             */
            let selected
            const lowestIds = Object.keys(whoHasTheLowest)
            if (lowestIds.length > 1) {
                const chosenIndex = randomBetween0And(lowestIds.length)
                selected = speedState[lowestIds[chosenIndex]]
            }

            if (lowestIds.length === 1) {
                selected = speedState[lowestIds[0]]
            }

            /**
             * Calculate points to add based on speed.
             * Higher the speed, less points to add
             */
            const pointsToAdd = highestSpeed * 2.5 - selected.speed
            selected.points = selected.points + pointsToAdd

            /**
             * Adjust everyones offset
             */
            whoHasTheLowest = {}
            Object.keys(speedState).forEach((k) => {
                if (speedState[k].offset > 2) {
                    speedState[k].offset = Math.floor(speedState[k].offset / 2)
                } else if (speedState[k].offset > 0) {
                    speedState[k].offset = 0
                }
            })

            /**
             * Add id to timeline
             */
            calculatedTimeline.push(selected.id)
        }
        return calculatedTimeline
    }

    takeTurn(input: { id: string; offset: number }) {
        let highestSpeed = this.determineHighestSpeed()

        const index = this.players.findIndex((x) => x.id === input.id)
        const pointsToAdd = highestSpeed * 2.5 - this.players[index].speed
        this.players[index].points = this.players[index].points + pointsToAdd
        this.players[index].offset = this.players[index].offset + input.offset
        return this.calculateTimeline({})
    }

    getTimeline(input: PotentialOffsetInput) {
        return this.calculateTimeline(input)
    }
}

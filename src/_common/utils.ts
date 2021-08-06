export const min0max9999 = (n: number) => {
    if (n < 0) return 0
    if (n > 9999) return 9999
    return n
}

export const min9999max9999 = (n: number) => {
    if (n < -9999) return -9999
    if (n > 9999) return 9999
    return n
}

export const min0max = (max: number) => (n: number) => {
    if (n < 0) return 0
    if (n > max) return max
    return n
}

export const randomBetween0And = (max: number) => {
    return Math.floor(Math.random() * max)
}

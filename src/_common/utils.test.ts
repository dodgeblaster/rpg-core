import {
    min0max,
    min0max9999,
    min9999max9999,
    randomBetween0And
} from './utils'

test('min0max will keep number in bounds', () => {
    expect(min0max(40)(20)).toBe(20)
    expect(min0max(40)(50)).toBe(40)
    expect(min0max(0)(-12)).toBe(0)
})

test('min0max will return 0 if max number is negative', () => {
    expect(min0max(-12)(-10)).toBe(0)
})

test('min0max9999 will keep number in bounds', () => {
    expect(min0max9999(20)).toBe(20)
    expect(min0max9999(123123)).toBe(9999)
    expect(min0max9999(-12)).toBe(0)
})

test('min9999max9999 will keep number in bounds', () => {
    expect(min9999max9999(-340)).toBe(-340)
    expect(min9999max9999(123123)).toBe(9999)
    expect(min9999max9999(-123123)).toBe(-9999)
})

test('randomBetween0And will give number between 0 and max number', () => {
    const result = randomBetween0And(300)
    expect(typeof result).toBe('number')
    expect(result > -1).toBe(true)
    expect(result < 301).toBe(true)
})

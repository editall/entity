import { expect, test } from 'vitest'
import { everyValue, isArray, isObject, mapValue } from '../src/util/util'

test('util - mapValue', () => {
    // auto generated test code by copilot    
    expect(mapValue({ a: 1, b: 2 }, v => v + 1)).toEqual({ a: 2, b: 3 })
})

test('util - eventValue', () => {
    expect(everyValue({ a: 1, b: 2 }, v => v >= 1)).toEqual(true)
})

test("util - isObject", () => {
    // auto generated test code by copilot
    expect(isObject({})).toEqual(true)
    expect(isObject([])).toEqual(false)
    expect(isObject(1)).toEqual(false)   
})

test('util - isArray', () => {
    // auto generated test code by copilot
    expect(isArray([])).toEqual(true)
    expect(isArray({})).toEqual(false)
    expect(isArray(1)).toEqual(false)   
})
/* eslint-env jest */

import AsyncStorageMock from '../index'

const storage = new AsyncStorageMock()

describe('Async Storage Tests', () => {
  it('#setItem', async () => {
    await storage.setItem('foo', 'bar')
    const store = storage.getStore()
    expect(store.get('foo')).toEqual('bar')
  })

  it('#getItem', async () => {
    const foo = await storage.getItem('foo')
    expect(foo).toEqual('bar')
  })

  it('#removeItem', async () => {
    await storage.removeItem('foo')
    const store = storage.getStore()
    expect(store.has('foo')).toBeFalsy()
  })

  it('#setItem callback', async () => {
    const cb = jest.fn()
    await storage.setItem('foo', 'bar', cb)
    expect(cb).toBeCalledWith(null)
  })

  it('#getItem callback', async () => {
    const cb = jest.fn()
    await storage.getItem('foo', cb)
    expect(cb).toBeCalledWith(null, 'bar')
  })

  it('#removeItem callback', async () => {
    const cb = jest.fn()
    await storage.removeItem('foo', cb)
    expect(cb).toBeCalledWith(null)
  })

  it('#mergeItem', async () => {
    const UID123object = {
      name: 'Chris',
      age: 30,
      traits: { hair: 'brown', eyes: 'brown' }
    }

    const UID123delta = {
      age: 31,
      traits: { eyes: 'blue', shoe_size: 10 }
    }

    await storage.setItem('UID123', JSON.stringify(UID123object))
    await storage.mergeItem('UID123', JSON.stringify(UID123delta))
    const merged = await storage.getItem('UID123')

    expect(JSON.parse(merged)).toEqual({
      name: 'Chris',
      age: 31,
      traits: {
        shoe_size: 10,
        hair: 'brown',
        eyes: 'blue'
      }
    })
  })

  it('#mergeItem callback', async () => {
    const cb = jest.fn()

    const UID123object = {
      name: 'Chris',
      age: 30,
      traits: { hair: 'brown', eyes: 'brown' }
    }

    const UID123delta = {
      age: 31,
      traits: { eyes: 'blue', shoe_size: 10 }
    }

    await storage.setItem('UID123', JSON.stringify(UID123object))
    await storage.mergeItem('UID123', JSON.stringify(UID123delta), cb)

    expect(cb).toBeCalledWith(null)
  })

  it('#clear', async () => {
    await storage.setItem('foo', 'bar')
    await storage.clear()
    const store = storage.store
    expect(store.size).toEqual(0)
  })

  it('#clear cb', async () => {
    const cb = jest.fn()
    await storage.clear(cb)
    expect(cb).toBeCalledWith(null)
  })

  it('#getAllKeys', async () => {
    await storage.setItem('foo', 'foo')
    await storage.setItem('bar', 'bar')

    const keys = await storage.getAllKeys()
    expect(keys).toEqual(['foo', 'bar'])
  })

  it('#getAllKeys cb', async () => {
    const cb = jest.fn()
    await storage.getAllKeys(cb)
    expect(cb).toBeCalledWith(null, ['foo', 'bar'])
  })

  it('#multiGet and the callback', async () => {
    const cb = jest.fn()
    const values = await storage.multiGet(['foo', 'bar'], cb)

    expect(values).toEqual([['foo', 'foo'], ['bar', 'bar']])
    expect(cb).toBeCalledWith(null, [['foo', 'foo'], ['bar', 'bar']])
  })

  it('#multiSet and the callback', async () => {
    const cb = jest.fn()

    await storage.multiSet([['foo', 'bar'], ['baz', 'bar']], cb)
    const store = storage.store

    expect(store.get('foo')).toEqual('bar')
    expect(store.get('baz')).toEqual('bar')
    expect(cb).toBeCalledWith(null)
  })

  it('#multiRemove and callback', async () => {
    const cb = jest.fn()
    await storage.multiRemove(['foo', 'baz'], cb)

    const store = storage.store
    expect(store.get('foo')).toBeUndefined()
    expect(store.get('baz')).toBeUndefined()
    expect(cb).toBeCalledWith(null)
  })

  it('#multiMerge and callback', async () => {
    const cb = jest.fn()

    // first user, initial values
    const UID234object = {
      name: 'Chris',
      age: 30,
      traits: { hair: 'brown', eyes: 'brown' }
    }

    // first user, delta values
    const UID234delta = {
      age: 31,
      traits: { eyes: 'blue', shoe_size: 10 }
    }

    // second user, initial values
    const UID345object = {
      name: 'Marge',
      age: 25,
      traits: { hair: 'blonde', eyes: 'blue' }
    }

    // second user, delta values
    const UID345delta = {
      age: 26,
      traits: { eyes: 'green', shoe_size: 6 }
    }

    const multiSetPairs = [['UID234', JSON.stringify(UID234object)], ['UID345', JSON.stringify(UID345object)]]
    const multiMergePairs = [['UID234', JSON.stringify(UID234delta)], ['UID345', JSON.stringify(UID345delta)]]

    await storage.clear()
    await storage.multiSet(multiSetPairs)
    await storage.multiMerge(multiMergePairs, cb)

    const items = await storage.multiGet(['UID234', 'UID345'])

    expect(JSON.parse(items[0][1])).toEqual({ name: 'Chris', age: 31, traits: { shoe_size: 10, hair: 'brown', eyes: 'blue' } })
    expect(JSON.parse(items[1][1])).toEqual({ name: 'Marge', age: 26, traits: { shoe_size: 6, hair: 'blonde', eyes: 'green' } })
    expect(cb).toBeCalledWith(null)
  })
})

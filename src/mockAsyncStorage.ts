import merge from 'deepmerge'

export type Entry<K, V> = [K, V | null];

export type Entries<K, V> = Array<Entry<K, V>>;

export type ErrBack<V> = (err: Error | null, val?: V | null) => {};

export type ArrErrBack<V> = (err: Array<Error> | null, val?: V) => {};

const isStringified = (str: string): boolean => {
  try {
    JSON.parse(str)
    return true
  } catch (e) {
    return false
  }
}

class AsyncDict<K, V> {
  store: Map<K, V | null>;

  size (): number {
    return this.store.size
  }

  getStore (): Map<K, V | null> {
    return new Map(this.store)
  }

  constructor () {
    this.store = new Map()
  }

  async getItem (k: K, cb?: ErrBack<V>): Promise<V | null> {
    const val = this.store.get(k) || null
    if (cb) cb(null, val)
    return val
  }

  async setItem (k: K, v: V, cb?: ErrBack<V>): Promise<void> {
    this.store.set(k, v)
    if (cb) cb(null)
  }

  async removeItem (k: K, cb?: ErrBack<V>): Promise<void> {
    this.store.delete(k)
    if (cb) cb(null)
  }

  async clear (cb?: ErrBack<V>): Promise<void> {
    this.store.clear()
    if (cb) cb(null)
  }

  async getAllKeys (cb?: ErrBack<Array<K>>): Promise<Array<K>> {
    const keys: Array<K> = Array.from(this.store.keys())
    if (cb) cb(null, keys)
    return keys
  }

  async multiGet (keys: Array<K>, cb?: ErrBack<Entries<K, V>>): Promise<Entries<K, V>> {
    const requested: Entries<K, V> = keys.map(k => [k, this.store.get(k) || null])
    if (cb) cb(null, requested)
    return requested
  }

  async multiSet (entries: Entries<K, V>, cb?: ErrBack<V>): Promise<void> {
    for (const [key, value] of entries) {
      this.store.set(key, value)
    }
    if (cb) cb(null)
  }

  async multiRemove (keys: Array<K>, cb?: ErrBack<V>): Promise<void> {
    for (const key of keys) {
      this.store.delete(key)
    }
    if (cb) cb(null)
  }
}

class MockAsyncStorage extends AsyncDict<string, string> {
  async mergeItem (key: string, value: string, cb?: ErrBack<string>): Promise<void> {
    const item: string | null = await this.getItem(key)

    if (!item) throw new Error(`No item with ${key} key`)
    if (!isStringified(item)) throw new Error(`Invalid item with ${key} key`)
    if (!isStringified(value)) throw new Error(`Invalid value to merge with ${key}`)

    const itemObj: Object = JSON.parse(item)
    const valueObj: Object = JSON.parse(value)
    const merged: Object = merge(itemObj, valueObj)

    await this.setItem(key, JSON.stringify(merged))

    if (cb) cb(null)
  }

  async multiMerge (entries: Entries<string, string>, cb?: ArrErrBack<string>): Promise<void> {
    const errors: Array<Error> = []
    /* eslint no-restricted-syntax: "off" */
    /* eslint no-await-in-loop: "off" */
    for (const [key, value] of entries) {
      try {
        if (value) {
          await this.mergeItem(key, value)
        }
      } catch (err) {
        errors.push(err)
      }
    }

    if (errors.length) {
      if (cb) cb(errors)
      return Promise.reject(errors)
    }

    if (cb) cb(null)
    return Promise.resolve()
  }

  flushGetRequests () {}
}

export default MockAsyncStorage

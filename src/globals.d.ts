// declare type Currency = 'EUR' | 'USD' |'JPY' | 'RUB' | 'GBP'

declare interface IStore<K, V> {
  get: (key: K) => V;
  set: (key: K, value: V) => void;
}

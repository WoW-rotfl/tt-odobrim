
const store = window.localStorage

if (!store) {
  throw new Error(`Sorry your browser doesn't support localStorage`)
}

const controller: IStore<string, string | null> = {
  get: (key) => store.getItem(key),
  set: (key, value) => {
    if (value) store.setItem(key, value)
  }
}


export default controller;

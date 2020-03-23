import removeItemById from '../removeItemById'

function generateItems(length = 15) {
  const items: { [id: string]: { id: string, val: string } } = {}
  for (let i = 0; i < length; i++) {
    const id = String(i)
    items[id] = {
      id,
      val: Math.random().toString(36).slice(2, 10)
    }
  }
  return items
}

test('Should remove item with id: 3', () => {
  const items = removeItemById('3', generateItems())
  expect('3' in items).toBeFalsy()
})
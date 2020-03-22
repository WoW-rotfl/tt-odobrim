interface Items<Item> {
  [id: string]: Item
}

export default <T extends { id: string }>(id: string, items: Items<T>): Items<T> => (
  Object.values(items)
    .filter(item => item.id !== id)
    .reduce(
      (allItems, item) => ({
        ...allItems,
        [item!.id]: item
      }),
      {}
    ) 
)

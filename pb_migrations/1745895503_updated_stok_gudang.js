/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_703122306")

  // update collection data
  unmarshal({
    "name": "barang_gudang"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_703122306")

  // update collection data
  unmarshal({
    "name": "stok_gudang"
  }, collection)

  return app.save(collection)
})

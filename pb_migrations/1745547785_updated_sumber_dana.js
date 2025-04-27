/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3398002869")

  // update collection data
  unmarshal({
    "name": "sumber"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3398002869")

  // update collection data
  unmarshal({
    "name": "sumber_dana"
  }, collection)

  return app.save(collection)
})

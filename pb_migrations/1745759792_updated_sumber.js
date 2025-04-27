/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3398002869")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.verified = true"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3398002869")

  // update collection data
  unmarshal({
    "listRule": ""
  }, collection)

  return app.save(collection)
})

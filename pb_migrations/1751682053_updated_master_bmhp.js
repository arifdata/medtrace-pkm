/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3590399593")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "bool3396901262",
    "name": "is_alkes",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3590399593")

  // remove field
  collection.fields.removeById("bool3396901262")

  return app.save(collection)
})

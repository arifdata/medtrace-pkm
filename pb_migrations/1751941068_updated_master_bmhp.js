/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3590399593")

  // remove field
  collection.fields.removeById("bool768392060")

  // remove field
  collection.fields.removeById("bool3385724622")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3590399593")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool768392060",
    "name": "is_antibiotik",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "bool3385724622",
    "name": "is_narko_psiko",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})

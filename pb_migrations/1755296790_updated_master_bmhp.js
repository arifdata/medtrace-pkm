/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3590399593")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool2393419561",
    "name": "is_antibiotik",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool3396901262",
    "name": "is_narko_psiko",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3590399593")

  // update field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "bool2393419561",
    "name": "is_generik",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // update field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "bool3396901262",
    "name": "is_alkes",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})

/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3874608213")

  // remove field
  collection.fields.removeById("json2363242687")

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3590399593",
    "hidden": false,
    "id": "relation1542800728",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "field",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "number2660322358",
    "max": null,
    "min": null,
    "name": "jumlah",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3874608213")

  // add field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "json2363242687",
    "maxSize": 0,
    "name": "jumlah_stok_gudang",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // remove field
  collection.fields.removeById("relation1542800728")

  // remove field
  collection.fields.removeById("number2660322358")

  return app.save(collection)
})

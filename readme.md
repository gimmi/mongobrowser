url: 'mongodb://localhost:27017/default', // see www.mongodb.org/display/DOCS/Connections
coll: 'zips',
filter: {},
fields: [
   'fieldName', // simplest format, just property name
   { header: 'City', dataIndex: 'city' },
   { header: 'Zip code', dataIndex: 'zip', flex: 1 }
],
sort: ['zip', 'city']

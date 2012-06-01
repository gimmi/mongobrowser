url: 'mongodb://localhost:27017/default', // see www.mongodb.org/display/DOCS/Connections
coll: 'zips',
filter: {},
fields: [
   'fieldName', // simplest format, just property name
   { header: 'City', dataIndex: 'city' },
   { header: 'Zip code', dataIndex: 'zip', flex: 1 }
],
sort: ['zip', 'city']

url: 'mongodb://username:password@server1:27017,server2:27017,server3:27017/database?replicaSet=ReplicaSetName', // see www.mongodb.org/display/DOCS/Connections
coll: 'logs',
filter: { application: 'AppName', environment: 'dev' },
fields: [
   { header: 'Date/Time', dataIndex: 'timestamp', xtype:'datecolumn', format: 'Y-m-d H:i:s:u', width: 150 },
   { header: 'Level', dataIndex: 'level', width: 50 },
   { header: 'TID', dataIndex: 'thread', width: 30 },
   { header: 'Logger', dataIndex: 'logger' },
   { header: 'Message', dataIndex: 'message', flex: 1 },
   { header: 'Exception', dataIndex: 'exception' }
],
sort: { timestamp: -1 }

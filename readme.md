# MongoBrowser

## A minimal Web UI to query MongoDB data

![Screenshot](https://github.com/gimmi/mongobrowser/raw/master/screenshot.png)

## Query syntax

MongoBrowser query definition is a Javascript object literal in this form:

```javascript
property1: 'value1',
property2: true,
property3: { other: 'value' }
```

The curently supported properties are:

* **url**: a MongoDB connection string, see [MongoDB documentation](http://www.mongodb.org/display/DOCS/Connections) for format
* **coll**: The collection to query
* **filters**: Query filter as specified in MongoDB documentation
* **fields**: The fields to return, along with ExtJS specific layout information. See ExtJS Grid Column documentation
* **sort**: Query sort as specified in MongoDB documentation

## Sample queries

```javascript
url: 'mongodb://localhost:27017/default',
coll: 'zips',
filter: {},
fields: [
   'fieldName',
   { header: 'City', dataIndex: 'city' },
   { header: 'Zip code', dataIndex: 'zip', flex: 1 }
],
sort: ['zip', 'city']
```

```javascript
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
```
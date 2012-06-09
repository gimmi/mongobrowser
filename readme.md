# MongoBrowser

### A minimal Web UI to query MongoDB data

## Screenshot

![Screenshot](https://github.com/gimmi/mongobrowser/raw/master/screenshot.png)

## Installation

* If not already installed, install [NodeJS](http://nodejs.org/#download)
* Download the latest version of MongoBrowser [HERE](https://github.com/gimmi/mongobrowser/downloads)
* Unzip and run `start.cmd` (windows only)

## Query syntax

MongoBrowser query definition is a Javascript object literal in this form:

```javascript
property1: 'value1',
property2: true,
property3: { other: 'value' }
```

The curently supported properties are:

* **url**: a MongoDB connection string, see [this MongoDB doc](http://www.mongodb.org/display/DOCS/Connections)
* **coll**: The collection to query
* **filters**: Query filter object, see [this MongoDB doc](http://www.mongodb.org/display/DOCS/Advanced+Queries)
* **fields**: The grid column configuration and layout, using ExtJS specific layout information. See [ExtJS Grid doc](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.grid.Panel-cfg-columns) and [ExtJS Grid Column doc](http://docs.sencha.com/ext-js/4-1/#!/api/Ext.grid.column.Column)
* **sort**: Query sort object/array, see [this MongoDB doc](http://www.mongodb.org/display/DOCS/Advanced+Queries#AdvancedQueries-%7B%7Bsort%28%29%7D%7D)

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
url: 'mongodb://username:password@server1:27017,server2:27017,server3:27017/database?replicaSet=ReplicaSetName',
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

## Credits/License

See [license file](https://raw.github.com/gimmi/mongobrowser/master/license.txt)
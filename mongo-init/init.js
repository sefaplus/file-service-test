/* eslint-disable no-undef */
/* Creates initial database for the  */
conn = new Mongo();

db = conn.getDB('FilesDB');

db.files.createIndex({ filename: 1 }, { unique: true });

/* Inserting a dull document to make sure everything works */
db.files.insert({
  filename: 'initial',
  size: '0',
  mime_type: 'null/null',
  path: '/null.null',
});

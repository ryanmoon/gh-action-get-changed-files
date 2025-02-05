// External Dependencies
const fs          = require('fs');
const { Toolkit } = require('actions-toolkit');

const tools       = new Toolkit;
const { payload } = tools.context;
const commits     = payload.commits.filter(c => c.distinct);

const FILES          = [];
const FILES_MODIFIED = [];
const FILES_ADDED    = [];
const FILES_DELETED  = [];

commits.forEach(commit => {
	FILES.push(...commit.modified, ...commit.added);
	FILES_MODIFIED.push(...commit.modified);
	FILES_ADDED.push(...commit.added);
	FILES_DELETED.push(...commit.removed);
});

fs.writeFileSync(`${process.env.HOME}/files.json`, JSON.stringify(FILES), 'utf-8');
fs.writeFileSync(`${process.env.HOME}/files_modified.json`, JSON.stringify(FILES_MODIFIED), 'utf-8');
fs.writeFileSync(`${process.env.HOME}/files_added.json`, JSON.stringify(FILES_ADDED), 'utf-8');
fs.writeFileSync(`${process.env.HOME}/files_deleted.json`, JSON.stringify(FILES_DELETED), 'utf-8');

process.exit(0);


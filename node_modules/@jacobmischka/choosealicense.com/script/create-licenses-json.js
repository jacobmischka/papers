#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');

const licenses = [];

const files = fs.readdirSync(path.join(__dirname, '..', '_licenses'));
files.map(filename => {
	const file = fs.readFileSync(path.join(__dirname, '..', '_licenses', filename), {
		encoding: 'utf8'
	});
	const license = frontMatter(file);
	license.body = license.body.trim() + '\n';
	licenses.push(license);
});

fs.writeFileSync(path.join(__dirname, '..', 'licenses.json'), JSON.stringify(licenses, null, 4));

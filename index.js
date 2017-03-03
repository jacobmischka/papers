#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const program = require('commander');
const gitConfigPath = require('git-config-path');
const parseGitConfig = require('parse-git-config');
const licenses = require('@jacobmischka/choosealicense.com');

const papersPackageJson = require('./package.json');

program.version(papersPackageJson.version)
	.usage('[license name or id] [author name] [year]')
	.parse(process.argv);

let [licenseNameOrId, name, year] = program.args;

if(!year)
	year = new Date().getFullYear();

let missingArgs = getMissingArgs();
if(missingArgs.length > 0){
	try {
		console.log(`Values (${missingArgs.join(', ')}) not found, attempting to read from package.json in cwd`);
		const packageJson = require(path.join(process.cwd(), 'package.json'));

		if (!licenseNameOrId && packageJson.license) licenseNameOrId = packageJson.license;

		if(!name && packageJson.author){
			if(typeof packageJson.author === 'string')
				name = packageJson.author.replace(/<.+>/, '').replace(/\(.+\)/, '').trim();
			else if(typeof packageJson.author === 'object' && packageJson.author.name)
				name = packageJson.author.name;
		}
	} catch(e){
		missingArgs = getMissingArgs();
		if(missingArgs.length > 0)
			console.log(`Unable to get ${missingArgs.join(', ')} from package.json in cwd`);
	}
}

if(licenseNameOrId && !name){
	console.log('Name not found, attempting to read from git config');
	name = getGitName();

	if(!name)
		name = getGitName(true);

	if(!name)
		console.log('Unable to get name from git config');
}

missingArgs = getMissingArgs();
if(missingArgs.length > 0){
	console.error(`Unable to determine the required values: ${missingArgs.join(', ')}`);
	program.help();
	process.exit(1);
}


let license = getLicense(licenseNameOrId, name, year);

if(license){
	fs.writeFileSync(path.join(process.cwd(), 'LICENSE'), license);
	console.log('LICENSE written successfully!');
}
else {
	console.error('Unable to write LICENSE');
	program.help();
}


function getLicense(licenseNameOrId, name, year){
	const license = licenses.find(license =>
		license.attributes['spdx-id'] === licenseNameOrId
			|| license.attributes.title === licenseNameOrId
			|| license.attributes.nickname === licenseNameOrId);

	if(license && license.body)
		return license.body.replace('[year]', year).replace('[fullname]', name);
}

function getGitName(global){
	let gitConfig = parseGitConfig.sync({
		path: gitConfigPath(global ? 'global' : null)
	});
	if(gitConfig.user && gitConfig.user.name)
		return gitConfig.user.name;
}

function getMissingArgs(){
	let missingArgs = [];
	if(!licenseNameOrId)
		missingArgs.push('license');
	if(!name)
		missingArgs.push('name');
	if(!year)
		missingArgs.push('year');
	return missingArgs;
}

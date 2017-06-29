/**
 * grunt-init repo
 * https://github.com/jonschlinkert/repo
 * Copyright (c) 2013 Jon Schlinkert
 * Licensed under the MIT license.
 */

'use strict';

// Basic template description.
exports.description = 'Create a new github repo, with tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'Don\'t forget to run npm install!';

// The actual init template.
exports.template = function(grunt, init, done) {

    init.process({ type: 'node' }, [
        // Prompt for these values.
        init.prompt('name'),
        init.prompt('version', '0.1.0'),
        init.prompt('username', 'assemble'),
        init.prompt('description'),
        init.prompt('author_name', 'Jon Schlinkert'),
        init.prompt('author_url', 'https://github.com/jonschlinkert'),
        init.prompt('licenses'),
        init.prompt('repository'),
        init.prompt('homepage'),
        init.prompt('bugs'),
        init.prompt('main', 'Grunt.js'),
        init.prompt('node_version', '>= 0.8.0'),
        // init.prompt('npm_test', 'grunt test'), {
        //     name: 'travis',
        //     message: 'Will this project be tested with Travis CI?',
        //     default: 'Y/n',
        //     warning: 'If selected, you must enable Travis support for this project in https://travis-ci.org/profile'
        // }
    ], function(err, props) {

        props.repository = 'https://github.com/' + props.username + '/' + props.name + '.git';
        props.homepage = 'https://github.com/' + props.username + '/' + props.name + '/';
        props.bugs = 'https://github.com/' + props.username + '/' + props.name + '/issues';
        props.scripts = {
            'test': 'grunt test'
        };
        props.devDependencies = {
            "assemble-mustache": "^0.2.1",
            "autoprefixer": "^6.7.0",
            "cssnano": "^3.10.0",
            "grunt": "^1.0.1",
            "grunt-assemble": "^0.5.0",
            "grunt-contrib-clean": "^1.0.0",
            "grunt-contrib-connect": "^1.0.2",
            "grunt-contrib-copy": "^1.0.0",
            "grunt-contrib-imagemin": "^1.0.1",
            "grunt-img-find-and-copy": "^1.0.1",
            "grunt-localscreenshots": "^1.0.0",
            "grunt-mkdir": "^1.0.0",
            "grunt-postcss": "^0.8.0",
            "grunt-processhtml": "^0.4.1",
            "grunt-sass": "^2.0.0",
            "grunt-uncss": "^0.6.1",
            "grunt-version": "^1.1.1",
            "handlebars-helper-aggregate": "^0.1.3",
            "postcss-style-guide": "^0.13.0",
            "time-grunt": "^1.4.0"
        };
        props.devDependencies = {
            'qs-site-generator': 'git+https://9a19e04565fd5e171b2ab70430ecee0d4cd62fea:x-oauth-basic@github.com/QuigleySimpson/grunt-juice.git'
        };
        props.keywords = ['assemble'];

        // Setup travis CI
        // props.travis = /y/i.test(props.travis);
        // props.travis_node_version = '0.8';


        // clone the files from the github repository
        // const execSync = require('child_process').execSync;
        // var cmd = execSync('git clone https://9a19e04565fd5e171b2ab70430ecee0d4cd62fea:x-oauth-basic@github.com/QuigleySimpson/qs-site-generator.git ~/.grunt-init/qs-sitegen/root');


        // Files to copy (and process).
        var files = init.filesToCopy(props);
        if (!props.travis) { delete files['.travis.yml']; }

        // Add properly-named license files.
        init.addLicenseFiles(files, props.licenses);


        // Actually copy (and process) files.
        init.copyAndProcess(files, props, { noProcess: '{source/assets/fonts,source/assets/images}/**/*' });

        // var bower = {};
        // bower.name = props.name;
        // bower.main = 'Gruntfile.js';
        // bower.dependencies = {
        //     'bootstrap': '~0.3.0'
        // };

        // Generate bower.json file.
        // init.writePackageJSON('bower.json', bower);

        // Generate package.json file.
        init.writePackageJSON('package.json', props);


        // All done!
        done();
    });

};

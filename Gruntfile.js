'use strict';

var fs = require('fs');
var ls = require('ls');
//var regexp = require('node-regexp');
var mkdirp = require('mkdirp');

var exec = require('child_process').exec;
var bcp = fs.readFileSync(require.resolve('browserify-common-prelude/dist/bcp.min.js'), 'utf-8');

module.exports = function(grunt) {

	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt);

	var cwd = process.cwd();

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			wrappers: {
				files: [
					{
						expand: true,
						cwd: 'webui/wrappers',
						src: ['*.html'],
						dest: 'dist/'
					},
				]
			},
			license: {
				files: [
					{
						expand: true,
						src: ['LICENSE'],
						dest: 'dist/',
						rename: function() { return 'dist/LICENSE.TXT';},

					},
				]
			},
			bootstrap: {
				files: [
					{ expand: true, src: ['node_modules/bootstrap/**'], dest: 'dist/webui/' },
				]
			},
			pdfjs: {
				files: [
					{ expand: true, src: ['node_modules/pdfjs-dist/**'], dest: 'dist/webui/' },
				]
			},
		},
		uglify: {
			options: {
				screwIE8: true,
			},
			head: {
				files: {
					'build/lib/head.min.js': ['lib/head.js'],
				}
			},
		},
		browserify: {
			options: {
				browserifyOptions: {
					debug: true,
					devPrelude: true,
					
					//prelude: bcp
				},
			},
			main: {
				src: 'webui/scilexicscript.js',
				dest: 'dist/webui/scilexicscript.js'
			},
		},

		cssmin: {
			options: {
				shorthandCompacting: false,
				roundingPrecision: -1,
			},
			target: {
				files: [
					{
						'dist/webui/sci-ui.min.css': [
							 'webui/number_input_style.css',
							 'webui/info_style.css',
							 'node_modules/bootstrap/dist/css/bootstrap.css',
							 'node_modules/bootstrap/dist/css/bootstrap-theme.css',
						],
					},
					{
						expand: true,
						cwd: 'css',
						src: ['*.css'],
						dest: 'dist/css',
						ext: '.min.css',
					}
				]
			},
		},

		htmlmin: {
			options: {
				removeComments: true,
				collapseWhitespace: true,
				conservativeCollapse: true,
				minifyJS: true,
				minifyCSS: true,
			},
			html: {
				expand: true,
				cwd: './',
				src: ['webui/*.html'],
				dest: 'dist/',
				ext: '.html'
			}
		},
		watch: {
			options: {
				reload: true
			},
			html: {
				files: [
					'webui/*.html',
				],
				tasks: ['process-html']
			},
			webuiJs: {
				files: [
					'webui/*.js',
					'common/*.js',
				],
				tasks: ['process-webui-js'],
			},
		},

		eslint: {
			strictLinting: {
				options: {
					configFile: 'eslint.json'
				},
				src: [
					'webui/*.js',
					'common/*.js',
					'!common/stex-custom.codemirror-mode.js',
					'cli/*.js',
					'Gruntfile.js',
				],
			},
		},

		clean: {
			build: ['build/'],
			dist: ['dist/']
		},

		'node-qunit': {
			Test1: {
				code: './cli/create_dictionary.js',
				tests: [
					'./test/dictionary_create_test.js',
					'./test/two_word_ext_test.js',
					'./test/n_word_ext_test.js',
					'./test/Dictionary_test.js',
					'./test/Dictionary_clean_f_test.js',
					'./test/Dictionary_repair_broken_words_test.js',
					'./test/is_two_compatible_test.js'
				],
				done: function(err, res) {
					!err && publishResults('node', res, this.async());
				},
			},
		},
		jasmine: {
            test: {
                src: [
					'dist/webui/scilexicscript.js',
				],
                options: {
                    vendor: [
                        'node_modules/jquery/dist/jquery.js',
                        'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
						'build/test/webui/makeHTML.js',
						'dist/webui/node_modules/codemirror/lib/codemirror.js',
						'dist/webui/node_modules/codemirror/mode/stex/stex.js',
						'dist/webui/node_modules/codemirror/addon/runmode/runmode.js',
						'dist/webui/scilexicscript.js',
                    ],
                    specs: [
						'test/webui/*.spec.js',
					],
					keepRunner: true,
                }
            }
        },
/*
		concurrent: {
			'process-all': [
				'process-html',
				'process-webui-js',
			],
		},
*/
	});

	grunt.registerTask('createHTMLscripts', 'Упаковываем html-код в js-обёртки', function() {
		require('./test/webui/create-html-making-script.js');
	});

	grunt.registerTask('testui', [
		'default',
		'createHTMLscripts',
		'jasmine',
	]);

	grunt.registerTask('process-html', [
		'newer:htmlmin',
	]);

	grunt.registerTask('process-css', [
		'newer:cssmin',
	]);

	grunt.registerTask('process-webui-js', [
		'newer:eslint',
		'browserify:main',
	]);

	grunt.registerTask('bundle', [
		'newer:copy:bootstrap',
		'newer:copy:license',
		'default',
	]);

	grunt.registerTask('default', [
		//'concurrent:process-all', // На деле - медленнее
		'node-qunit',
		'process-html',
		'process-webui-js',
		'process-css',
	]);
};

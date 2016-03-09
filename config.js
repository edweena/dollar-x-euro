'use strict';

module.exports = {
    
    'browserPort': 9000,
    'UIPort': 9001,
    'serverPort': 9002,

    'audio': {
        'src': 'app/audio/**/*',
        'dest': 'build/audio'
    },

    'data': {
        'src': 'app/data/**/*',
        'dest': 'build/data'
    },

    'lib': {
        'src': 'app/lib/**/*.js',
        'dest': 'build/lib'
    },

    'styles': {
        'src': 'app/styles/**/*.scss',
        'dest': 'build/css'
    },

    'scripts': {
        'src': 'app/main.js',
        'dest': 'build/js',
        'main': 'app/scripts/main.js'
    },

    'html': {
        'src': 'app/**/*.html',
        'dest': 'build'
    },

    'views': {
        'src': 'app/**/*.jade',
        'dest': 'build'
    },

    'images': {
        'src': 'app/images/**/*',
        'dest': 'build/images'
    },

    'fonts': {
        'src': 'app/fonts/**/*',
        'dest': 'build/fonts'
    },

    'dist': {
        'root': 'build'
    },

    'data': {
        'src': 'app/data/**/*',
        'dest': 'build/data'
    },

    'icons': {
        'src': 'app/icons/*',
        'dest': 'build/icons'
    },

    'lib': {
        'src': 'app/lib/**/*',
        'dest': 'build'
    },

    'src': 'app/',

    extras: ['app/robots.txt', 'app/favicon.ico', 'app/icons/*']
};
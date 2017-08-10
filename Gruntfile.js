/*
 * grunt-gts-turcaify
 * https://github.com/wilr/grunt-gts-turcaify
 *
 * Copyright (c) 2013 Will Rossiter
 * Licensed under the BSD license.
 */

'use strict';


module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');        
    grunt.loadNpmTasks('grunt-shopify');    
    grunt.loadNpmTasks('grunt-contrib-sass');    
    grunt.loadNpmTasks('grunt-contrib-compress');
    
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            css: 'shop/assets',
            sass: 'scss'            
        },

        shopify: {
            options: {
                api_key: "b2d1642ab37a983af3474465259f0841",
                password: "7027d1e6cbb1b365e339291c5509f04d",
                url: "volus-acure.myshopify.com",
                base: "shop/"     
            }
        }, 

        sass: {
            dist: {
                options: {
                    noCache: true,
                    lineNumbers: true,
                    update: true,
                    compass: false,
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: '<%= dirs.sass %>/',
                    src: ['*.scss'],
                    dest: '<%= dirs.css %>/',
                    ext: '.css'
                }]
            }
        },


        compress: {
            zip: {
                options: {
                    archive: 'acure-v1-0-0.zip'
                },
                files: [{
                    expand: true,
                    cwd: './shop/',                      
                    src: ['assets/**', 'config/**', 'layout/**', 'locales/**', 'sections/**', 'snippets/**', 'templates/**']                    
                }]
            }
        },


        watch: {            
            compress: {
                files: ['shop/**'],
                tasks: ['compress']
            }, 
            sass: {
                files: ["**/**/*.scss"],                
                tasks: ['sass']
            },           
            shopify: {               
                files: ["shop/assets/**", "shop/config/**", "shop/sections/**", "shop/snippets/**", "shop/layout/**", "shop/templates/**", "shop/locales/**" ],        
                tasks: ['shopify']
            }  
        }
    });
    grunt.registerTask('default', ['watch']);    
};
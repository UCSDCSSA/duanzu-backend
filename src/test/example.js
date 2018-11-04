// NOTE: This file could not be ran here. But you can get a sense of what this could be like.
// The MongoUnitTest framework will first execute the begin method, and then the tests one by one.
// Of course everything here is async so you have to call next/error by default: the next() function
// will take you to the next step and the error() function will throw error right away.
// In this test setup you don't need to really care about connecting to the mongo database, because
// it is definitely connected if your regular connection works.

const assert = require("assert");
const MongoUnitTest = require("./lib/mongo_unit_test");
const Cartoonmad = require("../api/cartoonmad");

var Manga;

MongoUnitTest({
    
    begin (next) {
        
        Manga = require("../api/manga");
        next();
    },
    tests: [
        
        function (next, error) {
            console.log("-----Testing Scrapper Get Non Existing Manga-----");
            Cartoonmad.getMangaInfo(11, error, function (err) {
                console.log("Error thrown. Passed");
                next();
            });
        },
        
        function (next, error) {
            console.log("-----Testing Scrapper Get Manga 5967-----");
            Cartoonmad.getMangaInfo(5967, function (info) {
                console.log(info);
                next();
            }, error);
        },
            
        function (next, error) {
            console.log("-----Testing Scrapper Get Manga 1152-----");
            Cartoonmad.getMangaInfo(1152, function (info) {
                console.log(info);
                next();
            }, error);
        },
        
        function (next, error) {
            console.log("-----Testing Get-----");
            const Manga = require("../api/manga");
            Manga.get(5967, function (manga) {
                console.log(manga);
                next();
            }, error);
        },
        
        function (next, error) {
            console.log("-----Testing Update-----");
            const Manga = require("../api/manga");
            Manga.update(5967, function (manga) {
                console.log(manga);
                next();
            }, error);
        }
    ]
});

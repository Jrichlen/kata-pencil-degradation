'use strict'

var chai = require('chai');
var assert = chai.assert;
var Pencil = require('./pencil.js');
var Paper = require('./paper.js');

describe('Pencil', () => {
    var pencil;
    var paper;

    beforeEach(() => {
        pencil = new Pencil(4, 2);
        paper = new Paper();
    });

    it('should exist',() => {
        assert.isDefined(pencil);
    });

    it('should have a durability property', () => {
        assert.equal(pencil.durability, 4); 
    });
    
    it('should have a length property', () => {
        assert.equal(pencil.length, 2);
    });

    describe('.write()', () => {
        it('should be able to write to a piece of paper', () => {
            pencil.write('test', paper);
            assert.equal(paper.text, 'test');
        });
    });

    describe('._degrade()', () => {
        it('should degrade the pencil when it writes', () => {
            pencil.write('tests', paper);
            assert.equal(paper.text, 'test ');
        });

        it('should not degrade the pencil when writing spaces', () => {
            pencil.write(' test', paper);
            assert.equal(paper.text, ' test');
        });

        it('should not degrade the pencil when writing a new line', () => {
            pencil.write('A\nB\nC\nD', paper);
            assert.equal(paper.text, 'A\n\B\n \n ');
        });

        it('should degrade twice as fast when writing capital letters', () => {
            pencil.write('ABCD', paper);
            assert.equal(paper.text, 'AB  ');
        });
    });

    
    describe('.sharpen', () => {
        it('should sharpen pencil to original durability', () => {
            pencil.write('tests', paper);
            pencil.sharpen();
            pencil.write('it', paper);
            assert.equal(paper.text, 'test it');
        });

        it('should decrease the pencils length', () => {
            pencil.sharpen();
            assert.equal(pencil.length, 1);
        });
    });
});
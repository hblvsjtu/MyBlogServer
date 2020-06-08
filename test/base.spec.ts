import {sum} from '../src/utils/index';
import {readFile} from '../src/utils/io';
import {MODEL_DATA_DIR} from '../src/utils/common';
const path = require('path');

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

test('read File a/b/c', done => {
    readFile(
        path.join(MODEL_DATA_DIR, 'a.txt'),
        data => {
            expect(data).toEqual([
                {next: 'b.txt', message: 'this is a.txt'},
                {next: 'c.txt', message: 'this is b.txt'},
                {next: null, message: 'this is c.txt'}
            ]);
            done();
        },
        3
    );
});

test('read File d', done => {
    readFile(path.join(MODEL_DATA_DIR, 'd.txt'), data => {
        expect(data).toEqual([{next: null, message: 'this is d.txt'}]);
        done();
    });
});

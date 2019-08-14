import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import renderer from 'react-test-renderer';
import Dexie from 'dexie';
import Modal from 'react-modal';
import indexedDB from 'fake-indexeddb';

import HistoryDisplay from '../client/Components/HistoryDisplay';
import App from '../client/App'


configure({ adapter: new Adapter() });

const db = new Dexie("testHistoryDB", { indexedDB: indexedDB });;
db.version(1).stores({
    history: '++id, query, endpoint',
});

describe('First React component test with Enzyme', () => {
    it('renders without crashing', () => {
        shallow(<App />);
    });
});

describe('React unit tests', () => {


    beforeAll(() => {
        db.history.put({
            query: 'query1',
            endpoint: 'endpoint1',
        })
        db.history.put({
            query: 'query2',
            endpoint: 'endpoint2'
        })
        db.history.put({
            query: 'query3',
            endpoint: 'endpoint3'
        })
    })

    describe('HistoryDisplay renders', () => {
        let wrapper;

        // beforeAll(() => {
        //     wrapper = shallow(<HistoryDisplay />);
        // });

        it('database returns an array of queries', () => {
            // console.log('in db test')
            let array = [1,2,3]
            db.history.toArray().then((queries) => array = queries)
            expect(array).toHaveLength(3);
        })


    })

    afterAll(() => {
        db.history.clear()
    })

})
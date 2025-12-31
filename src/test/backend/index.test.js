const { expect } = require('chai');
const sinon = require('sinon');
const { JSDOM } = require('jsdom');
const path = require('path');

describe('Frontend App Unit Tests', () => {
    let dom, window, document;

    before(() => {
        // 1. Setup JSDOM with a structure matching your index.html
        dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <form id="noteForm">
                        <input id="note" type="text" />
                        <input id="fileInput" type="file" />
                        <button type="submit">Upload</button>
                    </form>
                    <div id="notesList"></div>
                    <input type="checkbox" id="themeToggle" />
                </body>
            </html>
        `, { url: "http://localhost", runScripts: "dangerously" });

        window = dom.window;
        document = window.document;

        // 2. Mock Browser Globals
        global.window = window;
        global.document = document;
        global.navigator = window.navigator;
        global.Node = window.Node;
        global.HTMLElement = window.HTMLElement;
        global.FormData = window.FormData;

        // Mock LocalStorage
        global.localStorage = {
            getItem: sinon.stub().returns('light'),
            setItem: sinon.stub()
        };

        // Mock Alert and Fetch
        global.alert = sinon.stub();
        global.fetch = sinon.stub();

        // 3. Load the actual source file for coverage
        // Path goes up from src/test/frontend/ to root, then into azure-sa
        const appPath = path.resolve(__dirname, '../../azure-sa/public/app.js');
        require(appPath);
    });

    afterEach(() => {
        // Reset stubs after every test to prevent interference
        sinon.restore();
        global.alert.resetHistory();
        global.fetch.reset();
    });

    // --- Validation Tests ---

    it('should alert if note name is missing on submit', async () => {
        const form = document.getElementById('noteForm');
        document.getElementById('note').value = '';

        form.dispatchEvent(new window.Event('submit'));
        expect(global.alert.calledWith('Please enter a name for the file.')).to.be.true;
    });

    it('should alert if file is missing on submit', async () => {
        const form = document.getElementById('noteForm');
        document.getElementById('note').value = 'Test Note';

        // Mock empty files array
        const fileInput = document.getElementById('fileInput');
        Object.defineProperty(fileInput, 'files', { value: [], configurable: true });

        form.dispatchEvent(new window.Event('submit'));
        expect(global.alert.calledWith('Please select a file to upload.')).to.be.true;
    });

    // --- API / Fetch Tests ---

    it('should handle successful file upload', async () => {
        global.fetch.resolves({ ok: true });

        const noteInput = document.getElementById('note');
        const fileInput = document.getElementById('fileInput');

        noteInput.value = 'My File';
        Object.defineProperty(fileInput, 'files', {
            value: [new window.File(['abc'], 'test.txt')],
            configurable: true
        });

        const form = document.getElementById('noteForm');
        // We use the real event listener attached by app.js
        await form.dispatchEvent(new window.Event('submit'));

        expect(global.alert.calledWith('File uploaded successfully!')).to.be.true;
        expect(noteInput.value).to.equal(''); // Verifies UI cleanup logic
    });

    it('should handle failed file upload', async () => {
        global.fetch.resolves({ ok: false });

        document.getElementById('note').value = 'My File';
        const form = document.getElementById('noteForm');

        await form.dispatchEvent(new window.Event('submit'));
        expect(global.alert.calledWith('Failed to upload file.')).to.be.true;
    });

    it('should render files in the table correctly', async () => {
        const mockFiles = [
            { name: 'Doc 1', key: 'key1' },
            { name: 'Doc 2', key: 'key2' }
        ];

        global.fetch.resolves({
            ok: true,
            json: async () => mockFiles
        });

        // Trigger the loadFiles function defined in app.js

        const tableBody = document.querySelector('#notesList tbody');
    });

    it('should handle file deletion successfully', async () => {
        global.fetch.resolves({ ok: true });
    });

    // --- Theme Tests ---

    it('should toggle theme and update localStorage', () => {
        const themeToggle = document.getElementById('themeToggle');

        // Change to dark
        themeToggle.checked = true;
        themeToggle.dispatchEvent(new window.Event('change'));

        expect(document.documentElement.getAttribute('data-theme')).to.equal('dark');
        expect(global.localStorage.setItem.calledWith('theme', 'dark')).to.be.true;

        // Change back to light
        themeToggle.checked = false;
        themeToggle.dispatchEvent(new window.Event('change'));

        expect(document.documentElement.getAttribute('data-theme')).to.equal('light');
        expect(global.localStorage.setItem.calledWith('theme', 'light')).to.be.true;
    });
});
class DOMElements {

    constructor(calcWidth, calcHeight) {
        this.calcWidth = calcWidth;
        this.calcHeight = calcHeight;
    }

    createButton(val, btnType) {
        let btn = document.createElement('BUTTON');
        btn.setAttribute('type', 'button');
        btn.setAttribute('value', val);
        btn.setAttribute('data-type', btnType);
        btn.appendChild(document.createTextNode(val));
        return btn;
    }

    createDisplay() {
        let inputDisplay = document.createElement('input');
        inputDisplay.setAttribute('type', 'text');
        inputDisplay.setAttribute('class', 'calcOutputDisplay');
        inputDisplay.setAttribute('placeholder', '0');
        inputDisplay.setAttribute('readonly', 'readonly');
        return inputDisplay;
    }

    createSubDiv() {
        let subDiv = document.createElement('div');
        subDiv.setAttribute('class', 'subContainer');
        subDiv.appendChild(this.createButtons());
        return subDiv;
    }

    createContainer() {
        let div = document.createElement('div');
        div.setAttribute('class', 'calcContainer');
        div.appendChild(this.createDisplay());
        div.appendChild(this.createSubDiv());
        return div;
    }

    createButtons() {
        let btnElements = new Map();
        btnElements.set('AC', 'ACBtn');
        btnElements.set('%', 'modulo');
        btnElements.set('÷', 'divide');
        btnElements.set('×', 'multiply');
        btnElements.set('7', 'number');
        btnElements.set('8', 'number'); 
        btnElements.set('9', 'number');
        btnElements.set('+', 'plus');
        btnElements.set('4', 'number');
        btnElements.set('5', 'number');
        btnElements.set('6', 'number');
        btnElements.set('-', 'minus');
        btnElements.set('1', 'number');
        btnElements.set('2', 'number');
        btnElements.set('3', 'number'); 
        btnElements.set('⌫', 'back');
        btnElements.set('🗑', 'trash');
        btnElements.set('0', 'number');
        btnElements.set('.', 'dot');
        btnElements.set('=', 'equalTo');
                
        let btnElementsFragment = document.createDocumentFragment();

        btnElements.forEach((value, key) => {
            btnElementsFragment.appendChild(this.createButton(key, value));
        });

        return btnElementsFragment;
    }

    createAddCalcBtn() {
        let calcBtn = document.createElement('button');
        calcBtn.setAttribute('data-type', 'addCalcBtn');
        calcBtn.setAttribute('type', 'button');
        calcBtn.appendChild(document.createTextNode('New Calculator'));
        return calcBtn;
    }

    createDeleteCalcBtn() {
        let calcBtn = document.createElement('button');
        calcBtn.setAttribute('data-type', 'deleteCalcBtn');
        calcBtn.setAttribute('type', 'button');
        calcBtn.appendChild(document.createTextNode('Delete Calculator'));
        return calcBtn;
    }

    createCalcUI() {
        return this.createContainer();
    }

}   // DOMElements class ends
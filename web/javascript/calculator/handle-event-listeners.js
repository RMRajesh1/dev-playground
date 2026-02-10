/* This class is mapping the functions for specified events */

class HandleEventListeners extends LogicalExecute {

    constructor() {
        super();
        this.currentCalculator = undefined;
    }

    senseEvents(element, allCalcs) {

        this.target = element.target;
        let btn = this.target.dataset;

        if (this.target.tagName == 'BUTTON') {
            
            if (btn.type != 'addCalcBtn' && btn.type != 'deleteCalcBtn'){
                this.element = this.target;
                let calculatorUI = this.element.parentNode.parentNode;
                this.element = calculatorUI.querySelector('.calcOutputDisplay');
                this.outputWindow = this.element;

                this.element.dispatchEvent(new Event('input'));    // fire the oninput event mannually because of the readonly property in the display
            }

            // various buttons and their functions :-
            switch (btn.type){
                case 'number':
                    this.updateDisplay();
                    break;
                case 'plus':
                case 'minus':
                case 'divide':
                case 'multiply':
                case 'modulo':
                    this.operatorsCondition();
                    break;
                case 'dot':
                    this.validateDots(this.element.value);
                    break;
                case 'equalTo':
                    this.equalToOperator = true;
                    this.getResult(this.element);
                    break;
                case 'back':
                    let val = String(this.element.value);
                    if (val.length > 0) {
                        this.element.value = val.substring(0, val.length - 1);
                    }
                    break;
                case 'ACBtn':
                    this.resetCalc();
                    this.element.value = '';
                    break;
                case 'trash':
                    let calcUI = this.element.parentNode;
                    let currentCalcInstance = allCalcs.find(obj => obj.calcUI == calcUI);
                    let index = allCalcs.indexOf(currentCalcInstance);
                    currentCalcInstance.calcUI.remove();
                    allCalcs.splice(index, 1);
                    break;

            }   // switch case ends

        }   // if condition ends

    }   // senseEvents function ends

}   // event handler class ends
class App {

    constructor(){
        // yet
    }

    startApp(){
        let calculatorBox = document.createElement('div');
        calculatorBox.setAttribute('class', 'calculatorBox');
        let body = document.querySelector('body');
        body.appendChild(calculatorBox);

        this.appendTheButtons();

    }


    appendTheButtons() {
        this.AllCalculators = [];
        const DOM = new DOMElements();
        let container = document.querySelector(".calculatorBox");

        let createCalcBtn = DOM.createAddCalcBtn();       // create new calc button
        let deletCalcBtn = DOM.createDeleteCalcBtn();     // delete last calcultor button

        container.appendChild(createCalcBtn);         // displaying the create new button on document
        container.appendChild(deletCalcBtn);          // display the delete calc button on document

        createCalcBtn.addEventListener('click', (event) => {

            let calcObject = new Calculator(this.AllCalculators);
            calcObject.init();

            const RIPPLE = calcObject.ripple;

            this.AllCalculators.push(calcObject);
            container.appendChild(calcObject.calcUI);
            RIPPLE.makeRipple(event);

        });

        deletCalcBtn.addEventListener('click', (event) => {
            let allCalcs = this.AllCalculators;
            const RIPPLE = new Ripple();
            RIPPLE.makeRipple(event);
            if ((allCalcs.length > 1)) {
                allCalcs[allCalcs.length - 1].calcUI.remove();
                allCalcs.pop();
            }
        });

        createCalcBtn.click();   // initialize a calculator UI
        
    }

}


let app = new App();    // instance of the Calculator

window.onload = app.startApp();     // initializing the app
class Calculator extends HandleEventListeners{

    constructor(allCalcs){
        super();
        this.allCalcs = allCalcs;
    }

    init() {
        this.dom = new DOMElements();
        this.listeners = new HandleEventListeners();
        this.ripple = new Ripple();

        let container = document.querySelector('.calculatorBox');
        this.calcUI = this.dom.createCalcUI();     //this.createCalcUI();
        container.appendChild(this.calcUI);

        this.calcUI.querySelector('.calcOutputDisplay').addEventListener('input', (inputEvent) => {
            let displayValue = inputEvent.target.value;
            if (displayValue != 'AC' && displayValue != '⌫' && displayValue != '(' && displayValue != ')') {
                this.listeners.onInput(inputEvent.target.value);
            }
        });

        this.calcUI.addEventListener("click", (ele) => {       // adding click event listener for document
                this.eventResult = this.listeners.senseEvents(ele, this.allCalcs);
        });

    }

}


            // this.looping = () => {
            //     console.log("iterating...");

            //     if (!isNaN(Number(statement))){
            //         this.sum = Number(statement)
            //         console.log("Entered if statment");
            //     }else{
            //         console.log("Entered else statment");
            //         this.dataHandler();
            //     }
            // };

            // this.looping();









        // console.log("oninput function invoked!");

        // this.lastChar = this.target.value;
        
        // if (this.lastChar != "C" && this.lastChar != "⌫" || isNaN(this.lastChar)){
        //     val += this.lastChar;
        // }

        // console.log(val);

        // // for (var x = 0; x < val.length; x++){

        //     console.log("X = "+x+"\t data : "+val[x]);
        //     var x = val.length - 1;
        //     console.log(x);

        //     if (isNaN(val[x]) && val[x] != "." && val[x] != "="){
        //         console.log("entered!");
        //         if (this.currentOperator != ""){
        //             this.nextOpertor = val[x];
        //         }
        //         if (this.nextOpertor){
        //             this.getResult(this.element, this.outputWindow);
        //         }
        //         this.currentOperator = val[x];
        //         console.log("Value : "+val);
        //         console.log("next : "+this.nextOpertor+"\t current : "+this.currentOperator);
        //     }
        // // }

        // console.log("oninput function invoked!");




        // this.begin_index = statement.indexOf('(');
        // this.end_index = statement.indexOf(')');
        // // this.currentOperator = undefined;
    
        // if (this.begin_index >= 0 && this.end_index >= 0 && this.end_index <= statement.length - 1){
        //     this.sliced_value = statement.substr(this.begin_index + 1, this.end_index - 1); 
        // }








        // this.bracketConditions = () => {
        //     this.len = this.element.value.length;
        //     while (this.len >= 0){
        //         if (this.element.value[this.len - 1] == '(') return this.operatorsCondition(')');
        //         else if (this.element.value[this.len - 1] == ')') return this.operatorsCondition('(');
        //         else if (this.len == 0) return this.updateDisplay('(');
        //         this.len--;
        //     }
        // };


        // this.operatorsArray = ['+', '-', '%', '×', '÷', '.', '(', ')'];


        // while(!this.element.classList.contains("calcContainer") || this.element.tagName == 'BUTTON') {
        //     this.element = this.element.parentNode;
        //     if (this.element.classList.contains("calcContainer")) {
        //         this.outputWindow = this.element.querySelector('.outputDisplay');
        //         this.element = this.element.querySelector(".calcOutputDisplay");
        //         break;
        //     }
        // }




        // class DOMElements{
        //     constructor(calcWidth, calcHeight){
        //         this.calcWidth = calcWidth;
        //         this.calcHeight = calcHeight;
        //     }
        
        //     createButton(val, btnType){
        //         this.btn = document.createElement("BUTTON");
        //         this.btn.setAttribute("type", "button");
        //         this.btn.setAttribute("value", val);
        //         this.btn.setAttribute("class", btnType);
        //         this.btn.appendChild(document.createTextNode(val));
        //         return this.btn;
        //     }
        
        //     createDisplay(){
        
        //         this.inputDisplay = document.createElement("input");
        //         this.inputDisplay.setAttribute("type", "text");
        //         this.inputDisplay.setAttribute("class", "calcOutputDisplay");
        //         this.inputDisplay.setAttribute("placeholder", '0');
        //         this.inputDisplay.setAttribute("readonly", "readonly");
        
        //         return this.inputDisplay;
        //     }
        
        //     createSubDiv(){
        //         this.subDiv = document.createElement("div");
        //         this.subDiv.setAttribute("class", "subContainer");
        //         this.subDiv.appendChild(this.createButtons());
        //         return this.subDiv;
        //     }
        
        //     createContainer(){
        //         this.div = document.createElement('div');
        //         this.div.setAttribute("class", "calcContainer");
        
        //         this.div.appendChild(this.createDisplay());
        //         this.div.appendChild(this.createSubDiv());
        //         return this.div;
        //     }
        
        
        //     createButtons(){
        //         this.btnElements = new Map();
        //         this.btnElements.set('AC', "ACBtn");
        //         this.btnElements.set('%', 'modulo');
        //         this.btnElements.set('÷', "divide");
        //         this.btnElements.set('×', "multiply");
        //         this.btnElements.set('7', "number");
        //         this.btnElements.set('8', "number"); 
        //         this.btnElements.set('9', "number");
        //         this.btnElements.set('+', "plus");
        //         this.btnElements.set('4', "number");
        //         this.btnElements.set('5', "number");
        //         this.btnElements.set('6', "number");
        //         this.btnElements.set('-', "minus");
        //         this.btnElements.set('1', "number");
        //         this.btnElements.set('2', "number");
        //         this.btnElements.set('3', "number"); 
        //         this.btnElements.set('⌫', "back");
        //         this.btnElements.set('0', "number");
        //         this.btnElements.set('.', "dot");
        //         this.btnElements.set('=', "equalTo");
                        
        //         this.btnElementsFragment = document.createDocumentFragment();
        
        //         this.btnElements.forEach((value, key) => {
        //             this.btnElementsFragment.appendChild(this.createButton(key, value));
        //         });
        
        //         return this.btnElementsFragment;
        //     }
        
        
        //     createAddCalcBtn(){
        //         this.calcBtn = document.createElement("A");
        //         this.calcBtn.setAttribute("class", "addCalcBtn");
        //         this.calcBtn.appendChild(document.createTextNode("New Calculator"));
        //         return this.calcBtn;
        //     }
        
        //     createCalcUI(){
        //         return this.createContainer();
        //     }
        
        // }
        
        
        
        // /* Operations class */
        
        // class Operations extends DOMElements{
        //     constructor(){
        //         super();
        //     }
        
        //     addition(x, y){
        //         return x + y;
        //     }
        
        //     subtraction(x, y){
        //         return x - y;
        //     }
        
        //     multiplication(x, y){
        //         return x * y;
        //     }
        
        //     division(x, y){
        //         return x / y;
        //     }
        
        //     remainders(x, y){
        //         return x % y;
        //     }
        // }
        
        
        // /* Sub class */
        
        // class SubClass extends Operations{
        //     constructor(){
        //         super();
        
        //         this.prefixCode = "";
        //         this.suffixCode = "";
        //         this.currentOperator = "";
        //         this.sum = 0;
        //     }
        
        //     checkOperator(symbol){
        //         switch (symbol){
        //             case '+':
        //                 return this.addition(this.prefixCode, this.suffixCode);
        //             case '-':
        //                 return this.subtraction(this.prefixCode, this.suffixCode);
        //             case '×':
        //                 return this.multiplication(this.prefixCode, this.suffixCode);
        //             case '÷':
        //                 return this.division(this.prefixCode, this.suffixCode);
        //             case '%':
        //                 return this.remainders(this.prefixCode, this.suffixCode);
        //             case '÷':
        //                 return this.division(this.prefixCode, this.suffixCode);
        //         }
        //     }
        
            
        //     onInput(val){
        
        //         this.lastChar = this.target.value;
        
        //         if (this.lastChar && this.lastChar != "." && this.lastChar != "C" && isNaN(this.lastChar) && this.lastChar != '='){
        //             if (this.currentOperator){
        //                 this.getResult(this.element);
        //             }
        //             this.currentOperator = this.lastChar;
        //         }
        
        //     }
        
        //     checkSyntax(statement){
        
        //         // this.operatorsArray = ['+', '-', '%', '×', '÷', '.', '(', ')'];
               
        //         this.operationContainer = (() => {
        
        //             this.helperForPerformOperation = (val) => {
        //                 for (var i = 0; i < val.length; i++){
        //                     if (isNaN(val[i]) && val[i]!="."){
        //                         this.currentOperator = val[i];
        //                         this.index = val.indexOf(val[i]);
        
        //                         this.prefixCode = Number(val.substr(0, this.index));
        //                         this.suffixCode = Number(val.substr(this.index + 1));
        
        //                         this.subSum += this.checkOperator(this.currentOperator);
        //                     }
        //                 }
        //             }
        
        //             this.performOperation = (val) => {
        //                 this.subSum = 0;
        //                 this.helperForPerformOperation(val);
        //                 return this.subSum;
        //             };
                    
        
        //             this.dataHandler = () => {
                        
        //                 this.begin_index = 0;
        //                 this.end_index = statement.length - 1;
        //                 this.sliced_value = statement.substr(this.begin_index, this.end_index + 1);
        
        //                 statement = this.performOperation(this.sliced_value);
        //                 if (!this.currentOperator) statement = this.sliced_value;
        //                 this.sum = Number(statement);
        //             }
        
        //             this.dataHandler();
        
        //         })();
        
        //     }
        
        
        //     getResult(inputScreen){
                
        //         this.checkSyntax(inputScreen.value);
        
        
        //         if (!isNaN(this.sum)){
        //             if (this.lastChar == '='){
        //                 inputScreen.value = this.sum;
        //                 this.resetCalc();
        //             }else{
        //                 this.currentOperator = this.lastChar;
        //                 inputScreen.value = this.sum + this.currentOperator;
        //             }
        //         }
        //     }
            
        //     resetCalc(){
        //         this.prefixCode = "";
        //         this.suffixCode = "";
        //         this.currentOperator = "";
        //         // this.element.value = "";
        
        //         this.sum = 0;
                
        //         this.lastChar = undefined;
        //         this.nextOpertor = undefined;
        //     }
            
        // }
        
        
        
        // /* Event handlers */
        
        
        // class HandleEventListeners extends SubClass{
        
        //     constructor(){
        //         super();
        //     }
        
        //     senseEvents(element){
        
        //         this.target = element.target;
        //         this.cls = this.target.classList;
        
        //         if (this.target.tagName == 'BUTTON'){
                    
        //             this.element = this.target;
                    
        //             // getting the current calculators display :-
        //             while(!this.element.classList.contains("calcContainer") || this.element.tagName == 'BUTTON'){
        //                 this.element = this.element.parentNode;
        //                 if (this.element.classList.contains("calcContainer")){
        //                     this.outputWindow = this.element.querySelector('.outputDisplay');
        //                     this.element = this.element.querySelector(".calcOutputDisplay");
        //                     break;
        //                 }
        //             }
        
        //             this.updateDisplay = (char) => {
        //                 (char != undefined) ? this.element.value += char : this.element.value += this.target.value;
        //                 this.element.focus();
        //             }
        
        //             this.operatorsCondition = (char) => {
        //                 if (this.element.value != ""){
        //                     this.len = this.element.value.length;
        //                     if (!isNaN(this.element.value[this.len - 1]) || this.element.value[this.len - 1]==')'){
        //                         (char != undefined) ? this.updateDisplay(char) : this.updateDisplay();
        //                     }
        //                 }
        //             }
        
        //             this.element.dispatchEvent(new Event('input'));    // fire the oninput event mannually because of the readonly property in the display
        
        
        //             // various buttons and their functions :-
                    
        //             if (this.cls.contains("number")) return (() => { this.updateDisplay() })();
        
        //             if (this.cls.contains("plus")) return (() => { this.operatorsCondition() })();
        //             if (this.cls.contains("minus")) return (() => { this.operatorsCondition() })();
        //             if (this.cls.contains("divide")) return (() => { this.operatorsCondition() })();
        //             if (this.cls.contains("multiply")) return (() => { this.operatorsCondition() })();
        //             if (this.cls.contains("modulo")) return (() => { this.operatorsCondition() })();
        //             if (this.cls.contains("dot")) return (() => { this.operatorsCondition() })();
        
        //             if (this.cls.contains("equalTo")) return (() => { 
        //                 this.equalToOperator = true;
        //                 this.getResult(this.element);
        //             })();
        
        //             if (this.cls.contains("back")) return (() => { 
        //                 if (this.element.value.length > 0){
        //                     this.element.value = this.element.value.substring(0, this.element.value.length - 1);
        //                 }
        //              })();
        
        //             if (this.cls.contains('ACBtn')) return (() => { 
        //                 this.resetCalc();
        //                 this.element.value = "";
        //             })();
        
        //         }
        
        
        //         if (this.target.tagName == 'A'){
        //             this.calcUI = this.createCalcUI();
        //             this.target.parentNode.appendChild(this.calcUI);
        
        //             this.calcUI.querySelector(".calcOutputDisplay").addEventListener('input', (event) => {
        
        //                 var x = this.target.value;
        //                 if (x != "AC" && x != "⌫" && x != "(" && x != ")"){
        //                     this.onInput(event.target.value);
        //                 }
                        
        //             });
        
        //         }
        
        
        
        //     }
        
        
        
        // }


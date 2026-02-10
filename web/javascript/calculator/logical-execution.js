/* This class contains the logic execution methods */

class LogicalExecute extends Operations {

    constructor() {
        super();

        this.prefixCode = '';
        this.suffixCode = '';
        this.currentOperator = '';
        this.sum = 0;
    }

    checkOperator(symbol) {
        switch (symbol) {
            case '+':
                return this.addition(this.prefixCode, this.suffixCode);
            case '-':
                return this.subtraction(this.prefixCode, this.suffixCode);
            case '×':
                return this.multiplication(this.prefixCode, this.suffixCode);
            case '÷':
                return this.division(this.prefixCode, this.suffixCode);
            case '%':
                return this.remainders(this.prefixCode, this.suffixCode);
            case '÷':
                return this.division(this.prefixCode, this.suffixCode);
        }
    }

    onInput(val) {
        this.lastChar = this.target.value;
        if (this.lastChar && this.lastChar != '.' && this.lastChar != 'C' && isNaN(this.lastChar) && this.lastChar != '=' && this.lastChar != '⌫') {
            let len = this.element.value.length - 1;
            if (this.currentOperator && !isNaN(this.element.value[len])) {
                this.validateInstantOperation(this.element);
            }
        }
        this.findLastOperator(val);
        this.element.focus();
    }

    validateInstantOperation(val){
        let len = val.length;
        if (isNaN(val[len - 1]) && val[len - 1] != '.'){
            this.currentOperator = val[len - 1];
            this.getResult(this.element);
        }
    }

    validateDots(val) {
        let len = val.length;
        let checkDot = (prefix) => {
            let index = prefix.indexOf('.');
            if (Number.isInteger(Number(prefix)) && index == -1){
                (prefix == '') ? this.updateDisplay('0.') : this.updateDisplay('.');
            }
        }
        if (!isNaN(val)){
            checkDot(val);
        }
        else{
            let suffix = '';
            for (var char = len - 1; char >= 0; char--){
                if (isNaN(val[char]) && val[char] != '.') break;
                suffix += val[char];
            }
            checkDot(suffix);
        }
    }

    findLastOperator(val) {
        for (var nth = val.length - 1;  nth >= 0; nth--){
            if (isNaN(val[nth]) && val[nth] != '.'){
                this.currentOperator = val[nth];
            }
        }
    }

    updateDisplay(char) {
        (char != undefined) ? 
            this.element.value += char : 
            this.element.value += this.target.value;
    }

    operatorsCondition(char) {
        if (this.element.value != '') {
            this.len = this.element.value.length;
            let lastChar = this.element.value[this.len - 1];
            if (!isNaN(lastChar)) {
               if (char != undefined) {
                this.updateDisplay(char)
               } else {
                this.updateDisplay();
               }
            }
        }
    }

    helperForPerformOperation(val) {
        for (var i = 0; i < val.length; i++) {
            if (isNaN(val[i]) && val[i]!='.' && i != 0) {
                this.currentOperator = val[i];
                this.index = val.lastIndexOf(val[i]);
                this.prefixCode = Number(val.substr(0, this.index));
                this.suffixCode = Number(val.substr(this.index + 1));
                this.subSum += this.checkOperator(this.currentOperator);
            }
        }
    }

    performOperation(val) {
        this.subSum = '';
        this.helperForPerformOperation(val);
        return this.subSum;
    }

    dataHandler(statement) {
        this.begin_index = 0;
        this.end_index = statement.length - 1;
        this.sliced_value = statement.substr(this.begin_index, this.end_index + 1);
        statement = this.performOperation(this.sliced_value);
        if (!this.currentOperator) statement = this.sliced_value;
        this.sum = Number(statement);
    }

    checkSyntax(statement) {
        let len = statement.length;
        (isNaN(statement[len - 1]) && statement[len - 1] != '.') ? this.sum = '' : this.dataHandler(statement);
    }

    getResult(inputScreen) {
        this.checkSyntax(inputScreen.value);
        if (!isNaN(this.sum) && this.sum != '' || this.sum == 0) {
            if (!Number.isInteger(this.sum)){
                this.sum = Number(this.sum).toFixed(2);
                this.sum = (String(this.sum) == '0.00') ? 0 : this.sum;
            }
            if (this.lastChar == '=') {
                inputScreen.value = String(this.sum);
                this.resetCalc();
            } else {
                this.currentOperator = this.lastChar;
                inputScreen.value = String(this.sum + this.currentOperator);
            }
        }
    }
    
    resetCalc() {
        this.prefixCode = '';
        this.suffixCode = '';
        this.sum = 0;
        this.currentOperator = undefined;
        this.lastChar = undefined;
        this.nextOpertor = undefined;
    }
    
}
class CalcController {

    constructor() {
        this._operation = []
        this._locale = 'pt-BR'
        this._displayCalcEl = document.querySelector('#display')
        this._dateEl = document.querySelector('#data')
        this._timeEl = document.querySelector('#hora')
        this._currentData
        this.initialize()
        this.initButtonsEvents()
    }

    initialize() {
        this.setDisplayDateTime()

        setInterval(() => {
            this.setDisplayDateTime()
        }, 1000)

        this.setLastNumberToDisplay()
    }

    addEventListenerAll(element, events, callback) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, callback, false)
        })
    }

    clearAll() {
        this._operation = []
        this.setLastNumberToDisplay()
    }

    clearEntry() {
        this._operation.pop()
        this.setLastNumberToDisplay()
    }

    setError() {
        this.displayCalc = 'Error'
    }

    getLastOperation() {
        return this._operation[this._operation.length - 1]
    }

    isOperator(value) {
        return (['+', '-', '*', '/', '%'].indexOf(value) > -1)

    }

    setLastOperation(value) {
        this._operation[this._operation.length - 1] = value
    }

    pushOperation(value) {
        this._operation.push(value)

        if (this._operation.length > 3) {
            this.calc()
        }
    }

    calc() {
        let lastOperation = ''
        
        if(this._operation.length > 3) {
            lastOperation = this._operation.pop()
        }
        
        let result = eval(this._operation.join(""))

        if(lastOperation == '%') {

            result /= 100
            this._operation = [result]
        } else {

            this._operation = [result]
            if(lastOperation) this._operation.push(lastOperation)
        }
        
        this.setLastNumberToDisplay()
        
    }
    
    setLastNumberToDisplay() {
        let lastNumber
        for(let i = this._operation.length -1; i >= 0; i-- ) {
            if(!this.isOperator(this._operation[i])) {
                lastNumber = this._operation[i]
                break  
            }
        }
        if(!lastNumber) lastNumber = 0
        this.displayCalc = lastNumber
    }

    addOperation(value) {

        if (isNaN(this.getLastOperation())) {

            if (this.isOperator(value)) {

                this.setLastOperation(value)

            } else if (isNaN(value)) {

                console.log('outra coisa')
            } else {
                this.pushOperation(value)
                this.setLastNumberToDisplay()
            }
        } else {

            if (this.isOperator(value)) {
                
                this.pushOperation(value)
            } else {
                const newValue = this.getLastOperation().toString() + value.toString()
                this.setLastOperation(parseInt(newValue))

                this.setLastNumberToDisplay()
            }

        }
    }

    executeButton(value) {
        switch (value) {
            case 'ac':
                this.clearAll()
                break

            case 'ce':
                this.clearEntry()
                break

            case 'soma':
                this.addOperation('+')
                break

            case 'subtracao':
                this.addOperation('-')
                break

            case 'multiplicacao':
                this.addOperation('*')
                break

            case 'divisao':
                this.addOperation('/')
                break

            case 'porcento':
                this.addOperation('%')
                break

            case 'igual':
                this.calc()
                break
            case 'ponto':
                this.addOperation('.')
                break

            default:
                this.setError()
                break

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value))
                break
        }
    }

    initButtonsEvents() {
        const buttons = document.querySelectorAll("#buttons > g, #parts > g")
        buttons.forEach((button, index) => {
            this.addEventListenerAll(button, 'click drag', event => {
                let textButton = button.className.baseVal.replace('btn-', '')
                this.executeButton(textButton)
            })
            button.style.cursor = 'pointer'
        })
    }

    setDisplayDateTime() {
        this.displayDate = this.currentDate.toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "short",
            year: "numeric"
        })
        this.displayTime = this.currentDate.toLocaleTimeString(this._locale)
    }

    get displayTime() {
        return this._timeEl.innerHTML
    }

    set displayTime(value) {
        return this._timeEl.innerHTML = value
    }

    get displayDate() {
        return this._dateEl.innerHTML
    }

    set displayDate(value) {
        return this._dateEl.innerHTML = value
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value
    }

    get currentDate() {
        return new Date()
    }

    set currentDate(value) {
        this._currentData = value
    }
}

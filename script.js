const result = document.getElementById('result');
const historyDiv = document.getElementById('history');
const advancedButtons = document.getElementById('advanced-buttons');
const liveResultDiv = document.getElementById('live-result');
let memory = 0;

const assameseNumbers = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯'
};

function toAssameseNumbers(value) {
    return String(value).replace(/\d/g, digit => assameseNumbers[digit] || digit);
}

function appendNumber(number) {
    if (!result) {
        console.error("Result input not found!");
        return;
    }
    const assameseNum = Object.values(assameseNumbers)[parseInt(number)] || number;
    result.value += assameseNum;
    showLiveResult();
}

function appendOperator(operator) {
    if (!result.value) return;
    const displayOperator = {
        '*': '×',
        '/': '÷',
        '+': '+',
        '-': '-'
    }[operator] || operator;
    result.value += displayOperator;
    showLiveResult();
}

function appendPoint() {
    if (!result.value.includes('.') || result.value.split(/[×÷+-]/).pop().includes('.')) {
        // Only add point if current number doesn't already have one
        result.value += '.';
        showLiveResult();
    }
}

function clearDisplay() {
    result.value = '';
    historyDiv.innerHTML = '';
    liveResultDiv.innerHTML = '';
    memory = 0;
}

function deleteLast() {
    result.value = result.value.slice(0, -1);
    showLiveResult();
}

function calculateResult() {
    try {
        let expression = result.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');

        Object.entries(assameseNumbers).forEach(([eng, as]) => {
            expression = expression.replace(new RegExp(as, 'g'), eng);
        });

        if (expression.includes('^')) {
            const [base, exponent] = expression.split('^').map(part => eval(part));
            const calculationResult = Math.pow(base, exponent);
            const assameseResult = toAssameseNumbers(calculationResult.toString());
            historyDiv.innerHTML = `<p>${result.value} = ${assameseResult}</p>` + historyDiv.innerHTML;
            result.value = assameseResult;
            liveResultDiv.innerHTML = '';
        } else {
            const calculationResult = eval(expression);
            if (isNaN(calculationResult) || !isFinite(calculationResult)) {
                throw new Error('Invalid calculation');
            }
            const assameseResult = toAssameseNumbers(calculationResult.toString());
            historyDiv.innerHTML = `<p>${result.value} = ${assameseResult}</p>` + historyDiv.innerHTML;
            result.value = assameseResult;
            liveResultDiv.innerHTML = '';
        }
    } catch {
        result.value = 'ভুল';
        liveResultDiv.innerHTML = '';
    }
}

function showLiveResult() {
    try {
        let expression = result.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');

        Object.entries(assameseNumbers).forEach(([eng, as]) => {
            expression = expression.replace(new RegExp(as, 'g'), eng);
        });

        const liveCalculation = eval(expression);
        if (isFinite(liveCalculation) && !isNaN(liveCalculation)) {
            liveResultDiv.innerHTML = "= " + toAssameseNumbers(liveCalculation.toString());
        } else {
            liveResultDiv.innerHTML = '';
        }
    } catch {
        liveResultDiv.innerHTML = '';
    }
}

function squareRoot() {
    try {
        let expression = result.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        Object.entries(assameseNumbers).forEach(([eng, as]) => {
            expression = expression.replace(new RegExp(as, 'g'), eng);
        });

        const calculationResult = Math.sqrt(eval(expression));
        if (isNaN(calculationResult)) throw new Error('Invalid sqrt');
        
        result.value = toAssameseNumbers(calculationResult.toString());
        historyDiv.innerHTML = `<p>√(${expression}) = ${result.value}</p>` + historyDiv.innerHTML;
        liveResultDiv.innerHTML = '';
    } catch {
        result.value = 'ভুল';
    }
}

function square() {
    try {
        let expression = result.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        Object.entries(assameseNumbers).forEach(([eng, as]) => {
            expression = expression.replace(new RegExp(as, 'g'), eng);
        });

        const calculationResult = Math.pow(eval(expression), 2);
        result.value = toAssameseNumbers(calculationResult.toString());
        historyDiv.innerHTML = `<p>(${expression})² = ${result.value}</p>` + historyDiv.innerHTML;
        liveResultDiv.innerHTML = '';
    } catch {
        result.value = 'ভুল';
    }
}

function power() {
    try {
        let base = result.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        Object.entries(assameseNumbers).forEach(([eng, as]) => {
            base = base.replace(new RegExp(as, 'g'), eng);
        });

        const baseNum = eval(base);
        result.value += "^";
        liveResultDiv.innerHTML = '';
    } catch {
        result.value = 'ভুল';
    }
}

function logarithm() {
    try {
        let expression = result.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        Object.entries(assameseNumbers).forEach(([eng, as]) => {
            expression = expression.replace(new RegExp(as, 'g'), eng);
        });

        const calculationResult = Math.log10(eval(expression));
        if (isNaN(calculationResult) || !isFinite(calculationResult)) throw new Error('Invalid log');
        
        result.value = toAssameseNumbers(calculationResult.toString());
        historyDiv.innerHTML = `<p>log(${expression}) = ${result.value}</p>` + historyDiv.innerHTML;
        liveResultDiv.innerHTML = '';
    } catch {
        result.value = 'ভুল';
    }
}

function sine() {
    try {
        let expression = result.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        Object.entries(assameseNumbers).forEach(([eng, as]) => {
            expression = expression.replace(new RegExp(as, 'g'), eng);
        });

        const calculationResult = Math.sin(eval(expression) * Math.PI / 180);
        result.value = toAssameseNumbers(calculationResult.toString());
        historyDiv.innerHTML = `<p>sin(${expression}) = ${result.value}</p>` + historyDiv.innerHTML;
        liveResultDiv.innerHTML = '';
    } catch {
        result.value = 'ভুল';
    }
}

function cosine() {
    try {
        let expression = result.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        Object.entries(assameseNumbers).forEach(([eng, as]) => {
            expression = expression.replace(new RegExp(as, 'g'), eng);
        });

        const calculationResult = Math.cos(eval(expression) * Math.PI / 180);
        result.value = toAssameseNumbers(calculationResult.toString());
        historyDiv.innerHTML = `<p>cos(${expression}) = ${result.value}</p>` + historyDiv.innerHTML;
        liveResultDiv.innerHTML = '';
    } catch {
        result.value = 'ভুল';
    }
}

function tangent() {
    try {
        let expression = result.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        Object.entries(assameseNumbers).forEach(([eng, as]) => {
            expression = expression.replace(new RegExp(as, 'g'), eng);
        });

        const calculationResult = Math.tan(eval(expression) * Math.PI / 180);
        if (!isFinite(calculationResult)) throw new Error('Invalid tan');
        
        result.value = toAssameseNumbers(calculationResult.toString());
        historyDiv.innerHTML = `<p>tan(${expression}) = ${result.value}</p>` + historyDiv.innerHTML;
        liveResultDiv.innerHTML = '';
    } catch {
        result.value = 'ভুল';
    }
}

function percentage() {
    try {
        let expression = result.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        Object.entries(assameseNumbers).forEach(([eng, as]) => {
            expression = expression.replace(new RegExp(as, 'g'), eng);
        });

        const calculationResult = eval(expression) / 100;
        result.value = toAssameseNumbers(calculationResult.toString());
        historyDiv.innerHTML = `<p>${expression}% = ${result.value}</p>` + historyDiv.innerHTML;
        liveResultDiv.innerHTML = '';
    } catch {
        result.value = 'ভুল';
    }
}

function memorySave() {
    try {
        memory = eval(result.value
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/[০-৯]/g, match => Object.keys(assameseNumbers).find(key => assameseNumbers[key] === match)));
    } catch {
        memory = 0;
    }
}

function memoryRecall() {
    result.value = toAssameseNumbers(memory.toString());
    showLiveResult();
}

function toggleAdvanced() {
    advancedButtons.style.display = 
        (advancedButtons.style.display === "none" || !advancedButtons.style.display) 
        ? "grid" 
        : "none";
}

document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        const assameseNum = assameseNumbers[key];
        result.value += assameseNum;
        showLiveResult();
    }
    else if (["+", "-", "*", "/"].includes(key)) appendOperator(key);
    else if (key === ".") appendPoint();
    else if (key === "Enter" || key === "=") calculateResult();
    else if (key === "Backspace") deleteLast();
    else if (key === "Escape") clearDisplay();
    event.preventDefault();
});

window.onload = function() {
    if (!result) console.error("Result element not found");
    if (!historyDiv) console.error("History element not found");
    if (!advancedButtons) console.error("Advanced buttons element not found");
    if (!liveResultDiv) console.error("Live result element not found");
};

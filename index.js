const exp = [
    "OR", ["<", "a", "b"],
    [
        "AND", ["==", "c", "d"],
        ["!=", "e", "f"],
    ]
];
// expected op :: "a < b OR (c == d AND e != f)"

const logicalOperators = ['or', 'and'];
const comparisonOperators = ['<', '>', '==', '===', '!=', '!==', '<=', '>='];
const expLength = exp.length;
let result = '';

const processLogicalExpression = (operator, expression) => {
    const expressionLength = expression.length;
    let res = '';
    for (let index = 0; index < expressionLength; index++) {
        const currentExpression = expression[index];
        const output = processExpression(currentExpression);
        res = `${res} ${output}`;
        if (index < (expressionLength - 1)) {
            res = `${res} ${operator.toUpperCase()}`
        }
    }
    return res;
}

const processOperatorExpression = (operator, expression) => {
    return `${expression[1]} ${operator} ${expression[2]}`;
}

const processExpression = (expression) => {

    try {
        let op = '';
        const operator = expression[0].toLocaleLowerCase();
        switch (true) {
            case logicalOperators.indexOf(operator) > -1:
                op = op + '(';
                op += processLogicalExpression(operator, expression.slice(1, expression.length));
                op = op + ')';
                break;
            case comparisonOperators.indexOf(operator) > -1:
                op = processOperatorExpression(operator, expression);
                break;
        }
        return op;
    } catch (error) {
        console.log("StackTrace:: Error while processing expression :: ", error)
    }
}

console.log(processExpression(exp));

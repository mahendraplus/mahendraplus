// Extract the "cal" parameter from the query string
const urlParams = new URLSearchParams(window.location.search);
const cal = urlParams.get('cal');

// Evaluate the calculation if provided
let result = '';
if (cal) {
    try {
        result = eval(cal); // This will evaluate the calculation string
    } catch (error) {
        result = 'Invalid input';
    }
}

// Output the result to the div with id 'result'
document.getElementById('result').innerText = result;
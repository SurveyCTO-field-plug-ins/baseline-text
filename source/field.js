var input = document.getElementById('text-field');

function clearAnswer() {
    input.innerHTML = '';
} 

function setFocus() {
    if(!fieldProperties.READONLY){
        input.focus();
        if (window.showSoftKeyboard) {
            window.showSoftKeyboard();
        }
    }
}

input.oninput = function() {
    setAnswer(input.value);
}
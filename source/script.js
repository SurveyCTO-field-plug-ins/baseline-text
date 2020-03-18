// Detect platform
var isWebCollect = (document.body.className.indexOf("web-collect") >= 0);
var isAndroid = (document.body.className.indexOf("android-collect") >= 0);
var isIOS = (document.body.className.indexOf("ios-collect") >= 0);

// Find the input element
var input = document.getElementById('text-field');

// Restricts input for the given textbox to the given inputFilter.
function setInputFilter(textbox, inputFilter) {
    function restrictInput() {
        if (inputFilter(this.value)) {
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
            this.oldValue = this.value;
        } else if (this.hasOwnProperty("oldValue")) {
            this.value = this.oldValue;
            this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
        } else {
            this.value = "";
        }
    }

    // Truncate to 15 chars.
    textbox.value = textbox.value.substring(0, 15);

    // Apply restriction when typing, copying/pasting, dragging-and-dropping, etc.
    textbox.addEventListener("input", restrictInput);
    textbox.addEventListener("keydown", restrictInput);
    textbox.addEventListener("keyup", restrictInput);
    textbox.addEventListener("mousedown", restrictInput);
    textbox.addEventListener("mousedown", restrictInput);
    textbox.addEventListener("contextmenu", restrictInput);
    textbox.addEventListener("drop", restrictInput);
}

// Define what happens when the user attempts to clear the response
function clearAnswer() {
    input.value = '';
} 

// If the field is not marked readonly, then focus on the field and show the on-screen keyboard (for mobile devices)
function setFocus() {
    if(!fieldProperties.READONLY){
        input.focus();
        if (window.showSoftKeyboard) {
            window.showSoftKeyboard();
        }
    }
}

// Save the user's response (update the current answer)
input.oninput = function() {
    setAnswer(input.value);
}

// check for standard appearance options and apply them
if ( fieldProperties.APPEARANCE.includes("numbers_phone") === true ) {
    input.type = "tel";
} else if ( fieldProperties.APPEARANCE.includes("numbers_decimal") === true ) {
    input.pattern = "[0-9]*";

    // Set/remove the "inputmode".
    function setInputMode(attributeValue) {
        if (attributeValue === null) {
            input.removeAttribute("inputmode");
        } else {
            input.setAttribute("inputmode", attributeValue);
        }
    }

    setInputMode("numeric");

    // For iOS, we'll default the inputmode to "numeric" (as defined above), unless some specific value is
    // passed as plug-in parameter.
    if (isIOS) {
        var inputModeIOS = getPluginParameter("inputmode-ios");
        if (inputModeIOS !== undefined) {
            setInputMode(inputModeIOS);
        }
    }
    // For Android, we'll default the inputmode to "numeric" (as defined above),
    // unless some specific value is passed as plug-in parameter.
    else if (isAndroid) {
        var inputModeAndroid = getPluginParameter("inputmode-android");
        if (inputModeAndroid !== undefined) {
            setInputMode(inputModeAndroid);
        }
    }
    // For WebCollect, we'll default the inputmode to "numeric" (as defined above),
    // unless some specific value is passed as plug-in parameter.
    else if(isWebCollect) {
        var inputModeWebCollect = getPluginParameter("inputmode-web");
        if (inputModeWebCollect !== undefined) {
            setInputMode(inputModeWebCollect);
        }
    }

    // If the field is not marked as readonly, then restrict input to decimal only.
    if(!fieldProperties.READONLY) {
        setInputFilter(input, function (value) {
            return /^-?\d*[.,]?\d*$/.test(value);
        });
    }

} else if ( fieldProperties.APPEARANCE.includes("numbers") === true ) {
    input.type = "number";
} 

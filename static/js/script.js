const lengthInput = document.getElementById('length');
const lenValLabel = document.getElementById('len-val');
const digitsCheckbox = document.getElementById('digits');
const specCheckbox = document.getElementById('spec');
const generateBtn = document.getElementById('generate-btn');
const resultBox = document.getElementById('result');
const toastNotification = document.getElementById('toast');


lengthInput.addEventListener('input', (e) => {
    lenValLabel.innerText = e.target.value;
});


async function generatePassword() {
    const length = lengthInput.value;
    const digits = digitsCheckbox.checked;
    const spec = specCheckbox.checked;

    try {
        const response = await fetch(`/api/generate?length=${length}&digits=${digits}&spec=${spec}`);
        const data = await response.json();
        
        resultBox.innerText = data.password;
    } catch (error) {
        console.error("Error requesting the backend:", error);
        resultBox.innerText = "Server error";
    }
}


function copyPassword() {
    const text = resultBox.innerText;
    if (text === "Click «Create»" || text === "Server error") return;
    
    navigator.clipboard.writeText(text).then(() => {
        toastNotification.style.opacity = 1;

        setTimeout(() => {
            toastNotification.style.opacity = 0;
        }, 1500);
    });
}

generateBtn.addEventListener('click', generatePassword);
resultBox.addEventListener('click', copyPassword);

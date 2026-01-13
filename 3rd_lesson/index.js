const input = document.getElementById('input');

const addString = (string) => {
    input.value += string;
}


const calculate = () => {
    try {
        input.value = input.value.replace(/×/g,'*');
        input.value = input.value.replace(/÷/g,'/');
        input.value = input.value.replace(/π/g, Math.PI)
        let formula = input.value;
        input.value = math.evaluate(formula);
    }
    catch(error) {
        input.value = "Error";
    }
}

function deleteAll() {
    input.value = "";
}
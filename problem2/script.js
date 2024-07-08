function populateCurrencyOptions() {
    fetch('https://interview.switcheo.com/prices.json')
    .then(response => response.json())
    .then(data => {
    const sendSelect = document.getElementById('sndToken');
    const receiveSelect = document.getElementById('rcvToken');

    sendSelect.innerHTML = '';
    receiveSelect.innerHTML = '';

    data.forEach(item => {
        const optionSend = document.createElement('option');
        optionSend.value = item.currency;
        optionSend.textContent = item.currency;
        if(item in sendSelect){
        sendSelect.replaceChild(optionSend);
        }
        sendSelect.appendChild(optionSend);

        const optionReceive = document.createElement('option');
        optionReceive.value = item.currency;
        optionReceive.textContent = item.currency;
        receiveSelect.appendChild(optionReceive);
    });
    })
    .catch(error => {
    console.error('Error fetching data:', error);
    });
}

function exchangeRate() {
    const sendSelect = document.getElementById('sndToken');
    const rcvSelect = document.getElementById('rcvToken');
    const sndInput = document.getElementById('snd-input');
    const rcvOutput = document.getElementById('rcv-output');
    const sndEst = document.getElementById('snd-est');
    const rcvEst = document.getElementById('rcv-est');

    if (sendSelect.value && sndInput.value) {
        fetch('https://interview.switcheo.com/prices.json')
        .then(response => response.json())
        .then(data => {
            const selectedSendCurrency = sendSelect.value;
            const selectedRcvCurrency = rcvSelect.value;

            const sendItem = data.find(item => item.currency === selectedSendCurrency);
            const rcvItem = data.find(item => item.currency === selectedRcvCurrency);

            if (sendItem && rcvItem) {
                const exchangeRateSend = sendItem.price;
                const amountToSend = exchangeRateSend * parseFloat(sndInput.value);
                sndEst.textContent = `$${amountToSend.toFixed(2)}`; // Display estimated amount

                const exchangeRateRcv = rcvItem.price;
                const tokensReceived =  amountToSend/exchangeRateRcv;
                const amountToReceive = tokensReceived*exchangeRateRcv;
                rcvEst.textContent = `$${amountToReceive.toFixed(2)}`; // Display estimated amount

                rcvOutput.value = tokensReceived.toFixed(5); // Update rcvOutput with the calculated amount
            } else {
                console.error('Selected send or receive currency not found in data');
                sndEst.textContent = '---';
                rcvEst.textContent = '---';
                rcvOutput.value = ''; // Clear rcvOutput if currencies are not found
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            sndEst.textContent = '---';
            rcvEst.textContent = '---';
            rcvOutput.value = ''; // Clear rcvOutput on error
        });
    } else {
        sndEst.textContent = '---';
        rcvEst.textContent = '---';
        rcvOutput.value = ''; // Clear rcvOutput if no send currency or amount entered
    }
}

function main() {
    populateCurrencyOptions();

    const sendSelect = document.getElementById('sndToken');
    const rcvSelect = document.getElementById('rcvToken');
    const sndInput = document.getElementById('snd-input');
    const rcvOutput = document.getElementById('rcv-output');

    sendSelect.addEventListener('change', exchangeRate);
    rcvSelect.addEventListener('change', exchangeRate);
    sndInput.addEventListener('input', exchangeRate);
    rcvOutput.addEventListener('input', exchangeRate);

    const form = document.getElementById('swap');
    form.addEventListener('submit', function(event) {
        if (!sndInput.value) {
            event.preventDefault(); // Prevent form submission if snd-input is empty
            alert('Please enter a value in the Send input!');
        } else {
                exchangeRate(); // Calculate exchange rate
                alert('Swap complete!'); // Display alert upon successful submission
        }
    });

    exchangeRate(); // Initialize the calculation
}

main();

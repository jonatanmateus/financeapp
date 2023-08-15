const addButton = document.getElementById("add-button");
        const transactionNameInput = document.getElementById("transaction-name");
        const transactionAmountInput = document.getElementById("transaction-amount");
        const transactionsList = document.getElementById("transactions");

        addButton.addEventListener("click", addTransaction);

        function addTransaction() {
            const name = transactionNameInput.value;
            const amount = parseFloat(transactionAmountInput.value);

            if (name.trim() === "" || isNaN(amount)) {
                return;
            }

            const transactionItem = document.createElement("li");
            transactionItem.innerHTML = `
                <span>${name}</span>
                <span class="amount ${amount >= 0 ? 'positive' : 'negative'}">${amount.toFixed(2)}</span>
                <button class="delete-button">Delete</button>
            `;

            const deleteButton = transactionItem.querySelector(".delete-button");
            deleteButton.addEventListener("click", () => {
                transactionsList.removeChild(transactionItem);
                updateTotal();
            });

            transactionsList.appendChild(transactionItem);
            updateTotal();

            transactionNameInput.value = "";
            transactionAmountInput.value = "";
        }

        function updateTotal() {
            const amounts = document.querySelectorAll(".amount");
            let total = 0;

            amounts.forEach(amount => {
                const value = parseFloat(amount.textContent);
                total += value;
            });

            const totalAmountElement = document.getElementById("total-amount");
            totalAmountElement.textContent = total.toFixed(2);
            totalAmountElement.classList.toggle("positive", total >= 0);
            totalAmountElement.classList.toggle("negative", total < 0);
        }

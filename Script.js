class Smoothie {
    constructor(flavor, extras) {
        this.flavor = flavor;
        this.extras = extras;
        this.prices = {
            'strawberry': 5,
            'banana': 4,
            'mango': 6,
            'blueberry': 6,
            'pineapple': 5,
            'chocolate': 7,
            'Almonds': 2,
            'Coconut Flakes': 1.5,
            'Avocado': 2.5,
            'Greek Yogurt': 2,
            'Mint Leaves': 0.5,
            'Matcha Powder': 3
        };
    }

    calculatePrice() {
        let total = this.prices[this.flavor];
        this.extras.forEach(extra => {
            total += this.prices[extra];
        });
        return total;
    }

    describe() {
        return `Smoothie with ${this.flavor} flavor and extras: ${this.extras.join(', ')}.`;
    }
}

let orderInProgress = false;

document.getElementById('order-button').addEventListener('click', () => {
    if (orderInProgress) {
        alert("An order is already in progress. Please cancel the current order before placing a new one.");
        return;
    }

    const flavor = document.getElementById('flavor').value;
    const extras = Array.from(document.querySelectorAll('input[name="extras"]:checked')).map(el => el.value);
    const tip = parseFloat(document.getElementById('tip').value) || 0;

    if (!flavor) {
        alert("Please select a flavor.");
        return;
    }

    const smoothie = new Smoothie(flavor, extras);
    const basePrice = smoothie.calculatePrice();
    const totalPrice = basePrice + tip;
    const description = `${smoothie.describe()} (Tip: $${tip.toFixed(2)}, Total price: $${totalPrice.toFixed(2)})`;

    document.getElementById('order-summary').textContent = description;

    const statusElement = document.getElementById('order-status');
    statusElement.textContent = "Order in Progress";
    statusElement.className = 'order-in-progress';
    statusElement.classList.remove('hidden');
    orderInProgress = true;
});

document.getElementById('cancel-button').addEventListener('click', () => {
    if (!orderInProgress) {
        alert("No order is currently in progress.");
        return;
    }

    document.getElementById('order-summary').textContent = '';
    const statusElement = document.getElementById('order-status');
    statusElement.textContent = "Order Canceled";
    statusElement.className = 'order-canceled';
    statusElement.classList.remove('hidden');
    orderInProgress = false;
    
});

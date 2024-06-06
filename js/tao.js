function calculateGrowth() {
    let annualRate = document.getElementById('annualRate').value / 100;
    let initialTokens = document.getElementById('initialTokens').value;
    let days = document.getElementById('days').value;

    let dailyRate = Math.pow(1 + annualRate, 1/365) - 1;
    let finalAmount = initialTokens * Math.pow(1 + dailyRate, days);

    document.getElementById('result').innerText = `Après ${days} jours, vous aurez ${finalAmount.toFixed(2)} tokens Tao.`;
}

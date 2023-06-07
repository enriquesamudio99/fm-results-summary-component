const loader = document.querySelector('#loader');
const resultPercentageNumber = document.querySelector('#resultPercentageNumber');
const summaryList = document.querySelector('#summaryList');

document.addEventListener("DOMContentLoaded", () => {

    initApp();

});

const initApp = () => loadResults();

const loadResults = async () => {

    const data = await fetch("./data.json");
    const response = await data.json();

    let totalScore = 0;
    
    response.forEach((result) => {

        const { category, score, icon, color, bgColor } = result;

        totalScore += score;

        // Summary Item
        const summaryItem = document.createElement("LI");
        summaryItem.classList.add("card__summary-item");
        summaryItem.style.backgroundColor = bgColor;

        // Summary Info
        const summaryInfo = document.createElement("DIV");
        summaryInfo.classList.add("card__summary-info");

        const summaryInfoIcon = document.createElement("IMG");
        summaryInfoIcon.src = icon;
        summaryInfoIcon.alt = "";
        summaryInfoIcon.classList.add("card__summary-info-icon");

        const summaryInfoCategory = document.createElement("P");
        summaryInfoCategory.classList.add("card__summary-info-category");
        summaryInfoCategory.textContent = category;
        summaryItem.style.color = color;

        summaryInfo.appendChild(summaryInfoIcon);
        summaryInfo.appendChild(summaryInfoCategory);

         // Summary Score
        const summaryScore = document.createElement("DIV");
        summaryScore.classList.add("card__summary-score");

        const summaryScoreText = document.createElement("P");
        summaryScoreText.classList.add("card__summary-score-text");
        summaryScoreText.innerHTML = `<span class="card__summary-score-span">${score}</span> / 100`;

        summaryScore.appendChild(summaryScoreText);

        summaryItem.appendChild(summaryInfo);
        summaryItem.appendChild(summaryScore);

        summaryList.appendChild(summaryItem);

        setTimeout(() => {
            loader.remove();
        }, 500);

    });

    const finalPercentage = Math.floor((totalScore * 100) / (100 * response.length));

    resultPercentageNumber.textContent = finalPercentage;

}
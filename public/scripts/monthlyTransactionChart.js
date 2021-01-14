const fullUrl = window.location.pathname.split("/");
const monthUrl = fullUrl[3];
const yearUrl = fullUrl[4];

const getData = async () => {
	const tData = [];
	const cache = {};
	await fetch(`/member/statistics/data/${monthUrl}/${yearUrl}`)
		.then((r) => r.json())
		.then((data) => {
			data.map((d) => {
				let num = Number(d.amount).toFixed(2);
				if (!cache[d.category]) {
					cache[d.category] = Number(num);
				} else {
					cache[d.category] += Number(num);
				}
			});
		});

	cache.Bills ? tData.push(cache.Bills.toFixed(2)) : tData.push(0);
	cache.Auto ? tData.push(cache.Auto.toFixed(2)) : tData.push(0);
	cache.Health ? tData.push(cache.Health.toFixed(2)) : tData.push(0);
	cache.Food ? tData.push(cache.Food.toFixed(2)) : tData.push(0);
	cache.Shopping ? tData.push(cache.Shopping.toFixed(2)) : tData.push(0);
	cache.Other ? tData.push(cache.Other.toFixed(2)) : tData.push(0);

	return tData;
};

chartIt();

Chart.pluginService.register({
	beforeDraw: function (chart) {
		if (chart.config.options.elements.center) {
			// Get ctx from string
			var ctx = chart.chart.ctx;

			// Get options from the center object in options
			var centerConfig = chart.config.options.elements.center;
			var fontStyle = centerConfig.fontStyle || "Arial";
			var txt = centerConfig.text;
			var color = centerConfig.color || "#000";
			var maxFontSize = centerConfig.maxFontSize || 75;
			var sidePadding = centerConfig.sidePadding || 20;
			var sidePaddingCalculated =
				(sidePadding / 100) * (chart.innerRadius * 2);
			// Start with a base font of 30px
			ctx.font = "30px " + fontStyle;

			// Get the width of the string and also the width of the element minus 10 to give it 5px side padding
			var stringWidth = ctx.measureText(txt).width;
			var elementWidth = chart.innerRadius * 2 - sidePaddingCalculated;

			// Find out how much the font can grow in width.
			var widthRatio = elementWidth / stringWidth;
			var newFontSize = Math.floor(30 * widthRatio);
			var elementHeight = chart.innerRadius * 2;

			// Pick a new font size so it will not be larger than the height of label.
			var fontSizeToUse = Math.min(
				newFontSize,
				elementHeight,
				maxFontSize
			);
			var minFontSize = centerConfig.minFontSize;
			var lineHeight = centerConfig.lineHeight || 25;
			var wrapText = false;

			if (minFontSize === undefined) {
				minFontSize = 20;
			}

			if (minFontSize && fontSizeToUse < minFontSize) {
				fontSizeToUse = minFontSize;
				wrapText = true;
			}

			// Set font settings to draw it correctly.
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			var centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
			var centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
			ctx.font = fontSizeToUse + "px " + fontStyle;
			ctx.fillStyle = color;

			if (!wrapText) {
				ctx.fillText(txt, centerX, centerY);
				return;
			}

			var words = txt.split(" ");
			var line = "";
			var lines = [];

			// Break words up into multiple lines if necessary
			for (var n = 0; n < words.length; n++) {
				var testLine = line + words[n] + " ";
				var metrics = ctx.measureText(testLine);
				var testWidth = metrics.width;
				if (testWidth > elementWidth && n > 0) {
					lines.push(line);
					line = words[n] + " ";
				} else {
					line = testLine;
				}
			}

			// Move the center up depending on line height and number of lines
			centerY -= (lines.length / 2) * lineHeight;

			for (var n = 0; n < lines.length; n++) {
				ctx.fillText(lines[n], centerX, centerY);
				centerY += lineHeight;
			}
			//Draw text in center
			ctx.fillText(line, centerX, centerY);
		}
	},
});

async function chartIt() {
	let tData = await getData();

	let numData = tData.map((t) => Number(t));

	const editedAmount = numeral(numData.reduce((a, b) => a + b, 0)).format(
		"$0,0.00"
	);
	console.log(tData);
	const transactionChart = document.getElementById("myMonthlyChart");
	const myChart = new Chart(transactionChart, {
		type: "doughnut",
		data: {
			labels: ["Bills", "Auto", "Health", "Food", "Shopping", "Other"],
			datasets: [
				{
					label: "Expenses",
					data: tData,
					backgroundColor: [
						"#796ADE80",
						"#542ABA80",
						"#8457E680",
						"#EF59D480",
						"#FCAEAB80",
						"#FCD7AB80",
					],
					borderColor: [
						"#796ADE",
						"#542ABA",
						"#8457E6",
						"#EF59D4",
						"#FCAEAB",
						"#FCD7AB",
					],
					borderWidth: 1,
				},
			],
		},
		options: {
			legend: {
				labels: {
					fontColor: "rgb(55, 55, 55)",
					fontSize: 15,
				},
			},
			events: ["click"],
			elements: {
				center: {
					text: `${editedAmount} \tTotal Spent`,
					color: "FF6384",
					sidePadding: 20,
					minFontSize: 30,
					lineHeight: 40,
				},
			},
			// rotation: 1 * Math.PI,
			// circumference: 1 * Math.PI,
		},
	});
}

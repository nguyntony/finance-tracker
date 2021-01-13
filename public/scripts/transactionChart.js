const getData = async () => {
	const tData = [];
	const cache = {};

	await fetch("/member/transaction/list/data")
		.then((r) => r.json())
		.then((data) => {
			data.map((d) => {
				if (!cache[d.category]) {
					cache[d.category] = Math.round(Number(d.amount));
				} else {
					cache[d.category] += Math.round(Number(d.amount));
				}
			});
		});

	cache.Bills ? tData.push(cache.Bills) : tData.push(0);
	cache.Auto ? tData.push(cache.Auto) : tData.push(0);
	cache.Health ? tData.push(cache.Health) : tData.push(0);
	cache.Food ? tData.push(cache.Food) : tData.push(0);
	cache.Shopping ? tData.push(cache.Shopping) : tData.push(0);
	cache.Other ? tData.push(cache.Other) : tData.push(0);

	return tData;
};
chartIt();

async function chartIt() {
	const tData = await getData();
	const transactionChart = document.getElementById("myChart");
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
			// rotation: 1 * Math.PI,
			// circumference: 1 * Math.PI,
		},
	});
}

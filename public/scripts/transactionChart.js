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

	cache.bills ? tData.push(cache.bills) : tData.push(0);
	cache.auto ? tData.push(cache.auto) : tData.push(0);
	cache.health ? tData.push(cache.health) : tData.push(0);
	cache.food ? tData.push(cache.food) : tData.push(0);
	cache.shopping ? tData.push(cache.shopping) : tData.push(0);
	cache.other ? tData.push(cache.other) : tData.push(0);

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
						"rgba(255, 99, 132, 0.2)",
						"rgba(54, 162, 235, 0.2)",
						"rgba(255, 206, 86, 0.2)",
						"rgba(75, 192, 192, 0.2)",
						"rgba(153, 102, 255, 0.2)",
						"rgba(255, 159, 64, 0.2)",
					],
					borderColor: [
						"rgba(255, 99, 132, 1)",
						"rgba(54, 162, 235, 1)",
						"rgba(255, 206, 86, 1)",
						"rgba(75, 192, 192, 1)",
						"rgba(153, 102, 255, 1)",
						"rgba(255, 159, 64, 1)",
					],
					borderWidth: 1,
				},
			],
		},
		options: {
			// rotation: 1 * Math.PI,
			// circumference: 1 * Math.PI,
		},
	});
}

const transactionChart = document.getElementById("myChart");

const getData = async () => {
	await fetch("/member/transaction/list/data")
		.then((r) => r.json())
		.then((d) => data.push(d));
};

console.log(data);

const myChart = new Chart(transactionChart, {
	type: "doughnut",
	data: {
		labels: ["Bills", "Auto", "Health", "Food", "Shopping", "Other"],
		datasets: [
			{
				label: "Expenses",
				data: [12, 19, 3, 5, 2, 0],
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
		rotation: 1 * Math.PI,
		circumference: 1 * Math.PI,
	},
});

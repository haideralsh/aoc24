import { data } from "./data.js";

const reports = data.split("\n").map((line) => line.split(/\s+/).map(Number));

function isReportSafe(report) {
	let firstDiff = report[1] - report[0]
	let firstSign = Math.sign(firstDiff)

	if (Math.abs(firstDiff) > 3 || Math.abs(firstDiff) < 1) return false

	for (let i = 1; i < report.length - 1; i++) {
		let currentDiff = report[i + 1] - report[i]

		if (
			Math.sign(currentDiff) !== firstSign || 
			Math.abs(currentDiff) > 3 || 
			Math.abs(currentDiff) < 1				
		) return false
		
	}

	return true
}

let safeReportCount = reports.map(isReportSafe).filter(Boolean).length

console.log({ safeReportCount })
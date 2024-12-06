import { data } from "./data.js";

// Identical to part 1
function isReportSafe(report) {
  let firstDiff = report[1] - report[0];
  let firstSign = Math.sign(firstDiff);

  if (Math.abs(firstDiff) > 3 || Math.abs(firstDiff) < 1) return false;

  for (let i = 1; i < report.length - 1; i++) {
    let currentDiff = report[i + 1] - report[i];

    if (
      Math.sign(currentDiff) !== firstSign ||
      Math.abs(currentDiff) > 3 ||
      Math.abs(currentDiff) < 1
    )
      return false;
  }

  return true;
}

function removeAt(arr, i) {
  return arr.slice(0, i).concat(arr.slice(i + 1));
}

function isDampenedReportSafe(report) {
  if (isReportSafe(report)) return true;

  for (let i = 0; i < report.length; i++) {
    let dampenedReport = removeAt(report, i);
    if (isReportSafe(dampenedReport)) return true;
  }

  return false;
}

let safeReportCount = data
  .split("\n")
  .map((line) => line.split(/\s+/).map(Number))
  .map(isDampenedReportSafe)
  .filter(Boolean).length;

console.log({ safeReportCount });

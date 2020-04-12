#!/usr/bin/env node

const execSync = require("child_process").execSync;
const _differenceBy = require("lodash.differenceby");
const chalk = require("chalk");

const args = process.argv.slice(2);

const developmentBranch = args[0];
const stableBranch = args[1];
const chalkStableBranch = chalk.blue.bold(stableBranch);
const chalkDevelopmentBranch = chalk.yellow.bold(developmentBranch);

const getCherryDiff = (from, to) => {
  const result = execSync(`git cherry ${to} ${from} -v`).toString();
  process.stdout.write(result);
  return result.split("\n");
};

const getArrayDifferenceByCommitName = (from, to) => {
  return _differenceBy(from, to, function (item) {
    return item.split(" ").slice(2).join(" ");
  });
};

// Main Thread
console.log(`\n${chalk.inverse.bold("Getting raw git cherry difference")}`);
console.log(`\nComparing commits of ${chalkDevelopmentBranch} branch on ${chalkStableBranch} branch `);
const cherryDiffDevToStable = getCherryDiff(developmentBranch, stableBranch);
console.log(`\nComparing commits of ${chalkStableBranch} branch on ${chalkDevelopmentBranch} branch `);
const cherryDiffStableToDev = getCherryDiff(stableBranch, developmentBranch);

console.log(`\n${chalk.inverse.bold("Getting filtered cherry difference")}`);
console.log(`\nCommits on ${chalkDevelopmentBranch} branch that is not on ${chalkStableBranch} branch`);
const commitsNotOnStable = getArrayDifferenceByCommitName(cherryDiffDevToStable, cherryDiffStableToDev);
console.log(commitsNotOnStable.join("\n"));

console.log(`\nCommits on ${chalkStableBranch} branch that is not on ${chalkDevelopmentBranch} branch`);
const commitsNotOnDev = getArrayDifferenceByCommitName(cherryDiffStableToDev, cherryDiffDevToStable);
console.log(commitsNotOnDev.join("\n"));

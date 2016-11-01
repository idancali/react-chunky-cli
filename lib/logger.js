var chalk = require("chalk");
var slana = require("slana");

function info(message, arg) {
  console.log(chalk.bold("[React Chunky]"), chalk.green(message), chalk.bold(arg), chalk.green("..."))
}

function done(message) {
  console.log(chalk.bold("[React Chunky]"), chalk.bold(message), chalk.green("✓"))
}

function error(error) {
  slana.stopWithError(error)
}

module.exports = { info, done, error }

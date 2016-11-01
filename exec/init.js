var config       = require("../config");
var logger       = require("../lib/logger");
var generator    = require("../lib/generator");

function createWebApp(name) {
  // logger.info("Creating React Web app", name)
  // generator.createFromTemplate("web/default", { name })
  // logger.done("Done")
  throw new Error("Cannot create web apps - just yet. Stay tuned. Use --native to create a mobile app.")
}

function createMobileApp(name) {
  logger.info("Creating React Native app", name)
  generator.createFromTemplate("mobile/default", { name })
  logger.done("Done")
}

function parseCommand(command) {
  if (!command.options.name) {
    // The new app requires a name
    throw new Error('Please specify an app name (--name)')
  }

  if (command.options.native) {
    // Looks like we want to create a mobile app
    createMobileApp(command.options.name)
    return
  }

  // This is going to create a web app
  createWebApp(command.options.name)
}

module.exports = function(command) {
  try {
    parseCommand(command)
  } catch (error) {
    logger.error(error)
  }
}

var path = require("path");

var config = {
  templatesDir: path.resolve(path.join(path.dirname(__dirname), 'templates')),
  templatesIgnores: ['.DS_Store', '*.jar', '*.zip', '*.png', '*.jpg', '*.jpeg', '*.gif'],
  assetsTypes: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.zip', '**/*.jar', '!.DS_Store'],
}

module.exports = config;

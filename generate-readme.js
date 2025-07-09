#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const questions = [
  { type: 'input', name: 'title', message: 'Project Title:' },
  { type: 'input', name: 'description', message: 'Project Description:' },
  { type: 'input', name: 'features', message: 'Key Features (comma separated):' },
  { type: 'input', name: 'installation', message: 'Installation Instructions:' },
  { type: 'input', name: 'usage', message: 'Usage Instructions:' },
  { type: 'input', name: 'screenshots', message: 'Screenshot paths (comma separated, optional):' },
  { type: 'input', name: 'contributing', message: 'Contributing Guidelines:' },
  { type: 'input', name: 'license', message: 'License:' },
  { type: 'input', name: 'contact', message: 'Contact Information (email, link, etc.):' },
];

function generateReadme(answers) {
  const featuresList = answers.features
    ? answers.features.split(',').map(f => `- ${f.trim()}`).join('\n')
    : '';
  const screenshotsSection = answers.screenshots
    ? answers.screenshots.split(',').map(s => `![Screenshot](${s.trim()})`).join('\n')
    : '';

  return `# ${answers.title}

${answers.description}

## Features
${featuresList}

## Installation
${answers.installation}

## Usage
${answers.usage}

${screenshotsSection ? '## Screenshots\n' + screenshotsSection + '\n' : ''}

## Contributing
${answers.contributing}

## License
${answers.license}

## Contact
${answers.contact}
`;
}

inquirer.default.prompt(questions).then(answers => {
  const readmeContent = generateReadme(answers);
  fs.writeFileSync(path.join(process.cwd(), 'README.md'), readmeContent);
  console.log('README.md generated successfully!');
}); 
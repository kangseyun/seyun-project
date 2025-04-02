#!/usr/bin/env node
/**
 * CODE-GENERATOR
 * CLI utility for generating code from templates
 * 
 * Usage:
 * node scripts/generate.js component MyComponent --description="My custom component"
 * node scripts/generate.js controller Product
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Available generators
const GENERATORS = {
  component: {
    template: '.cursor/templates/react-component.tsx',
    outputDir: 'apps/web/src/components',
    fileNamePattern: '{name}.tsx',
    placeHolders: {
      ComponentName: name => name,
      ComponentDescription: (name, options) => options.description || `${name} component`,
    },
  },
  controller: {
    template: '.cursor/templates/nest-controller.ts',
    outputDir: 'apps/api/src',
    fileNamePattern: '{name}/{name}.controller.ts',
    placeHolders: {
      ResourceName: name => name.charAt(0).toUpperCase() + name.slice(1),
      resourceName: name => name.charAt(0).toLowerCase() + name.slice(1),
    },
    additionalActions: [
      name => {
        const resourceName = name.charAt(0).toLowerCase() + name.slice(1);
        console.log(`Creating DTOs for ${resourceName}...`);
        
        // Create DTO directory if doesn't exist
        const dtoDirPath = path.join('apps/api/src', resourceName, 'dto');
        if (!fs.existsSync(dtoDirPath)) {
          fs.mkdirSync(dtoDirPath, { recursive: true });
        }
        
        // Create Create DTO
        const createDtoPath = path.join(dtoDirPath, `create-${resourceName}.dto.ts`);
        fs.writeFileSync(
          createDtoPath, 
          `/**
 * Create${name}Dto
 * DTO for creating a new ${resourceName}
 */
export class Create${name}Dto {
  // Add properties here
}
`
        );
        
        // Create Update DTO
        const updateDtoPath = path.join(dtoDirPath, `update-${resourceName}.dto.ts`);
        fs.writeFileSync(
          updateDtoPath,
          `/**
 * Update${name}Dto
 * DTO for updating a ${resourceName}
 */
import { PartialType } from '@nestjs/swagger';
import { Create${name}Dto } from './create-${resourceName}.dto';

export class Update${name}Dto extends PartialType(Create${name}Dto) {}
`
        );
      }
    ]
  },
  // Add more generators here
};

function parseArgs() {
  const [,, generatorType, name, ...rest] = process.argv;
  
  if (!generatorType || !name) {
    console.error('Usage: node scripts/generate.js <type> <name> [--option=value]');
    process.exit(1);
  }
  
  if (!GENERATORS[generatorType]) {
    console.error(`Unknown generator type: ${generatorType}`);
    console.error(`Available types: ${Object.keys(GENERATORS).join(', ')}`);
    process.exit(1);
  }
  
  // Parse options
  const options = {};
  rest.forEach(arg => {
    if (arg.startsWith('--')) {
      const [key, value] = arg.slice(2).split('=');
      options[key] = value || true;
    }
  });
  
  return { generatorType, name, options };
}

function generateFile({ generatorType, name, options }) {
  const generator = GENERATORS[generatorType];
  
  // Read template
  const templatePath = path.resolve(generator.template);
  let template = fs.readFileSync(templatePath, 'utf8');
  
  // Replace placeholders
  Object.entries(generator.placeHolders).forEach(([placeholder, valueFunc]) => {
    const value = valueFunc(name, options);
    template = template.replace(new RegExp(`{{${placeholder}}}`, 'g'), value);
  });
  
  // Ensure output directory exists
  const filePath = generator.fileNamePattern.replace('{name}', name.toLowerCase());
  const outputPath = path.resolve(generator.outputDir, filePath);
  const outputDir = path.dirname(outputPath);
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write file
  fs.writeFileSync(outputPath, template);
  console.log(`Generated: ${outputPath}`);
  
  // Run additional actions
  if (generator.additionalActions) {
    generator.additionalActions.forEach(action => action(name));
  }
  
  // Open the file in editor if possible
  try {
    execSync(`code ${outputPath}`);
  } catch (error) {
    // No code command or editor error, silently ignore
  }
}

// Main execution
const args = parseArgs();
generateFile(args); 
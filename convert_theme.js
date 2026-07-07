const fs = require('fs');
const html = fs.readFileSync('downloaded.html', 'utf8');

const scriptContentMatch = html.match(/tailwind\.config\s*=\s*(\{[\s\S]*?\})\s*</);
if (!scriptContentMatch) {
  console.log('No tailwind config found');
  process.exit(1);
}

// Evaluate the string into an object (since it's not strict JSON)
const configText = scriptContentMatch[1];
const config = eval('(' + configText + ')');

let css = '\n@theme {\n';

const colors = config.theme.extend.colors;
for (const [key, value] of Object.entries(colors)) {
  css += `  --color-${key}: ${value};\n`;
}

const borderRadius = config.theme.extend.borderRadius;
for (const [key, value] of Object.entries(borderRadius)) {
  if (key === 'DEFAULT') {
    css += `  --radius: ${value};\n`;
  } else {
    css += `  --radius-${key}: ${value};\n`;
  }
}

const spacing = config.theme.extend.spacing;
for (const [key, value] of Object.entries(spacing)) {
  css += `  --spacing-${key}: ${value};\n`;
}

const fontFamily = config.theme.extend.fontFamily;
for (const [key, value] of Object.entries(fontFamily)) {
  css += `  --font-${key}: ${value.join(', ')};\n`;
}

// fontSize in Tailwind v4 is mapped to multiple properties. We can just define custom properties or utilities if needed.
// It's easier to just write them as CSS variables and use them in utilities or define text sizes.
// Tailwind v4 uses --text-*
const fontSize = config.theme.extend.fontSize;
for (const [key, value] of Object.entries(fontSize)) {
  const size = value[0];
  const props = value[1];
  css += `  --text-${key}: ${size};\n`;
  if (props.lineHeight) css += `  --text-${key}--line-height: ${props.lineHeight};\n`;
  if (props.letterSpacing) css += `  --text-${key}--letter-spacing: ${props.letterSpacing};\n`;
  if (props.fontWeight) css += `  --text-${key}--font-weight: ${props.fontWeight};\n`;
}

css += '}\n';

const stylesMatch = html.match(/<style>\s*([\s\S]*?)\s*<\/style>/);
if (stylesMatch) {
  css += '\n' + stylesMatch[1] + '\n';
}

fs.appendFileSync('src/app/globals.css', css);
console.log('Theme appended to globals.css');

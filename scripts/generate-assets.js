const fs = require('fs');
const path = require('path');

// Ensure output directory exists
const outputDir = path.join(__dirname, '../public/frames');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

const totalFrames = 192;
const width = 1920;
const height = 1080;

console.log(`Generating ${totalFrames} SVG frames in ${outputDir}...`);

for (let i = 1; i <= totalFrames; i++) {
    // Progress 0 to 1
    const progress = (i - 1) / (totalFrames - 1);

    // Color transition: Dark Gray to Red-ish
    const r = Math.floor(50 + 150 * progress);
    const g = 50;
    const b = 50;
    const fillColor = `rgb(${r}, ${g}, ${b})`;

    // Shape transition: Circle to Square
    // SVG rect with rx (radius). 
    // Circle: rx = size/2. Square: rx = 0.
    const size = 400;
    const maxRadius = size / 2;
    const radius = maxRadius * (1 - progress);

    const svgContent = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="100%" height="100%" fill="#111" />
    <rect x="${(width - size) / 2}" y="${(height - size) / 2}" width="${size}" height="${size}" rx="${radius}" fill="${fillColor}" />
    <text x="50%" y="80%" font-family="monospace" font-size="40" fill="rgba(255,255,255,0.5)" text-anchor="middle">FRAME ${i} / ${totalFrames}</text>
    <text x="50%" y="85%" font-family="monospace" font-size="20" fill="rgba(255,255,255,0.3)" text-anchor="middle">ASSET RECOVERY MODE</text>
</svg>
`;

    // Save as .jpg (trick: it's actually SVG content, but modern browsers might not like .jpg ext for SVG content in img tag)
    // Wait, my component expects `frame (*).jpg`.
    // If I save as `.jpg` but content is SVG, browser will likely fail to decode.
    // I should change the component to look for `.svg` OR `.jpg` or just save as `.svg` and update component.

    // Easier to update component to load `.svg`?
    // Or simpler: can I generate a BMP/PPM? 
    // PPM (P3) is text based! But browsers don't support PPM natively in <img>.

    // SVG is best. I will update the component to look for `.svg` (or make it agnostic).
    // Let's generate `.svg` files.
    fs.writeFileSync(path.join(outputDir, `frame (${i}).svg`), svgContent.trim());

    if (i % 20 === 0) process.stdout.write('.');
}

console.log('\nDone! Note: Frames are now .svg');

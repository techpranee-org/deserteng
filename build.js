const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// Define source and destination directories
const srcDir = path.join(__dirname, 'public');
const destDir = path.join(__dirname, 'static');
const viewsDir = path.join(__dirname, 'views');
const viewsDestDir = path.join(destDir);

// Create static directory if it doesn't exist
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log('Created static directory');
}

// Copy public folder to static folder
function copyDir(src, dest) {
    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            if (!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath, { recursive: true });
            }
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Render EJS templates to HTML
async function renderTemplates() {
    const MachineList = require('./data/machinelist.json');

    // Define routes and their data
    const routes = [
        { path: 'index.html', template: 'index', data: { title: 'Desert Engineering' } },
        { path: 'contact.html', template: 'contact', data: { title: 'Desert Engineering', alert: false, error: true, msg: "email could not be sent" } },
        { path: 'about.html', template: 'about', data: { title: 'Desert Engineering' } },
        { path: 'machines.html', template: 'machines', data: { title: 'Desert Engineering' } },
        { path: 'certifications.html', template: 'awards', data: { title: 'Desert Engineering' } },
        { path: 'careers.html', template: 'careers', data: { title: 'Desert Engineering', alert: false, msg: "" } },
        { path: 'purchase-order.html', template: 'purchaseorder', data: { title: 'Desert Engineering' } },
        { path: 'machines1.html', template: 'machinesP1', data: { mlist: MachineList } }
    ];

    for (const route of routes) {
        try {
            const templatePath = path.join(viewsDir, route.template + '.ejs');
            const outputPath = path.join(viewsDestDir, route.path);

            // Read the template
            const template = fs.readFileSync(templatePath, 'utf8');

            // Render the template with data
            const html = await ejs.render(template, route.data, {
                views: [viewsDir],
                filename: templatePath
            });

            // Write the rendered HTML
            fs.writeFileSync(outputPath, html);
            console.log(`Rendered ${route.path}`);
        } catch (error) {
            console.error(`Error rendering ${route.template}:`, error.message);
        }
    }
}

console.log('Building app to static folder...');

// Copy public to static
copyDir(srcDir, destDir);
console.log('Copied public to static');

// Render EJS templates to HTML
renderTemplates().then(() => {
    console.log('Build complete! Static HTML files are in the /static folder');
}).catch(error => {
    console.error('Build failed:', error);
});

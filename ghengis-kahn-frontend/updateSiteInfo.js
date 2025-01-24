import fs from "fs";
import path from "path";

// Path to the siteInfo.json file
const filePath = path.join(
	__dirname,
	"ghengis-kahn-frontend",
	"data",
	"siteInfo.json"
);

// Read the existing JSON file
const siteInfo = JSON.parse(fs.readFileSync(filePath, "utf8"));

// Update the lastUpdated field with the current date and time
siteInfo.lastUpdated = new Date().toISOString();

// Write the updated JSON back to the file
fs.writeFileSync(filePath, JSON.stringify(siteInfo, null, 2));

console.log("siteInfo.json updated with the current timestamp.");

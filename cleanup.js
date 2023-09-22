const fs = require('fs');
const path = require('path');

const uploadDirectory =path.join(__dirname, 'uploads'); ; // Replace with your upload folder path

// Define the maximum file age in milliseconds (e.g., 24 hours)
const maxFileAge = 24 * 60 * 60 * 1000;

function cleanupUploads() {
  fs.readdir(uploadDirectory, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    const currentTime = Date.now();

    files.forEach((file) => {
      const filePath = path.join(uploadDirectory, file);

      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.error(`Error getting file stats: ${statErr}`);
          return;
        }

        const fileAge = currentTime - stats.mtime.getTime();

        if (fileAge > maxFileAge) {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error(`Error deleting file: ${unlinkErr}`);
            } else {
              console.log(`Deleted file: ${filePath}`);
            }
          });
        }
      });
    });
  });
}

// Run the cleanup function
cleanupUploads();

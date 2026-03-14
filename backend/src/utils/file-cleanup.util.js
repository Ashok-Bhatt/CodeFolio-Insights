import fs from 'fs';
import path from 'path';

const deleteUploads = async () => {
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (fs.existsSync(uploadsDir)) {
        const files = fs.readdirSync(uploadsDir);
        for (const file of files) {
            const filePath = path.join(uploadsDir, file);
            if (fs.statSync(filePath).isFile()) {
                fs.unlinkSync(filePath);
            }
        }
        console.log(`🧹 Cleared ${files.length} files from uploads directory`);
    }
};

export {
    deleteUploads,
};

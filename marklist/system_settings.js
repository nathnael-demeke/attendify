const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post('/save-system-settings', upload.single('cover'), async (req, res) => {
    try {
        // Handle file upload and database update
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
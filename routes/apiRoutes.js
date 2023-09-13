const router = require('express').Router();
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

router.get('/api/notes', async (req, res) => {
    const db = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    res.json(db);
});

router.post('/api/notes', async (req, res) => {
    const db = await JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    const newNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
    };
    
    db.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(db));
    res.json(db);
});

router.delete('/api/notes/:id', (req, res) => {
    let data = fs.readFileSync('./db/db.json', 'utf8');
    const dbData = JSON.parse(data);
    const newNote = dbData.filter((note) => {
        return note.id !== req.params.id;
        });
    fs.writeFileSync('./db/db.json', JSON.stringify(newNote));
    res.json("Note Deleted!");
});

module.exports = router;
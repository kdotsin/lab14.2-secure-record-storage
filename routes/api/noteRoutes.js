import e from 'express';
import Note from '../../models/Notes.js';
import { authMiddleware } from '../../utils/auth.js';

const router = e.Router();
 
// Apply authMiddleware to all routes in this file
router.use(authMiddleware);
 
router.get('/', async (req, res) => {
  try {
    const id = req.user._id;
    const notes = await Note.find({ user: id });
    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
router.post('/', async (req, res) => {
  try {
    const note = await Note.create({
      ...req.body,
      user: req.user._id
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json(err);
  }
});
 
// PUT /api/notes/:id - Update a note
router.put('/:id', async (req, res) => {
  try {
    // This needs an authorization check
    const findNote = await Note.findById(req.params.id);

    if (findNote.user != req.user._id) {
      return res.status(403).json({ message: 'User is not authorized to update this note.' });
    }

    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }
    res.json(note);
  } catch (err) {
    res.status(500).json(err);
  }
});
 
// DELETE /api/notes/:id - Delete a note
router.delete('/:id', async (req, res) => {
  try {
    // This needs an authorization check
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'No note found with this id!' });
    }
    res.json({ message: 'Note deleted!' });
  } catch (err) {
    res.status(500).json(err);
  }
});
 
export default router;
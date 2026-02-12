import express from 'express';
import { createNoteSchema, lockNoteSchema, unlockNoteSchema } from '../middleware/validation.js';
import { newNotes, findNote, getAllNotesByAdmin, updateNote, deleteNote, pinNote, lockNote, unlockNote } from '../controller/notes.controller.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

// Create a new note
router.post('/add-notes', createNoteSchema, isAuth, newNotes);

// Get all notes (admin only)
router.get('/get-all-notes', isAuth, getAllNotesByAdmin);

// Get a specific note by ID
router.get('/:id/findnote', isAuth, findNote);

// Update a note
router.put('/:id/update', isAuth, updateNote);

// Delete a note
router.delete('/:id/delete', isAuth, deleteNote);

// Pin/Unpin a note
router.put('/:id/pin', isAuth, pinNote);

// Lock a note
router.put('/:id/lock', lockNoteSchema, isAuth, lockNote);

// Unlock a note
router.put('/:id/unlock', unlockNoteSchema, isAuth, unlockNote);

export default router;
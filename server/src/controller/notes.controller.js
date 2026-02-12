import NoteServiceActivity from '../services/notes.services.js';

const NoteService = new NoteServiceActivity()
export const newNotes = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const note = await NoteService.createNote(req.body, userId);
        res.success(note, 'Note created successfully', 201);
    } catch (error) {
        next(error); 
    }
};
// Get Notes
export const findNote = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const note = await NoteService.getNoteById(req.params.id, userId);
        res.success(note);
    } catch (error) {
        next(error);
    }
};
export const getAllNotesByAdmin = async (req, res, next) => {
    try {
        const role = req.user.role;
        const notes = await NoteService.getAllNotes(role);
        res.success(notes, `Retrieved ${notes.length} notes`);
    } catch (error) {
         next(error); 
        }
};

// UPDATE
export const updateNote = async (req, res, next) => {
    try {
        const updatedNote = await NoteService.updateNote(req.params.id, req.user.id, req.body);
        res.success(updatedNote, 'Note updated successfully', 200);
    } catch (error) { 
        next(error); }
};

// DELETE
export const deleteNote = async (req, res, next) => {
    try {
        await NoteService.deleteNote(req.params.id, req.user.id);
        res.success(null, 'Note deleted successfully', 204);
    } catch (error) { next(error); }
};

// PIN
export const pinNote = async (req, res, next) => {
    try {
        const note = await NoteService.togglePinNote(req.params.id, req.user.id);
        res.success(note, `Note ${note.isPinned ? 'pinned' : 'unpinned'}`);
    } catch (error) { next(error); }
};


export const lockNote = async (req, res, next) => {
    try {
        const { notePassword } = req.body;
        const result = await NoteService.lockNote(req.params.id, req.user.id, notePassword);
        
        res.success(null, result.message);
    } catch (error) { next(error); }
};

export const unlockNote = async (req, res, next) => {
    try {
        const { notePassword } = req.body;
        const note = await NoteService.unlockNote(req.params.id, req.user.id, notePassword);
        
        res.success(note, 'Note unlocked');
    } catch (error) { next(error); }
};

import Note from '../models/notes.models.js'
import AppError from '../utils/AppError.js'
import bcrypt from 'bcryptjs'


class NoteServiceActivity {
    async createNote(noteData, userId) {
        const { title, content } = noteData;

        const existingNote = await Note.findOne({ title, userId });
        if (existingNote) {
            throw new AppError(400, "A note with this title already exists");
        }

        const newNote = await Note.create({
            title,
            content,
            notePassword: null,
            isPinned: false,
            isLocked: false,
            userId
        });

        return newNote;
    }
    // Get
    async getNoteById(noteId, userId) {
        const note = await Note.findOne({ _id: noteId, userId });

        if (!note) {
            throw new AppError(404, "Note not found");
        }

        return note;
    }
    // Get All Notes (Admin only)
    async getAllNotes(role) {
        if ( role !== 'admin') {
            throw new AppError(403, 'access denied')
        }

        const notes = await Note.find().populate('userId', 'name email');
        if (!notes) {
            throw new AppError(404, "Note not found")
        }
        return notes
    }

   
    async updateNote(noteId, userId, updateData) {
        const note = await Note.findOneAndUpdate(
            { _id: noteId, userId },
            updateData,
            { new: true }
        );

        if (!note) {
            throw new AppError(404, "Note not found or unauthorized");
        }
        return note;
    }

    async deleteNote(noteId, userId) {
        const note = await Note.findOneAndDelete({ _id: noteId, userId });

        if (!note) {
            throw new AppError(404, "Note not found");
        };
        return note;
    }

    async togglePinNote(noteId, userId) {
        const note = await Note.findOne({ _id: noteId, userId });
        if (!note) throw new AppError(404, "Note not found");

        note.isPinned = !note.isPinned;
        await note.save();
        return note;
    }

    async lockNote(noteId, userId, password) {
        if (!password) {
            throw new AppError(400, "Password is required to lock this note");
        }

        const note = await Note.findOne({ _id: noteId, userId });
        if (!note) throw new AppError(404, "Note not found");

        const hashedNotePassword = await bcrypt.hash(password, 10);

        note.isLocked = true;
        note.notePassword = hashedNotePassword;
        
        await note.save();
        return { message: "Note locked successfully" };
    }

    async unlockNote(noteId, userId, notePassword) {
        const note = await Note.findOne({ _id: noteId, userId }).select('+notePassword');
        if (!note) {
            throw new AppError(404, "Note not found");
        }

        if (!note.isLocked) {
            return note;
        }

        const isMatch = await bcrypt.compare(notePassword, note.notePassword);
        if (!isMatch) {
            throw new AppError(401, "Invalid note password");
        }

        note.isLocked = false;
        note.notePassword = null;
        await note.save();

        return note;
    }
}



export default NoteServiceActivity;
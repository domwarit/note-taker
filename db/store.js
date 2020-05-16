const fs = require("fs");
const util = require("util");
const uuidv1 = require("uuid");

const readFileAsync  = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile)

class Store {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }

    write(note) {
        return writeFileAsync("db/db.json",JSON.stringify(note))
    }

    getNotes(){
        return this.read().then(function(notes) {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes))
                console.log(parsedNotes)
            } catch (error) {
                parsedNotes = [];
            }
            return parsedNotes;
        })
    }

    addNote(note) {
        const { title, text } = note;

        const newNote = {title, text, id:uuidv1()}
        console.log(newNote);

        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() =>newNote)
    }
    removeNote(id){
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== id))
        .then(filterNotes => this.write(filterNotes))
    }

    
}

module.exports = new Store;
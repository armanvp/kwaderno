angular
    .module('kwaderno')
    .service('dataService', ['$resource', DataService]);

function DataService($resource) {

    var _this = this;
    var events = [];
    
    var services = {
        getNotebooks: getNotebooks,
        updateNotebook: updateNotebook,
        getNotes: getNotes,
        getNote: getNote,
        updateNote: updateNote,
        createNote: createNote,
        emit: emit,
        on: on,
        sortNoteFn: sortNoteFn
    };

    return services;

    function getNotebooks() {
        return $resource('/api/notebook').query().$promise;
    }

    function updateNotebook(notebook) {
        return $resource('/api/notebook/:notebookId', {notebookId: notebook._id}, {update: {method: 'PUT'} }).update(notebook).$promise;
    }

    function getNotes(notebookId) {
        return $resource('/api/notebook/:notebookId/notes', {notebookId: notebookId}).query().$promise;
    }

    function getNote(noteId) {
        return $resource('/api/note/:noteId', {noteId: noteId}, {update: {method: 'PUT' } }).get().$promise;
    }

    function createNote(note) {
        return $resource('/api/note').save(note).$promise;
    }

    function updateNote(note) {
        return $resource('/api/note/:noteId', {noteId: note._id}, {update: { method: 'PUT' } } ).update(note).$promise;
    }

    function on(event, callback) {
        events[event] = callback;
    }

    function emit(event, params) {
        events[event](event, params);
    }

    function sortNoteFn(a,b) {
        if (a.updateDate) {
            date1 = a.updateDate;
        } else {
            date1 = a.createDate;
        }

        if (b.updateDate) {
            date2 = b.updateDate;
        } else {
            date2 = b.createDate;
        }

        return new Date(date2) - new Date(date1);
    }

}
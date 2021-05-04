import { storageService } from '../../../services/storage-service.js'
import { utilService } from '../../../services/util-service.js'

export const emailService = {
    query,
    getEmailById
    // getNextBookId
}

const KEY = 'mails';

var gMails
// var gEmails = [
//     { id: utilService.makeId(), subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
//     { id: utilService.makeId() , subject: 'hello all', body: 'hello nice to meat you!', isRead: true, sentAt: 1551133930598 },
//     { id: utilService.makeId() ,subject: 'Wassap?', body: utilService.makeLorem(20), isRead: false, sentAt: 1551133930700 }
// ]



function query() {
    _createMails();
    return Promise.resolve(gMails);
}



function getEmailById(emailId) {
    console.log('emailId', emailId)
    var email = gMails.find(function (email) {
        return emailId === email.id
    })
    console.log('email from email-service', email)
    return Promise.resolve(email)
}

function _createMails() {
    var mails = storageService.loadFromStorage(KEY)
    if (!mails || !mails.length) {
        mails = [
            { id: utilService.makeId(), subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
            { id: utilService.makeId(), subject: 'hello all', body: 'hello nice to meat you!', isRead: true, sentAt: 1551133930598 },
            { id: utilService.makeId(), subject: 'Wassap?', body: utilService.makeLorem(20), isRead: false, sentAt: 1551133930700 }
        ]
        _saveMailsToStorage();
    }
    gMails = mails;

}

function createMail(subject,body){

}

function _saveMailsToStorage() {
    storageService.saveToStorage(KEY, gMails)
}
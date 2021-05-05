import { storageService } from '../../../services/storage-service.js'
import { utilService } from '../../../services/util-service.js'

export const emailService = {
    query,
    getEmailById,
    composeMail
    // getNextBookId
}

const KEY = 'mails_key';

var gMails



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
            {
                id: utilService.makeId(),
                subject: 'Wassap?',
                body: 'Pick up!',
                isRead: false,
                sentAt: 1551133930594
            },
            {
                id: utilService.makeId(),
                subject: 'hello all',
                body: 'hello nice to meat you!',
                isRead: true,
                sentAt: 1551133930598
            },
            {
                id: utilService.makeId(),
                subject: 'Wassap?',
                body: utilService.makeLorem(20),
                isRead: false,
                sentAt: 1551133930700
            }
        ]
    }
    gMails = mails;
    _saveMailsToStorage();
}

function composeMail(mailToCompose) {
    console.log('composeMail(mailToCompose)');
    console.log('mailToCompose', mailToCompose)
    gMails.unshift(mailToCompose)
    _saveMailsToStorage();
    return Promise.resolve()
}

function _saveMailsToStorage() {
    console.log('_saveMailsToStorage()')
    storageService.saveToStorage(KEY, gMails)
    console.log(gMails);
}


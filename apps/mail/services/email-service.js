import { storageService } from '../../../services/storage-service.js'
import { utilService } from '../../../services/util-service.js'

export const emailService = {
    query,
    getEmailById,
    composeMail,
    deleteEmail
    // getNextBookId
}

const KEY = 'mails_key';

var gMails

function query(filterBy) {
    _createMails();
    console.log('hello')
    console.log(filterBy)
    if (filterBy !== 'All') {
        var filteredEmails
        console.log('hello!')
        if (filterBy ==='Read') {
            filteredEmails = gMails.filter(mail => {
                return mail.isRead
            })
        }
        else {
            filteredEmails = gMails.filter(mail => {
                return !mail.isRead
            })
        }
        return Promise.resolve(filteredEmails)
    }
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
                sentAt: (new Date(1551133930594)).getTime()
            },
            {
                id: utilService.makeId(),
                subject: 'hello all',
                body: 'hello nice to meat you!',
                isRead: true,
                sentAt: (new Date(1551133930594)).getTime()
            },
            {
                id: utilService.makeId(),
                subject: 'Wassap?',
                body: utilService.makeLorem(20),
                isRead: false,
                sentAt: (new Date(1551133930594)).getTime()
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
    return Promise.resolve(gMails)
}

function deleteEmail(emailId) {
    var emailIdx = gMails.findIndex(function (email) {
        return emailId === email.id
    })
    gMails.splice(emailIdx, 1)
    _saveMailsToStorage();

    return Promise.resolve()
}



function _saveMailsToStorage() {
    console.log('_saveMailsToStorage()')
    storageService.saveToStorage(KEY, gMails)
    console.log(gMails);
}


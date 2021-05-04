import { storageService } from '../../../services/storage-service.js'
import { utilService } from '../../../services/util-service.js'

export const emailService = {
    query,
    getEmailById
    // getNextBookId
}

var gEmails = [
    { id: utilService.makeId(), subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { id: utilService.makeId() , subject: 'hello all', body: 'hello nice to meat you!', isRead: true, sentAt: 1551133930598 },
    { id: utilService.makeId() ,subject: 'Wassap?', body: utilService.makeLorem(20), isRead: false, sentAt: 1551133930700 }
]

function query() {
    return Promise.resolve(gEmails);
}


function getEmailById(emailId){
    var email = gEmails.find(function (email) {
        return emailId === email.id
    })
    return Promise.resolve(email)
}


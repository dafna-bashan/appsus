import { storageService } from '../../../services/storage-service.js'
import { utilService } from '../../../services/util-service.js'

export const emailService = {
    query,
    getEmailById,
    composeMail,
    deleteEmail,
    markMail
    // getNextBookId
}

const KEY = 'mails_key';

var gMails

_createMails();

function query(filterBy, sortBy) {
    var { readFilter, searchText } = filterBy
    console.log(sortBy)
    console.log(filterBy)
    var filteredEmails
    // if (readFilter === 'All' && !searchText) return Promise.resolve(filteredEmails)

    filteredEmails = gMails.filter(mail => {
        return (
            (readFilter === 'All') ? mail : (readFilter === 'Read') ? mail.isRead : !mail.isRead
        )
    })
    if (searchText) {
        filteredEmails = filteredEmails.filter(mail => {
            return ((mail.subject.toLowerCase().includes(searchText.toLowerCase()) || mail.body.toLowerCase().includes(searchText.toLowerCase()))
            )
        })
    }
    filteredEmails = _sortBy(sortBy, filteredEmails)
    return Promise.resolve(filteredEmails)
    // }
    // return Promise.resolve(gMails);
}

// function query(filterBy, sortBy) {
//     var { readFilter, searchText } = filterBy
//     console.log(sortBy)
//     console.log(filterBy)
//     var filteredEmails
//     if (readFilter !== 'All' || (readFilter && searchText)) {
//             filteredEmails = gMails.filter(mail => {
//                 return ((readFilter ==='Read')? mail.isRead : !mail.isRead) && (mail.subject.toLowerCase().includes(searchText.toLowerCase()) || mail.body.toLowerCase().includes(searchText.toLowerCase()))
//             })
//             filteredEmails = _sortBy(sortBy,filteredEmails)
//         return Promise.resolve(filteredEmails)
//     }
//     return Promise.resolve(gMails);
// }

function _sortBy(sortByParam, mails) {
    if (sortByParam === 'Date') {
        mails.sort(function (a, b) {
            console.log(a.sentAt)
            console.log(b.sentAt)
            return b.sentAt - a.sentAt;
        })
    } else if (sortByParam === 'Subject') {
        mails.sort(function (a, b) {
            if (a.subject.toLowerCase() < b.subject.toLowerCase()) { return -1; }
            if (a.subject.toLowerCase() > b.subject.toLowerCase()) { return 1; }
            return 0;
        })
    }
    console.log('sorted mails', mails)
    return mails;
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
                body: 'Pick up! I am tring to reach you! ',
                isRead: false,
                sentAt: 1551133930594
            },
            {
                id: utilService.makeId(),
                subject: 'hello all',
                body: 'hello nice to meat you! I am looking forword working with you',
                isRead: true,
                sentAt: Date.now()

            },
            {
                id: utilService.makeId(),
                subject: 'Book sele',
                body: 'hello nice to meat you! I am looking forword working with you',
                isRead: true,
                sentAt: 1551033900594
            },
            {
                id: utilService.makeId(),
                subject: 'A special discount is waiting for you inside',
                body: 'Thank you so much for being a customer of Miss-Books. Its because of people like you we have been able to be in business for such a long time. To thank you, we have created a discount coupon especially for you. Use the code: miss15pq to get a discount of 15% from any product in our store.But hurry! The offer is only available for the first 50 people who make the purchase. Thank you',
                isRead: false,
                sentAt: 1551133930594
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

function markMail(emailId) {
    var emailIdx = gMails.findIndex(function (email) {
        return emailId === email.id
    })
    gMails[emailIdx].isRead = !gMails[emailIdx].isRead
    _saveMailsToStorage();
    return Promise.resolve(gMails)
}

function _saveMailsToStorage() {
    console.log('_saveMailsToStorage()')
    storageService.saveToStorage(KEY, gMails)
    console.log(gMails);
}


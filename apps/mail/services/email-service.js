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
    var filteredEmails = _sortBy(sortBy, gMails)
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
    return Promise.resolve(filteredEmails)
    // }
    // return Promise.resolve(gMails);
}


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
                subject: 'Lunch break',
                from: 'James Khol',
                body: 'Hey Jane, how are you? It\'s good to see you again after so much time away from the office!\nWould you like to have lunch outside? I need to use my 10Bis before the end of the week LOL.\nLet me know soon so in  case we won\'t eat outside I\'ll place an order until 12:00',
                isRead: false,
                sentAt: 1620029454000
            },
            {
                id: utilService.makeId(),
                subject: 'Wassap?',
                from: 'Sam lyrrer',
                body: 'Pick up! I\'m trying to reach you!',
                isRead: true,
                sentAt: 1619028652000
            },
            {
                id: utilService.makeId(),
                subject: 'Yeyy Lunch!',
                from: 'Sam lyrrer',
                body: 'Hey! What are you planing to eat today?',
                isRead: false,
                sentAt: 1612984254000
            },
            {
                id: utilService.makeId(),
                subject: 'Shavuot party at the office',
                from: 'Shelly Gold',
                body: 'Hey! Are you going to the party? I have nothing white to wear!',
                isRead: false,
                sentAt: Date.now()
            },
            {
                id: utilService.makeId(),
                subject: 'Hello all',
                from: 'Bill Gate',
                body: 'hello nice to meat you! I am looking forword working with you',
                isRead: true,
                sentAt: Date.now()
            },
            {
                id: utilService.makeId(),
                subject: 'You forgot to save your seat!',
                from: 'Jane Doe',
                body: 'Hi Jane,\nYou’ve seen the promotions around my free upcoming webinar on the Top 5 Google Ads Tips to Make the Most of Your Budget, but you’re still not on the list to gain access!\nBy signing up, you can partake in the live Q&A session during the webinar and will get an email with the full recording afterward.\nSign up now so you can start creating your BEST ads yet while saving your precious money.\nHope to see you there!\nJane Doe\nGoogle Ads Expert\nWordStream',
                isRead: true,
                sentAt: 1608664254000
            },
            {
                id: utilService.makeId(),
                subject: 'A special discount is waiting for you inside',
                from: 'Donn Smith',
                body: 'Thank you so much for being a customer of Miss-Books.\nIts because of people like you we have been able to be in business for such a long time.\nTo thank you, we have created a discount coupon especially for you.\nUse the code: miss15pq to get a discount of 15% from any product in our store.\n But hurry! The offer is only available for the first 50 people who make the purchase.\nThank you',
                isRead: true,
                sentAt: 1610910654000
            },
            {
                id: utilService.makeId(),
                subject: 'Welcome to the Mister Git family,',
                from: 'Mister Git Team',
                body: 'Hello there Jane!\nThanks for signing up to receive emails from Collis Chiropractic Care! You’re now part of a community of hundreds of individuals just like you, looking to take charge of their health and longevity. As a subscriber, you can expect to get:\nFirst dibs on special offers and event registrations.Tips, tricks, and takes on the latest in chiropractic care.Exclusive subscriber-only updates and promos codes.and much more! (But don’t worry, we won’t bombard you 🙂).\nBetter yet, as a new subscriber, we want to express our thanks by offering you 25% off your next visit! No printing necessary, just give us your email address when you book the appointment.To book your 25% off appointment, call us now at 555-555-2523.\nWe look forward to seeing you!\n The Mister Git Team\nP.S. If you want even more Collis Chiropractic in your life, like us on Facebook, follow us on Instagram, or browse our blog so you won’t miss out on any of our goodies!',
                isRead: false,
                sentAt: 1551133930594
            },
            {
                id: utilService.makeId(),
                subject: 'Your automatic payment is approaching',
                from: 'Jane Doe',
                body: 'Hi Jane,\nJust a friendly reminder that the next payment for your account ending in 5383 is scheduled for automatic withdrawal from your bank account on November 10, 2021.\nAmount to be withdrawn: $149.99\nNo action is needed on your part, we are just keeping you in the loop! Thanks for choosing ABC Business!\nSincerely,\nJane Doe\nABC Business\n555-234-3345\nabcbusiness.com',
                isRead: false,
                sentAt: 1579201854000
            },
            {
                id: utilService.makeId(),
                subject: 'Thank you for the great work!',
                from: 'Corey Carpenter',
                body: 'Corey Carpenter\n250 Old Country Road\nMorristown, TN 37814\n555-555-5555\ncorey.carpenter@email.com\nAugust 7, 2020\nSpencer Brent\nWeb Designer\nXYZ Web Design, Inc.\n1234 Cumberland Boulevard, Ste. 11\nKnoxville, TN 37901\nDear Jane:\n I wanted to drop you a note to thank you for the great work you did in building and launching the redesign of our company website. Since the go-live, I’ve received several glowing comments from clients who are thrilled with the new look of our product catalogue and with the improved ease of the website’s navigation system.\nI also appreciate the extra time you took to train me and our business team in how to correctly enter new text and visuals into the website. None of us were familiar with web design or coding before, but your training and the manual / process checklist you wrote for us will ensure that we’ll easily be able to make changes to the website as needed.\nYou were a pleasure to work with. Please call upon me should you ever need a positive testimonial to use on your own website.\nThanks again,\nCorey Carpenter (signature for hard copy letter)\nCorey Carpenter',
                isRead: true,
                sentAt: 1602526254000
            },
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


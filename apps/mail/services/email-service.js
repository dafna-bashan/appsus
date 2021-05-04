import { storageService } from '../../../services/storage-service.js'

export const bookService = {
    query,
    // getBookById,
    // getNextBookId
}

var gEmails = [
    { subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930594 },
    { subject: 'hello all', body: 'hello nice to meat you!', isRead: false, sentAt: 1551133930598 },
    { subject: 'Wassap?', body: 'Pick up!', isRead: false, sentAt: 1551133930700 }
]

function query(filterBy) {
    if (filterBy) {
        // var { isRead , isUnread } = filterBy
        // isRead = maxPrice ? maxPrice : Infinity
        // // minPrice = minPrice ? minPrice : 0
        // const filteredEmails = gEmails.filter(email => {
        //     return email.title.includes(title) && book.listPrice.amount > minPrice && book.listPrice.amount < maxPrice
        // })
        // return Promise.resolve(filteredBooks);
    }
    return Promise.resolve(gEmails);
}
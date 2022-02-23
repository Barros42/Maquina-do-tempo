import { isAfter } from 'date-fns'
import EmailValidor from "./emailValidor";

export default class LetterValidator {

    static isEmailValid(email: string): boolean {
        if(!email) return false
        return EmailValidor.emailIsValid(email)
    }

    static isDateValid(date: Date | null): boolean {
        if(!date) return false
        return true
    }

    static dateIsPast(date: Date | null): boolean {
        if(!date) return false
        return isAfter(new Date(), date)
    }

    static isMessageValid(message: string): boolean {
        const clearMessage = message.replace(/<[^>]*>?/gm, '');
        if(!clearMessage) return false
        return true
    }


}
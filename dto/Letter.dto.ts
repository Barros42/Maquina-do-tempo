export default class LetterDTO {

    message!: string
    email!: string
    date!: Date | null

    constructor(data: Partial<LetterDTO>) {
        Object.assign(this, data)
    }

    static get(): LetterDTO {
        return new this({
            message: "",
            email: "",
            date: null
        })
    }

}
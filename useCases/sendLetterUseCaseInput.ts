export default class SendLetterUseCaseInput {

    id!: string
    message!: string
    email!: string
    date!: string

    constructor(data: Partial<SendLetterUseCaseInput>) {
        Object.assign(this, data)
    }
}
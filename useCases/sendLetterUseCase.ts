import axios from "axios";
import { format } from "date-fns";
import Settings from "../core/settings";
import SendLetterUseCaseInput from "./sendLetterUseCaseInput";

export default class SendLetterUseCase {
    async run (input: SendLetterUseCaseInput): Promise<boolean> {
        input = {
            ...input,
            date: format(new Date(input.date), 'Y-M-d')
        }
       return axios.post(`${Settings.BASE_API_URL}SendLetter`, input)
    }
}
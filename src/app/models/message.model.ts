import { Attachment } from "./attachment.model";

export class Message {

    constructor(
        public id: Number,
        public subject: string,
        public content: string,
        public from: string,
        public to: string[],
        public cc: string[],
        public bcc: string[],
        public read: Boolean,
        public received: String,
        public sent: String,
        public attachments: Attachment[]
        
    ) { }
}

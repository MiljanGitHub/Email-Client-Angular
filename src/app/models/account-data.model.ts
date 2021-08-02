export class AccountData {

    constructor(
        public id: Number,
        public displayName: string,
        public username: string,
        public password: string,
        public smtpAddress: string,
        public smtpPort: Number,
        public imapAddress: string,
        public imapPort: string,
        public incomingType: string
    ) { };


}

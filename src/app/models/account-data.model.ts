export class AccountData {

    constructor(
        public userId: Number,
        public displayName: string,
        public username: string,
        public password: string,
        public smtpAddress: string,
        public smtpPort: Number,
        public inServerAddress: string,
        public inServerPort: string,
        public inServerType: string
    ) { };

    /*
    private int userId;
    private String displayName;
    private String username;
    private String password; 
    private String smtpAddress;
    private int smtpPort;
    private InServerType inServerType;
	private String inServerAddress;
	private int inServerPort;

	


    */

}

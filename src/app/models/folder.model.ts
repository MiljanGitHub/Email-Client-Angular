export class Folder {

    constructor(
        public folderName: string,
        public id: Number,
        public folders: Folder[]
        
    ) { }

}

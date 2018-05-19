export class Upload {
    $key: string;
    file: File;
    name: string;
    type: string;
    size: number;
    url: string;
    progress: number;
    createdAt: Date = new Date();

    constructor(file: File) {
        this.file = file;
    }
}

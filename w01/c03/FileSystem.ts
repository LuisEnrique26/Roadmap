class FileNode {
    name: string;
    isDirectory: boolean;
    children: FileNode[];

    constructor(name: string, isDirectory: boolean) {
        this.name = name;
        this.isDirectory = isDirectory;
        this.children = [];
    }
}

class FileSystemTree {
    root: FileNode;

    constructor() {
        this.root = new FileNode("/", true);
    }

    addFolderRoot(folderName: string) {
        const folder = new FileNode(folderName, true);
        this.root.children.push(folder);
    }

    findNode(targetName: string, currentNode: FileNode = this.root): FileNode | null {
    if (currentNode.name === targetName) {
        return currentNode;
    }
    
    for (const child of currentNode.children) {
        const foundNode = this.findNode(targetName, child);
        
        if (foundNode !== null) {
            return foundNode; 
        }
    }
    
    return null;
}

    mkdir(parentName: string, folderName: string) {
        const parentNode = this.findNode(parentName);

        if (!parentNode) {
            console.error(`Folder '${parentName}' does not exist`);
            return;
        }

        const newFolder = new FileNode(folderName, true);
        parentNode.children.push(newFolder);
    }

    printTree(node: FileNode = this.root, level: number = 0) {
        console.log(" ".repeat(level) + node.name);
        for (const child of node.children) {
            this.printTree(child, level + 1);
        }
    }
}

const myOS = new FileSystemTree();


myOS.addFolderRoot("usr");
myOS.addFolderRoot("etc");

myOS.mkdir("usr", "local");
myOS.mkdir("usr", "bin");
myOS.mkdir("local", "share");

myOS.printTree();
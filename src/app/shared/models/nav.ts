import { Menu } from "./menu";
export class Nav {
    title: string;
    data: Array<Menu>;

    constructor(title, data){
        this.title = title;
        this.data = data;
    }
    setNavData (data) {
        this.data = data;
    }
}

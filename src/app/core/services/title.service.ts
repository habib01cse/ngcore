import { Injectable } from '@angular/core';

import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { WebStorageService } from './web-storage.service';
import { globalVariables } from '../constants/globalVariables';

const APP_TITLE = 'Angular Core';
const SEPARATOR = ' > ';

@Injectable()
export class TitleService {
    pagePath: String = "";
    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private titleService: Title,
        private storage: WebStorageService,
    ) { }

    init() {
        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map(route => route.firstChild),
            switchMap(route => route.data),
            map((data) => {
                this.setPath();
                if (data.title) {
                    return "| " + data.title;
                } else {
                   return "";
                }
            })
        )
            .subscribe((pathString) => this.titleService.setTitle(`${APP_TITLE} ${pathString}`));
    }

    static ucFirst(string) {
        if (!string) { return string; }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setPath() {
        let urlSpliter = this.router.url.split('/');
        if (urlSpliter.length > 0) {
            let path = urlSpliter.pop();
            try {
                let navArray = [];
                if (urlSpliter.includes("forms")) {
                    navArray = this.storage.getMenu("MENU_F")
                } else if (urlSpliter.includes("reports")) {
                    navArray = this.storage.getMenu("MENU_P")
                } else if (urlSpliter.includes("graphs")) {
                    navArray = this.storage.getMenu("MENU_G")
                }

                // if(navArray !== null) {
                let menuObject = navArray.find((node) => { return node.MENU_ID === path.toUpperCase() });
                //console.log(menuObject);
                globalVariables.menuInfo = menuObject;
                let pathArray = new Array();
                pathArray.push(menuObject.OBJ_NAME +" ["+menuObject.MENU_ID+"]" )
                pathArray.push(...this.getBreadCum(navArray, menuObject.PARENT_OBJ_NO));
                this.pagePath = pathArray.reverse().join(" / ")
                // }
            } catch (error) {
                this.pagePath = path.charAt(0).toUpperCase() + path.slice(1);
            }
        }

    }

    getBreadCum(newArray, menuId) {
        let pathArray = new Array();
        let menuObject = newArray.find((node) => {
            return node.OBJ_NO === menuId.toUpperCase()
        });
        if (menuObject) {
            pathArray.push(menuObject.OBJ_NAME)
            if (menuObject.PARENT_MENU_ID) {
                pathArray.push(...this.getBreadCum(newArray, menuObject.PARENT_OBJ_NO));
                return pathArray;
            }
            else {
                return pathArray;
            }

        } else {
            return pathArray;
        }

    }
}
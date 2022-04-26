import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WebStorageService } from 'src/app/core/services/web-storage.service';
import * as $ from 'jquery';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { Router, NavigationEnd } from '@angular/router';
import { map, catchError, filter } from 'rxjs/operators';
@Component({
    selector: 'app-tab-index-set',
    templateUrl: './../templates/tab-index-set.component.html'
})
export class TabIndexSetComponent implements OnInit {
    constructor(
        private storageService: WebStorageService
        , private router: Router

    ) { }
    public showTabIndex = false;
    public formId = '';
    public defaultTabIndex = 10;
    ngOnInit() {
        this.showTabIndex = globalVariables.isTabIndexSetUser;
        if (globalVariables.isEnterPressNextFocus) {
            this.getIndexSet();
            this.formId = this.router.url.substr(this.router.url.length - 7);
            this.router.events.pipe(
                filter(event => event instanceof NavigationEnd)
            ).subscribe(() => {
                //console.log("this.router.url", this.router.url);
                this.formId = this.router.url.substr(this.router.url.length - 7);
                //console.log("this.formId ", this.formId);
                this.getIndexSet();
                this.showTabIndex = false;

            });
        }
    }
    
    getIndexSet() {
        let that = this;
        $(document).ready(function () {
            var formGroupList = $(globalVariables.tabIndexSelector);
            $("#all-input-list").html('');
            formGroupList.each(function (i) {
                // Scope variable 
                let name;
                let label;
                let arr = [];
                let currentIndex = 0;
                let value = this.defaultTabIndex;
                let item = '';
                let list = [];

                if ($(this).attr("data-tabindex-text")) {
                    label = $(this).attr('data-tabindex-text');
                    name = $(this).attr('name');
                } else {
                    label = $(this).parents('.form-group').find('.col-form-label').text();
                    name = $(this).attr('name');
                }
                if (!label) {
                    label = $(this).parents('.custom-control').find('.custom-control-label').text();
                }
                if (localStorage.getItem(that.formId) != null) {
                    list = JSON.parse(localStorage.getItem(that.formId));
                    arr = list.filter(x => {
                        if (x.name == name) {
                            return x;
                        }
                    });
                    if (arr.length > 0) {
                        $(this).attr('tabindex', arr[0].tabindex);
                    }
                }

                // currentIndex = $(this).attr('tabindex');
                value = currentIndex ? currentIndex : this.defaultTabIndex;

                item = '<div class="tab-index-item">' + label + '<input value="' + value + '" type="number" tabindex="-1" id="' + name + '"></div>';
                $("#all-input-list").append(item);
            });



        });
    }
    onClickSaveTabIndex() {
        let list = [];
        $('.tab-index-item input').each(function () {
            let id = $(this).attr('id');
            let value = $(this).val();
            // $('input[name=' + id + '], button[name=' + id + '] ').attr('tabindex', value);
            list.push({
                name: id,
                tabindex: value
            });
        });
        localStorage.removeItem(this.formId);
        localStorage.setItem(this.formId, JSON.stringify(list));
        this.showTabIndex = false;
    }
    onClickResetTabIndex() {
        let that = this;
        $('.tab-index-item input').each(function () {
            let id = $(this).attr('id');
            $(this).val(that.defaultTabIndex);
            $('input[name=' + id + '], button[name=' + id + '] ').attr('tabindex', that.defaultTabIndex);
        });
        localStorage.removeItem(this.formId);
    }

}

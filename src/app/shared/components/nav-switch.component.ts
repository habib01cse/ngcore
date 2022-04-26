import { Component, OnInit, ElementRef, Renderer2, OnChanges, SimpleChange, OnDestroy } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import * as $ from 'jquery';
import { Router } from '@angular/router';
import { globalVariables } from 'src/app/core/constants/globalVariables';
import { environment } from 'src/environments/environment';
function getMenu(module,parentID,data, selected) {
  let fnData = data;
  let radioSelected = selected;
  return fnData.filter(function (node) {
    return(node.PARENT_OBJ_NO === parentID);
  }).map(function (node) {
    var exists = fnData.some(function (childNode) {
      return childNode.PARENT_OBJ_NO === node.OBJ_NO;
    }); 

    var subMenu = (exists) ? '<ul class="dropdown">' + getMenu(module,node.OBJ_NO,fnData, radioSelected).join('') + '</ul>' : "";

    if (node.IS_OBJECT === 0) {
      if ( node.LVL === 1 || node.LVL === 2 ) {
        return '<li><a class="has-submenu" href="#"><i class="fa fa-cube sidebar-left-icon"></i><span class="menu-text">' + node.OBJ_NAME + '</span><i class="fa fa-plus-square-o sidebar-right-icon"></i></a>' + subMenu + '</li>';
      }
      else {
        return '<li><a class="has-submenu" href="#"><span class="menu-text">' + node.OBJ_NAME + '</span><i class="fa fa-plus-square-o sidebar-right-icon"></i></a>' + subMenu + '</li>';
      }
    }
    else {
      if( node.ERP === 1 ) {
        let moduleName = node.MENU_ID.split("_").shift().toLowerCase();
        let menuID = node.MENU_ID;
        if(moduleName == "in" && globalVariables.ERP_FORMS.IN.indexOf(menuID.toUpperCase()) != -1){
          moduleName = 'ps';
        }
        return '<li><a class="active-menu" rel="' + '/' + moduleName + '/' + radioSelected.toLowerCase() + '/' + node.MENU_ID.toLowerCase()  + '" href="#" > <span class="sub-menu-text">' + node.OBJ_NAME +'</span>'+ subMenu + '</a></li>';
      }
      else if( node.BI === 1 && environment.BI_ENABLE ) {
        return '<li><a class="active-menu" rel="/load' + '/' + radioSelected.toLowerCase() + '/' + node.MENU_ID.split("_").shift() + '/' + node.MENU_ID  + '" href="#" > <span class="sub-menu-text">' + node.OBJ_NAME +'</span>'+ subMenu + '</a></li>';
      }
    }
  });
}

function getMenuTree(parentID, data, selected) {
  let fnData = data;
  let radioSelected = selected;
  return fnData.filter(function (node) {
    return (node.PARENT_OBJ_NO === parentID);
  }).map(function (node) {
    var exists = fnData.some(function (childNode) {
      return childNode.PARENT_OBJ_NO === node.OBJ_NO;
    });

    if(exists) {
     node["childs"] = getMenuTree(node.OBJ_NO,fnData, radioSelected);
     return node;
    }
    else {
      return node
    }

  });
}



@Component({
  selector: 'app-nav-switch',
  templateUrl: './../templates/nav-switch.component.html',
  encapsulation: ViewEncapsulation.None
})

export class NavSwitchComponent implements OnInit, OnChanges, OnDestroy {

  htmlStr:string = '';
  previousUrl: string;
  constructor(
    private el: ElementRef, 
    private renderer: Renderer2,
    private router: Router) {
    


    }

  ngOnInit() {
        // sidebar collapse Jquery Solution
        $('.menu-collapse-button, .sidebar-collapse-button').on('click', function(e){
        e.preventDefault();
        $('.sidebar').toggleClass('sidebar--collapse');
        $('.outer-content').toggleClass('outer-content--collapse');
        $('.menu-collapse-button').toggleClass('active');
        $('.sidebar-collapse-button .fa').toggleClass('fa-arrow-right');

        // Alternative JavaScript Solution
        // document.querySelector('.sidebar').classList.toggle('sidebar--collapse');
        // document.querySelector('.outer-content').classList.toggle('outer-content--collapse');
        // document.querySelector('.menu-collapse-button').classList.toggle('active');
        // document.querySelector('.sidebar-collapse-button .fa').classList.toggle('fa-arrow-right');
      });
    }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    // console.log(this.nav.title, this.nav.data);
    // console.log("ngChange from NavSwitch");

    // this.htmlStr = getMenu('M',this.nav.data, this.nav.title).join('');
    // this.loadClickEvent();

    // for (let propName in changes) {
    //   let changedProp = changes[propName];
    //   console.log(changedProp);
    //   let to = JSON.stringify(changedProp.currentValue);
    //   if (changedProp.isFirstChange()) {
    //     console.log(`Initial value of ${propName} set to ${to}`);
    //   } else {
    //     let from = JSON.stringify(changedProp.previousValue);
    //     console.log(`${propName} changed from ${from} to ${to}`);
    //   }
    // }
  }

  loadClickEvent ( _nav) {
    let router = this.router;
    const routerArr = router.url.split('/');
    
    if(routerArr.length<1) return;
    let module = routerArr[1];
   
    if(module === "load") {
     
      // if( routerArr[2].toLocaleLowerCase() === 'dashboard' && this.previousRouteService.getPreviousUrl()) {
      //   module = this.previousRouteService.getPreviousUrl().split('/')[1] || 'ac';
      // }
      if( routerArr[2].toLocaleLowerCase() === 'dashboard') {
        module = localStorage.getItem('moduleId');
      }
      else if(routerArr.length < 5) {return;}
        
      else {module = routerArr[3]; localStorage.setItem('moduleId', module)}
    }else{
      localStorage.setItem('moduleId', module)
    }
    if(Object.keys(globalVariables.ERP_MODULES).indexOf((module).toUpperCase()) <0) return;
    this.htmlStr = getMenu(module,globalVariables.ERP_MODULES[(module).toUpperCase()].parent, _nav.data, _nav.title).join('');
    


    $(document).ready(function(){
      $('.menu-accordion > li > a').on('click',function(e) {
        e.preventDefault();
        $('.menu-accordion > li > a > .sidebar-right-icon').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
      });
        $('.sidebar-menu-outer .has-submenu').on('click',function(e) {
          e.preventDefault();
          var $this = $(this);
          if ($this.next().hasClass('menu-show')) {
              $this.next().removeClass('menu-show');
              
              $this.find('.sidebar-right-icon').removeClass('fa-minus-square-o').addClass('fa-plus-square-o');
              $this.next().slideUp(350);
          } else {
              $this.parent().parent().find('li .dropdown').removeClass('menu-show');
              $this.parent().parent().find('li .dropdown').slideUp(350);
              $this.next().toggleClass('menu-show');
              $this.find('.sidebar-right-icon').addClass('fa-minus-square-o').removeClass('fa-plus-square-o');
              $this.next().slideToggle(350);
          }
      });

      $('.active-menu').on('click', function(e) {
        e.preventDefault();
        router.navigateByUrl($(this).attr('rel'));
        $('.active-menu').removeClass('active');
        $(this).addClass('active');
      });

    })
  }
  ngOnDestroy(): void {
  
  }
}

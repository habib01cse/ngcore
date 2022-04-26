
import * as $ from 'jquery';
export class Module {
 
 public  initDropDownToggle(){
   $('.dropdown-toggle').click(function () {
    $(this).siblings(".dropdown-menu").toggle();
  });

  $('.header-search-icon').click(function (e) {
    e.preventDefault();
    $(this).siblings(".header-search-form").toggleClass('header-search-form--active');
  });

  $(".header-search-form__close").on("click", function (e) {
    $(this).parents(".header-search-form").removeClass('header-search-form--active');
    $(this).parents(".header-search-form").toggle();
  });

  $('body').on('click', function () {
    $('.dropdown-menu').hide();
  }).find('.dropdown .dropdown-toggle').on('click', function (event) {
    event.stopPropagation();
  });
  $('.dropdown-menu .dropdown-item').click(function () {
    $(this).parents('.dropdown-menu').hide();
  });
 }

}


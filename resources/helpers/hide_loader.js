const hideLoader = function(){
  /*
  $('.preloader').addClass('complete');
  setTimeout(function(){
    $('.preloader').css('background', 'transparent'); 
    $('.wrapper').css('display', 'none'); 
    $('.preloader').css('z-index', 0); 
  }, 1000);
  */
  if(FIRST_LOAD){
    FIRST_LOAD = false;
  }
}

export default hideLoader;
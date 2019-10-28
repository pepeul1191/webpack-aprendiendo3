const showLoader = function(){
  if(!FIRST_LOAD){
    $('.preloader').css('background', '#FDFDFD'); 
    $('.wrapper').css('display', 'block'); 
    $('.preloader').css('z-index', 1000000); 
    $('.preloader').addClass('complete');
  }
}

export default showLoader;
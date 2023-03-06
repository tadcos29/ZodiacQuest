

var elementSelected = null;
var typeSelected = false;

$(document).on('click', '.choice-image > img', function(){
  $('.choice-image > img').each(function(){
    $(this).removeClass('active');
  })
  $(this).addClass('active');
  elementSelected = $(this);
  typeSelected = false;
});

$(document).on('input', '#text-src', function(){
  $('.choice-image > img').each(function(){
    $(this).removeClass('active');
  })
  elementSelected = $(this);
  typeSelected = true;
})

$(document).on('click', '#picker-confirm', async function(){
  $('.select-image').hide();
  if(typeSelected == true){
    $('.see-choice > img').attr('src', elementSelected.val());
 
   

  }
  else{
    $('.see-choice > img').attr('src', elementSelected.attr('src'));
  }
  $('.see-choice').fadeIn('high');
  try {
    const response = await fetch('/api/gamedata/skin', {
      method: 'PUT',
      body: JSON.stringify({
        image: $('.see-choice > img').attr('src')
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
        } catch (error) {
    console.error(error)
  }

})

$(document).on('click', '#picker-other', function(){
  $('.see-choice').hide();
  $('.select-image').fadeIn('high');
})



document.querySelector('.option').hidden=true;
///
const $toolTip = $('.option');
$toolTip.hide();

$('[tit]').on('mouseover', withIdleCallback(mousemoveTooltip));

function mousemoveTooltip(){
  $(document).on('mousemove', showToolTip);
}  




$(document)
  .on('click', withIdleCallback(() => {
      if (!$toolTip.isHidden) {
          $toolTip.isHidden = true;
          $toolTip.css({opacity: 0,display:'none'});
          $(document).off('mousemove', showToolTip);
          $('[tit]').on('mouseover', mousemoveTooltip);
      }
  }))
  .on('mouseout', ':not(body,html,#taskBar)', withIdleCallback(handleMouseOut));








function showToolTip(e) {     
      
  if(!e.target['attributes']['tit']){return;}
  $toolTip.text(e.target['attributes']['tit'].textContent).css({
    opacity:'1',
    display:'',
    left: Math.min(e.clientX + 20, window.innerWidth - $toolTip.outerWidth() - 10),
    top: Math.min(e.clientY + 20, window.innerHeight - $toolTip.outerHeight() - 10)
  }).show();
  $toolTip.isHidden = false;
  $('[tit]').off('mouseover',mousemoveTooltip);
}




function handleMouseOut() {
  if (!$toolTip.isHidden) {
    $toolTip.isHidden = true;
    $toolTip.css({display: 'none',opacity:'0'});
    $(document).off('mousemove', showToolTip)
    $('[tit]').on('mouseover',mousemoveTooltip);
  }
}



  
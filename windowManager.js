

const controller = new AbortController();
const signal = controller.signal;
///
const $toolTip = $('.option');
$toolTip.hide();
///
let isFullscreen = false;
let activeWindow = null;
let offsetX, offsetY, initialX, initialY, initialWidth, initialHeight;
///
$(document).on('click','.mh', (e)=>{
  $('.mh.act').removeClass('act');
 e.target.classList.add('act');
 
 });
// Define a function to wrap event handlers with requestIdleCallback


 function withIdleCallback(handler) {
  return function(e) {
     requestIdleCallback(() => {
         setTimeout(()=>{ handler(e);},0);
      });
  };
}

// Wrap each event handler with requestIdleCallback
$(document)
  .on('click', withIdleCallback(() => {
      if (!$toolTip.isHidden) {
          $toolTip.isHidden = true;
          $toolTip.css('opacity', '0');
          $(document).off('mousemove', showToolTip);
          $(document).on('mouseover','[tit]', mousemoveTooltip);
      }
  }))
  .on('mouseup', ':not(body,html,#taskBar)', withIdleCallback(handleMouseUp))
  .on('mouseout', ':not(body,html,#taskBar)', withIdleCallback(handleMouseOut))

$(document).on('mouseover','[tit]', withIdleCallback(mousemoveTooltip));



function handleMouseMove(e) {
  if (null!==activeWindow) {
    if (activeWindow.state === 'move') {
      moveWindow(e);
    } else if (activeWindow.state === 'resize') {
      resizeWindow(e);
    }
  }
}
function moveWindow(e) {
  activeWindow.style.boxShadow = 'var(--shadow)';
  activeWindow.style.left = e.clientX - offsetX + 'px';
  activeWindow.style.top = e.clientY - offsetY + 'px';
}

function resizeWindow(e) {
  if(null!==activeWindow){
    const newX = e.clientX;
    const newY = e.clientY;
    const newWidth = initialWidth + (newX - initialX);
    const newHeight = initialHeight + (newY - initialY);
    activeWindow.style.width = newWidth + 'px';
    activeWindow.style.height = newHeight + 'px';
    // Update initial position and size for next resizing
    initialX = newX;
    initialY = newY;
    initialWidth = newWidth;
    initialHeight = newHeight;}
  }
function mousemoveTooltip(){
  $(document).on('mousemove', showToolTip);
}  

function showToolTip(e) {     
      
  if(!e.target['attributes']['tit']){return;}
  $toolTip.text(e.target['attributes']['tit'].textContent).css({
    opacity: '0.9',
    left: Math.min(e.clientX + 20, window.innerWidth - $toolTip.outerWidth() - 10),
    top: Math.min(e.clientY + 20, window.innerHeight - $toolTip.outerHeight() - 10)
  }).show();
  $toolTip.isHidden = false;
  $('[tit]').off('mouseover',mousemoveTooltip);
}

function handleMouseDown(e) {
  e.target.style.filter = 'contrast(90%)';
  const $target = $(e.target);
  
  if ($target.attr('slot') === 'move') {
    activeWindow = $target.parent()[0];
  activeWindow.state = $target.attr('slot');
    offsetX = e.clientX - activeWindow.offsetLeft;
    offsetY = e.clientY - activeWindow.offsetTop; 
  }else{
    activeWindow = $target.parent().parent()[0];
  activeWindow.state = $target.attr('slot');
                    initialX = e.clientX;
                    initialY = e.clientY;
                    initialWidth = activeWindow.offsetWidth;
                    initialHeight = activeWindow.offsetHeight;
  }
  $(document).on('mousemove', handleMouseMove)
}

function handleMouseUp(e) {
  e.target.style.filter = 'none';
  if (activeWindow) {
   $('#container')[0].style.boxShadow = '';
    activeWindow = null;
    $(document).off('mousemove', handleMouseMove)
  }
}

function handleMouseOut() {
  if (!$toolTip.isHidden) {
    $toolTip.isHidden = true;
    $toolTip.css('opacity', '0');
    $(document).off('mousemove', showToolTip)
    $('[tit]').on('mouseover',mousemoveTooltip);
  }
}

function handleSvgClick() {
  const slot = $(this).attr('slot');
  if (isFullscreen && slot === 'min') {
    isFullscreen = false;
    document.exitFullscreen();
  } else {
    switch (slot) {
      case 'min':
        minimizeWindow(this);
        break;
      case 'close':
        closeWindow(this);
        break;
        case 'fs':
          requestFullscreen();
        break;
    }
  }
}

function minimizeWindow(svgElement) {
  const $windowElement = $(svgElement).parent().parent();
  $windowElement.hide();
  const taskName = $windowElement.attr('name');
  createTaskBarElement(taskName);
}


function createTaskBarElement(taskName) {
  const $newTask = $('<p>', {
    slot: 'open',
    class: 'newT',
    text: taskName
  }).click(function() {
    $(`[name="${taskName}"]`).show();
    $(this).remove();
  });
  $('#taskBar').append($newTask);
}

function closeWindow(svgElement) {
  $toolTip.hide().css('opacity', '0');
  $(svgElement).parent().parent().remove();
}

function requestFullscreen() {
  if (!isFullscreen) {
    $('[slot="fs"]')[0].style.rotate = '180deg';
    $('[slot="fs"]')[0].title = "تصغير النافذة";
    $('[slot="fs"]')[0].parentElement.parentElement.requestFullscreen();
    isFullscreen = true;
  } else {
    $('[slot="fs"]')[0].style.rotate = '0deg';
    $('[slot="fs"]')[0].title = "تكبير النافذة";
    isFullscreen = false;
    document.exitFullscreen();
  }
  return $('[slot="fs"]')[0] = null;
}

  
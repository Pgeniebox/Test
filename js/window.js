let isFullscreen = false;
let activeWindow = null;
let offsetX, offsetY, initialX, initialY, initialWidth, initialHeight;


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

      
  

  $('svg').on('click', handleSvgClick);
$('.head.wd').on('dblclick', requestFullscreen);
$(document).on('mousemove',':not(body,html,#taskBar)', handleMouseMove)  
.on('mousedown',':not(body,html,#taskBar)', handleMouseDown)
.on('mouseup', ':not(body,html,#taskBar)', withIdleCallback(handleMouseUp));
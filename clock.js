var clk =document.querySelector('.clock');
let timers = document.querySelectorAll('.timer');
Array.from(timers).map(e=> e.dataTime = Date.now() );
function updateClock() {

  
  Array.from(timers).map(e=>{ 
    const diffMs = Date.now() - e.dataTime;
        const diffMinutes = Math.floor(diffMs / 60000);
        if(diffMinutes>0){
        const diffHours = Math.floor(diffMinutes / 60);
        const remainingMinutes = diffMinutes % 60;
        if(diffHours>0){    e.innerHTML = `&nbsp;${diffHours}h${remainingMinutes}`;  }else{
          e.innerHTML = `&nbsp;${diffMinutes}m`;
        }

       }
});
  setInterval(updateClock,60000);
 
}

// Update the clock every second



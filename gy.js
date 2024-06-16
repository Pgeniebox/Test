/*Created by lagab adel*/
/*Help:
aquery.a: class to toggle '.v'
aquery.b: the same class but without . 'v'
aquery.c: first tabIndex0 entry
aquery.d: class of the parent of aquery.c, to get its parent that you will toggle its class
aquery.e: list of functions to run whene the first click in aquery.c 
///////////
-- add tabIndex 0 to an element that you want to click, it will toggle its parent class (aquery.a)
-- whene you add accessKey attr to parent of clickable elements, this clickable elements will execute the fnuctions that are in the accessKey
-- in the functions of accessKey, you can use (e), it contain all the event details
-- you can use aquery.closeTab(e); in your accessKey functions if you want to close the current tabindex1
, example of usage for specefic element:  
<div class="parent" accessKey="eval(e.target.nonce);"><div nonce="customAquery.closeTab(e);"></div>
example of usage for all the elements:
 <div class="parent" accessKey="customAquery.closeTab(e);">........</div>
--to use another window you should  set an id for the parent of (aquery.c) wich is (aquery.d)
*/



function aquery(a, b, c, d, e) {
    this.eval = window.eval;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
}

// Method to run all functions in functionsList with a given context
aquery.prototype.fn = function(a) {
    for (let func of this.e) {
        if (typeof func === 'function') {
            func(a);
        }
    }
};

aquery.prototype.closeTab = function(e){
    $(customCh1.c,e.data).attr('nonce','false');
        $(customCh1.a,e.data)[$(customCh1.a,e.data).length-1].classList.toggle(customCh1.b);
    $('[tabIndex="1"]',e.data)[$('[tabIndex="1"]',e.data).length-1].removeAttribute('sel');
    $('[tabIndex="1"]',e.data)[$('[tabIndex="1"]',e.data).length-1].tabIndex = 0;
    if($(customCh1.a,e.data).length>0) {$('[tabIndex="1"]',e.data)[$('[tabIndex="1"]',e.data).length-1].setAttribute('sel','');}
    
     $(document).off('click', customCh1.tabout);
     if($(customCh1.a,e.data).length>0) { $(document).on('click',null,e.data, customCh1.tabout);      }
}


aquery.prototype.setInitListner = function(){
    $(document).on('click','*:has(>[nonce])',(e)=>{ 
        e.stopPropagation();
        if(undefined== e.target.nonce||e.target.nonce.length==0){return;}
    $(document).off('click','[tabIndex] , *:has(>[sel]) *',this.tabin);
    $(document).off('click', this.tabout);
            $('[tabIndex="1"]').attr('tabindex','0');
            $('[nonce="true"]').attr('nonce','false');
            $('[sel]').removeAttr('sel');
          $(this.a).toggleClass(this.b);
    $(e.target).attr('nonce','true');
     this.fn($(this.d+e.target.parentElement.id));
    
     $(document).on('click','[tabIndex] , *:has(>[sel]) *',$(this.d+e.target.parentElement.id).parent(),this.tabin);
      e.target.click();
         });
}

aquery.prototype.tabin = function(e){
    e.stopPropagation();
    if(e.target.nonce ==='false'){return;}
    $(document).off('click','[tabIndex] , *:has(>[sel]) *',customCh1.tabin);
    if(e.target.tabIndex==0){
    if($(customCh1.a,e.data).length>0) {$('[tabIndex="1"]',e.data)[$('[tabIndex="1"]',e.data).length-1].removeAttribute('sel'); 
    $(document).off('click', customCh1.tabout)}
    e.target.tabIndex =1;
    $('[tabIndex="1"]',e.data)[$('[tabIndex="1"]',e.data).length-1].setAttribute('sel','');

    e.target.parentElement.classList.toggle(customCh1.b); 
    $(document).on('click',null,e.data, customCh1.tabout);}
    else if(e.target.tabIndex==1) {
    e.target.parentElement.classList.toggle(customCh1.b);
     $(document).off('click', customCh1.tabout);
        $('[tabIndex="1"]',e.data)[$('[tabIndex="1"]',e.data).length-1].removeAttribute('sel');
        e.target.tabIndex =0;
        if($(customCh1.a,e.data).length>0) {   $('[tabIndex="1"]',e.data)[$('[tabIndex="1"]',e.data).length-1].setAttribute('sel','');
              $(document).on('click',null,e.data, customCh1.tabout);           }
    }else if(e.target.parentElement.classList.contains('access')){
                   window.e=e;
                 customCh1.Eval(e.target.parentElement.accessKey);
                 window.e = null;
     }
    if($(customCh1.a,e.data).length>0){ $(document).on('click','[tabIndex] , *:has(>[sel]) *',e.data,customCh1.tabin);}
}



 aquery.prototype.tabout = function(e){
    e.stopPropagation();
    if(e.target.nonce ==='false'){return;}
 $(document).off('click', customCh1.tabout); 
    if($(customCh1.a,e.data).length>0) { $(customCh1.a,e.data)[$(customCh1.a,e.data).length-1].classList.toggle(customCh1.b);
    $('[tabIndex="1"]',e.data)[$('[tabIndex="1"]',e.data).length-1].removeAttribute('sel');
    $('[tabIndex="1"]',e.data)[$('[tabIndex="1"]',e.data).length-1].tabIndex = 0; }
    if($(customCh1.a,e.data).length>0) {$('[tabIndex="1"]',e.data)[$('[tabIndex="1"]',e.data).length-1].setAttribute('sel','');
         $(document).on('click',null,e.data, customCh1.tabout);           }
         if($(customCh1.a,e.data).length==0){ $(customCh1.c,e.data).attr('nonce','false'); $(document).off('click','[tabIndex] , *:has(>[sel]) *',customCh1.tabin); $(document).off('click', customCh1.tabout); 
        }   
}

aquery.prototype.Eval = function(e) {
    window.eval(e);
}

aquery.prototype.customChangerFactory = function() {
    return function(a, b, c, d, e) {
        return new aquery(a, b, c, d, e);
    };
};



/*USAGE:
var createCustomChanger = new aquery().customChangerFactory();
const customCh1 = createCustomChanger('.v', 'v', '.date-input', '.inputC#', [lstchY, ctbd]);
customCh1.setInitListner();
*/



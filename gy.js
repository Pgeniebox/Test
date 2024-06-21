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
--use id "na" to element child of .access parent to ignore it
--use return true , in the accessKey function to close the tab
-- use e.data.b.closeAllTabs(e.data.b) to close all the tabs
-- use e.data.a in function to specify the context, e.data.a = parent of aquery.c
-- e.data.c = aquery.c
-- e.data.c = aquery
-- e.data.a = aquery.d + id (parent of aquery.c)
*/

///'use strict' ;



function aquery(a, b, c, d, e,f) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.ready = false;
    this.close = f||false;
}

// Method to run all functions in functionsList with a given context
aquery.prototype.fn = function(a) {
    for (let func of this.e) {
        if (typeof func === 'function') {
            func(a);
        }
    }
};


aquery.prototype.closeAllTabs = function(e){
    window.$(document).off('click','[tabIndex] , *:has(>[sel]) *',e.tabin);
    window.$(document).off('click','*:not(*:has(>[sel]) *)', e.tabout);
            $('[tabIndex="1"]').attr('tabindex','0');
            $('[nonce="true"]').attr('nonce','false');
            $('[sel]').removeAttr('sel');
          $(e.a).toggleClass(e.b);
}

aquery.prototype.closeTab = function(e){
    
    window.$(window.$('*:has(>[sel]) [sel]'))[0].tabIndex =0;
    window.$(window.$('*:has(>[sel]) [sel]')).removeAttr('sel');
    window.$(e.data.b.a,e.data.a)[window.$(e.data.b.a,e.data.a).length-1].classList.toggle(e.data.b.b);
        window.$('[tabIndex="1"]',e.data.a)[window.$('[tabIndex="1"]',e.data.a).length-1].setAttribute('sel','');
       
}                                                                                                                                                                                                                                                               



aquery.prototype.setInitListner = function(){        
    let self = this;
    $(document).on('click','.tab > .entry',(ev)=>{ 
        ev.stopPropagation();

    $(document).off('click','.entry, .sel *',self.tabin);
    $(document).off('click', self.tabout);
            $('.sel').toggleClass('sel,v');
    self.fn($(this).closest('.tab'));
     $(document).on('click','.entry, .sel *',{a:$(this).closest('.tab'),b:self},self.tabin);
      ev.target.click();
         });
}


aquery.prototype.tabin = function(e){
    e.data.b.busy = true;
    e.stopPropagation();  

        if($(this).hasClass('entry')){
        if($(this).closest('.ctx>.pop').length!==0){
        
        }
          window.e = e;
          const close = new window.Function(this['attributes'].alt.value);
          window.e = null;
          if(close)
               if($(this).closest('.ctx').hasClass('tab')) e.data.b.closeAllTabs($(this).closest('.tab'));
                    else e.data.b.closeTab($(this).closest('.ctx'));
        }else if($(this).parent().hasClass('access')&&'na'!==this.id){
       window.e=e;
       const close= new window.Function($(this).parent()[0]['attributes'].nonce.value);
       window.e=null;
       if(close)
            e.data.b.closeTab($(this).closest('.ctx')); 
        }
        
        
        
        



//////
    if(e.target.nonce ==='false'){return;}
    window.$(document).off('click','[tabIndex] , *:has(>[sel]) *',e.data.b.tabin);
    if(e.target.tabIndex==0&&e.target.classList.contains('entry')){
    if(window.$(e.data.b.a,e.data.a).length>0) {window.$('[tabIndex="1"]',e.data.a)[window.$('[tabIndex="1"]',e.data.a).length-1].removeAttribute('sel'); 
    window.$(document).off('click','*:not(*:has(>[sel]) *)', e.data.b.tabout)}
    if($(e.target).next().hasClass('pop')){
           
           window.pos = window.$(e.target,e.data.a).next().offset();
           /*
           if(!window.ppp){
             window.ppp = $(e.target.parentElement)[0].getBoundingClientRect();
            window.pos.gtop =Math.abs( ppp.bottom-window.pos.top);
            window.pos.gleft =Math.abs( ppp.left-window.pos.left);
        }*/
           e.target.tabIndex =1;
        window.$(e.target,e.data.a).next().offset({top: window.pos.top,left:window.pos.left});
          $('*').on('scroll',e.data,e.data.b.popHelper);
    }
    
    e.target.tabIndex =1;

    window.$('[tabIndex="1"]',e.data.a)[window.$('[tabIndex="1"]',e.data.a).length-1].setAttribute('sel','');
      if($(e.target).hasClass('alt')){  
        window.e=e;
              const g =  new window.Function(e.target.alt)();
              window.e =null;

               }
    e.target.parentElement.classList.toggle(e.data.b.b); 
    window.$(document).on('click','*:not(*:has(>[sel]) *)',e.data, e.data.b.tabout);}
    else if(e.target.tabIndex==1) {
    e.target.parentElement.classList.toggle(e.data.b.b);
     window.$(document).off('click','*:not(*:has(>[sel]) *)', e.data.b.tabout);
        window.$('[tabIndex="1"]',e.data.a)[window.$('[tabIndex="1"]',e.data.a).length-1].removeAttribute('sel');
        e.target.tabIndex =0;
        if(window.$(e.data.b.a,e.data.a).length>0) {   window.$('[tabIndex="1"]',e.data.a)[window.$('[tabIndex="1"]',e.data.a).length-1].setAttribute('sel','');
              window.$(document).on('click','*:not(*:has(>[sel]) *)',e.data, e.data.b.tabout);           }
    }else if(e.target.parentElement.classList.contains('access')&&"na"!==e.target.id){
        window.e=e;
              const g =  new window.Function(e.target.parentElement.accessKey)();
                 window.e = null;
                 if(g){e.data.b.closeTab(e)}
     }
    if(window.$(e.data.b.a,e.data.a).length>0){ window.$(document).on('click','[tabIndex] , *:has(>[sel]) *',e.data,e.data.b.tabin);}
e.data.b.busy = false;

}



 aquery.prototype.tabout = function(e){
    if(e.data.b.busy){return}
    e.stopPropagation();
    if(window.$(e.data.b.a).length===1&&!e.data.b.close){ return; }
    if(e.target.nonce ==='false'){return;}
    window.$(document).off('click','[tabIndex] , *:has(>[sel]) *',e.data.b.tabin);
    window.$(document).off('click','*:not(*:has(>[sel]) *)', e.data.b.tabout);
    window.$(window.$('*:has(>[sel]) > [sel]'))[0].tabIndex =0;
    window.$(window.$('*:has(>[sel]) > [sel]')).removeAttr('sel');
    window.$(e.data.b.a,e.data.a)[window.$(e.data.b.a,e.data.a).length-1].classList.toggle(e.data.b.b);
    if(window.$('[tabIndex="1"]',e.data.a).is('*')){
        window.$('[tabIndex="1"]',e.data.a)[window.$('[tabIndex="1"]',e.data.a).length-1].setAttribute('sel','');
        window.$(document).on('click','[tabIndex] , *:has(>[sel]) *',e.data,e.data.b.tabin);
    window.$(document).on('click','*:not(*:has(>[sel]) *)', e.data,e.data.b.tabout);
    return;
    }
        window.$(e.data.b.c,e.data.a).attr('nonce','false');
}

aquery.prototype.popHelper = (e)=>{
    if($(e.target).filter('*:has([sel]+.pop)').length==0)
        {
            return  $('*:has([sel]+.pop)').length>0||$('*').off('scroll',e.data.b.popHelper);
        }
        const prect = $(e.target)[0].getBoundingClientRect();
        const rect = $('*:has(>[sel]+.pop)')[0].getBoundingClientRect();
        $('.pop',e.target).offset({
            top: Math.min(Math.max(rect.bottom,prect.top),prect.bottom),
            left: Math.min(Math.max(rect.left,prect.left),prect.right)
          });
        
        /*
        $('.pop',e.target).offset({
          top:  $('*:has(>[sel]+.pop)')[0].getBoundingClientRect().bottom,
          left: $('*:has(>[sel]+.pop)')[0].getBoundingClientRect().left
        });*/
}

aquery.prototype.modify = function(a, b, c, d, e){

    this.a = a||this.a;
    this.b = b||this.b;
    this.c = c||this.c;
    this.d = d||this.d
    this.e = e||this.e;
}

aquery.prototype.customChangerFactory = function() {

    return function(a, b, c, d, e,aa) {
        c+='#'; aa=null;aa=a.replace('.','')
        return new aquery(a, aa, b, c, d,e);
    };
   
};                                                                                        






/*USAGE:
var createCustomChanger = new aquery().customChangerFactory();
const customCh1 = createCustomChanger('.v', 'v', '.date-input', '.inputC#', [lstchY, ctbd]);
customCh1.setInitListner();
*/



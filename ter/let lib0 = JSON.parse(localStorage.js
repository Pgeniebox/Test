let lib0 = JSON.parse(localStorage.getItem('lib0')) || {};
const aut = document.querySelector('.footnote').textContent.replace('(','').replace(')','')
  if(!lib0[aut]){ lib0[aut] = {};}
const bk = document.querySelector('title').textContent
lib0[aut][bk]  = {};
const oo = 'المقدمة'
lib0[aut][bk][oo] = {};
const crd = document.querySelector('.PageText');
const crdp = crd.querySelectorAll('.title');
const crdc = crd.childNodes;

for (let i = 0; i < crdc.length; i++) {
   var e = crdc[i].querySelector('.title');   
  
    if(null!==e){
       var t = e.textContent;
        lib0[aut][bk][oo][i] = {};
       lib0[aut][bk][oo][i][t]=  crdc[i].textContent.replace(t,'');
    }else{
        lib0[aut][bk][oo][i] = crdc[i].textContent;
    }
    
}
document.querySelector('.PageText').remove();

let tt = document.querySelectorAll('.PageText');
tt.forEach(t=>{const u = t.querySelector('.PageNumber'); if(u){t.data =u.textContent;const d = t.querySelector('.PageHead');if(d){t.removeChild(d)}}});


const p = 'p';
const fn = 'fn';
lib0[aut][bk][p] = {};
for (let i = 0; i < tt.length; i++) {
    
    const ee = tt[i].data;
     // Use textContent to get the element's text content
    lib0[aut][bk][p][i] = [ee];
     const ff = tt[i].childNodes;
const processedNodes = new Set(); // To keep track of processed nodes

for (let f = 0; f < ff.length; f++) {
    if(ff[f].nodeName==='HR'){continue;}
    if (ff[f].className !== 'footnote' && ff[f].nodeName !== 'P' && ff[f].className !== 'title' && !processedNodes.has(ff[f])) {
        let combinedText = ff[f].data || ff[f].textContent;
        processedNodes.add(ff[f]);

        let a = ff[f].nextSibling;
        while (a && (a.className !== 'footnote' && a.nodeName !== 'P' && a.className !== 'title'&&a.nodeName!=='HR')) {
            combinedText += (a.data || a.textContent || '');
            processedNodes.add(a);
            a = a.nextSibling;
        }

        if (combinedText.length > 0) {
            lib0[aut][bk][p][i].push(combinedText);
        }
    }
    else if (ff[f].nodeName === 'P' && !processedNodes.has(ff[f])) {
        let combinedText = ff[f].textContent;
        processedNodes.add(ff[f]);

        let a = ff[f].nextSibling;
        while (a && (a.className !== 'footnote' && a.nodeName !== 'P' && a.className !== 'title'&&a.nodeName!=='HR')) {
            combinedText += (a.data || a.textContent || '');
            processedNodes.add(a);
            a = a.nextSibling;
        }

        if (combinedText.length > 0) {
            lib0[aut][bk][p][i].push('bs'+combinedText);
        }
    }
     else if (ff[f].className === 'title') {
            lib0[aut][bk][p][i].push('t'+ff[f].textContent);
        }

       else if (ff[f].hasAttribute && ff[f].hasAttribute('data-type')) {
            lib0[aut][bk][p][i].push('t'+ff[f].textContent);
        }

      else  if (ff[f].className === 'footnote') {
          const rr =  ff[f].querySelectorAll('p');
rr.forEach(y=>{
    let ddd ='';
    while(y.nextSibling&&y.nextSibling.tagName!=='P'){
    if(y.nextSibling.nodeName==='P'){return;}
    const a = y.nextSibling;
         ddd += (a.data || a.textContent || ''); 
        a.parentElement.removeChild(a);}  
            if(ddd.length>0){y.textContent += 'bs'+ddd}
});
            lib0[aut][bk][p][i][fn] = ff[f].textContent;     
        }
else if(!lib0[aut][bk][p][i]){
        lib0[aut][bk][p][i-1][0] += ff[f].textContent;}
    }
}

localStorage.setItem('lib0',JSON.stringify(lib0));
[Symbol.iterator]()
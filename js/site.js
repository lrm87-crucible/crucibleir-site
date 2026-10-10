(function(){
var fmt=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0});
function $(id){return document.getElementById(id)}
var calc=$('calc');
if(calc){
  var lastSummary='';
  function upd(){
    var book=Math.max(0,parseFloat($('book').value)||0), rate=Math.max(0,parseFloat($('rate').value)||0), months=Math.max(0,parseFloat($('months').value)||0), sooner=parseInt($('sooner').value,10)||0;
    var annual=book*rate/100, daily=annual/365, spent=annual*months/12, save=annual*sooner/12;
    var soonTxt=sooner+(sooner===1?' month':' months');
    $('soonerOut').textContent=soonTxt; $('rSoonMonths').textContent=soonTxt;
    $('rAnnual').textContent=fmt.format(annual); $('rDaily').textContent=fmt.format(daily);
    $('rSpent').textContent=fmt.format(spent); $('rYear').textContent=fmt.format(annual); $('rSave').textContent=fmt.format(save);
    lastSummary='Idle assets with '+fmt.format(book)+' of book value cost about '+fmt.format(annual)+' a year to hold ('+fmt.format(daily)+' a day). After '+months+' months idle, that is about '+fmt.format(spent)+' already spent. Moving them '+soonTxt+' sooner would save about '+fmt.format(save)+'. Estimate from crucible holding cost calculator.';
  }
  ['book','rate','months','sooner'].forEach(function(id){$(id).addEventListener('input',upd)});
  $('copy').addEventListener('click',function(){
    function done(){var c=$('copied');c.hidden=false;setTimeout(function(){c.hidden=true},2500)}
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(lastSummary).then(done,function(){window.prompt('Copy this summary:',lastSummary)})}
    else{window.prompt('Copy this summary:',lastSummary)}
  });
  upd();
}
// Pilot request form.
// Posts to a hosted form endpoint so a submission reaches the inbox without
// depending on the visitor having a mail client configured — the old mailto:
// handoff silently did nothing on a corporate desktop using webmail, which
// meant a lost lead nobody ever knew about.
var form=$('leadform');
if(form){
  var endpoint=form.getAttribute('data-endpoint')||'';
  var to=form.getAttribute('data-to')||'lawrence@crucibleir.com';
  var btn=form.querySelector('button[type=submit]');
  var note=$('leadnote');

  var showNote=function(cls,html){
    if(!note)return;
    note.className=cls;
    note.innerHTML=html;
    note.hidden=false;
  };

  // If anything goes wrong, never leave the visitor with a dead end: show the
  // address so they can still reach us.
  var failed=function(){
    showNote('err','We couldn&rsquo;t send that automatically. Please email <a href="mailto:'+to+'">'+to+'</a> and we&rsquo;ll pick it up from there.');
  };

  form.addEventListener('submit',function(e){
    e.preventDefault();
    if(!endpoint){failed();return}

    var data=new FormData(form);
    data.append('_subject','Pilot request from '+((data.get('company')||'').toString().trim()||'a visitor'));

    if(btn){btn.disabled=true;btn.textContent='Sending…'}
    if(note)note.hidden=true;

    fetch(endpoint,{method:'POST',body:data,headers:{Accept:'application/json'}})
      .then(function(r){
        if(!r.ok)throw new Error('bad status');
        form.reset();
        if($('leadok'))$('leadok').hidden=false;
        if(btn){btn.hidden=true}
      })
      .catch(function(){
        failed();
        if(btn){btn.disabled=false;btn.textContent='Request a pilot'}
      });
  });
}
document.addEventListener('click',function(e){
  var m=document.querySelector('.menu[open]');
  if(m&&!m.contains(e.target))m.removeAttribute('open');
});
})();

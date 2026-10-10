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
var form=$('leadform');
if(form){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var f=new FormData(form), g=function(k){return (f.get(k)||'').toString().trim()};
    var body='Name: '+g('name')+'\nEmail: '+g('email')+'\nCompany: '+g('company')+'\nRole: '+g('role')+'\nSites with idle assets: '+g('sites')+'\n\nHow we track idle assets today:\n'+g('notes');
    var to=form.getAttribute('data-to')||'lawrence@crucibleir.com';
    window.location.href='mailto:'+to+'?subject='+encodeURIComponent('Pilot request from '+g('company'))+'&body='+encodeURIComponent(body);
    $('leadok').hidden=false;
  });
}
document.addEventListener('click',function(e){
  var m=document.querySelector('.menu[open]');
  if(m&&!m.contains(e.target))m.removeAttribute('open');
});
})();

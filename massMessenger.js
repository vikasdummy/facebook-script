/*
author: gynbiprt
This is for education purpose dont use it ever

Read comments below
*/

new function massMessenger(){

// Few manual steps
// 1. Goto page: https://www.facebook.com/search/<>/likers on "Google Chrome Browser" or what ever similar page


// 2. Open google chrome console[f-12]
// 3. Set no of people you want to send message below::

var peopleCount = 10; // total ppl who like

// 4. Set no. of people you already sent below::

var sent=0;//0 default

// 5. Set your message below ::

var message = "Hello World !";

// copy paste this file in "Console Tab opened in Bottom" and press enter
// it will scroll down to find the next person to send and then 
// a popup will open just "Click Once" on text area, and see the magic
// IMP--->mouse/cursor focus should always be on the facebook window.dont open anything else

// ppl  who will be sent will be from :: sent +1 to peopleCount
// the ordering in list changes as fb updates graph, so its possible that people get message again(need to figure out to solve it)
// to prevent it maintain your connection graph and clear cache before startign it



// other settings as per Internet speed and window size

var waitForPopup   =  8*1000;// ms 
var waitForUnPopup =  8*1000;// ms 
var waitForScroll  = 10*1000;// ms
var scrollBy       =    1000;// px
var inViewScroll   =     200;// px

var scrollMax     = 100;
var scrollRefresh =  10;
var scrollCnt     =   0;


// huge data aray
var messageBtns = [];


var mainF = function(){

// keep scrolling a bit
// window.scrollBy(0,scrollBy);

if(sent<peopleCount && scrollCnt < scrollMax){

  if ( scrollCnt >=  scrollRefresh){
    //location.reload();
  }

  messageBtns = $$('a[href^="/messages/"]');
  
  var lastMsgIdx = sent-1;
  
  console.debug("Need to send for index : "+ (lastMsgIdx+1) );
  console.debug("We have last index     : "+ (messageBtns.length - 1) );
  
  if( lastMsgIdx+1 > messageBtns.length - 1 ){
    // this means that we need to scroll down
    console.debug("Will scroll down ...("+ scrollCnt+"/"+scrollMax+")");
    
    scrollCnt++;
    window.scrollBy(0,scrollBy);

    
    // wait and try again
    setTimeout(mainF, waitForScroll);
    return;
  }
  //dbg:alert("here2");
  scrollCnt=0;
  
  // now we can send
  // open dialog
  
  // see who is sent  msg / get in focus
  btn = messageBtns[lastMsgIdx+1];
  btn.scrollIntoView();
  window.scrollBy(0,-1*inViewScroll);// up scroll
  
  btn.setAttribute("style","outline: 5px solid red;")
  
  btn.click();
  
  // now after UI inits execute ...
  var cb = function(){
      var txtBox = $$('.uiTextareaNoResize.uiTextareaAutogrow._2oj')[0];
      var sendBtn = $$('button[type="submit"]',$$('div.uiOverlayFooter.uiBoxGray.noborder')[0])[0];
      
      
      // keydown event
      txtBox.click();
      // set message text
      txtBox.value=message;
      // send
      sendBtn.click();
      
      // now wait again to send ...
      
      // increment assuming all will go well
      sent++;
      
      console.debug("Sent to... : ("+ sent + "/" + peopleCount +")");
      
      
      
      
      //dbg: alert("here3");
      setTimeout(mainF, waitForUnPopup);
      
  };
  
  setTimeout(cb, waitForPopup);
  
  }
  
  
  
};

mainF();

}

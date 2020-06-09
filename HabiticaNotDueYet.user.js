// ==UserScript==
// @name        Habitica Not Due Yet
// @namespace   https://github.com/pbvirus
// @description User script to remove tasks which are not due yet.
// @author      Prince Biswaranjan
// @homepage    https://github.com/pbvirus/GM-HabiticaNotDueYet
// @version     1.0.2
// @grant       none
// @include     https://habitica.com/*
// @run-at      document-end
// ==/UserScript==

"use strict";

function addButton(text, onclick, cssObj) {
    cssObj = cssObj || {position: 'absolute', top: '7%', left:'4%', 'z-index': 3};
    
    let button = document.createElement('button'), btnStyle = button.style;
    document.body.appendChild(button);
    
    button.innerHTML = text;
    button.onclick = onclick;
    btnStyle.position = 'absolute';
    
    Object.keys(cssObj).forEach(key => {
      btnStyle[key] = cssObj[key];
    });
    
    return button;
}

window.addEventListener('load', () => {
    let cssProp = {
        position: 'fixed', 
        top: '6%', 
        right:'1%', 
        'z-index': 10,
        'background-color': 'red'
    };
    addButton('Remove Future Tasks', RemoveTasksNotDue, cssProp);
});

function RemoveTasksNotDue(){
    //Get items with calendar icon
    var calendarIcons = document.getElementsByClassName('calendar');

    for(var i = calendarIcons.length-1; i >= 0; i--){

      //remove spans starting with "Due in "
      var spans = calendarIcons[i].parentNode.getElementsByTagName('span');

      if(spans[0].innerHTML.substring(0, 7) === 'Due in '){
        var taskWrapper = spans[0].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        if(taskWrapper.className === 'task-wrapper'){
          taskWrapper.parentNode.removeChild(taskWrapper);
        }
      }
    }
}

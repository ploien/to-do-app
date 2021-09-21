

/************************************************** 
* This function gets a task from the new 
* task user input, and adds it to the 'to_do_list'. 
***************************************************/

function showComplete() {
   let hiddenElements =  document.getElementsByClassName("hidden");

    for (i=0; i < hiddenElements.length; i++) {
        hiddenElements[i].style.display = "inline";
    }
}

function hideComplete() {
    let hiddenElements =  document.getElementsByClassName("hidden");
 
     for (i=0; i < hiddenElements.length; i++) {
         hiddenElements[i].style.display = "none";
     }
 }


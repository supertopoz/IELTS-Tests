$('document').ready(() => {
	console.log('working')
	$('.content').hide();
	$('#saved').hide();
	$('#loading').hide();
})
$(document).on('click','#start-button',() => {
 	toggleFullScreen()
	$('.content').show('slow');
	$('#start-button').hide()

})

function saveProcess(){
  toggleFullScreen()
	$('.content').hide();
	$('#warning').hide();	
	$('#loading').show();

}

$(document).on('click','#save-button', () => {
  saveProcess()
})

function disableEditor(){
	tinymce.settings = $.extend(tinymce.settings, { readonly: 1 });
	tinymce.settings = $.extend(tinymce.settings, { readonly: 1 });

	//tinymce.EditorManager.editors.forEach(function (editor) {
	tinymce.EditorManager.execCommand('mceRemoveEditor', false, 'myarea1');
	tinymce.EditorManager.execCommand('mceRemoveEditor', false, 'myarea2');
	tinymce.EditorManager.execCommand('mceAddEditor', false, 'myarea1');
	tinymce.EditorManager.execCommand('mceAddEditor', false, 'myarea2');
//}//);
}

function getHTML(){

	let areaOne = tinyMCE.get('myarea1').getContent();
	let areaTwo = tinyMCE.get('myarea2').getContent();
	let html = areaOne + areaTwo;
	createDoc(html).then((e)=>{})
}


var changeHandler = function() {                        
	var fs = window.fullScreenApi.isFullScreen();
	console.log("f" + (fs ? 'yes' : 'no'));
	if (fs) {
		//    alert("In fullscreen, I should do something here");                  
	} else {

		disableEditor();
		getHTML()
	}
}
document.addEventListener("fullscreenchange", changeHandler, false);
document.addEventListener("webkitfullscreenchange", changeHandler, false);
document.addEventListener("mozfullscreenchange", changeHandler, false);
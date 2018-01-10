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
$(document).on('click','#save-button', () => {
  toggleFullScreen()
  getHTML()

	$('.content').hide();
	$('#warning').hide();	
	$('#loading').show();

})

function disableEditor(){
tinymce.settings = $.extend(tinymce.settings, { readonly: 1 });
tinymce.EditorManager.editors.forEach(function (editor) {
    tinymce.EditorManager.execCommand('mceRemoveEditor', false, editor.id);
    //tinymce.EditorManager.editors = [];
    tinymce.EditorManager.execCommand('mceAddEditor', false, editor.id);
});
}

function getHTML(){

// Get the HTML contents of the currently active editor
console.debug(tinyMCE.activeEditor.getContent());
//method1 getting the content of the active editor
//alert(tinyMCE.activeEditor.getContent());
//method2 getting the content by id of a particular textarea
let areaOne = tinyMCE.get('myarea1').getContent();
let areaTwo = tinyMCE.get('myarea2').getContent();

let result = areaOne + areaTwo;
sendToGoogleDoc(result)
}

function sendToGoogleDoc(html){
    
    createDoc(html).then((e)=>{
    })
   
}

const createDoc = (html) => {
    return new Promise ((resolve,reject) => {    	
   let data =  encodeURIComponent(html)	
   console.log(data)
   let secondScriptID = 'AKfycbzkbDNcuPHSciMiNN5YfXlNs9r1B1fR7Y4VGR9GaPFrJNqLLMg';
   axios.get("https://script.google.com/macros/s/" + secondScriptID + "/exec?html=" + data).then((response)=>{
     console.log(response.data)
     let id = response.data;
     $('#saved').show();
     $('#loading').hide();
     $('#link').append('<a target="_blank" href="https://drive.google.com/open?id='+ id + '" > Open Google Document</a>')
   }).catch(error =>{
     console.log(error)
   })
  })
}

















// mozfullscreenerror event handler
function errorHandler() {
	alert('mozfullscreenerror');
}
document.documentElement.addEventListener('mozfullscreenerror', errorHandler, false);
// toggle full screen
function toggleFullScreen() {
	if (!document.fullscreenElement && // alternative standard method
		!document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
		if (document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		} else if (document.documentElement.mozRequestFullScreen) {
			document.documentElement.mozRequestFullScreen();
		} else if (document.documentElement.webkitRequestFullscreen) {
			document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		}
	} else {
		if (document.cancelFullScreen) {
			document.cancelFullScreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
		}
	}
}
// keydown event handler
// document.addEventListener('keydown', function(e) {
//   if (e.keyCode === 27) { // F or Enter key
//     $('.content').hide();
//   }
// }, false);
(function() {
	var fullScreenApi = {
			supportsFullScreen: false,
			isFullScreen: function() {
				return false;
			},
			requestFullScreen: function() {},
			cancelFullScreen: function() {},
			fullScreenEventName: '',
			prefix: ''
		},
		browserPrefixes = 'webkit moz o ms khtml'.split(' ');
	// check for native support
	if (typeof document.cancelFullScreen != 'undefined') {
		fullScreenApi.supportsFullScreen = true;
	} else {
		// check for fullscreen support by vendor prefix
		for (var i = 0, il = browserPrefixes.length; i < il; i++) {
			fullScreenApi.prefix = browserPrefixes[i];
			if (typeof document[fullScreenApi.prefix + 'CancelFullScreen'] != 'undefined') {
				fullScreenApi.supportsFullScreen = true;
				break;
			}
		}
	}
	// update methods to do something useful
	if (fullScreenApi.supportsFullScreen) {
		fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
		fullScreenApi.isFullScreen = function() {
			switch (this.prefix) {
				case '':
					return document.fullScreen;
				case 'webkit':
					return document.webkitIsFullScreen;
				default:
					return document[this.prefix + 'FullScreen'];
			}
		}
		fullScreenApi.requestFullScreen = function(el) {
			return (this.prefix === '') ? el.requestFullScreen() : el[this.prefix + 'RequestFullScreen']();
		}
		fullScreenApi.cancelFullScreen = function(el) {
			return (this.prefix === '') ? document.cancelFullScreen() : document[this.prefix + 'CancelFullScreen']();
		}
	}
	// jQuery plugin
	if (typeof jQuery != 'undefined') {
		jQuery.fn.requestFullScreen = function() {
			return this.each(function() {
				if (fullScreenApi.supportsFullScreen) {
					fullScreenApi.requestFullScreen(this);
				}
			});
		};
	}
	// export api
	window.fullScreenApi = fullScreenApi;
})();
var changeHandler = function() {
	//NB the following line requrires the libary from John Dyer                         
	var fs = window.fullScreenApi.isFullScreen();
	console.log("f" + (fs ? 'yes' : 'no'));
	if (fs) {
		//    alert("In fullscreen, I should do something here");                  
	} else {
		disableEditor()
		//          $('#warning').hide();  
		//          $('#saved').show();  
	}
}
document.addEventListener("fullscreenchange", changeHandler, false);
document.addEventListener("webkitfullscreenchange", changeHandler, false);
document.addEventListener("mozfullscreenchange", changeHandler, false);
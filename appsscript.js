// This code is running in an standalone google appscript as a mircoservice.

function doGet(e) {
  var html = e.parameter.html;
  Logger.log(html)
  var id = createNewDoc(html)
  return ContentService.createTextOutput(id); 
}


function createNewDoc(html){

  var title = 'Was created from a web page'
  var content = html
  
  var folderId = 'SOME_ID'
  var resource = {
    title: title,
    parents: [
      {
        "id": folderId, 
        "kind": "drive#fileLink"
      }
    ],
    mimeType: 'application/vnd.google-apps.document', 
  };
  var blob = Utilities.newBlob("").setDataFromString(content,'UTF-8').setContentType("text/html")
  var newfile = Drive.Files.insert(resource, blob, {"convert":"true"}).id
  var openFile = DriveApp.getFileById(newfile)
  openFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
  return newfile;
}

// Triggered to nightly empty folder
function emptyIeltsFolder(){

var eachFile, idToDLET, myFolder, rtrnFromDLET, thisFile;

myFolder = DriveApp.getFolderById('SOME_ID');
  
thisFile = myFolder.getFiles();
while (thisFile.hasNext()) {//If there is another element in the iterator
  eachFile = thisFile.next();
  idToDLET = eachFile.getId();
  rtrnFromDLET = Drive.Files.remove(idToDLET);
};
  
}

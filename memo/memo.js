exports.action = (data) => {//nécéssite plug push pour envoie sur smart
console.log(data+JarvisIA.reco)

  var filePath = path.resolve('%CD%', './plugins/memo/memoirememo/memo.json').replace('\\%CD%', '');
  var fs = require('fs');
  var fichiermemo = fs.readFileSync(filePath,{encoding:'utf8', flag:'r'}); 
  console.log(fichiermemo)
  var objet = JSON.parse(fichiermemo);var longueur = objet.length;var jsonStr = JSON.stringify(objet);var cd=(objet[1]);
try{
    var query=JarvisIA.reco   
    var rgxp = /mémo (.+)/i; var query = query.match(rgxp);
    var query=query[1]
    console.log(query+" : recus")
}catch(err){var query=""}

if (data.memo == "on") {      
  if(query==""){JarvisIASpeech('rien à ajouter') ;return }
    if (jsonStr.indexOf(query) > -1  ){JarvisIASpeech (query + ", il est déja présent dans la liste|il est déjà inscrit dans la vie|il a déjà était dis");}
      else {JarvisIASpeech(query+" ajouté à la liste ")
            objet.push(query); var new_jsonStr = JSON.stringify(objet);        
            fs.writeFile(filePath,new_jsonStr ,  (err) => {});}//fin fs write
  return
}//fin if on

if (data.memo =="liste"){console.log('Jarvis dit ce qu\'il y a à faire ',jsonStr)
 JarvisIASpeech(jsonStr)
}//fin if

if (data.memo=="vide"){
     var filePath = path.resolve('%CD%', './plugins/memo/memoirememo/memo.json').replace('\\%CD%', '');
     fs.writeFileSync(filePath,'[]',"UTF-8"); // Remet le fichier courses.json a zéro pour une utilisation future
     JarvisIASpeech("suppression de tous les mémo|j'espère que tu as tout fait|voilà j'ai tout éffacer|c'est bon");
     return
}//fin if

if (data.memo == "pushliste"){
 JarvisIA.reco= "envoie une notification à fred "+jsonStr
 JarvisIARun(['sendsms','data.destinataire="fred",data.numero="XXXXXXXXXX",data.pharsesms="envoie une notification à fred"'])
return 
}//fin if
return
}




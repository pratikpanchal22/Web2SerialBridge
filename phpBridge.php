<?php 

function generateFileName() {
   # prevent the first number from being 0
   $op = rand(1,9);
 
   for($i=0; $i<32; $i++) {
      $op .= rand(0,9);
   }

   return $op;
}

function getIndexedFileName() {
   $fileIndexer = fopen("fileIndexer.txt","r") or die("Unable to open fileIndexer.txt");
   $newIdx = fgets($fileIndexer)+1;
   fclose($fileIndexer);

   $fileIndexer = fopen("fileIndexer.txt","w") or die("Unable to open fileIndexer.txt");
   fwrite($fileIndexer,$newIdx);
   fclose($fileIndexer);

   return $newIdx;

}

function getTimeBasedFileName() {
   list($usec, $sec) = explode(" ", microtime());
   $value = ((float)$usec + (float)$sec);
   return $value;
}

$destination='../cmdFiles/';



$cmd = $_GET["cmd"]; 

#$output=shell_exec("sudo /var/www/html/controls/sendDataOutSerialPort.sh $cmd"); 
#

if(empty($_GET['getstats'])) {
   #$fileName = generateFileName();
   #$fileName = getIndexedFileName();
   $fileName = getTimeBasedFileName();
   
   
   $file = fopen($fileName,"w") or die("Failed to open file $fileName");
   if(!empty($_GET['cmd'])) {
      fwrite($file,$_GET['cmd']);
   }
   if(!empty($_GET['x'])) {
      fwrite($file,'x='.$_GET['x']);
   }
   if(!empty($_GET['y'])) {
      fwrite($file,'y='.$_GET['y']);
   }
   
   #Close and reopen to read the fileContents before closing 
   fclose($file);
   $file = fopen($fileName,"r") or die("Failed to open file $fileName");
   $fileContents = fread($file, filesize($fileName));
   
   fclose($file);
   
   #Move file to destination
   rename($fileName, $destination.$fileName);

   $responseObj->fileName = $fileName;
   $responseObj->fileContents = $fileContents;

}

#Count number of cmdFiles
$fi = new FilesystemIterator($destination, FilesystemIterator::SKIP_DOTS);
$cmdFileCount = iterator_count($fi);

$output = "File:".$fileName." #cmdFiles:".$cmdFileCount;

$responseObj->cmdFileCount = $cmdFileCount;

#Convert responseObj into json
$responseJson = json_encode($responseObj);




#echo $output;
echo $responseJson;

#Functions
  
?>

<?php
// записывает в файл содержимое параметра $message
function logf($message)
{
  //$logFile = $_SERVER["DOCUMENT_ROOT"]."\\log.txt";
  $logFile = dirname(__FILE__)."/log.txt";
  $fh = fopen($logFile,"a");
  fputs($fh, "***** ".$_SERVER['PHP_SELF']." ***** (".date("d.m.y h:i:s").")\n");
  fputs($fh, $message."\n\n");
  fclose($fh);
}
?>
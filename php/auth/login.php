<?php

echo <<< HTML
<html>
<head>
</head>
<body>
	<form method="post" action="index.php?script_name=test">
        host<input type="text" name="host" value="192.168.1.100" />
		login<input type="text" name="login" value="root" /> <br/>
		pass<input type="text" name="pass" value="1" />
		<input type="submit" name="submit" value="send" />
	</form>
</body>
</html>
HTML;

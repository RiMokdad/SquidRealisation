:begin
npm start
echo Wanna retry ? Y/N
set /p y=
if &y& == "Y" || &y& == "y" (
	GOTO begin
) 

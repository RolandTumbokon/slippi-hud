:: Run this script to compile and run slippiHUD
:: Obviously change the file locations



echo a | Xcopy /E /I C:\Users\Roland\Documents\GitHub\input-display C:\Users\Roland\Documents\nodecg\bundles\slippi-hud
C:
cd C:\Users\Roland\Documents\nodecg\bundles\slippi-hud
cd ../..

::pause ::UNCOMMENT FOR FIRST TIME INSTALLS
::nodecg install

nodecg start
cmd /k
@echo off
setlocal enabledelayedexpansion

set count=1

for %%f in (*.*) do (
    ren "%%f" "!count!%%~xf"
    set /a count+=1
)

echo Listo, archivos renombrados desde 1.
pause
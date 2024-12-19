@echo off
title Selector de Modo

:menu
cls
echo Selecciona el modo:
echo.
echo 1. Modo Dev (npm run dev)
echo 2. Modo Prod (npm run start)
echo.
echo 0. Salir
echo.
echo.

set /p opcion=Introduce el numero de opcion: 

if %opcion%==0 goto salir
if %opcion%==1 goto dev
if %opcion%==2 goto prod

echo Opcion no valida. Intentalo de nuevo.
pause
goto menu

:dev
cls
echo Iniciando Modo Dev...
npm run dev
if errorlevel 1 (
    echo Error al ejecutar npm run dev.
    pause
)
goto menu

:prod
cls
echo Iniciando Modo Prod...
npm run start
if errorlevel 1 (
    echo Error al ejecutar npm run start.
    pause
)
goto menu

:salir
cls
echo Saliendo...
exit
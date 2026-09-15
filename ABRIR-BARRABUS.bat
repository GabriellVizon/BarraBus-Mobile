@echo off
title BarraBus Mobile
cd /d "%~dp0"

echo Sincronizando BarraBus...
call npx cap sync android

echo.
echo Abrindo Android Studio...
call npx cap open android
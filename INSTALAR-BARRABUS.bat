@echo off
title BarraBus Mobile - Preparacao do Projeto
color 0A

echo ==========================================
echo        BARRABUS MOBILE - INSTALADOR
echo ==========================================
echo.

cd /d "%~dp0"

echo [1/5] Verificando Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Node.js nao esta instalado neste computador.
    echo Instale o Node.js e execute este arquivo novamente.
    pause
    exit /b 1
)

node --version
npm --version

echo.
echo [2/5] Instalando dependencias do projeto...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo [ERRO] npm install falhou.
    pause
    exit /b 1
)

echo.
echo [3/5] Verificando Capacitor...
call npx cap --version

if %errorlevel% neq 0 (
    echo.
    echo Instalando Capacitor...
    call npm install @capacitor/core @capacitor/cli @capacitor/android

    if %errorlevel% neq 0 (
        echo [ERRO] Nao foi possivel instalar o Capacitor.
        pause
        exit /b 1
    )
)

echo.
echo [4/5] Sincronizando projeto Android...
call npx cap sync android

if %errorlevel% neq 0 (
    echo.
    echo [ERRO] Nao foi possivel sincronizar o Android.
    pause
    exit /b 1
)

echo.
echo [5/5] Preparacao concluida!
echo.
echo ==========================================
echo   BARRABUS PRONTO PARA DESENVOLVIMENTO
echo ==========================================
echo.
echo Para abrir no Android Studio:
echo npx cap open android
echo.

pause
@echo off
cd /d "%~dp0"
echo Memulai server lokal CSCP...
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause

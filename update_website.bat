@echo off
cd /d "%~dp0"
title Update Website CSCP ke GitHub ^& Cloudflare
echo ========================================================
echo  MEMPERBARUI WEBSITE CSCP SECARA OTOMATIS
echo ========================================================
python update_github.py
echo.
pause

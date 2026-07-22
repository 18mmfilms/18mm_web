@echo off
setlocal enabledelayedexpansion

title VERSION DE PRUEBA - 18MM FILMS
color 0F

echo ========================================
echo   VERSION DE PRUEBA - 18MM FILMS
echo   Iniciando proyecto en local...
echo ========================================
echo.
cd /d "%~dp0"

set "PASSOS=0"
set "FALLOS=0"

:: ==========================================
:: PASO 1: Verificar / Instalar Node.js
:: ==========================================
set /a PASSOS+=1
echo [PASO %PASSOS%] Verificando Node.js...

call :CheckNode
if !ERRORLEVEL! equ 0 (
    echo   [OK] Node.js encontrado: !NODE_Version!
) else (
    echo   [INFO] Node.js no detectado. Intentando instalar...
    call :InstallNode
    if !ERRORLEVEL! neq 0 (
        set /a FALLOS+=1
        echo   [ERROR] No se pudo instalar Node.js
        echo   Por favor, instala Node.js manualmente desde: https://nodejs.org
        pause
        exit /b 1
    )
    echo   [OK] Node.js instalado correctamente
)

:: Refrescar PATH
echo   Actualizando PATH...
set "NODE_PATH="
for %%p in ("%ProgramFiles%\nodejs" "%ProgramFiles(x86)%\nodejs" "%LocalAppData%\fnm\nodejs\current" "%AppData%\npm" "%UserProfile%\.fnm\nodejs\current") do (
    if exist "%%~p\node.exe" set "NODE_PATH=%%~p"
)
if defined NODE_PATH set "PATH=%NODE_PATH%;%AppData%\npm;%PATH%"

:: Verificar node accesible despues de refrescar PATH
where node >nul 2>nul
if !ERRORLEVEL! neq 0 (
    echo   [ERROR] Node.js sigue sin ser accesible despues de instalar
    echo   Prueba a reiniciar el ordenador o instalar Node manualmente
    pause
    exit /b 1
)

:: ==========================================
:: PASO 2: Instalar dependencias (npm install)
:: ==========================================
set /a PASSOS+=1
echo.
echo [PASO %PASSOS%] Instalando dependencias...

call :NpmInstall
if !ERRORLEVEL! neq 0 (
    set /a FALLOS+=1
    echo   [ERROR] No se pudieron instalar las dependencias despues de varios intentos
    pause
    exit /b 1
)
echo   [OK] Dependencias instaladas

:: ==========================================
:: PASO 3: Iniciar servidor
:: ==========================================
set /a PASSOS+=1
echo.
echo [PASO %PASSOS%] Iniciando servidor Angular...

call :StartServer
if !ERRORLEVEL! neq 0 (
    set /a FALLOS+=1
    echo   [ERROR] No se pudo iniciar el servidor
    pause
    exit /b 1
)

goto :Fin

:: ==========================================
:: FUNCION: CheckNode
:: ==========================================
:CheckNode
    for /f "tokens=*" %%a in ('node --version 2^>nul') do set "NODE_Version=%%a"
    if defined NODE_Version exit /b 0
    
    where node >nul 2>nul
    if !ERRORLEVEL! equ 0 (
        for /f "tokens=*" %%a in ('node --version 2^>nul') do set "NODE_Version=%%a"
        if defined NODE_Version exit /b 0
    )
    
    :: Buscar en rutas tipicas sin PATH
    if exist "%ProgramFiles%\nodejs\node.exe" (
        set "NODE_Version=instalado"
        exit /b 0
    )
    if exist "%ProgramFiles(x86)%\nodejs\node.exe" (
        set "NODE_Version=instalado"
        exit /b 0
    )
    if exist "%LocalAppData%\fnm\nodejs\current\node.exe" (
        set "NODE_Version=instalado (fnm)"
        exit /b 0
    )
    
    exit /b 1

:: ==========================================
:: FUNCION: InstallNode
:: ==========================================
:InstallNode
    set "INSTALL_OK="

    :: INTENTO 1: winget
    echo   [INTENTO 1] Instalando con winget...
    winget install OpenJS.NodeJS.LTS --silent --accept-package-agreements --accept-source-agreements 2>nul
    if !ERRORLEVEL! equ 0 (
        echo   Esperando a que se complete la instalacion...
        timeout /t 8 /nobreak >nul
        for /f "tokens=*" %%a in ('node --version 2^>nul') do set "NODE_Version=%%a"
        if defined NODE_Version set "INSTALL_OK=1"
    )
    if defined INSTALL_OK exit /b 0

    :: INTENTO 2: Descargar MSI e instalar
    echo   [INTENTO 2] Descargando Node.js desde nodejs.org...
    set "NODE_URL="
    
    :: Probar varias versiones (de mas nueva a mas vieja)
    for %%v in ("v22.14.0" "v22.13.0" "v22.11.0" "v20.18.3" "v20.17.0" "v20.11.0") do (
        if not defined NODE_URL (
            echo     Probando version %%~v...
            powershell -NoProfile -Command "try { Invoke-WebRequest -Uri 'https://nodejs.org/dist/%%~v/node-%%~v-x64.msi' -OutFile '%TEMP%\node-install.msi' -UseBasicParsing -ErrorAction Stop; Write-Host 'OK' -NoNewline; exit 0 } catch { exit 1 }" >nul 2>nul
            if !ERRORLEVEL! equ 0 (
                set "NODE_URL=%%~v"
                echo     Descargada version %%~v
            )
        )
    )
    
    if not defined NODE_URL (
        echo   [FALLO] No se pudo descargar Node.js desde nodejs.org
        goto :InstallNodeFallback
    )
    
    echo   Instalando Node.js en silencio...
    msiexec /i "%TEMP%\node-install.msi" /quiet /norestart
    if !ERRORLEVEL! neq 0 (
        echo   [FALLO] La instalacion de Node.js fallo
        goto :InstallNodeFallback
    )
    
    echo   Esperando a que termine la instalacion...
    timeout /t 12 /nobreak >nul
    
    :: Refrescar PATH
    set "PATH=%PATH%;%ProgramFiles%\nodejs\;%AppData%\npm\"
    
    for /f "tokens=*" %%a in ('node --version 2^>nul') do set "NODE_Version=%%a"
    if defined NODE_Version exit /b 0
    
    :: Reintentar esperando mas tiempo
    echo   Esperando de nuevo...
    timeout /t 10 /nobreak >nul
    set "PATH=%PATH%;%ProgramFiles%\nodejs\;%AppData%\npm\"
    for /f "tokens=*" %%a in ('node --version 2^>nul') do set "NODE_Version=%%a"
    if defined NODE_Version exit /b 0
    
    goto :InstallNodeFallback

:InstallNodeFallback
    :: INTENTO 3: Instalar version portable (ZIP)
    echo   [INTENTO 3] Probando con version portable (ZIP)...
    set "NODE_ZIP_URL="
    for %%v in ("v22.14.0" "v22.13.0" "v20.18.3") do (
        if not defined NODE_ZIP_URL (
            powershell -NoProfile -Command "try { Invoke-WebRequest -Uri 'https://nodejs.org/dist/%%~v/node-%%~v-win-x64.zip' -OutFile '%TEMP%\node-portable.zip' -UseBasicParsing -ErrorAction Stop; Write-Host 'OK'; exit 0 } catch { exit 1 }" >nul 2>nul
            if !ERRORLEVEL! equ 0 set "NODE_ZIP_URL=%%~v"
        )
    )
    if not defined NODE_ZIP_URL (
        echo   [FALLO] No se pudo descargar la version portable
        exit /b 1
    )
    
    echo   Extrayendo Node.js portable a "%ProgramFiles%\nodejs_portable\"...
    if not exist "%ProgramFiles%\nodejs_portable\" md "%ProgramFiles%\nodejs_portable\" 2>nul
    powershell -NoProfile -Command "try { Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::ExtractToDirectory('%TEMP%\node-portable.zip', '%ProgramFiles%\nodejs_portable\', $true); Write-Host 'Extraido correctamente'; exit 0 } catch { Write-Host $_.Exception.Message; exit 1 }" >nul 2>nul
    if !ERRORLEVEL! neq 0 exit /b 1
    
    :: Buscar la carpeta extraida
    for /d %%d in ("%ProgramFiles%\nodejs_portable\node-*") do (
        set "NODE_PATH=%%d"
    )
    if defined NODE_PATH (
        set "PATH=%NODE_PATH%;%PATH%"
        for /f "tokens=*" %%a in ('node --version 2^>nul') do set "NODE_Version=%%a"
        if defined NODE_Version exit /b 0
    )
    
    exit /b 1

:: ==========================================
:: FUNCION: NpmInstall
:: ==========================================
:NpmInstall
    :: INTENTO 1: npm install normal
    echo   [INTENTO 1] npm install...
    call npm install 2>&1 | findstr /i "error ERR!" >nul
    if !ERRORLEVEL! neq 0 (
        exit /b 0
    )
    
    :: INTENTO 2: npm install --legacy-peer-deps
    echo   [INTENTO 2] npm install --legacy-peer-deps...
    call npm install --legacy-peer-deps 2>&1 | findstr /i "error ERR!" >nul
    if !ERRORLEVEL! neq 0 (
        exit /b 0
    )
    
    :: INTENTO 3: npm install --force
    echo   [INTENTO 3] npm install --force...
    call npm install --force 2>&1 | findstr /i "error ERR!" >nul
    if !ERRORLEVEL! neq 0 (
        exit /b 0
    )
    
    :: INTENTO 4: Limpiar cache y reintentar
    echo   [INTENTO 4] npm cache clean + install...
    call npm cache clean --force >nul 2>nul
    call npm install --legacy-peer-deps 2>&1 | findstr /i "error ERR!" >nul
    if !ERRORLEVEL! neq 0 (
        exit /b 0
    )
    
    exit /b 1

:: ==========================================
:: FUNCION: StartServer
:: ==========================================
:StartServer
    :: Intentos para arrancar el servidor
    set "SERVER_CMD="
    
    if exist "node_modules\.bin\ng.cmd" set "SERVER_CMD=node_modules\.bin\ng.cmd serve"
    if not defined SERVER_CMD (
        where ng.cmd >nul 2>nul
        if !ERRORLEVEL! equ 0 set "SERVER_CMD=ng serve"
    )
    if not defined SERVER_CMD (
        where npx.cmd >nul 2>nul
        if !ERRORLEVEL! equ 0 set "SERVER_CMD=npx @angular/cli serve"
    )
    if not defined SERVER_CMD set "SERVER_CMD=call npm start"
    
    echo   Usando: !SERVER_CMD!
    
    :: Arrancar servidor en ventana separada
    start "18MM Server" cmd /c "cd /d "%~dp0" && title 18MM - Servidor Angular && color 0A && echo Servidor arrancando... && !SERVER_CMD! --host 0.0.0.0"
    
    :: Esperar a que el servidor este listo
    echo   Esperando a que el servidor arranque...
    set "SERVER_READY="
    set "SERVER_URL=http://localhost:4200"
    
    for /l %%i in (1,1,30) do (
        timeout /t 2 /nobreak >nul
        powershell -NoProfile -Command "try { $r = Invoke-WebRequest -Uri '!SERVER_URL!' -UseBasicParsing -TimeoutSec 1 -ErrorAction Stop; if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } } catch {}; exit 1" >nul 2>nul
        if !ERRORLEVEL! equ 0 (
            set "SERVER_READY=1"
            goto :ServerReady
        )
        if %%i equ 15 echo   Sigue arrancando... (%%i/30)
    )

:ServerReady
    if not defined SERVER_READY (
        :: Probar puerto alternativo por si acaso
        set "SERVER_URL=http://localhost:4200"
        powershell -NoProfile -Command "try { $r = Invoke-WebRequest -Uri '!SERVER_URL!' -UseBasicParsing -TimeoutSec 1 -ErrorAction Stop; if ($r.StatusCode -ge 200 -and $r.StatusCode -lt 400) { exit 0 } } catch {}; exit 1" >nul 2>nul
        if !ERRORLEVEL! equ 0 set "SERVER_READY=1"
    )
    
    if not defined SERVER_READY (
        echo   [AVISO] No se pudo confirmar que el servidor este listo
        echo   Abriendo navegador de todas formas...
    )
    
    echo.
    echo ========================================
    echo   SERVIDOR INICIADO
    echo   Abriendo: !SERVER_URL!
    echo ========================================
    
    :: Abrir navegador
    start "" "!SERVER_URL!"
    
    :: Alternativa: si no se abrio, intentar con Chrome/Edge explicitamente
    timeout /t 2 /nobreak >nul
    reg query "HKCU\Software\Microsoft\Windows\Shell\Associations\UrlAssociations\http\UserChoice" /v Progid >nul 2>nul
    if !ERRORLEVEL! neq 0 (
        start msedge "!SERVER_URL!" 2>nul
        if !ERRORLEVEL! neq 0 start chrome "!SERVER_URL!" 2>nul
    )
    
    echo.
    echo Presiona CTRL+C en la ventana del servidor para detenerlo
    echo Cerrando este instalador...
    timeout /t 3 /nobreak >nul
    exit /b 0

:: ==========================================
:: FIN
:: ==========================================
:Fin
echo.
echo ========================================
echo   PROCESO COMPLETADO
echo   Intentos: %PASSOS%  |  Fallos: %FALLOS%
echo ========================================
echo.
echo El servidor esta corriendo en segundo plano.
echo Cierra la ventana del servidor (cmd con titulo "18MM - Servidor Angular")
echo para detenerlo.
echo.
pause
exit /b 0

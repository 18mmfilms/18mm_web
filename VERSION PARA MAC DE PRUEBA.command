#!/bin/bash

clear

echo "========================================"
echo "   VERSION DE PRUEBA - 18MM FILMS"
echo "========================================"
echo ""

# Ir a la carpeta donde está el script
cd "$(dirname "$0")"

########################################
# Comprobar Node.js
########################################

if ! command -v node >/dev/null 2>&1; then
    echo "Node.js no está instalado."
    echo ""

    # ¿Existe Homebrew?
    if command -v brew >/dev/null 2>&1; then
        echo "Instalando Node.js mediante Homebrew..."
        brew install node

        if [ $? -ne 0 ]; then
            echo ""
            echo "No se pudo instalar Node.js."
            exit 1
        fi
    else
        echo "Homebrew no está instalado."
        echo ""
        echo "Instala Node.js desde:"
        echo "https://nodejs.org"
        read -p "Pulsa ENTER para salir..."
        exit 1
    fi
fi

echo ""
echo "Node encontrado:"
node --version

########################################
# Instalar dependencias
########################################

echo ""
echo "Instalando dependencias..."

npm install

if [ $? -ne 0 ]; then
    echo ""
    echo "Error instalando dependencias."
    read -p "Pulsa ENTER para salir..."
    exit 1
fi

########################################
# Abrir navegador
########################################

sleep 2

open http://localhost:4200 &

########################################
# Iniciar Angular
########################################

echo ""
echo "Iniciando servidor..."

npm start

read -p "Pulsa ENTER para salir..."
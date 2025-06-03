# Script para renombrar imágenes en las carpetas VC011 y VC013
$basePath = "src/assets/img/properties"

# Función para renombrar archivos en una carpeta
function Rename-ImagesInFolder {
    param (
        [string]$folderName
    )
    
    $fullPath = Join-Path $basePath $folderName
    Write-Host "Procesando carpeta: $fullPath"
    
    if (Test-Path $fullPath) {
        $counter = 1
        Get-ChildItem -Path $fullPath -Filter "*.jpg" | Sort-Object Name | ForEach-Object {
            $newName = "$folderName-$counter.jpg"
            $oldName = $_.Name
            Rename-Item -Path $_.FullName -NewName $newName
            Write-Host "Renombrado: $oldName -> $newName"
            $counter++
        }
        Write-Host "Terminado: $folderName`n"
    } else {
        Write-Host "No se encontró la carpeta: $fullPath`n"
    }
}

Rename-ImagesInFolder "VC036"
Rename-ImagesInFolder "VC037"
Rename-ImagesInFolder "VC038"

Write-Host "¡Proceso completado!"

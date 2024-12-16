# Exit on error
$ErrorActionPreference = "Stop"
Set-StrictMode -Version Latest
$PSNativeCommandUseErrorActionPreference = $true

# Back-end
Push-Location back-end
npm install --save-dev
npx prisma generate
npx prisma migrate dev -n init
npx ts-node util/seed.ts
Start-Process -FilePath "npm.cmd" -ArgumentList "start"
Pop-Location

# Front-end
Push-Location front-end
npm install --save-dev
Start-Process -FilePath "npm.cmd" -ArgumentList "start"
Pop-Location

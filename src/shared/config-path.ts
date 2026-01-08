import * as path from "path"
import * as os from "os"
import * as fs from "fs"

const CONFIG_FILENAME = "arcanea-opencode.json"
const LEGACY_CONFIG_FILENAME = "oh-my-opencode.json"

function findConfigFile(dir: string): string | null {
  const newPath = path.join(dir, "opencode", CONFIG_FILENAME)
  if (fs.existsSync(newPath)) return newPath
  
  const legacyPath = path.join(dir, "opencode", LEGACY_CONFIG_FILENAME)
  if (fs.existsSync(legacyPath)) return legacyPath
  
  return null
}

export function getUserConfigDir(): string {
  if (process.platform === "win32") {
    const crossPlatformDir = path.join(os.homedir(), ".config")
    const appdataDir = process.env.APPDATA || path.join(os.homedir(), "AppData", "Roaming")

    if (findConfigFile(crossPlatformDir)) return crossPlatformDir
    if (findConfigFile(appdataDir)) return appdataDir

    return crossPlatformDir
  }

  return process.env.XDG_CONFIG_HOME || path.join(os.homedir(), ".config")
}

export function getUserConfigPath(): string {
  const configDir = getUserConfigDir()
  const newPath = path.join(configDir, "opencode", CONFIG_FILENAME)
  const legacyPath = path.join(configDir, "opencode", LEGACY_CONFIG_FILENAME)
  
  if (fs.existsSync(newPath)) return newPath
  if (fs.existsSync(legacyPath)) return legacyPath
  
  return newPath
}

export function getProjectConfigPath(directory: string): string {
  const newPath = path.join(directory, ".opencode", CONFIG_FILENAME)
  const legacyPath = path.join(directory, ".opencode", LEGACY_CONFIG_FILENAME)
  
  if (fs.existsSync(newPath)) return newPath
  if (fs.existsSync(legacyPath)) return legacyPath
  
  return newPath
}

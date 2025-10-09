// Script to generate random IDs for all MDX question files
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs"
import { join } from "path"

// Generate a random alphanumeric ID
function generateRandomId(): string {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let id = "q_"
  for (let i = 0; i < 8; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}

// Get all MDX files recursively
function getAllMdxFiles(dir: string, fileList: string[] = []): string[] {
  const files = readdirSync(dir)

  files.forEach((file) => {
    const filePath = join(dir, file)
    if (statSync(filePath).isDirectory()) {
      getAllMdxFiles(filePath, fileList)
    } else if (file.endsWith(".mdx")) {
      fileList.push(filePath)
    }
  })

  return fileList
}

// Update MDX file with new random ID
function updateMdxId(filePath: string, newId: string) {
  const content = readFileSync(filePath, "utf-8")
  const updatedContent = content.replace(/^id:\s*["']?[^"'\n]+["']?/m, `id: "${newId}"`)
  writeFileSync(filePath, updatedContent, "utf-8")
  console.log(`Updated ${filePath} with ID: ${newId}`)
}

// Main execution
const contentDir = join(process.cwd(), "content")
const mdxFiles = getAllMdxFiles(contentDir)

// Filter only question files (not category/genre files)
const questionFiles = mdxFiles.filter((file) => !file.includes("/category/") && !file.includes("/genre/"))

console.log(`Found ${questionFiles.length} question files to update`)

// Generate unique IDs and update files
const usedIds = new Set<string>()
questionFiles.forEach((file) => {
  let newId = generateRandomId()
  // Ensure uniqueness
  while (usedIds.has(newId)) {
    newId = generateRandomId()
  }
  usedIds.add(newId)
  updateMdxId(file, newId)
})

console.log("All files updated successfully!")

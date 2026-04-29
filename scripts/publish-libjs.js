import fs from 'fs/promises'
import path from 'path'
import { execSync } from 'child_process'

const root = process.cwd()

const sourcePkg = path.join(root, 'package.libJs.json')
const distDir = path.join(root, 'dist')
const distPkg = path.join(distDir, 'package.json')

async function run() {
  try {
    // kiểm tra dist tồn tại
    await fs.access(distDir)

    // xóa package.json cũ nếu có
    try {
      await fs.unlink(distPkg)
      console.log('🗑️ Deleted old dist/package.json')
    } catch {
      console.log('ℹ️ No old dist/package.json found')
    }

    // đọc package.libJs.json
    const content = await fs.readFile(sourcePkg, 'utf8')

    // ghi package.json mới vào dist
    await fs.writeFile(distPkg, content, 'utf8')
    console.log('📦 Created dist/package.json from package.libJs.json')

    // publish
    execSync('npm publish --access public', {
      cwd: distDir,
      stdio: 'inherit'
    })

    console.log('🚀 Publish completed')
  } catch (err) {
    console.error('❌ Publish failed:', err.message)
    process.exit(1)
  }
}

run()

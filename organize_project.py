from pathlib import Path
import shutil

root = Path(r'c:\Users\MUHAMMAD MU\Downloads\ZelenTools-main (1)\ZelenTools-main')
(root / 'src' / 'assets' / 'styles').mkdir(parents=True, exist_ok=True)
(root / 'src' / 'types').mkdir(parents=True, exist_ok=True)

renames = {
    'src/components/ui/slider.tsx': 'src/components/ui/Slider.tsx',
    'src/components/ui/sonner.tsx': 'src/components/ui/Sonner.tsx',
    'src/components/ui/tooltip.tsx': 'src/components/ui/Tooltip.tsx',
    'src/components/ui/toast.tsx': 'src/components/ui/Toast.tsx',
    'src/components/ui/toaster.tsx': 'src/components/ui/Toaster.tsx',
    'src/components/ui/toggle.tsx': 'src/components/ui/Toggle.tsx',
}
for old, new in renames.items():
    old_path = root / old
    new_path = root / new
    if old_path.exists() and not new_path.exists():
        shutil.move(str(old_path), str(new_path))

src_css = root / 'src' / 'index.css'
dst_css = root / 'src' / 'assets' / 'styles' / 'index.css'
if src_css.exists() and not dst_css.exists():
    shutil.move(str(src_css), str(dst_css))

app_css = root / 'src' / 'App.css'
dst_app_css = root / 'src' / 'assets' / 'styles' / 'App.css'
if app_css.exists() and not dst_app_css.exists():
    shutil.move(str(app_css), str(dst_app_css))

(root / 'src' / 'types' / 'workflow.ts').write_text("export type ToolStage = 'UPLOAD' | 'WORKSPACE' | 'PROCESSING' | 'RESULT';\n", encoding='utf-8')
(root / 'src' / 'types' / 'index.ts').write_text("export type { ToolStage } from './workflow';\n", encoding='utf-8')

replacements = {
    '@/components/ui/tooltip': '@/components/ui/Tooltip',
    '@/components/ui/toaster': '@/components/ui/Toaster',
    '@/components/ui/sonner': '@/components/ui/Sonner',
    '@/components/ui/toast': '@/components/ui/Toast',
    '@/components/ui/slider': '@/components/ui/Slider',
    '@/components/ui/toggle': '@/components/ui/Toggle',
    './index.css': './assets/styles/index.css',
    '../index.css': '../assets/styles/index.css',
}

for path in root.rglob('*'):
    if path.is_file() and path.suffix in {'.ts', '.tsx', '.js', '.jsx', '.css', '.json'}:
        try:
            text = path.read_text(encoding='utf-8')
        except Exception:
            continue
        new_text = text
        for old, new in replacements.items():
            new_text = new_text.replace(old, new)
        if new_text != text:
            path.write_text(new_text, encoding='utf-8')

hook_path = root / 'src' / 'hooks' / 'useToolWorkflow.ts'
if hook_path.exists():
    text = hook_path.read_text(encoding='utf-8')
    if "import type { ToolStage } from '@/types';" not in text:
        text = text.replace("import { useState } from 'react';\n\n// 4 stages jo har tool mein use hongi\nexport type ToolStage = 'UPLOAD' | 'WORKSPACE' | 'PROCESSING' | 'RESULT';\n", "import { useState } from 'react';\nimport type { ToolStage } from '@/types';\n")
        text = text.replace("export type ToolStage = 'UPLOAD' | 'WORKSPACE' | 'PROCESSING' | 'RESULT';\n", "")
        hook_path.write_text(text, encoding='utf-8')

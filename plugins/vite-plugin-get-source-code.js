import { readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export default function vitePluginGetSourceCode(dir, outputDir) {
  const path = dir;
  readdirSync(path).forEach(file => {
    if (file.endsWith('.vue')) {
      const filename = file.replace('.vue', '.ts');
      const variableName = file.replace('.vue', '');
      let content = readFileSync(join(path, file), 'utf-8');
      // 对源码中的转义符进行转义
      content = content.replace(/\\/g, '\\\\');
      // 清除源代码中的log打印
      // content = content.replace(/console\.log\(.*\)/g, '');
      writeFileSync(join(outputDir, filename), `const ${variableName} = \`\n${content}\`;\nexport default ${variableName};
      `)
    }
  })
  return {
    name: 'vite-plugin-get-source-code',
    enforce: 'pre',
    load() {
      
    }
  }  
}
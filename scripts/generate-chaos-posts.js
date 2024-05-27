hexo.extend.generator.register('chaosbook_list', function(locals) {
  const fs = require('fs');
  const path = require('path');
  const postDir = path.join(hexo.source_dir, 'chaosbook/posts');
  const files = fs.readdirSync(postDir)
    .filter(file => file.endsWith('.md'))
    .map(file => file.replace('.md', '.html'));

  const jsonContent = JSON.stringify(files, null, 2);
  const outputPath = path.join(hexo.source_dir, 'chaosbook_list.json');

  fs.writeFileSync(outputPath, jsonContent);

  return {
    path: 'chaosbook_list.json',
    data: jsonContent
  };
});
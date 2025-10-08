# 常用的hexo 命令

# 清理缓存文件
hexo clean

# 生成静态文件
hexo generate
# 或简写
hexo g

# 启动本地服务器
hexo server
# 或简写
hexo s

# 部署到GitHub Pages等（需要配置）
hexo deploy
# 或简写
hexo d

# 组合命令：清理->生成->启动
hexo clean && hexo g && hexo s

# 创建草稿
hexo new draft "草稿文章"

hexo new "我的第一篇文章"
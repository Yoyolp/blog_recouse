---
title: day3
---

# Liunx 学习笔记
#### 文件的赋权
在Liunx 中 给文件赋权主要通过chmod 命令实现。以下是详细的使用方法

```bash
chmod [选项] 权重 文件名
```
权限表示方法:
 - 1. 数字表示法:
     + **r = 4**     # 读 100
     + **w = 2**     # 写 010
     + **x = 1**     # 执行 001
 - 2. 符号表示法:
     + 用户类别:
       * **u** 文件的所有者
       * **g** 所属组的用户
       * **o** 其他用户
       * **a** 所有用户
     + 操作符
       * **\+** 添加权限
       * **\-** 移除权限
       * **=**  覆盖权限
     + 权限类型
       * **r** 读权限
       * **w** 写权限
       * **x** 执行权限


常用选项:
 + **-R** 递归处理目录以及其子目录
 + **-v** 显示权限变更信息
 + **-c** 只有变更时显示信息

实操:
```bash
# 数字表示法
chmod 755 filename  # 所有者：rwx，组用户：r-x，其他用户：r-x
chmod 644 filename  # 所有者：rw-，组用户：r--，其他用户：r--
chmod 777 filename  # 所有用户都有rwx权限（不推荐）

chmod u=rw file       # 设置所有者只有读写权限
chmod g=r file        # 设置组用户只有读权限
chmod o= file         # 设置其他用户无任何权限
chmod u=rwx,g=rx,o= file  # 组合设置

# 递归给目录下所有文件添加执行权限
chmod -R a+X directory/

# 递归设置目录权限
chmod -R u=rwx,g=rx,o= directory/
```
#### 如何运行可执行文件
```
# 直接运行
./script.sh
./script_bin

# 指定运行方式
bash ./script.sh
python3 ./script_py.py
```

#### 递归删除
```
# 递归删除目录及其所有内容
rm -r dir_name

rm -rf dir_name  # 强制递归删除
rm -ri dir_name  # 递归删除，但是逐个提示
```

#### find 和 grep 命令
```bash
find [路径] [选项] [操作]

grep [选项] "模式" [文件]

# 在当前目录查找文件
find . -name "filename.txt"
find . -name "*.txt"           # 通配符查找
find . -name "*.log" -type f   # 只找文件
find . -name "src" -type d     # 只找目录

# 不区分大小写
find . -iname "readme*"

find . -type f                 # 普通文件
find . -type d                 # 目录
find . -type l                 # 符号链接
find . -type s                 # 套接字文件

# 按修改时间
find . -mtime -7              # 7天内修改的文件
find . -mtime +30             # 30天前修改的文件
find . -mmin -60              # 60分钟内修改的文件

# 按访问时间
find . -atime -1              # 1天内访问的文件
find . -ctime +90             # 90天前状态改变的文件

# 按照大小
find . -size +100M            # 大于100MB的文件
find . -size -1G              # 小于1GB的文件

# 按照权限
find . -perm 644              # 权限精确为644的文件
find . -perm -u=x             # 用户有执行权限的文件
find . -perm /g=w             # 组用户有写权限的文件

# 在文件中搜索
grep "error" logfile.txt
grep "TODO" *.py              # 在多个文件中搜索

# 递归搜索
grep -r "function" src/       # 递归搜索目录
grep -r "config" . --include="*.js"  # 只搜索js文件

# 显示行号
grep -n "pattern" file.txt

# 基本正则
grep "^start" file.txt        # 以start开头的行
grep "end$" file.txt          # 以end结尾的行
grep "a.b" file.txt           # a任意字符b

grep -i "pattern" file.txt    # 忽略大小写
grep -v "pattern" file.txt    # 反向匹配（不包含的行）
grep -c "pattern" file.txt    # 统计匹配行数
grep -l "pattern" *.txt       # 只显示包含匹配的文件名
grep -L "pattern" *.txt       # 显示不包含匹配的文件名
grep -A 3 "pattern" file.txt  # 显示匹配行后3行
grep -B 2 "pattern" file.txt  # 显示匹配行前2行
grep -C 2 "pattern" file.txt  # 显示匹配行前后各2行
```


#### 创建软连接
可以将Liunx 近似为Windows 的快捷方式
```bash
ln -s 源文件或目录 链接名称
```
如何识别软链接:

使用 **ls -l** 查看文件权限，软连接文件总是lrwxrwxrwx
同理通过第一位 如果为 **s**rwxrwxrwx 则为套接字文件





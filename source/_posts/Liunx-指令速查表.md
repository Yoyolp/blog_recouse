---
title: Liunx 指令速查表
---

这是一个Liunx 指令的速查表，记录各种常用的指令

<!--more-->

查看进程

```bash
# 查看当前终端相关进程
ps
# 查看所有进程
ps aux
# 查看完整格式的进程信息
ps -ef
# 查看特定用户的进程
ps -u username
# 查看特定进程
ps -p PID
ps -C process_name

# ==========================================================

# 动态显示进程信息（类似任务管理器）
top

# 按内存使用排序
top -o %MEM

# 按CPU使用排序
top -o %CPU

# 只显示特定用户的进程
top -u username


# 查看进程状态
cat /proc/PID/status

# 查看进程打开的文件
lsof -p PID

# 查看进程环境变量
cat /proc/PID/environ | tr '\0' '\n'



# 正常终止进程
kill PID

# 强制杀死进程
kill -9 PID

# 通过进程名杀死
pkill process_name
killall process_name

# 通过fd操作文件
ls -la /proc/1234/fd/          # 查看进程打开的文件
lsof -p 1234                   # 查看进程文件描述符详情
cat /proc/1234/fdinfo/3        # 查看特定fd的详细信息
/proc/$$/fd/ - 当前shell的fd
/proc/self/fd/ - 当前进程的fd
/proc/PID/fd/ - 指定进程的fd
lsof -p PID - 更详细的文件打开信息


tar -xf XXX  # 解压文件

tar -czvf   # 压缩 .tar.gz 最常见
tar -cvf    # 解压 .tar
tar -cjvf   # 解压 .tarbz2

ln -s goal link_name  # 创建软连接

```

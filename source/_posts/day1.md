---
title: day1
---

## CTF+ 题目1 [Sign_in](https://www.ctfplus.cn/problem-detail/1975492169263222784/description "Sign_in")
#### 标签: Misc 0xgame2025

由题目发现信息: MGhRa3dve0dvdm0wd29fZDBfMGhRNHczXzJ5MjVfQHhuX3JAbXVfUHliX3BlWH0=
显然为Base64编码 解码后发现信息 0hQkwo{Govm0wo_d0_0hQ4w3_2y25_@xn_r@mu_Pyb_peX}
但是仍然不符合flag的格式，通过观察发现疑似凯撒密码 通过 "2y25" 猜测 应为 "2o25" 位移量为10
解得: 0xGame{Welc0me_t0_0xG4m3_2o25_@nd_h@ck_For_fuN} 获得flag

## CTF+ 题目2 [Vigenere](https://www.ctfplus.cn/problem-detail/1975492206248595456/description)
#### 标签 CRYPTO 0xgame2025

附件提供python 代码
```python
from string import digits, ascii_letters, punctuation
from secret import flag

key = "Welcome-2025-0xGame"
alphabet = digits + ascii_letters + punctuation


def vigenere_encrypt(plaintext, key):
    ciphertext = ""
    key_index = 0
    for char in plaintext:
        bias = alphabet.index(key[key_index])
        char_index = alphabet.index(char)
        new_index = (char_index + bias) % len(alphabet)
        ciphertext += alphabet[new_index]
        key_index = (key_index + 1) % len(key)
    return ciphertext


print(vigenere_encrypt(flag, key))

# WL"mKAaequ{q_aY$oz8`wBqLAF_{cku|eYAczt!pmoqAh+

```


发现为一段维吉尼亚密码的加密程序 其中flag库不存在
但是该维吉尼亚密码提供了密钥，且发现该维吉尼亚字母表与常规不一样存在数字和符号
故完整的字母表为
```text
0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~
```

所以根据维吉尼亚密码的公式:


$$ C^i = P^i + K^i (mod L) $$

<br>

$$ P^i = C^i - K^i (mod L) $$

<br>
其中 L 为 字母表的长度

得到解密代码
``` python
from string import digits, ascii_letters, punctuation

key = "Welcome-2025-0xGame"
alphabet = digits + ascii_letters + punctuation

def vigenere_decrypt(ciphertext, key):
    plaintext = ""
    key_index = 0
    for char in ciphertext:
        if char in alphabet:
            bias = alphabet.index(key[key_index])
            char_index = alphabet.index(char)
            new_index = (char_index - bias) % len(alphabet)
            plaintext += alphabet[new_index]
            key_index = (key_index + 1) % len(key)
        else:
            plaintext += char  # 保留不在字母表中的字符
    return plaintext

ciphertext = 'WL"mKAaequ{q_aY$oz8`wBqLAF_{cku|eYAczt!pmoqAh+'
result = vigenere_decrypt(ciphertext, key)
print(result)
```
得到flag: 0xGame{you_learned_vigenere_cipher_2df4b1c2e3}

## Liunx 笔记
#### touch 的使用
touch 命令主要用于创建空文件和修改文件的时间戳
```bash
# 创建单个文件
touch filename.txt

# 创建多个文件
touch file1.txt file2.txt file3.txt

# 只修改访问时间
touch -a filename.txt

# 修改访问时间为指定时间
touch -a -t 202312251430.00 filename.txt
# 格式：YYYYMMDDhhmm.ss
```
注意除了可以用touch 创建命令还可以使用文件重定向符号来创建文件如
```bash
# echo 输出的hellohello 将会被重定向到file1.txt 中
echo "Hello_world" > file1.txt
```

#### 如何修改用户的密码
```bash
# 使用passwd 命令
passwd
```
#### 如何切换账户
```bash
# 使用su命令
su        # 切换为 root 账号但是保留当前环境

su -      # 切换为 root 账号

su - [目标用户名] # 切换为目标用户账号 同时回到该用户的 home 路径

su -c command    # 使用
```

#### 如何压缩解压文件
##### 使用 tar
```bash
tar [选项] [文件名] [文件或目录...]

# .tar.gz gzip 压缩
tar -czvf 压缩包名.tar.gz 要压缩的文件或目录

# bzip 压缩
tar -cjvf 压缩包名.tar.bz2 要压缩的文件或目录

# xz 压缩
tar -cJvf 压缩包名.tar.xz 要压缩的文件或目录

# 速度优先用 gzip，压缩率优先用 xz，平衡选择用 bzip2。

# 解压
tar -xzvf 压缩包名.tar.gz
tar -xjvf 压缩包名.tar.bz2
tar -xJvf 压缩包名.tar.xz

tar -xvf filename.tar.*    # 适用于所有格式
```


#### 如何查看基本日志
```txt
# 系统主日志文件
/var/log/syslog          # Ubuntu/Debian 系统日志
/var/log/messages        # CentOS/RHEL 系统日志

# 认证相关日志
/var/log/auth.log        # 认证日志（Ubuntu/Debian）
/var/log/secure          # 认证日志（CentOS/RHEL）

# 内核日志
/var/log/kern.log        # 内核消息

# 启动日志
/var/log/boot.log        # 系统启动日志



# 包管理器日志
/var/log/dpkg.log        # Debian/Ubuntu 包安装日志

# 系统服务日志
/var/log/cron            # 计划任务日志
/var/log/mail.log        # 邮件服务日志
/var/log/faillog         # 失败登录尝试
```


##### 使用 journalctl 查看完整的系统日志
```
# 查看完整的系统日志
journalctl

# 查看实时日志（类似 tail -f）
journalctl -f

# 查看最近日志
journalctl -n 20         # 最后20行
journalctl --since "1 hour ago"

# 按服务查看日志
journalctl -u nginx.service
journalctl -u ssh.service

# 按优先级过滤
journalctl -p err        # 只看错误
journalctl -p warning    # 只看警告
journalctl -p info       # 只看信息

# 优先级级别：emerg(0), alert(1), crit(2), err(3), warning(4), notice(5), info(6), debug(7)

# 按时间查看
journalctl --since "2024-01-15 09:00:00"
journalctl --since yesterday
journalctl --since "1 hour ago"
journalctl --until "30 minutes ago"

# 查看特定时间段的日志
journalctl --since "09:00" --until "10:00"

# 使用 less 查看日志（推荐）
less /var/log/syslog

# 在 less 中的常用操作：
# - 空格键：向下翻页
# - b：向上翻页
# - /关键词：搜索
# - n：下一个匹配项
# - N：上一个匹配项
# - g：跳到文件开头
# - G：跳到文件结尾
# - q：退出
```

#### Liunx 常用二进制文件目录:
 + /bin 系统基本命令二进制文件目录 -> ls cp mv rm ...
 + /sbin 系统管理二进制文件    -> fdisk ...
 + /usr/bin 用户命令二进制文件 -> python vim gcc tar ...
 + /usr/local/bin 第三方软件二进制库 ...

 






























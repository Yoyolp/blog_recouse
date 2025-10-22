---
title: 一些Pwn 题目的日常练习, 汇编概念笔记
---
主要是练习反编译软件Ghira的使用

<!--more-->
## NOTE: 数据寄存器， 段地址寄存器， 偏移地址寄存器









## 题目: [2 EZtext](https://ctf.xidian.edu.cn/training/22?challenge=901)
### 标签: MoeCTF2025 Pwn 栈溢出
获得靶机地址后 得到pwn 文件 
使用checksec 查看文件的保护机制得到 
```TEXT
Arch:       amd64-64-little
    RELRO:      Partial RELRO
    Stack:      No canary found
    NX:         NX enabled
    PIE:        No PIE (0x400000)
    SHSTK:      Enabled
    IBT:        Enabled
    Stripped:   No
```
可以发现 栈溢出不会被检测(**Stack Canary-栈金丝雀**), 代码段固定地址(**PIE**), 符号表完整(**Stripped**)


反编译后获得 伪C代码
```C
undefined8 main(EVP_PKEY_CTX *param_1)
{
  undefined4 local_c; // 栈变量
  
  init(param_1);
  puts("Stack overflow is a powerful art!");
  puts("In this MoeCTF,I will show you the charm of PWN!");
  puts("You need to understand the structure of the stack first.");
  puts("Then how many bytes do you need to overflow the stack?");
  __isoc99_scanf(&DAT_00402167,&local_c);
  overflow(local_c);                         // 可能得到的漏洞函数
  return 0;
}
```
由函数 **__isoc99_scanf**  来读取用户的字节输入

```c
int init(EVP_PKEY_CTX *ctx)
{
  int iVar1;
  
  setvbuf(stdin,(char *)0x0,2,0);
  setvbuf(stdout,(char *)0x0,2,0);
  iVar1 = setvbuf(stderr,(char *)0x0,2,0);
  return iVar1;
}

void overflow(int param_1)
{
  undefined1 local_10 [8];
  
  if (param_1 < 8) {
    puts("Come on, you can\'t even fill up this array?");
  }
  else {
    read(0,local_10,(long)param_1);
    puts("OK,I receive your byte.and then?");
  }
  return;
}
```






---
title: ASMXX
---
为方便写汇编代码，所以将一些常用的功能封装到 `asm_simple_func.s` 中， 这是其中的内容
<!--more-->
## `asm_simple_func.s` :

```x86asm
.intel_syntax noprefix

.data
  char_endline:
    .ascii "\n"
    char_endline_len = . - char_endline

  char_buf_1: .byte 0             # char 缓冲区 大小1
  char_buf_1ln: .byte 0, 0x0a     # char 缓冲区 大小2 + (换行符)

.text

# print 函数 实现原型
.global asm_print
.type asm_print, @function
__asm_print:
  # push address[msg]
  # push msg_len
  mov rax, 1
  mov rdi, 1
  mov rsi, [rsp + 16]
  mov rdx, [rsp + 8]
  syscall 
  ret 16

# 打印字符
.macro asm_print _str _str_len
  push offset \_str
  push \_str_len
  call __asm_print  
.endm

# 打印字符并在末尾添加换行
.macro asm_println _str _str_len
  push offset \_str
  push \_str_len
  call __asm_print

  push offset char_endline
  push char_endline_len
  call __asm_print
.endm
```

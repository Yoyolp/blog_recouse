---
title:ASM01
---
汇编 常用指令

<!--more-->

## 常用指令

| 指令类型     | 操作码 | 例子（intel） | 实际效果                           |
| ------------ | ------ | ------------- | ---------------------------------- |
| 数据传输指令 | mov    | mov rax rbx   | rax = rbx                          |
| 取地址指令   | lea    | lea rax [rbx] | rax = &*rbx                        |
| 算数运算指令 | add    | add rax rbx   | rax = rax + rbx                    |
|              | sub    | sub rax rbx   | rax = rax - rbx                    |
| 逻辑运算指令 | and    | and rax rbx   | rax = rax & rbx                    |
|              | xor    | xor rax rbx   | rax = rax ^ rbx                   |
| 函数调用指令 | call   | call 1234h    | 执行内存地址1234h处的函数          |
| 函数返回指令 | ret    | ret           | 函数返回                           |
| 比较         | cmp    | emp rax rbx   | 比较rax 与rbx，结果返回EFLAG寄存器 |
| 无条件跳转   | jmp    | jmp 1234h     | eip = 1234h                        |
| 栈操作指令   | push   | push rax      | 将rax 储存的值压栈                 |
|              | pop    | pop rax       | 将栈顶的值赋值给rax，rsp += 8      |



## AT&T 语法特点

1. **操作数顺序** ：`源操作数在前，目的操作数在后`
2. **寄存器前缀** ：`%`（如 `%eax`, `%rbp`）
3. **立即数前缀** ：`$`（如 `$5`, `$0x10`）
4. **内存引用** ：`偏移量(%基址,%索引,比例)`
5. **指令后缀** ：表示操作数大小（`b`=字节, `w`=字, `l`=长字, `q`=四字）


| 指令类型     | 操作码 | 例子（AT&T）     | 实际效果        | 解释说明       |
| ------------ | ------ | ---------------- | --------------- | -------------- |
| 数据传输指令 | movb   | movb %al,%bl     | bl = al         | 移动字节（8）  |
|              | movw   | movw %ax, %bx    | bx = ax         | 移动字（16）   |
|              | movl   | movl %eax, %ebx  | ebx = eax       | 移动长字（32） |
|              | movq   | movq %rax, %rbx  | rbx = rax       | 移动四字（64） |
|              | pushq  | pushq %rax       |                 | 压栈           |
|              | popq   | popq %rax        |                 | 出栈           |
| 算数运算指令 | addl   | add $5, %eax     | eax = eax + 5   |                |
|              | subl   | subl %ebx, %eax  | eax = eax - ebx |                |
|              | incl   | incl %eax        | eax++           |                |
|              | decl   | decl %eax        | eax--           |                |
|              | andl   | andl $0xff, %eax | 0xff & eax      | 与             |
|              | orl    | orl %0x10, %eax  | 0x10\| eax     | 或             |
|              | xorl   | xorl %ebx, %eax  | ebx ^ eax      | 按位异或       |
| 比较         | cmpl   | cmpl %ebx, %eax |                 | 比较ebx eax    |
| 控制转移指令 | jmp    | jmp .L1          |                 | 无条件跳转     |


Linux 系统中栈的地址由高地址向低地址跳转

### call & jmp 的区别

+ call 只是函数的调用，会保存返回地址和参数
+ jmp只是简单跳转，类似if-else语句

## 练习

### 题目 CTF+ [Re-点击就送的逆向题](https://www.ctfplus.cn/problem-detail/1835662127327612928/description)

#### 标签：极客大挑战2023 re

题目给了一个汇编文件 file.s

```asm
	.file	"chal.c"
	.text
	.section	.rodata
.LC0:
	.string	"%s"
.LC1:
	.string	"wrong!"
.LC2:
	.string	"good!"
	.text
	.globl	main
	.type	main, @function
main:
	endbr64
	pushq	%rbp
	movq	%rsp, %rbp
	subq	$96, %rsp
	movq	%fs:40, %rax
	movq	%rax, -8(%rbp)
	xorl	%eax, %eax
	movabsq	$5569930572732194906, %rax
	movabsq	$6219552794204983118, %rdx
	movq	%rax, -48(%rbp)
	movq	%rdx, -40(%rbp)
	movabsq	$6722278119083037265, %rax
	movabsq	$5570191165376843081, %rdx
	movq	%rax, -32(%rbp)
	movq	%rdx, -24(%rbp)
	movb	$0, -16(%rbp)
	leaq	-80(%rbp), %rax
	movq	%rax, %rsi
	leaq	.LC0(%rip), %rax
	movq	%rax, %rdi
	movl	$0, %eax
	call	__isoc99_scanf@PLT
	movl	$0, -84(%rbp)
	jmp	.L2
.L3:
	movl	-84(%rbp), %eax
	cltq
	movzbl	-80(%rbp,%rax), %eax
	addl	$7, %eax
	movl	%eax, %edx
	movl	-84(%rbp), %eax
	cltq
	movb	%dl, -80(%rbp,%rax)
	addl	$1, -84(%rbp)
.L2:
	cmpl	$31, -84(%rbp)
	jle	.L3
	leaq	-48(%rbp), %rdx
	leaq	-80(%rbp), %rax
	movq	%rdx, %rsi
	movq	%rax, %rdi
	call	strcmp@PLT
	testl	%eax, %eax
	jne	.L4
	leaq	.LC1(%rip), %rax
	movq	%rax, %rdi
	movl	$0, %eax
	call	printf@PLT
.L4:
	leaq	.LC2(%rip), %rax
	movq	%rax, %rdi
	call	puts@PLT
	movl	$0, %eax
	movq	-8(%rbp), %rdx
	subq	%fs:40, %rdx
	je	.L6
	call	__stack_chk_fail@PLT
.L6:
	leave
	ret
	.size	main, .-main
	.ident	"GCC: (Ubuntu 11.4.0-1ubuntu1~22.04) 11.4.0"
	.section	.note.GNU-stack,"",@progbits
	.section	.note.gnu.property,"a"
	.align 8
	.long	1f - 0f
	.long	4f - 1f
	.long	5
0:
	.string	"GNU"
1:
	.align 8
	.long	0xc0000002
	.long	3f - 2f
2:
	.long	0x3
3:
	.align 8
4:
```

使用 gcc中as 汇编器编译

```bash
gcc -m64 ./file.s -o file
```

调用该程序发现无论输入什么字符都是 输出good!，接下来观察源文件发现

```asm
  movabsq	$5569930572732194906, %rax
	movabsq	$6219552794204983118, %rdx
	movq	%rax, -48(%rbp)
	movq	%rdx, -40(%rbp)
	movabsq	$6722278119083037265, %rax
	movabsq	$5570191165376843081, %rdx
```

发现这个大数，为ASCII码,解码后发现为

> Z `J[X^LMNO`PPJPVQRSIUTJ]IMNOZKMM

在观察

```asm
.L3:                     ;; 这是for 循环
	movl	-84(%rbp), %eax
	cltq
	movzbl	-80(%rbp,%rax), %eax
	addl	$7, %eax         ;; 每个值 + 7
	movl	%eax, %edx
	movl	-84(%rbp), %eax
	cltq
	movb	%dl, -80(%rbp,%rax)
	addl	$1, -84(%rbp)
```

发现是一个for 循环 实现将之前那个字符串 进行类似于凯撒加密的 ASCII 值 + 7
所以我们就可以构建脚本来解密

```python
# 解码硬编码数据
encoded = [
    5569930572732194906,
    6219552794204983118, 
    6722278119083037265,
    5570191165376843081
]
# 将数字转换为字节序列
def decode_num(num):
    bytes_data = num.to_bytes(8, 'little')
    return bytes_data.decode('ascii')
# 解码所有部分
decoded_str = ""
for num in encoded:
    decoded_str += decode_num(num)
print("编码的字符串:", decoded_str)
# 逆向变换：每个字符减7
flag = ""
for char in decoded_str:
    if char != '\x00':  # 忽略终止符
        flag += chr(ord(char) - 7)
print("Flag:", flag)
```

最终解得flag: SYC{SYCTQWEFGHYIICIOJKLBNMCVBFGHSDFF}

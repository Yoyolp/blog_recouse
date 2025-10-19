---
title: C语言常用函数速查
---

C function Table

<!--more-->

| 函数名字 | 描述 | 函数原型  |
|:-|:-|:-|
|printf| 格式化输出 |int printf(const char *format, ...);|
|scanf| 获取用户输入  | int scanf(const char *format, ...); |
|getch | 从控制台获取一个字符但是不回显到屏幕上，不需要按回车键立刻读取(不是标准库函数，通常Windows) |int getch(void); |
|memset| 是 C 语言标准库中的一个内存操作函数，用于将内存块的每个字节设置为特定的值 memset 将 ptr 指向的内存块的前 num 个字节每个都设置为 value 的值。 |void *memset(void *ptr, int value, size_t num);|
|strcpy   |strcpy 用于将 源字符串 复制到 目标字符串，包括字符串的结束符 \0。 返回指向目标字符串的指针|char *strcpy(char *destination, const char *source); |
|strcmp|比较字符串 =0 相等 <0 1小于2 >0 1大于3|int strcmp(const char *str1, const char *str2);|
|strcat|将源字符串 src 连接到目标字符串 dest 的末尾目标字符串必须有足够的空间容纳连接后的结果 源字符串的 \0 会被覆盖，并在新字符串末尾添加 \0。|char *strcat(char *dest, const char *src);|
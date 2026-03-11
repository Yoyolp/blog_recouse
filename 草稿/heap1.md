---
title: heap1
---
Fastbin Attack
<!--more-->

fastbin attack 存在的原因是在于fastbin 是使用单链表来维护释放的堆块的，并且有fastbin管理的chunk即使呗释放，其next_chunk 的 prev_inuse 位也不会被清空
其中 prev_inuse 表示前一个堆块是否被程序使用

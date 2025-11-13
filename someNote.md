### 1. 根据跳转目标分类

这是最基础的分类，决定了你如何告诉 CPU 要跳到哪里去。

#### a) **直接跳转**

跳转目标地址直接在指令中编码。

* **语法** : `jmp label`
* **特点** : 目标地址（或偏移量）是固定的，在编译时就已经确定。
* **示例** :
  **asm**

```
  jmp my_function  ; 无条件跳转到 my_function 标签处
```

* **机器码** : 通常包含一个相对的或绝对的地址。

#### b) **间接跳转**

跳转目标地址存储在一个寄存器或内存位置中。

* **语法** : `jmp operand`
* **特点** : 目标地址是动态的，在运行时才能确定。非常强大，用于实现函数指针、虚函数表、开关语句等。
* **示例** :
  **asm**

```
  jmp rax          ; 跳转到 RAX 寄存器中存储的地址
  jmp [rbx]        ; 从 RBX 指向的内存地址中取出一个地址，然后跳转到那个地址
  jmp [function_pointer] ; 跳转到 function_pointer 变量中存储的地址
```

---

### 2. 根据跳转条件分类（条件跳转）

这些是 `jmp` 最重要的“变种”，它们不是真正的 `jmp` 指令，而是基于标志位的  **条件跳转指令** 。它们构成了所有 `if`, `for`, `while` 等高级语言控制流的基础。

它们通常跟在 `cmp` 或 `test` 指令之后，根据比较结果设置的条件标志来决定是否跳转。

#### a) **基于无符号数比较** (用于地址、`unsigned int`)

| 指令              | 全称                         | 条件                   | 含义                   |
| ----------------- | ---------------------------- | ---------------------- | ---------------------- |
| `je` / `jz`   | Jump if Equal / Zero         | ZF=1                   | 相等 / 为零            |
| `jne` / `jnz` | Jump if Not Equal / Not Zero | ZF=0                   | 不相等 / 不为零        |
| `ja`            | Jump if Above                | CF=0**and** ZF=0 | 高于 (无符号 >)        |
| `jae`           | Jump if Above or Equal       | CF=0                   | 高于或等于 (无符号 >=) |
| `jb`            | Jump if Below                | CF=1                   | 低于 (无符号 <)        |
| `jbe`           | Jump if Below or Equal       | CF=1**or** ZF=1  | 低于或等于 (无符号 <=) |

#### b) **基于有符号数比较** (用于 `int`)

| 指令              | 全称                         | 条件                      | 含义                   |
| ----------------- | ---------------------------- | ------------------------- | ---------------------- |
| `je` / `jz`   | Jump if Equal / Zero         | ZF=1                      | 相等 / 为零            |
| `jne` / `jnz` | Jump if Not Equal / Not Zero | ZF=0                      | 不相等 / 不为零        |
| `jg`            | Jump if Greater              | ZF=0**and** SF=OF   | 大于 (有符号 >)        |
| `jge`           | Jump if Greater or Equal     | SF=OF                     | 大于或等于 (有符号 >=) |
| `jl`            | Jump if Less                 | SF != OF                  | 小于 (有符号 <)        |
| `jle`           | Jump if Less or Equal        | ZF=1**or** SF != OF | 小于或等于 (有符号 <=) |

#### c) **基于单个标志位**

| 指令    | 全称                | 条件 | 常见场景           |
| ------- | ------------------- | ---- | ------------------ |
| `jc`  | Jump if Carry       | CF=1 | 加法进位，减法借位 |
| `jnc` | Jump if No Carry    | CF=0 | 无进位/借位        |
| `jz`  | Jump if Zero        | ZF=1 | 结果为0            |
| `jnz` | Jump if Not Zero    | ZF=0 | 结果非0            |
| `js`  | Jump if Sign        | SF=1 | 结果为负           |
| `jns` | Jump if No Sign     | SF=0 | 结果为非负         |
| `jo`  | Jump if Overflow    | OF=1 | 发生有符号溢出     |
| `jno` | Jump if No Overflow | OF=0 | 无有符号溢出       |

---

### 代码示例：理解条件跳转

**asm**

```
; 模拟 C 语言: if (eax >= 100) { ... }
    cmp eax, 100    ; 计算 (eax - 100)，设置标志位
    jge greater_than_or_equal ; 如果有符号数 eax >= 100，则跳转
    ; ... 这里是 "else" 部分或者 if 后面的代码 ...
    jmp end_if      ; 跳过 "then" 部分
greater_than_or_equal:
    ; ... 这里是 "then" 部分 ...
end_if:

; 模拟循环: for (int i=10; i>0; i--) { ... }
    mov ecx, 10     ; ecx 作为计数器 i
loop_start:
    ; ... 循环体 ...
    dec ecx         ; i--, 这会设置标志位
    jnz loop_start  ; 如果 i != 0 (ZF=0)，则继续循环
```

### 总结

* **`jmp`** ：无条件跳转，是根本。
* **直接跳转** ：目标固定，高效。
* **间接跳转** ：目标动态，灵活，用于高级数据结构。
* **条件跳转（`je`, `jg`, `ja` 等）** ：这是 `jmp` 家族中最庞大和最重要的一类，它们通过检查**标志位**来实现程序的分支和循环逻辑。

这些指令共同构成了 CPU 执行非顺序代码的能力，是所有复杂软件逻辑的底层基石。

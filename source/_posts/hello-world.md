---
title: PGF
date: 2026-07-18 20:59:08
tags:
katex: true
---

还没很深刻地理解，先瞎写一通。

### P4548 [CTSC2006] 歌唱王国

设 $f(x)$ 表示答案等于 $i$ 的 PGF，$g(x)$ 表示答案大于 $i$ 的 PGF，容易有 $[x^i]g(x) = [x^{i + 1}]f(x) + [x^{i + 1}]g(x)$，于是 $xg(x) + 1 = f(x) + g(x)$，即 $f(x) = (x - 1)g(x) + 1$。

我们要求的即为 $f^{\prime}(1)$，代入之后得到 $f^{\prime}(x) = g(x) + (x - 1)g^{\prime}(x)$，于是有 $f^{\prime}(1) = g(1)$。

我们尝试建立 $f(x)$ 与 $g(x)$ 的关系，考虑这样一个事件：

- 当前随机了 $i$ 个字符，还没出现 $S$。

- 再去随机 $|S|$ 个字符，这些字符恰好构成了 $S$。

我们分别用 $f(x)$ 和 $g(x)$ 去刻画这个事件的概率 $p_i$，首先不难得到 $p_i = \dfrac{1}{n^{|S|}}[x^i]g(x)$，因为上下两个条件是独立的，其次我们考虑最终的字符串中 $S$ 出现的位置的所有情况，容易发现 $S$ 有可能出现在位置 $i + j$（这里指以 $i + j$ 结尾）当且仅当 $S_{1\sim j}$ 是 $S$ 的一个 border，于是 $p_i = \sum\limits_{j \text{\ is a border}}\dfrac{1}{n^{|S| - j}}[x^{i + j}]f(x)$。

根据两式相等进行化简，我们得出 $f(x)$ 和 $g(x)$ 的关系为：

$$
x^{|S|}g(x) = \sum\limits_{j\text{ is a border}}x^{|S| - j}f(x)n^j
$$

根据定义，$f(1) = 1$，于是代入 $x = 1$ 即得 $g(1) = \sum\limits_{j\text{ is a border}}n^j$，可以线性求出。

### ARC136F Flip Cells

设 $f(x)$ 表示 $i$ 次操作后从初始状态到达目标状态的 PGF，$g(x)$ 表示 $i$ 次操作后从目标状态到达目标状态的 PGF，$h(x)$ 表示答案的 PGF，所求即为 $h^{\prime}(1)$。

容易得到 $g * h = f$，于是 $h = f / g$，所以 $h^{\prime}(1) = \dfrac{f^{\prime}(1)g(1) - g^{\prime}(1)f(1)}{g^{\prime}(1)^2}$。

不难发现 $f, g$ 本质相同，我们只考虑如何求 $f(1)$ 和 $f^{\prime}(1)$。

考虑单个格子的 PGF，$p(x)$ 的 $i$ 次项系数表示该格子被操作了 $i$ 次的概率，令 $n = h\times w$，则我们有 $p(x) = \sum\limits_{i = 0} ^ {+\infty} \left(\dfrac{x}{n}\right)^i$，发现某个格子的状态只与被操作次数的奇偶性有关，于是我们设 $p_0(x) = \sum\limits_{i = 0} ^ {+\infty} \left(\dfrac{x}{n}\right)^i[i\bmod 2 \equiv 0]$，$p_1(x)$ 同理，则我们发现 $f(x)$ 的 EGF 其实就是一堆格子 PGF 对应的 EGF 乘起来（使用 EGF 的原因是因为操作是有顺序的）。于是有：

$$
\hat{f}(x) = \sum\limits_{i = 0} ^ {+\infty} c_i\hat{p_1}^i(x)\hat{p_0}^{n-i}(x)
$$

其中 $c_i$ 表示恰好翻转 $i$ 个格子到达目标状态的方案数，容易 dp 求出。

根据 $e^{px} = \sum\limits_{i = 0} ^ {+\infty}p^ix^i$，我们容易得出 $p_0$ 和 $p_1$ 的封闭形式，即：

$$
\begin{aligned}
p_0(x) &= \dfrac{e^{x/n} + e^{-x/n}}{2} \\
p_1(x) &= \dfrac{e^{x/n} - e^{-x/n}}{2} \\
\end{aligned}
$$

将其带入上述式子，二项式定理展开得：

$$
\hat{f}(x) = \dfrac{1}{2 ^ n}\sum\limits_{k = 0} ^ {n}e^{(2k - n)x/n}\sum\limits_{i = 0}^{n}c_i\sum\limits_{j = 0}^{i}(-1) ^ {i - j}\binom{i}{j}\binom{n - i}{k - j}
$$

将后面的式子表示成 OGF，即：

$$
\hat{f}(x) = \dfrac{1}{2 ^ n}\sum\limits_{k = 0} ^ {n}e^{(2k - n)x/n}[x^k]\sum\limits_{i = 0}^{n}c_i(x - 1)^{i}(x + 1)^{n - i}
$$

后面部分容易预处理出，设其为 $w_k$，代回原式子化成 OGF 形式得：

$$
f(x) = \dfrac{1}{2 ^ n}\sum\limits_{k = 0} ^ {n}\dfrac{w_k}{1 - \dfrac{(2k - n)x}{n}}
$$

代入 $x = 1$ 即为答案，注意当 $k = n$ 时会出现分母上有 $1 - x$ 的情况，我们转而计算 $F(x) = (1 - x)f(x), G(x) = (1 - x)g(x)$ 即可，此时答案为 $\dfrac{F(1)}{G(1)}$。

总时间复杂度为 $\mathcal{O}(h^2w^2)$。

###
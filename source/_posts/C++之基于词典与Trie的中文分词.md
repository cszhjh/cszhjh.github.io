---
title: C++之基于词典与Trie的中文分词
date: 2021-12-24 20:42:24
tags: 中文分词
toc: true
categories: 
- C++
---

## 摘要

中文分词算法在搜索引擎和机器学习中有着广泛的应用，该算法大致分为基于词典规则与基于机器学习两种方式。由于中文语句是由连续的汉字所组成，因此不能使用类似英文以标点符号以及空格作为分隔符进行分词，中文分词需要考虑语义及上下文语境。本文主要介绍基于词典规则的中文分词，并使用**Trie**结构进行搜索优化。

## 中文分词方法概述

### 基于词典规则的中文分词方法

基于词典规则的中文分词是一种根据规则以及建立词典并不断地对词典进行维护的分词技术。使用这种技术分词之前，需要准备一个**相对完备的分词词典**，使其尽可能包含更多的词。然后将待处理文本通过以下三种方式进行切分，将切法的结果与词典中的词进行匹配，如果词典中存在该词，则认为该词被成功切分，如果词典中不存在相应的词，则进行重新切分。

<!-- more -->

#### 正向最长匹配

正向最长匹配是将被切分的句子从左至右扫描，然后根据句子的**最大长度**依次递减地截取一个候选词，把当前候选词与词典中的词进行比较。如果匹配成功，则认为该候选词是一个词，继续对原句子中该候选词的下一个位置进行重复操作；如果匹配失败，则认为该候选词不是一个词，通过在句子的最右端去掉一个字继续扫描。例如，要将句子“就读北京大学”进行分词，按照正向最大匹配算法有以下流程：

1. 第一轮
   i.	将“就读北京大学”作为候选词，词典中没有对应的词，匹配失败；
   ii.	从最右端去除一个字，将“就读北京大”作为候选词，词典中没有对应的词，匹配失败；
   iii.	从最右端去除一个字，将“就读北京”作为候选词，词典中没有对应的词，匹配失败；
   iv.	从最右端去除一个字，将“就读北”作为候选词，词典中没有对应的词，匹配失败；
   v.	从最右端去除一个字，将“就读”作为候选词，词典中有对应的词，匹配成功；
   扫描终止，保存第一个单词“就读”，去除第一个单词开始第二轮扫描。
2. 第二轮
   i.	从上一个单词下一个位置开始从前往后选取候选词。“北京大学”，词典中有对应的词，匹配成功。
3. 扫描终止，保存第二个单词“北京大学”，搜索结束，返回结果。

至此，通过**正向最长匹配**对“就读北京大学”的匹配结果为：“`就读 / 北京大学`”。
正向最长匹配算法的优点是**切分速度快**，实现简单，但相关实验数据表明正向最长匹配算法的分词错误率大约为 `0.58%`。
在Windows平台下，使用C++进行编写时一般为**GB2312**编码，该编码是一种定长编码，即汉字为两个字节，英文为一个字节。对于传入的文本，需要将其每个字都单独获取出来才能进行匹配。
以下为获取单个字的C++代码实现

```c++
/**
 * 切割字符串，将每个字（中/英）拆成若干个字符串，并存入数组中，数组的每一个元素为单词的每一个字
 * @param word 单词
 * @param characters 存放单词拆分结果的数组
 */
void split_word(const string &word, vector<string> &characters) {
    for (int i = 0; i < word.size(); i++) {
        if ((unsigned) word[i] > 0x80) {
            // 无符号GBK编码
            characters.push_back(word.substr(i, 2));
            i++;
        } else {
            characters.push_back(word.substr(i, 1));
        }
    }
}
```

之后便可以实现正向最长匹配算法，如下

```c++
/**
 * 正向分词算法
 * @param text 待分词字符串 
 * @return 分词结果单词数组
 */
vector<string> forward_segment(const string &text) {
    vector<string> word_list, characters;
		// 获取单字数组
    split_word(text, characters);
    for (int i = 0; i < characters.size();) {
        string longest_word = characters[i];
        int word_size = 1;
        for (int j = characters.size() - 1; j >= i; j--) {
            string word;
						// 截取候选词
            for (int k = i; k <= j; k++) {
                word += characters[k];
            }
          	// 匹配单词
            if (search(word) && word.size() > longest_word.size()) {
                longest_word = word;
                word_size = j - i + 1;
                break;
            }
        }
        word_list.push_back(longest_word);
        i += word_size;
    }
    return word_list;
}
```

使用上面代码对“就读北京大学”进行分词，具体代码流程如图所示：

<table style="text-align: center">
    <tr>
        <th align="center">i</th>
        <th align="center">i < characters.size()</th>
        <th align="center">j</th>
        <th align="center">word</th>
        <th align="center">是否在词典中</th>
        <th align="center">longest_word</th>
    </tr>
    <tr>
        <td align="center" rowspan="5">0</td>
        <td align="center" rowspan="5">0 < 6</td>
        <td>5</td>
        <td>就读北京大学</td>
        <td>否</td>
        <td>就</td>
    </tr>
    <tr>
        <td>4</td>
        <td>就读北京大</td>
        <td>否</td>
        <td>就</td>
    </tr>
    <tr>
        <td>3</td>
        <td>就读北京</td>
        <td>否</td>
        <td>就</td>
    </tr>
    <tr>
        <td>2</td>
        <td>就读北</td>
        <td>否</td>
        <td>就</td>
    </tr>
    <tr>
        <td>1</td>
        <td>就读</td>
        <td>是</td>
        <td>就读</td>
    </tr>
    <tr>
        <td colspan="6">“就读”被分出，去掉“就读”后处理文本为“北京大学”</td>
    </tr>
    <tr>
        <td>2</td>
        <td>2 < 6</td>
        <td>5</td>
        <td>北京大学</td>
        <td>是</td>
        <td>北京大学</td>
    </tr>
    <tr>
        <td colspan="6">正向最长匹配分词结果为“就读 / 北京大学”</td>
    </tr>
</table>


#### 逆向最长匹配

逆向最长匹配算法和正向最长匹配算法的原理类似，区别在于逆向最大匹配算法的扫描方向是从右向左的，如果匹配失败，则去掉左端的一个字。
例：对“研究生命起源”进行分词

1. 第一轮
   i.	将“研究生命起源”作为候选词，词典中没有对应的词，匹配失败。
   ii.	左边减少一个字，将“究生命起源”作为候选词，词典中没有对应的词，匹配失败。
   iii.	左边减少一个字，将“生命起源”作为候选词，词典中没有对应的词，匹配失败。
   iv.	左边减少一个字，将“命起源”作为候选词，词典中没有对应的词，匹配失败。
   v.	左边减少一个字，将“起源”作为候选词，词典中有对应的词，匹配成功。
   扫描终止，保存第一个单词“起源”，去除第一个单词开始第二轮扫描。
2. 第二轮
   i.	将“研究生命”作为候选词，词典中没有对应的词，匹配失败。
   ii.	将“究生命”作为候选词，词典中没有对应的词，匹配失败。
   iii.	将“生命”作为候选词，词典中有对应的词，匹配成功。
   扫描终止，保存第二个单词“生命”，去除第二个单词开始第三轮扫描。
3. 第三轮
   i.	将“研究”作为候选词，词典中有对应的词，匹配成功。
4. 扫描终止，保存第三个单词“研究”，搜索结束，返回结果。

至此，通过逆向最长匹配对“研究生命科学”的匹配结果为：“研究 / 生命 / 科学”。
实验数据表明，逆向最长匹配算法的分词错误率大约为 `0.41%`，切分精准率比正向最长匹配算法略高。
实现逆向最长匹配算法，如下

```c++
/**
 * 逆向分词
 * @param text 待分词字符串
 * @return 分词结果单词数组
 */
vector<string> backward_segment(const string &text) {
    vector<string> word_list, characters;
    // 获取单字数组
    split_word(text, characters);

    for (int i = characters.size() - 1; i >= 0;) {
        string longest_word = characters[i];
        int word_size = 1;
        for (int j = 0; j <= i; j++) {
            string word;
            // 截取候选词
            for (int k = j; k <= i; k++) {
                word += characters[k];
            }
            // 匹配单词
            if (search(word) && word.size() > longest_word.size()) {
                longest_word = word;
                word_size = i - j + 1;
                break;
            }
        }
        word_list.insert(word_list.begin(), longest_word);
        i -= word_size;
    }
    return word_list;
}
```

使用上面代码对“研究生命起源”进行分词，具体代码流程如图所示：

<table style="text-align: center">
    <tr>
        <th align="center">i</th>
        <th align="center">i >= 0</th>
        <th align="center">j</th>
        <th align="center">word</th>
        <th align="center">是否在词典中</th>
        <th align="center">longest_word</th>
    </tr>
    <tr>
        <td align="center" rowspan="5">5</td>
        <td align="center" rowspan="5">5 >= 0</td>
        <td>0</td>
        <td>研究生命起源</td>
        <td>否</td>
        <td>源</td>
    </tr>
    <tr>
        <td>1</td>
        <td>究生命起源</td>
        <td>否</td>
        <td>源</td>
    </tr>
    <tr>
        <td>2</td>
        <td>生命起源</td>
        <td>否</td>
        <td>源</td>
    </tr>
    <tr>
        <td>3</td>
        <td>命起源</td>
        <td>否</td>
        <td>源</td>
    </tr>
    <tr>
        <td>4</td>
        <td>起源</td>
        <td>是</td>
        <td>起源</td>
    </tr>
    <tr>
        <td colspan="6">“起源”被分出，去掉“起源”后处理文本为“研究生命”</td>
    </tr>
  <tr>
        <td align="center" rowspan="3">3</td>
        <td align="center" rowspan="3">3 >= 0</td>
        <td>0</td>
        <td>研究生命</td>
        <td>否</td>
        <td>命</td>
    </tr>
    <tr>
        <td>1</td>
        <td>究生命</td>
        <td>否</td>
        <td>命</td>
    </tr>
    <tr>
        <td>2</td>
        <td>生命</td>
        <td>是</td>
        <td>生命</td>
    </tr>
    <tr>
        <td colspan="6">“生命”被分出，去掉“生命”后处理文本为“研究”</td>
    </tr>
    <tr>
        <td>1</td>
        <td>1 >= 0</td>
        <td>0</td>
        <td>研究</td>
        <td>是</td>
        <td>研究</td>
    </tr>
    <tr>
        <td colspan="6">逆向最长匹配分词结果为“研究 / 生命 / 科学”</td>
    </tr>
</table>

#### 双向最长匹配

双向最长匹配是通过某些规则选择使用正向或逆向最长匹配算法进行分词，因为在相同的句子中，有时会出现正向最长匹配正确，而有时逆向最长匹配正确。因此有人提出了融合正向最长匹配和逆向最长匹配向融合的双向最长匹配。其实现方法是同时执行正向最长匹配和逆向最长匹配，然后在给定的一些规则中选择最优，本质上是两种算法中二选一。
择优规则：

- 正向最长匹配和逆向最长匹配分词后的词数不同，返回词数更少的结果。
- 正向最长匹配和逆向最长匹配分词后的词数相同，返回不在词典中的词和单字词最少的结果。
- 如果正向最长匹配的词数以及不在词典中的词和单字词都相同的情况下，优先返回逆向最长匹配的结果。

双向最长匹配的代码如下：

```C++
/**
 * 双向匹配
 * @param text 待分词字符串 
 * @return 分词结果单词数组
 */
vector<string>bidirectional_segment(const string &text) {
    vector<string> f, b;
    f = this->forward_segment(text, fwc);
    b = this->backward_segment(text, bwc);

    if (f.size() < b.size()) {
        return f;
    } else if (f.size() > b.size()) {
        return b;
    } else {
        if (this->count_single_char(f) < this->count_single_char(b)) {
            return f;
        }
        return b;
    }
}
```

### Trie字典树

匹配算法的瓶颈之一在于如何判断词典中是否含有字符串。如果用有序列表（TreeMap）的话，时间复杂度是`O(logN)`（N是词典大小）。如果用散列表（Java的HashMap，Python的dict）的话，表面上时间复杂度虽然降下去了，但内存复杂度却上去了。有没有速度又快、内存又省的数据结构呢？有，那便是字典树。

#### 什么是字典树

字符串集合常用字典树（Trie树、前缀树）存储，它的查询时间复杂度可以达到常数级`O(1)`，这是一种字符串上的树形数据结构。字典树中每条边都对应一个字，从根节点往下的路径构成一个个字符串。字典树并不直接在节点存储字符串，而是将词语视作根节点到某节点之间的一条路径，并在终点节点（蓝色）上做个标记，该节点对应词语的结尾。字符串就是一条路径，要查询一个单词，只需顺着这条路径从根节点往下走。如果最后能走到特殊标记的节点，则说明该字符串在集合中，否则说明不存在。根节点一般什么都不保存，其他节点通常有两个属性（`pass`, `end`），`pass`表示当前节点通过了几次，`end`表示这个节点成为了多少个词的结尾。一个典型的字典树如下图所示。

[![TNWj10.png](https://s4.ax1x.com/2021/12/24/TNWj10.png)](https://imgtu.com/i/TNWj10)

#### 字典树的实现

由上图可知，每个节点都应该至少知道自己的子节点与对应的变，以及自己是否对应一个词。所以在每个节点中，使用`unordered_map`存储子节点，并用`end`表示其是否为一个词。

```c++
class Node {
public:
    int pass;   // 经过次数
    int end;    // 结尾次数
    unordered_map<string, Node *> nexts;    // 子结点集合

    Node();
};

class Trie {
private:
    Node *root;
public:
    Trie();

    ~Trie();

    void insert(const string &);

    int search(const string &);

    void split_word(const string &, vector<string> &);

    void clear(Node *);
};
```

初始化类对象

```C++
Node::Node() {
    this->pass = 0;
    this->end = 0;
}

Trie::Trie() {
    this->root = new Node();
}

Trie::~Trie() {
    clear(this->root);
    delete this->root;
}
```

具体功能实现如下

```c++
/**
 * 将单词插入到Trie中
 * @param word 单词字符串
 */
void Trie::insert(const string &word) {
    if (word.empty()) {
        return;
    }
    Node *node = this->root;
    vector<string> characters;
    this->split_word(word, characters); // 获取每一个字的集合
    node->pass++;
    for (int i = 0; i < characters.size(); i++) {
        if (node->nexts.find(characters[i]) == node->nexts.end()) {
            // 该字不在字结点集合中，则将其作为结点插入
            node->nexts[characters[i]] = new Node();
        }
        node = node->nexts[characters[i]];
        node->pass++;
    }
    node->end++;
}

/**
 * 查询Trie中是否存在该单词，即 end != 0
 * @param word 单词字符串
 * @return 该单词结尾次数
 */
int Trie::search(const string &word) {
    if (word.empty()) {
        return 0;
    }
    Node *node = this->root;
    vector<string> characters;
    this->split_word(word, characters); // 获取每一个字的集合
    for (int i = 0; i < characters.size(); i++) {
        if (node->nexts.find(characters[i]) == node->nexts.end()) {
            // 该字不在子结点集合中，则没有以该单词为结尾的词
            return 0;
        }
        node = node->nexts[characters[i]];
    }
    return node->end;
}

/**
 * 切割字符串，将每个字（中/英）拆成若干个字符串，并存入数组中，数组的每一个元素为单词的每一个字
 * @param word 单词
 * @param characters 存放单词拆分结果的数组
 */
void Trie::split_word(const string &word, vector<string> &characters) {
    for (int i = 0; i < word.size(); i++) {
        if ((unsigned) word[i] > 0x80) {
            // 无符号GBK编码
            characters.push_back(word.substr(i, 2));
            i++;
        } else {
            characters.push_back(word.substr(i, 1));
        }
    }
}

void Trie::clear(Node *node) {
    if (!node || node->nexts.empty()) {
        return;
    }
    unordered_map<string, Node *>::iterator it;
    for (it = node->nexts.begin(); it != node->nexts.end(); it++) {
        this->clear(it->second);
        delete it->second;
    }
    node->nexts.clear();
}
```

## 结  论

本文研究了中文分词算法，中文分词作为信息检索、机器翻译、语音识别、搜索引擎的基础，广泛应用于各个领域中，中文分词的准确率和效率会直接影响到后续应用的效果，所以研究高效又准确的中文分词算法十分重要，本文针对最长匹配算法主要工作包括以下几个方面：

1. 总结了三种最长匹配分词算法，并分别对比了每类分词方法的优缺点。
2. 针对基于词典的中文分词匹配效率低的问题，将字典树与分词相结合，使得其每次匹配单词的时间都控制在`O(1)`，在很大程度上提高了分词效率。

参考文献：
[1] 赵悦. 基于词语分类和排序的最大匹配中文分词技术[D]. 沈阳：沈阳师范大学, 2020.


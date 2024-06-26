---
title: 使用Arweave网络进行数据永久储存
date: 2024-06-02 11:17:46
tags:
- 区块链
- 实用工具
---
## 前言
我个人是非常讨厌月付制的云储存的，而且，现在常见的诸如网盘一类的云储存一旦跑路了，用户的文件资产就全部如废纸一样，根本得不到保障。
所以说，我个人是非常喜欢去中心化的数据存储的。
那么就来介绍下使用Arweave进行永久数据存储。

## 为什么使用Arweave？
同样作为区块链数据存储，filecoin的名气应该更大。而使用Arweare不使用fliecoin的原因很简单，那就是FIL是让用户定期支付检索和储存文件的费用，并不是给你永久的存储文件的。
而Arweave作为一次付费，文件永久存储，对于存储一些较小的文件（文本/图片）来说非常合适。

## 为什么Arweave可以永久的存储文件？
>Arweave使用了一种名为“Blockweave”的区块链技术，与传统的区块链不同，Blockweave不要求每个节点都存储整个区块链。相反，节点可以只存储部分数据，同时通过提供证明来确保数据的完整性和安全性。这样可以大大降低存储的成本和负担。
>Arweave使用了一种称为“Proof of Access（PoA）”的共识机制。与比特币的“Proof of Work（PoW）”不同，PoA要求矿工在生成新区块时证明他们对旧数据的访问。这意味着矿工必须存储和提供访问历史数据的能力，确保数据的可用性和完整性。
当然，区块链的运行肯定依靠的是矿工，如果你不看好区块链，那你也可以不用这个。

## 使用akord来存储文件
https://akord.com/use-arweave
akord有一个非常易懂的界面来引导你进行使用。而且新用户赠送100mb的永久存储空间。（你多开几个号来白嫖也行）
并且普通用户永久储存文件1GB只要12美元。开通会员服务可以便宜25%。

## 注意点
区块链上的所有信息都是记录且公开的。所以说你上传文件，其中的操作也是可以被区块链查看器给看到的。而且记录是永久无法篡改的。
所以说，你不能 __删除__ 你的文件！你在akord上也只能更新你的文件，而不能删除。
尽管akord帮你加密了文件，但是我还是建议在上传文件前想清楚再上传。

## 后记
我在几年前就思考过使用区块链来做一些有趣的事情。比如说使用这个永久存储服务就可以实现我曾经设想的一个区块链图书馆。
每个人都可以上传书籍，然后查找下载。我认为这种方法将知识分发给大众是更好的，让知识没有国界。使用Z-library这样中心化的服务遇到制裁关停很容易消失。

---
title: 前端学习笔记之minecraft聊天机器人
date: 2024-05-20 09:45:37
tags:
- minecraft
- 笔记
- 前端
- 实用资源
- JavaScript
---
因为用了nodejs,所以说这应该也算前端（不是

最近一个月都在和朋友一起在玩minecraft，然后无意间了解到[mineflayer](https://github.com/PrismarineJS/mineflayer)这个工具可以来制作minecraft的假人。然后我觉得很有趣，这几天就制作了一个Minecraft的聊天机器人。
虽然这种东西肯定是有人写过了，但是自己造轮子玩也没关系，就当练习下写js（我才不会说我对js的了解也就粗略读了下文档教程）

然后是我写好的项目地址：https://github.com/TLMEMO/MCChatGPTBot

当然，看名字就知道只是来调用chatgpt的api而已...十分的没有含金量。

其实我在一年前（好像马上快到了，时间好快...），我也写了几个Telegram的chatgpt机器人。比如说群消息总结、和附带语音聊天的机器人。（我接了个vitsTTS的API，来返回生成的语音消息）。不过，在写这个bot的时候，还是有许多问题需要注意的。
下面来列举些实际开发遇到的问题。

1.minecraft中的聊天栏限制是255个字符，所以说，在机器人返回消息的时候，发送的消息需要被分割。而且如果直接粗暴的截取字符串分割也不行，因为返回的文字会带有 \n 也就是换行符。机器人在打印消息的时候遇到换行符会直接发送，所以说，在实际分割字符串的过程中，除了每255个字符分割一次 ，还得根据换行符来提前分割。

2.在发送请求的过程中要需要冻结当前操作，不然短时间如果多次发送请求，那么消息记录会出错。

3.然后还得处理诸如回溯、撤回一类的操作。

核心其实并不难，就是简单的调包操作而已。

其实我还写了白名单/黑名单、私聊和公共聊天独立、用户权限组的功能，代码进行了大量修改，不过我不打算更新了。原因是我的服务端私聊bot不会触发whisper来接收消息。（写了半天白写了）
然后我写了一半不高兴再写了，仅此而已。
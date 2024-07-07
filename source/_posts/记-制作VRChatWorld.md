---
title: 记.制作VRChatWorld
date: 2024-07-08 04:02:16
tags: 
- VRChat
- 建模
---
上个月的下半部分，被朋友安利买了quest3，那买了VR必定是要来体验一下大名鼎鼎的VRChat，尽管我完完全全是个社恐。
当然，这年头你不会个unity，不会个blender什么的，真的有资格能去玩这个游戏吗？秉着不想到时候被看不起的想法，我去花了半个月的时间去学了下如何制作VRChat的世界。
我打赌绝对找不到第二个像我一样VRChat是没玩过的，但却先做了世界的（
换句话来说，尽管我买了VR,但我却并没有怎么去玩，反而玩unity上瘾了。（这就是鸟笼效应吧）

好，说了这么多废话，其实我花了将近半个月来做这个地图。这个地图其实是我几年前做的一张[渲染图](https://www.720yun.com/t/72vkb9pbg2w?scene_id=89246259)的复刻版本。之所以复刻这个，是因为我当时做这个渲染的工程文件因为硬盘的损坏而全部丢失了（念念不忘）。然后早就有重新做一次的想法了，正好这次借机学unity，就做到unity里了。（我才不会说这个咖啡店是我学生时代的课设）

当然，灯光我是一如既往的搞不好，做成这个样作为第一次我觉得效果实际上还行吧。（有烘焙的经验之后我可能会考虑用别的软件，比如说3dsmax、c4d,用别的软件来渲染烘焙，再导入到unity里，应该比在unity里用bakery的效果好）
![图片1](https://github.com/TLMEMO/MyBlogAssets/blob/main/assets/240708/1.png?raw=true)
![图片2](https://github.com/TLMEMO/MyBlogAssets/blob/main/assets/240708/2.png?raw=true)

虽然套了很多预制，但我还是花了点时间做了点自己的东西的。首先地图里的桌子我嫌面数多，被我换成自己建的了。同样的还有那个壁灯之类的简单小物件。
然后是这个嘉然立牌，我当时想在门口加个立牌，但是苦于不知道加什么，然后我的朋友告诉我用嘉然吧，然后这个东西就产生了。
实际上做这个立牌花了我几个小时，因为我手动绘制了比较精细的边缘，然后处理UV的问题也花了很久。当时我用了c4d、3dsmax、blender的UV处理来处理UV，然而我失败了，因为我全用不懂。（原谅我之前没学过UV编辑）
后来我直接用了unity里的probuilder来处理UV，我得说这东西处理简单UV可太好用了。
![图片3](https://github.com/TLMEMO/MyBlogAssets/blob/main/assets/240708/3.png?raw=true)

然后是这个图书角，纯粹是为了满足我的恶趣味（
![图片4]https://github.com/TLMEMO/MyBlogAssets/blob/main/assets/240708/4.png?raw=true()

还有这个Minecraft风格的点唱机，可以插入唱片。做这个只是因为我找不到点唱机的预制，然后就做了这玩意。
![图片5](https://github.com/TLMEMO/MyBlogAssets/blob/main/assets/240708/5.png?raw=true)

最后是这个镜子的开关，我配了个UdonSharp，支持单开关3种模式切换，模式1是HQ镜子，模式2是LQ镜子，模式3没有镜子。然而我看的教程都是用两个开关来开关镜子的，我感觉两个开关实在是多此一举，所以说做了这东西。（事实上我感觉我可以日后用UdonSharp来实现更多功能，我又要为了鸟笼去买鸟了，把学习C#提上日程？）
```CSharp
using UdonSharp;
using UnityEngine;
using VRC.SDKBase;
using VRC.Udon;

public class ThreeModeSwitch : UdonSharpBehaviour
{
    public GameObject object1;
    public GameObject object2;

    private int state = 2;


    public override void Interact()
    {
        state = (state + 1) % 3;
        UpdateObjects();
    }

    private void UpdateObjects()
    {
        switch (state)
        {
            case 0:
                object1.SetActive(true);
                object2.SetActive(false);
                break;
            case 1:
                object1.SetActive(false);
                object2.SetActive(true);
                break;
            case 2:
                object1.SetActive(false);
                object2.SetActive(false);
                break;
        }
    }
}

```
![图片6](https://github.com/TLMEMO/MyBlogAssets/blob/main/assets/240708/6.png?raw=true)


目前就这么多了，这东西陆陆续续搞了快半个月才做完（我太摸了）
下面是我的一点碎碎念。

节点系统是真的不是人玩的啊，VRC自带的UdonGraph说是给不会编程的人准备的，事实上我是根本玩不明白，还不如去速成学个C#来写UdonSharp呢。
同样的，blender我也不是恨喜欢用，正是因为其太依托于节点了，材质节点根本玩不懂。我去年学了Blender，但不到半年就忘得精光了，甚至连快捷键都忘了。但我将近十年前学的C4D和3dsmax，到现在主要功能我还是会用的。而且现在渲染器怎么都改用节点了，我这种老古董是真的不会用了。
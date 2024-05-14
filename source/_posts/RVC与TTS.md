---
title: 关于2023年微调的AI产物
date: 2024-05-15 02:47:05
tags: 
- AI
- TTS
- VC
- 实用资源
- 小玩具
---
我在2023年的时候微调训练了赛马娘全角色的RVC模型和基于bert2-vits的崩坏星穹铁道+原神+赛马娘的TTS混合模型。
事实上，基于bert2-vits的tts模型是在bert2-vits有严重bug的版本下训练的，以至于效果非常烂（虽然才练了100000步），然后自然而然的弃坑了，这东西只能说将就着用。

[Bert VITS Umamusume Genshin HonkaiSR](https://huggingface.co/spaces/TLME/Bert-VITS-Umamusume-Genshin-HonkaiSR)
[RVC-Umamusume](https://huggingface.co/TLME/RVC-Umamusume)

还有一个基于ConvNeXtV2-tiny的western风格图像分类器，当时想拿这个过滤e站上那些western和男同福瑞图片...实际上我不能保证效果。不过这东西不会有人会去用吧...
[western-anime-images-classification](https://huggingface.co/spaces/TLME/western-anime-images-classification)

虽然我去年还微调了一些基于stable diffusion1.5的Lora和基于NAI的微调模型，不过已经2024年了，就不把这东西端上来了。

到时候有什么新的TTS技术我再练个马娘的模型吧，原神和崩坏的数据集比较难搞就不去搞了...
---
title: 前端学习笔记之使用tone.js给音乐计算器加上录制midi的功能
date: 2024-06-14 04:51:52
tags:
- midi
- 笔记
- 前端
---
这次我无意间了解到了[Tonejs](https://github.com/Tonejs)这个库。

>Tone.js 是一个用于在浏览器中创建交互式音乐的 Web 音频框架。Tone.js 的架构旨在让创建基于 Web 的音频应用程序的音乐家和音频程序员都熟悉它。在高层次上，Tone 提供了常见的 DAW（数字音频工作站）功能，例如用于同步和安排事件的全局传输以及预建的合成器和效果。此外，Tone 还提供高性能构建块来创建您自己的合成器、效果和复杂的控制信号。

然而这个库我用下来的体验就是非常庞大和实用。
```
const synth = new Tone.Synth().toDestination();
const now = Tone.now();
// trigger the attack immediately
synth.triggerAttack("C4", now);
// wait one second before triggering the release
synth.triggerRelease(now + 1);
```
这样短短几行代码就可以播放C4音高的音频了。
而且其甚至于还能根据赫兹来生成并播放音频，甚至官方的文档上好像说还可以根据采样几个钢琴的音，然后自动变调补全全部的声音。
如果我早点发现这个，我之前写音乐计算器就不用造轮子写一大堆东西了。我现在用的方法还是收集钢琴每个键的ogg音频，转换成base64组成列表来播放，实际操作非常麻烦。

虽然是这样，但是重构这东西我还是太懒了。不过重点是但是我发现其中的midi部分的功能可以解析并生成midi文件。所以说我立马想到了拿来做记录功能。直接记录用户的输入，然后生成midi，来达到录制效果。那就加点新东西在里面好了。

这两个方法用来记录Midi的演奏事件，其实很简单，只要根据你按下键盘的时间和松开的时间，就可以计算出音符持续的时间。
```javascript
//这个列表来存储所有的midi事件
let midiData = [];

//键盘按下
const handleKeyDown = (event) => {
    //根据用户按下键盘读取键盘-key的映射
    let key = getKey(event.code);
    let key_note = getAudioNote(key);
    //const now = Tone.now(); 这行代码调用了 Tone.now() 方法，并将返回的当前音频上下文时间赋值给变量 now。
    //Tone.now() 返回的是一个表示当前时间的数字，这个时间是相对于Tone.js内部音频上下文的开始时间的。这个时间通常用于安排音频事件，确保它们能够同步执行。
    const now = Tone.now();
    if (key_note != null) {
        let button = document.getElementById(key);
        button.dispatchEvent(mouseClick);
        //添加CSS样式的，这两行别管
        button.classList.remove('white-button');
        button.classList.add('c-white-button');
        if (music_mode.value == true) {
            if (key_val[key].status == true) {
                //播放对应音高的音频
                playAudio(key, key_note);
                if (is_record.value === true) {
                    //记录模式下记录事件
                    midiData.push({ type: 'noteOn', key: event.code, time: now });
                // 当调用 transport.start() 时，音频传输将开始运行，并且所有已安排的音频事件将按照其指定的时间进行执行。这包括播放音频、触发 MIDI 事件等。
                   transport.start();
                }
                //由于长按键盘上的按钮会变成连续按下多次该按钮，所以说加了个锁，等松开解锁。
                key_val[key].status = false;
            }
        }
    }
}
//键盘松开
const handleKeyUp = (event) => {
    let key = getKey(event.code);
    const now = Tone.now();
    if (key != null) {
        let button = document.getElementById(key);
        button.classList.remove('c-white-button');
        button.classList.add('white-button');
        if (music_mode.value == true) {
            if (is_record.value === true) {
                midiData.push({ type: 'noteOff', key: event.code, time: now });
                //同样的，transport.stop() 的作用是停止录制 MIDI，并将相应的 MIDI 数据添加到 midiData 数组中。
                
                transport.stop();
            }
            key_val[key].status = true;
        }
    }
}


//到此为止简单的Note On 和Note Off就记录好了,但很显然，键盘是不可能像midi键盘一样记录按下的力度的。

//这是按键对应的MIDIKEY所代表的数字。当然，这种写法的副作用是写死了，只支持C大调。后面我要是想填这个坑再重写吧（
function getMidiValueForKey(key) {
    const keyToMidiMap = {
        'Numpad1': ['60'], // C4
        'Numpad2': ['62'], // D4
        'Numpad3': ['64'], // E4
        'Numpad4': ['65'], // F4
        'Numpad5': ['67'], // G4
        'Numpad6': ['69'], // A4
        'Numpad7': ['71'], // B4
        'Numpad8': ['72'], // C5
        'Numpad9': ['74'], // D5
        'NumpadAdd': ['76'], // E5
        'NumpadSubtract': ['77'], // F5
        'NumpadMultiply': ['79'], // G5
        'NumpadDivide': ['81'], // A5
        'NumLock': ['83'], // B5
    };
    return keyToMidiMap[key] || 60;
}

//遍历之前存储midi事件的数组，保存MIDI
function saveMidi() {
    const midi = new Midi();
    const track = midi.addTrack();

    midiData.forEach((event, index) => {
        if (event.type === 'noteOn') {
            const note = {
                midi: getMidiValueForKey(event.key),
                time: event.time,
                duration: 0,
            };
            for (let i = index + 1; i < midiData.length; i++) {
                if (midiData[i].type === 'noteOff' && midiData[i].key === event.key) {
                    note.duration = midiData[i].time - event.time;
                    break;
                }
            }
            track.addNote(note);
        }
    });

    const midiArray = midi.toArray();
    const blob = new Blob([midiArray], { type: 'audio/midi' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.mid';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

//至此主要的代码就这些了，并且你可以同时按下多个按键，也会被记录下来
```
那么，不妨来[试玩一下](https://blog.mekohia.com/MusicCaculator/)？
点击record按钮就可以开始录制了，再点一次就会停止录制，下载记录好的midi文件。
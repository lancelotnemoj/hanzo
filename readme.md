### 写在前面

#### 目的
写这个的目的是为了在小挑的项目里实现一个监控传感器数据，并对数据作出响应，所以需要有状态管理、状态比对、发起action这样的功能，其实和redux在功能上没有新的东西，也不会有他们做的好，只是自己比较好奇，想试一试这样的功能是怎么样一点一点实现的

#### Amibition


#### why hanzo？
when I typed "mkdir ",my roomate shoutde "Hanzo,Hanzo is behind you!(半藏！后面有个半藏)"

#### why saee?
caz,the previoused name "hanzo" has been obtained by other project,so i used the first "word" of the four conception of this project 

### 定义

- state
    状态，以一棵树的形式存在的数据，后面在使用的时候会试一下子树也是个hanzo的形式，虽然。。。不知道有什么用

- action
    动作，以tag-foo的方式存在一个object里，用dispatch的方法调用（连名字都是抄的）
    写到这里的时候想起来redux的那个好像可以用“/”来划分所属，我觉得之后应该做一下这个功能
- event
    事件，因为需要监听某些改变，所以做了这个，其实和action在实现上差不多，只是希望自己写的时候不要晕了。调起事件的方式也是直接调起，在后面会考虑下参考js异步的实现方式，做一个handle池进行遍历

- effect
    效应，在追踪到状态发生变化时，做出的反应，将是一个状态-action的键值对

### How to use it

- install

> npm install saee

- import

```
const Saee=require("saee")

saee=new Saee()
```

### 
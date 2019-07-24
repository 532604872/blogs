# git 常用操作
| 动作 | git 命令 | sourceTree 操作 | 备注 |
| --- | -------- | -------------- | ---- |
| 克隆项目 | git clone https://gitee.com/william_bugwe/maomao.git | 选择 新建、从URL克隆，填写地址 https://gitee.com/william_bugwe/maomao.git | 默认分支 master 
| 查看分支 | [所有分支] git branch -a <br> [远程分支] git branch -r <br> [本地分支] git branch | 左侧菜单(<span style="color: red;">简称：左侧</span>)： <br> 远端 - 代表所有远端分支<br> 分支 - 代表本地分支 | |
| 切换远程分支 | git checkout -b myRelease origin/Release <br>| 双击 远端分支 Release；弹出“检出新分支”弹框，在“新的本地分支名称”中输入 myRelease；| 作用是 checkout 远程的 Release 分支，在本地起名为 myRelease 分支，并切换到本地的 myRelase 分支  | 
| 切换本地分支 | git checkout master | 双击 本地分支 master | 切记分支时，文件状态最好无修改内容 |
| 新建分支 | [dev分支] git checkout -b dev <br> [test分支] git checkout -b test | 顶部菜单(<span style="color: red;">简称：顶部</span>)，点击【分支】按钮<br>在“新分支”中输入：dev<br> 再次操作，输入：test | 当前在 master 分支上，做新建分支操作 |
| 推送远端 | git push origin dev <br> git push origin test | 在新建本地分支上(dev)右击，选择【推送到】中的 “origin” | |
| 拉取更新 | git fetch origin master | 顶部，点击【抓取】按钮<br>点击【确定】 | 当前在 master 分支上，做拉取更新操作 |
| 提交本地 | git commit -m "message" | 左侧，在 “WORKSPACE” -> “文件状态” 中，可以看到修改文件，底部填写 message 点击提交。 | ⚠️sourecTree 操作“文件状态”底部，勾选框【立即推送变更到 origin/mester】作用是，提交动作自动合并到远端分支上。 |
| 合并远端 | git merge mester | 顶部，点击【推送】按钮<br>点击【确定】 |  |
| 版本回滚(1) | [回滚到前一次] git reset HEAD <br> [回滚到指定版本] git reset [commitID] <br> [强制回滚到指定版本] git reset --hard [commitID] | <a href="https://www.jianshu.com/p/07d3a90425d4">SourceTree使用教程--文件部分提交、撤销回滚</a> | |
| 版本回滚(2) | [常规 commit] git revert [commitID] <br> [merge commit] git revert -m [m值：1、2] [commitID] | <a href="https://jingyan.baidu.com/article/ab0b563057387ac15afa7dca.html">回滚版本到某次提交</a> <br> <a href="https://blog.csdn.net/u012373815/article/details/78142806/">使用sourceTree回滚git代码到历史节点</a> | <a href="https://www.jianshu.com/p/741afd526110">SourceTree回滚指定文件代码</a> |

<span style="font-size: 12px;color: green;">
版本回滚(1) 与 (2)区分：
回滚分两种情况，一个是commit之前(reset)，一个是commit之后(revert)，详情理解请见附录<a href="#3">版本回滚</a>。
</span>

# ⚠️注意事项
1、分支命名请不要出现中文和特殊字符

2、推送远端前，请先检查是否有最新提交

3、分支之间 “合并” 动作，请遵循：
- 禁止环境分支合并到开发版本分支。例如：master -> v0.1.2; test -> v0.1.2
- 禁止不同开发版本分支之间做合并动作。例如：v1.2.0 -> v2.0.1; v2.0.1 -> v1.2.0

# 问题-解决方法
1、<a href="https://blog.csdn.net/qianxuedegushi/article/details/80311358">Git commit 常见用法</a>：
如果我们不小心提交了一版我们不满意的代码，并且给它推送到服务器了，在代码没被merge之前我们希望再修改一版满意的，而如果我们不想在服务器上abondon，那么我们怎么做呢？<br>
git commit --amend //也叫追加提交，它可以在不增加一个新的commit-id的情况下将新修改的代码追加到前一次的commit-id中。

2、<a href="https://blog.csdn.net/weixin_41975655/article/details/82887273">详解git pull和git fetch的区别</a>：
不要用git pull，用git fetch和git merge代替它。

3、<a href="https://blog.csdn.net/nrsc272420199/article/details/85227095">git在工作中的正确使用方式---git merge篇</a>:
当我们合并代码到远端时，发生了冲突，那么我们怎么做呢？<br>
一定要在 git commit 或者 git pull 动作前，进行 git fetch 查看是否有需要拉取最新内容。发现失败或者有冲突文件时，
- 第一步： git status 储藏
- 第二步： git pull 拉取并合并
- 第三步： git stash apply 应用储藏
- 第四步： 解决冲突
- 第五步： git merger 合并到远端

4、<a href="https://blog.csdn.net/yxlshk/article/details/79944535">Git恢复之前版本的两种方法reset、revert（图文详解）</a>
使用 git revert <commit_id>操作实现以退为进， git revert 不同于 git reset 它不会擦除"回退"之后的 commit_id ,而是正常的当做一次"commit"，产生一次新的操作记录，所以可以push，不会让你再pull 其他的不敢妄加猜测。

# 附录
推荐在公开项目上尝试：https://gitee.com/william_bugwe/maomao.git

推荐详情：https://git-scm.com/book/zh/v2/

版本回滚：
- <a href="https://segmentfault.com/a/1190000012897697?utm_source=tag-newest">Git 之 revert</a>
- <a href="http://blog.psjay.com/posts/git-revert-merge-commit/">Git 撤销合并</a>
- <a href="https://www.cnblogs.com/songgj/p/8965580.html">git撤销与回滚</a>

<div style="text-align: right;">内容有误请联系作者<br>谢谢😊</div>


---
title: "my website (helios.ac) is a slow motherfucker"
date: "2025-08-04T10:05:00.000Z"
---

I just developed a central dashboard to manage all my stuff and one of these is domain status, and one interesting thing I found out that my main **helios.ac** website appears to be the laggiest/slowest website in all 10/10 checks I performed.

I think the lead issue with this is just the sheer size of the inbound HTML (as it is inlined CSS and JS) which could explain why. Alongside that, the source code is around 5K lines. I imagine that is sufficent for a explanation of this lag.![](https://ndcyfrweklzslbnn.public.blob.vercel-storage.com/1754301952078-chrome_uSaDlr3OK1-0pRkY15BGeJgCVcTsW5Hz0fvB7kdmf.png)

### do i plan on do anything about this? 
nah probably not, i might migrate the JS into seperate systems like this one for example in this website everything is modulized in a very strict OOP (*object oritentated programming*) way. I designed this by intention because I know that this will last until I die so I know at some time when im older with more "advanced" coding skills, I'll look and this and say: 

> what a fucking mess this is, mate.

so naturally with OOP enforced codebase, its easy as just determining what inputs/outputs exist, and what other systems depend on this code, and then i rewrite it and slot it back in like nothing ever happened.

### my security-permission level like system in the codebase![](https://ndcyfrweklzslbnn.public.blob.vercel-storage.com/1754302304659-Cursor_CH45vVukhm-hIuf4L25kf4gFD7NNZW3VmaIElHXt0.png)
so i planned the codebase in a way that folders contain "permission-levels" which include stuff like
- api (yk what this is)
- public/shared (public/client-sided utility)
- private (auth helper, private utility)

but yeah i think with that and OOP we have a very nice system in place so in the event something needs to be changed its as simple as slotting out a file with a new file that can still process the other old modules as a friendgroup

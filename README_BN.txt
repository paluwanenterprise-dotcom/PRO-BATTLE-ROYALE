PRO BATTLE ROYALE — Multiplayer Server (Render)

এই সার্ভারটি গেমের বর্তমান ক্লায়েন্টের WebSocket মেসেজের সঙ্গে মেলে।
এটি এখন খেলোয়াড়ের উপস্থিতি ও অবস্থান (movement) অন্য খেলোয়াড়দের কাছে পাঠায়।
এটি এখনো সম্পূর্ণ Battle Royale gameplay (shooting, damage, loot, matchmaking) নয়।

Android ফোন থেকে চালু করার ধাপ:
1) ZIP Extract করুন।
2) GitHub অ্যাপে বা github.com-এ লগইন করে New repository তৈরি করুন:
   pro-battle-royale-server
   Public নির্বাচন করতে পারেন; README / .gitignore / license auto-add করবেন না।
3) রিপোজিটরির Code > Add file > Upload files এ যান।
4) ZIP-এর ভেতরের package.json, server.js, render.yaml — তিনটি ফাইল
   আলাদা করে রিপোজিটরির ROOT-এ আপলোড করুন (কোনো subfolder-এ নয়)।
5) Commit changes চাপুন।
6) https://dashboard.render.com/ খুলে Sign in করুন।
7) New + > Web Service > GitHub repo pro-battle-royale-server নির্বাচন করুন।
8) Settings:
   Build Command: npm install
   Start Command: npm start
   Instance Type: Free (শুধু পরীক্ষা)
   তারপর Create Web Service চাপুন।
9) Deploy status Live হলে Render-এর URL হবে:
   https://YOUR-SERVICE-NAME.onrender.com
10) গেমের Server URL ঘরে এই ঠিকানার শেষে /ws যোগ করে দিন:
    wss://YOUR-SERVICE-NAME.onrender.com/ws

Health test:
https://YOUR-SERVICE-NAME.onrender.com/health
এখানে {"ok":true,...} এলে সার্ভার চালু।

গুরুত্বপূর্ণ:
- Render Free সার্ভার নিষ্ক্রিয় থাকলে sleep করতে পারে; প্রথম সংযোগে প্রায় এক মিনিট লাগতে পারে।
- Free instance production/বড় খেলোয়াড়ের জন্য উপযুক্ত নয়।
- Render-এ সার্ভার deploy না হওয়া পর্যন্ত আসল URL তৈরি হবে না।
- আপনার GitHub/Render পাসওয়ার্ড বা OTP কাউকে দেবেন না।

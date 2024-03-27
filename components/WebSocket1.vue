<template>
  <div class="h-screen flex flex-col justify-between">
    <main>
      <!-- Messages -->
      <div id="messages" class="flex-grow flex flex-col justify-end px-4 pt-8 pb-21 sm:pb-12 bg-slate-900 min-h-screen">
        <div class="flex items-center mb-4 overflow-x-auto" v-for="message in messages" :key="message.id">
          <div class="flex flex-col">
            <p class="text-gray-500 mb-1 text-xs">{{ message.user }} :</p>
            <div class="flex items-center">
              <div class=" bg-gray-800 rounded-lg p-2">
                <p class="text-white">{{ message.message }}</p>
              </div>
            </div>
            <p class="text-gray-500 mt-1 text-xs ml-10">{{ message.created_at }}</p>
          </div>
        </div>
      </div>

      <!-- Chatbox -->
      <div class="bg-gray-800 px-4 py-2 flex items-center justify-between fixed bottom-0 container flex-col sm:flex-row">
        <div class="w-full min-w-6">
          <input type="text" :placeholder="`${ws ? 'Type your message...' : 'Type your name and connect'}`"
                 class="w-full rounded-none px-4 py-2 bg-gray-700 text-white focus:outline-none focus:ring focus:border-blue-300 sm:rounded-l-lg"
                 @keydown.enter="()=> isConnecting ? send() : connect()" v-model="message"/>
        </div>
        <div class="flex w-full">
          <button :disabled="!isConnecting" class="disabled:(bg-gray-300 pointer-events-none) bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-1/4" @click="send">
            Send
          </button>
          <button :disabled="!isConnecting" class="disabled:(bg-gray-300 pointer-events-none) bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-1/4" @click="ping">
            Ping
          </button>
          <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-1/4" @click="connect">
            {{isConnecting ? 'Reconnect' : 'Connect'}}
          </button>
          <button v-if="isConnecting" class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 w-1/4" @click="quit">
            Quit
          </button>
          <button class="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 sm:rounded-r-lg w-1/4" @click="clear">
            Clear
          </button>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
let ws: WebSocket | undefined;

const message = ref<string>("");
const messages = useState<{ id: number, user: string, message: string, created_at: string }[]>(() => []);

const userId = useCookie<string>("userId")

const isConnecting = ref(false)

// 从数据库中获取历史消息
// if (!messages.value.length) {
//   const res = await $fetch("/api/messages")
//   messages.value.push(...res.messages)
// }

// 接收到消息处理
const log = (user: string, ...args: string[]) => {
  if (args[0] === 'pong') {
    console.log(`收到心跳包,延迟 ${Date.now() - pingBegin}ms`)
    return
  }
  console.log("[ws]", user, ...args);
  messages.value.push({
    id: 0,
    message: args.join(" "),
    user: user,
    created_at: new Date().toLocaleString(),
  });
  scroll();
};

// 链接到服务器
const connect = async () => {
  userId.value = message.value
  message.value = ''

  const isSecure = location.protocol === "https:";
  const url = (isSecure ? "wss://" : "ws://") + location.host + "/api/chat-ws?userId=" + userId.value;
  if (ws) {
    log("ws", "Closing previous connection before reconnecting...");
    ws.close();
    clear();
  }

  log("ws", "Connecting to", url, "...");
  ws = new WebSocket(url);

  // 添加接收到消息回调
  ws.addEventListener("message", (event) => {
    if (event.data.startsWith("{")) {
      // JSON 数据
      const {user , message} = JSON.parse(event.data)
      log(user, message)
    } else {
      const user = 'system'
      const message = event.data
      log(user, message)
    }
  });

  ws.addEventListener("close", (event)=> {
    console.log("ws", "Closed!")
    isConnecting.value = false
  })

  // 当欠佳open监听的时候,就开始请求链接了,当执行回调,那么就表示链接成功
  await new Promise((resolve) => ws!.addEventListener("open", ()=> {
    log("ws", "Connected!");
    isConnecting.value = true
    resolve(null)
  }));

}


// 关闭链接
const quit = ()=> {
  if (isConnecting) ws?.close()
}

// 清理消息
const clear = () => {
  messages.value.splice(0, messages.value.length);
  log("system", "previous messages cleared");
};

// 每次滚动100ox
const scroll = () => {
  nextTick(() => {
    console.log('scrooling')
    window.scrollTo(0, document.body.scrollHeight + 100);
  })
}

// 发送消息
const send = () => {
  console.log("sending message...");
  if (message.value) {
    ws!.send(message.value);
  }
  message.value = "";
};

let pingBegin = 0
// 发送心跳包
const ping = () => {
  console.log('发送心跳包')
  pingBegin = Date.now()
  ws!.send("ping");
};

// onMounted(async () => {
//   connect();
//   scroll();
// });

// region 发送心跳包
let pingTimer = 0
watch(isConnecting, (newValue)=> {
  clearInterval(pingTimer)
  if (newValue) {
    pingTimer = setInterval(ping, 10000)
  }
})

onBeforeMount(()=> {
  clearInterval(pingTimer)
})
// endregion

useServerHead({
  title: "Nuxt Chat",
})

</script>
import type {Peer} from "crossws";
import {getQuery} from "ufo";

const users = new Map<string, Peer>();
const channel = 'chatroom'

export default defineWebSocketHandler({
    // 客户端与服务器建立链接
    open(peer) {
        console.log(`[ws] open ${peer}`);

        const userId = getUserId(peer);
        users.set(userId, peer);

        const stats = getStats();
        peer.send({
            user: "server",
            message: `Welcome to the server ${userId}! (Online users: ${stats.online}`,
        });

        peer.subscribe(channel);
        peer.publish(channel, {user: "server", message: `${peer} ${userId} joined!`});
    },
    // 接收到客户端消息
    async message(peer, message) {
        console.log(`[ws] message ${peer} ${message.text()}`);

        // 心跳包
        if (message.text() === "ping") {
            peer.send({user: "server", message: "pong"});
            return
        }

        const userId = getUserId(peer);
        const str = message.text()

        if (str.startsWith("{")) {
            const _message = {
                user: userId,
                ...JSON.parse(str) // {sendTo, message}
            }

            const sendToPeer = users.get(_message.sendTo)
            if (sendToPeer) {
                // 将消息返回给客户端
                peer.send(_message);
                // 将消息发送给指定客户端
                sendToPeer.send(_message)
            }
        } else {
            const _message = {
                user: userId,
                message: str
            }
            // 将消息返回给客户端
            peer.send(_message); // echo back
            // 将消息公告给通道中其他用户
            peer.publish(channel, _message);
        }


        // Store message in database
        //await addMessage(userId, message.text());
    },
    // 链接关闭
    close(peer, details) {
        console.log(`[ws] close ${peer}`);

        const userId = getUserId(peer);
        users.delete(userId);
    },
    // 异常捕获
    error(peer, error) {
        console.log(`[ws] error ${peer}`, error);
    },

    upgrade(req) {
        return {
            headers: {
                "x-powered-by": "cross-ws",
            },
        };
    },
});

function getUserId(peer: Peer) {
    // 通过url地址query获得用户信息
    const query = getQuery(peer.url);
    return query.userId as string;
}

function getStats() {
    return {online: users.size};
}
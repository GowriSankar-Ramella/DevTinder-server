const socket = require("socket.io")
const Chat = require("../models/Chat.model")

const initializeSocket = (server) => {
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173"
        }
    })

    // Store online users
    const onlineUsers = new Map(); // Map<socketId, {userId, firstName, lastName}>
    const userSockets = new Map(); // Map<userId, Set<socketId>> for multiple tabs/sessions

    io.on("connection", (socket) => {

        // Handle user going online
        socket.on("user-online", ({ userId, firstName, lastName }) => {
            if (!userId) return;

            // Store user info with socket
            onlineUsers.set(socket.id, { userId, firstName, lastName });

            // Handle multiple tabs/sessions for same user
            if (!userSockets.has(userId)) {
                userSockets.set(userId, new Set());
            }
            userSockets.get(userId).add(socket.id);

            // Broadcast updated online users list
            broadcastOnlineUsers();
        });

        // Handle user going offline
        socket.on("user-offline", ({ userId, firstName }) => {
            handleUserOffline(socket.id, userId);
        });

        // Existing joinChat functionality
        socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
            const roomId = [userId, targetUserId].sort().join("_")
            socket.join(roomId)
        })

        // Existing sendMessage functionality
        socket.on("sendMessage", async ({ firstName, lastName, userId, targetUserId, text }) => {
            try {
                const roomId = [userId, targetUserId].sort().join("_")

                // Storing the received messages into the database
                let chat = await Chat.findOne({ participants: { $all: [userId, targetUserId] } })
                if (!chat) {
                    chat = new Chat({ participants: [userId, targetUserId], messages: [] })
                }
                chat.messages.push({ senderId: userId, text })
                await chat.save()

                io.to(roomId).emit("messageReceived", {
                    firstName,
                    lastName,
                    text,
                    userId,
                    targetUserId,
                    timestamp: new Date()
                })
            } catch (error) {
                console.log(error)
            }
        })

        // Typing indicators
        socket.on("typing-start", ({ userId, targetUserId, firstName }) => {
            const roomId = [userId, targetUserId].sort().join("_")
            socket.to(roomId).emit("user-typing", {
                userId,
                firstName,
                isTyping: true
            })
        })

        socket.on("typing-stop", ({ userId, targetUserId, firstName }) => {
            const roomId = [userId, targetUserId].sort().join("_")
            socket.to(roomId).emit("user-typing", {
                userId,
                firstName,
                isTyping: false
            })
        })

        // Handle disconnect
        socket.on("disconnect", () => {
            const userInfo = onlineUsers.get(socket.id);
            if (userInfo) {
                const { userId, firstName } = userInfo;
                handleUserOffline(socket.id, userId);
            }
        })
    })

    // Helper function to handle user going offline
    function handleUserOffline(socketId, userId) {
        onlineUsers.delete(socketId);

        if (userSockets.has(userId)) {
            userSockets.get(userId).delete(socketId);

            // If no more sockets for this user, remove from userSockets
            if (userSockets.get(userId).size === 0) {
                userSockets.delete(userId);
            }
        }

        broadcastOnlineUsers();
    }

    // Helper function to broadcast online users
    function broadcastOnlineUsers() {
        // Create array of online user info
        const onlineUsersList = Array.from(userSockets.keys()).map(userId => {
            // Get user info from any of their connected sockets
            const socketIds = Array.from(userSockets.get(userId));
            const userInfo = onlineUsers.get(socketIds[0]);
            return {
                userId,
                firstName: userInfo?.firstName || 'Unknown',
                lastName: userInfo?.lastName || '',
                isOnline: true
            };
        });

        // Broadcast to all connected clients
        io.emit('online-users-updated', onlineUsersList);

    }

    return io;
}

module.exports = { initializeSocket }
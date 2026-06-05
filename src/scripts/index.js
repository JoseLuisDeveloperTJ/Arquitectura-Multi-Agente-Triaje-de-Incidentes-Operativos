const inputData = item.json;

const rawMessage = inputData.message_text || inputData.text || "";
const userId = inputData.user_id || "unknown_user";
const channel = inputData.channel || "omnichannel";


const cleanMessage = rawMessage.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ').trim();


return {
  json: {
    userId: userId,
    channel: channel,
    originalMessage: rawMessage,
    cleanMessage: cleanMessage
  }
};
import { FastifyReply, FastifyRequest } from "fastify";
import { getCustomWelcomeMessage } from "../modules/GetCustomWelcomeMessage";
import { configDotenv } from "dotenv";

configDotenv()
const { TWITCH_BROADCASTER_ID } = process.env

export async function getCustomWelcomeMessageController(
    request: FastifyRequest<{
        Params: { twitchUserId: string }
    }>,
    reply: FastifyReply
) {

    const { twitchUserId } = request.params

    if (twitchUserId === TWITCH_BROADCASTER_ID) {
        return reply.status(204)
    }

    const customWelcomeMessage = await getCustomWelcomeMessage(twitchUserId)
    return reply.status(200).send(customWelcomeMessage)
}
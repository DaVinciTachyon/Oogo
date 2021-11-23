import Minder, { MinderInput } from "../entities/Minder.js";

async function add(userId: number, minder: MinderInput) {
    return Minder.create({ ...minder, userId })
}

export default {
    add
}
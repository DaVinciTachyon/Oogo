import User, { UserInput, UserOutput } from "../entities/User.js"
import { UserPatchModel } from "../models/UserPatchModel.js"
import { UserQueryModel } from "../models/UserQueryModel.js"

function findByEmail(email: string): Promise<UserOutput | null> {
    return User.findOne({ where: { email } })
}

async function getByEmail(email: string): Promise<UserOutput> {
    const user = await findByEmail(email)
    if(!user) throw new Error("User not found")
    return user
}

function create(user: UserInput) {
    return User.create(user)
}

function find(id: number) {
    return User.findOne({ where: { id } })
}

async function get(id: number) {
    const user = await find(id)
    if(!user) throw new Error("User not found")
    return user
}

function list(query: UserQueryModel) {
    return User.findAll({ where: query })
}

function patch(id: number, user: UserPatchModel) {
    return User.update(user, { where: { id } })
}

export default {
    findByEmail,
    getByEmail,
    create,
    get,
    find,
    list,
    patch
}
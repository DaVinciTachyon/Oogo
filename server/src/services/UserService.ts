import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import config from '../configurations/server.js'
import UserRepository from '../repositories/UserRepository.js';
import MinderRepository from '../repositories/MinderRepository.js';
import PaymentRepository from '../repositories/PaymentRepository.js';
import { UserInput } from '../entities/User.js';
import { MinderInput } from '../entities/Minder.js';
import { PaymentInput } from '../entities/Payment.js';
import { UserRole } from '../models/UserRole.js';
import { UserStatus } from '../models/UserStatus.js';
import { UserPatchModel } from '../models/UserPatchModel.js';
import { UserQueryModel } from '../models/UserQueryModel.js';

export async function signUp(user: { basicDetails: UserInput, details?: MinderInput, payment?: PaymentInput }) {
  const foundUser = await UserRepository.findByEmail(user.basicDetails.email);
  if (foundUser)
    throw new Error(
      "User already exists"
    );
  user.basicDetails.password = await bcrypt.hash(user.basicDetails.password, 12);
  if(user.basicDetails.role === UserRole.ADMIN)
      user.basicDetails.status = UserStatus.ACTIVE
  else
    user.basicDetails.status = UserStatus.REQUESTED
  const createdUser = await UserRepository.create(user.basicDetails)
  if(user.details) await MinderRepository.add(createdUser.id, user.details)
  if(user.payment) await PaymentRepository.add(createdUser.id, user.payment)
  return createdUser.id
}

async function logIn(email: string, password: string) {
  const user = await UserRepository.getByEmail(email);
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw new Error(
      "Password is incorrect"
    );
  const token = jwt.sign({ id: user.id, role: user.role }, config.secretPhrase);
  return token
}

function patch(id: number, user: UserPatchModel) {
  return UserRepository.patch(id, user)
}

function get(id: number) {
  return UserRepository.get(id)
}

function getByEmail(email: string) {
  return UserRepository.getByEmail(email)
}

function list(query: UserQueryModel) {
  return UserRepository.list(query)
}

export default {
  signUp,
  logIn,
  get,
  getByEmail,
  list,
  patch
}
import Payment, { PaymentInput } from "../entities/Payment.js";

async function add(userId: number, payment: PaymentInput) {
    return Payment.create({ ...payment, userId })
}

export default {
    add
}
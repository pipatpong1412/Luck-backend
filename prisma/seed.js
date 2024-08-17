const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const password = bcrypt.hashSync('123')

const userData = [
  { card_id: '8195812666487', password, email: 'test@mail.com', name: 'doctor', lastname: 'test', role: 'DOCTOR' },
  { card_id: '9032026349685', password, email: 'test@mail.com', name: 'admin', lastname: 'test', role: 'ADMIN' },
  { card_id: '5202170883281', password, email: 'test@mail.com', name: 'userA', lastname: 'test', role: 'USER' },
  { card_id: '7795693212379', password, email: 'test@mail.com', name: 'userB', lastname: 'test', role: 'USER' },
  { card_id: '0899068518618', password, email: 'test@mail.com', name: 'userC', lastname: 'test', role: 'USER' },
]

const bookingData = [
  { datetime: new Date(), user_id: 3, id: 1, status: 'RESERVED', phone: '0123456789', disease: 'ปวดขา' },
  { datetime: new Date(), user_id: 4, id: 2, status: 'PENDING', phone: '0987654321', disease: 'ปวดตา' },
  { datetime: new Date(), user_id: 5, id: 3, status: 'PENDING', phone: '0147852369', disease: 'ปวดฟัน' },

]

const run = async () => {
  await prisma.user.createMany({
    data: userData
  })
  await prisma.booking.createMany({
    data : bookingData
  })
}

run()

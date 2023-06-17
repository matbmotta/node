const amqp = require('amqplib')

module.exports = async (message) => {
  const queueName = `fila-suporte`
  // const letterRoutingKey = `dlqName`
  const conn = await amqp.connect(process.env.urlQueue)
  const channel = await conn.createChannel()
  await channel.assertQueue(
    queueName
  )
  // await channel.assertQueue(letterRoutingKey)
  return await channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true })
}
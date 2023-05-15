import { AppError } from '@shared/errors/AppError';
import IRebbit from '@shared/messaging/Interface/IRabbit';
import { Connection, Channel, connect } from 'amqplib';

export default class Rabbit implements IRebbit {
  private conn: Connection;
  private channel: Channel;

  async start(): Promise<void> {
    this.conn = await connect(process.env.gestaoRabbitMQConnection!);
    this.channel = await this.conn.createChannel();
  }

  async publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean> {
    try {
      await this.start();
      return this.channel.publish(exchange, routingKey, Buffer.from(message));
    } catch (error) {
      throw new AppError(`could not send message: ${error}`);
    }
  }
}

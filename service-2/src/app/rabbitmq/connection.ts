import { RABBITMQ_URL } from '../config/utils/constant';
import amqlib from 'amqplib';

export const connection = async () => {
  const conn = await amqlib.connect(RABBITMQ_URL);

  return conn;
};

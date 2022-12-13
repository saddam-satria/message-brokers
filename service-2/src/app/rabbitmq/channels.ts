import { Channel, Connection } from 'amqplib';

const HelloWorldChannel = (channel: Channel) => {
  channel.assertQueue('example');
  channel.consume('example', (message) => {
    console.log(message?.content.toString());
  });
};

const channels = {
  HelloWorldChannel,
};

const start = async (connection: Connection) => {
  const channel = await connection.createChannel();
  channels.HelloWorldChannel(channel);
};

export default start;

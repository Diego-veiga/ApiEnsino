export default interface IRebbit {
  publishInExchange(
    exchange: string,
    routingKey: string,
    message: string,
  ): Promise<boolean>;
  start(): Promise<void>;
}

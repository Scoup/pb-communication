import { Database } from 'mongorito';
import { Product } from './product';

export abstract class DB {
  private static connection: Database;

  public static connect(database?: string): Promise<void> {
    this.disconnect();
    this.connection = new Database(database);
    return this.connection.connect().then(() =>
      Promise.resolve(this.registerModels()));
  }

  private static registerModels() {
    this.connection.register(Product);
  }

  public static disconnect(): Promise<void> {
    if(!this.connection) return Promise.resolve();
    return this.connection.disconnect();
  }
}

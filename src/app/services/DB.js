import localForage from 'localforage';
import { SHA256 } from 'sha2';

class DB {
  constructor() {
    this.store = localForage.createInstance({
      name: 'TELIA_store',
    });
  }

  async getItem(key) {
    const expirationKey = this._expirationKey(key);
    const expiration = await this.store.getItem(expirationKey);

    if (expiration) {
      const isExpired = new Date().getTime() - expiration >= 0;
      if (isExpired) {
        await this.removeItem(key);
        return null;
      }
    }
    return this.store.getItem(key);
  }

  async setItem(key, value, expiresIn) {
    try {
      if (expiresIn) {
        const expirationTimeStamp = new Date().getTime() + expiresIn;
        await this.store.setItem(this._expirationKey(key), expirationTimeStamp);
      }
      return await this.store.setItem(key, value);
    } catch (err) {
      throw err;
    }
  }

  _expirationKey = key => {
    const hash = SHA256(key)
      .toString('hex')
      .substring(0, 8);

    return `${key}_expires_${hash}` ;
  };

  removeItem(key) {
    return Promise.all([
      this.store.removeItem(this._expirationKey(key)),
      this.store.removeItem(key),
    ]);
  }
}

export default new DB();

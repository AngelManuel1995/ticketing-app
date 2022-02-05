import nats, { Stan } from 'node-nats-streaming'

class NatsWrapper {
	
	private _client?: Stan

	get client () {
		if(!this._client) {
			throw new Error('Can not access to NAT client before connecting')
		}
		return this._client
	}
	
	connect (clustedId: string, clientId: string, url: string) {
		this._client = nats.connect(clustedId, clientId,  { url })
		return new Promise<void>((resolve, reject) => {
			this._client!.on('connect', () => {
				console.log('Connected to NATS')
				resolve()
			})
			this._client!.on('error', () => {
				reject()
			})
		})
	}
}

export const natsWrapper = new NatsWrapper()
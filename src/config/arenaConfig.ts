import Arena from 'bull-arena';

export const arenaConfig = Arena(
			{
				queues: [
					{
						// Name of the bull queue, this name must match up exactly with what you've defined in bull.
						name: 'users-all',

						// Hostname or queue prefix, you can put whatever you want.
						hostId: 'PepoHost',

						// Redis auth.
						redis: {
							port: 6379,
							host: '127.0.0.1'
							//password: /* Your redis password */,
						}
					},
					{
						// Name of the bull queue, this name must match up exactly with what you've defined in bull.
						name: 'user-register',

						// Hostname or queue prefix, you can put whatever you want.
						hostId: 'PepoHost',

						// Redis auth.
						redis: {
							port: 6379,
							host: '127.0.0.1'
							//password: /* Your redis password */,
						}
					},
					{
						// Name of the bull queue, this name must match up exactly with what you've defined in bull.
						name: 'user-delete',

						// Hostname or queue prefix, you can put whatever you want.
						hostId: 'PepoHost',

						// Redis auth.
						redis: {
							port: 6379,
							host: '127.0.0.1'
							//password: /* Your redis password */,
						}
					},
					{
						// Name of the bull queue, this name must match up exactly with what you've defined in bull.
						name: 'user-update',

						// Hostname or queue prefix, you can put whatever you want.
						hostId: 'PepoHost',

						// Redis auth.
						redis: {
							port: 6379,
							host: '127.0.0.1'
							//password: /* Your redis password */,
						}
					},
					{
						// Name of the bull queue, this name must match up exactly with what you've defined in bull.
						name: 'user-login',

						// Hostname or queue prefix, you can put whatever you want.
						hostId: 'PepoHost',

						// Redis auth.
						redis: {
							port: 6379,
							host: '127.0.0.1'
							//password: /* Your redis password */,
						}
					}
				]
			},
			{
				// Make the arena dashboard become available at {my-site.com}/arena.
				basePath: '/',

				// Let express handle the listening.
				disableListen: true
			}
		);

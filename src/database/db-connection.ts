import { Client } from 'pg';

import { config } from '../config';

export const client = new Client(config.DB_URL);

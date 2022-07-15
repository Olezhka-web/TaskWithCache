import * as NodeCache from 'node-cache';

export const nodeCache = new NodeCache({ stdTTL: 15 });

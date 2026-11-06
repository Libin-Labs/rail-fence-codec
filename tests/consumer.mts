import { encodeRailFence, decodeRailFence } from '@lp-labs/rail-fence-codec';
if (decodeRailFence(encodeRailFence('HELLO', 3), 3) !== 'HELLO') throw new Error('Rails');
// @ts-expect-error invalid argument must be rejected by declarations
encodeRailFence('HELLO', '3');

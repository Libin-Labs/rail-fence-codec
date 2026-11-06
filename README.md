# @lp-labs/rail-fence-codec

Bounded rail-fence text transposition over Unicode scalars.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/rail-fence-codec
```

## Working example

```js
import { encodeRailFence, decodeRailFence } from '@lp-labs/rail-fence-codec';
if (decodeRailFence(encodeRailFence('HELLO', 3), 3) !== 'HELLO') throw new Error('Rails');
```

CommonJS: `const api = require('@lp-labs/rail-fence-codec')`.

## Behavior, customization and limits

encodeRailFence/decodeRailFence accept strings<=16384 UTF16 units and rails2..256. Zigzag starts at top moving down; counts/scattering operate on Unicode scalar iteration,unpaired surrogates rejected. No spaces removed or padding. rails exceeding text length leave text unchanged. O(n+rails)time/storage. Historical transposition,not encryption/security.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export declare function encodeRailFence(text: string, rails: number): string;
export declare function decodeRailFence(text: string, rails: number): string;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.

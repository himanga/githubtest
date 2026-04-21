# foo

**A lightweight JavaScript utility for flexible value transformation.**

`foo` takes any input — string, number, or object — and returns a clean, consistently shaped result object with your transformed value plus metadata. It's simple to use, easy to extend, and fully documented.

---

## Quick Start

Install via npm:

```bash
npm install foo-lib
```

Then use it in your project:

```javascript
const { foo } = require('foo-lib');

const result = foo("hello");
console.log(result.value);    // "HELLO_FOO"
console.log(result.original); // "hello"
```

---

## Why foo?

- **Predictable output shape** — every call returns a `FooResult` with `.value`, `.original`, `.timestamp`, and `.metadata`
- **Zero dependencies** — ships as pure JavaScript, works in Node.js 14+
- **Three entry points** — use `foo()` for synchronous work, `fooAsync()` when you need a Promise, or `fooWithOptions()` for quick one-liners
- **Extensible** — pass a `FooOptions` object to control prefix, suffix, casing, and custom metadata

---

## Core API at a Glance

| Function | Returns | Use when |
|---|---|---|
| `foo(input, options?)` | `FooResult` | Standard synchronous use |
| `fooAsync(input, options?)` | `Promise<FooResult>` | Non-blocking / async context |
| `fooWithOptions(input, opts)` | `FooResult` | Explicit option object |

Full parameter details and examples are in the **[API Reference](api.html)** tab above.

---

## Examples

### Basic string transformation

```javascript
foo("world");
// { value: "WORLD_FOO", original: "world", timestamp: 1713235200000, metadata: {} }
```

### Custom prefix and suffix

```javascript
foo("bar", { prefix: ">>", suffix: "<<", uppercase: false });
// { value: ">>bar<<", ... }
```

### Async usage

```javascript
const result = await fooAsync(42);
console.log(result.value); // "42_FOO"
```

### Attaching metadata

```javascript
foo("event", { metadata: { source: "user-click", version: 2 } });
// { value: "EVENT_FOO", metadata: { source: "user-click", version: 2 }, ... }
```

---

## Browser Support

foo ships as CommonJS and ESM. For browsers, bundle with Vite, Rollup, or Webpack. No polyfills required for modern browsers (Chrome 80+, Firefox 78+, Safari 14+).

---

## License

MIT © The foo Authors

# Help & Troubleshooting

This page covers common questions, error messages, and tips for getting the most out of `foo`.

---

## Installation

### npm

```bash
npm install foo-lib
```

### yarn

```bash
yarn add foo-lib
```

### CDN (browser)

```html
<script type="module">
  import { foo } from 'https://cdn.jsdelivr.net/npm/foo-lib/dist/foo.esm.js';
</script>
```

---

## Common Errors

### `TypeError: foo: input must not be null or undefined`

**Cause:** You passed `null` or `undefined` as the first argument.

**Fix:** Always guard your input before calling `foo`:

```javascript
if (input != null) {
  const result = foo(input);
}
```

---

### `RangeError` on large numbers

**Cause:** `foo` rejects numbers outside `[-1e9, 1e9]` to prevent silent precision loss.

**Fix:** Stringify the number yourself if you need to process it as text:

```javascript
foo(String(veryLargeNumber));
```

---

### My options aren't being applied

**Cause:** `options` must be a plain object. Passing a class instance or `null` silently falls back to defaults.

**Fix:**

```javascript
// ✅ correct
foo("x", { suffix: "_BAR" });

// ❌ won't work — null is ignored
foo("x", null);
```

---

## FAQ

### Can I use foo in the browser?

Yes. Import the ESM bundle directly or bundle it with your preferred tool. `foo` has zero dependencies and no Node-specific APIs.

---

### Does foo mutate my input?

No. `foo` never modifies the input value. The `.original` property on `FooResult` is always a reference to the exact value you passed in.

---

### How do I strip the default `_FOO` suffix?

Pass an empty string as `suffix`:

```javascript
foo("hello", { suffix: "" });
// { value: "HELLO", ... }
```

---

### Can I add custom fields to the result?

Not directly on `FooResult`, but use the `metadata` option to attach any key-value data:

```javascript
foo("ping", { metadata: { traceId: "abc-123" } });
// result.metadata.traceId === "abc-123"
```

---

### Is fooAsync faster?

Not for CPU — it offloads to a microtask but does the same work. Use it when you're in an `async` function and want consistent Promise-based control flow, not for performance gains.

---

## Getting Help

- **GitHub Issues** — bug reports and feature requests: `github.com/example/foo-lib/issues`
- **Discussions** — questions and ideas: `github.com/example/foo-lib/discussions`
- **API Reference** — full parameter docs: see the **API Reference** tab above

---

## Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feat/my-change`
3. Make your changes and add tests
4. Run `npm test`
5. Open a pull request

Please follow the existing code style. New public functions must include NaturalDocs comment blocks.

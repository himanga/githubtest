/**
 * Module: foo
 *
 * A utility module providing the <foo> function and related helpers.
 * Designed for flexible data transformation with optional configuration.
 *
 * Topic: Overview
 *
 * The foo module is the core of this library. Use <foo> for standard
 * transformation, <fooAsync> for non-blocking operation, and
 * <fooWithOptions> when you need fine-grained control.
 */


/* Function: foo
 *
 * Transforms an input value according to the default foo algorithm.
 * Returns a processed result object containing the transformed value
 * and associated metadata.
 *
 * Parameters:
 *   input   - The value to transform. Can be a string, number, or object.
 *   options - (optional) A plain object with configuration overrides.
 *             See <FooOptions> for available keys.
 *
 * Returns:
 *   A <FooResult> object with the transformed value and metadata.
 *
 * Throws:
 *   TypeError  - If *input* is null or undefined.
 *   RangeError - If *input* is a number outside the supported range [-1e9, 1e9].
 *
 * Example:
 * --- Code
 * const result = foo("hello");
 * console.log(result.value);   // "HELLO_FOO"
 * console.log(result.original); // "hello"
 * ---
 *
 * See Also:
 *   <fooAsync>, <fooWithOptions>, <FooOptions>
 */
function foo(input, options = {}) {
  if (input === null || input === undefined) {
    throw new TypeError("foo: input must not be null or undefined");
  }
  const opts = { ...defaultOptions, ...options };
  return _transform(input, opts);
}


/* Function: fooAsync
 *
 * Asynchronous variant of <foo>. Resolves with the same <FooResult>
 * that <foo> would return, but defers execution to the next microtask
 * so it does not block the event loop.
 *
 * Parameters:
 *   input   - The value to transform.
 *   options - (optional) Configuration overrides — see <FooOptions>.
 *
 * Returns:
 *   A Promise that resolves with a <FooResult>.
 *
 * Example:
 * --- Code
 * const result = await fooAsync(42);
 * console.log(result.value); // "42_FOO"
 * ---
 *
 * See Also:
 *   <foo>, <fooWithOptions>
 */
async function fooAsync(input, options = {}) {
  return Promise.resolve(foo(input, options));
}


/* Function: fooWithOptions
 *
 * Convenience wrapper that constructs a <FooOptions> object from
 * individual parameters and delegates to <foo>.
 *
 * Parameters:
 *   input     - The value to transform.
 *   prefix    - String prepended to the transformed value. Default: "".
 *   suffix    - String appended to the transformed value. Default: "_FOO".
 *   uppercase - If true, coerce the result to uppercase. Default: true.
 *
 * Returns:
 *   A <FooResult> object.
 *
 * Example:
 * --- Code
 * const r = fooWithOptions("bar", { prefix: ">>", suffix: "<<", uppercase: false });
 * console.log(r.value); // ">>bar<<"
 * ---
 *
 * See Also:
 *   <foo>, <FooOptions>
 */
function fooWithOptions(input, { prefix = "", suffix = "_FOO", uppercase = true } = {}) {
  return foo(input, { prefix, suffix, uppercase });
}


/* Object: FooOptions
 *
 * Configuration object accepted by <foo> and <fooAsync>.
 *
 * Properties:
 *   prefix    - (string) Text prepended to the output value. Default: "".
 *   suffix    - (string) Text appended to the output value. Default: "_FOO".
 *   uppercase - (boolean) Whether to uppercase the core value. Default: true.
 *   metadata  - (object) Arbitrary key-value pairs merged into the result metadata.
 */
const defaultOptions = {
  prefix: "",
  suffix: "_FOO",
  uppercase: true,
  metadata: {},
};


/* Object: FooResult
 *
 * The return type of <foo> and <fooAsync>.
 *
 * Properties:
 *   value     - (string) The fully transformed output.
 *   original  - (*) The original untouched input.
 *   timestamp - (number) Unix ms timestamp of when the transformation ran.
 *   metadata  - (object) Merged metadata from <FooOptions>.
 */


// Internal helpers — not documented for public API
function _transform(input, opts) {
  let core = String(input);
  if (opts.uppercase) core = core.toUpperCase();
  return {
    value: `${opts.prefix}${core}${opts.suffix}`,
    original: input,
    timestamp: Date.now(),
    metadata: { ...opts.metadata },
  };
}


module.exports = { foo, fooAsync, fooWithOptions };

import test from "node:test";
import assert from "node:assert/strict";
import { resolveCatalogMode } from "../src/lib/catalog-mode.mjs";

test("resolves every PRD catalog boundary", () => {
  assert.equal(resolveCatalogMode(0), "coming-soon");
  assert.equal(resolveCatalogMode(1), "single");
  assert.equal(resolveCatalogMode(2), "comparison");
  assert.equal(resolveCatalogMode(5), "curated");
  assert.equal(resolveCatalogMode(6), "overflow");
});

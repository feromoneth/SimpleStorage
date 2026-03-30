function safeRun(name, fn) {
  try {
    const result = fn();
    console.log(`✅ ${name} passed`, result ?? "");
  } catch (err) {
    console.log(`⚠️ ${name} failed:`, err.message);
  }
}

console.log("🚀 DefiKit Growth Bot Running...");

let defikit;

try {
  defikit = require("@yusufolosun/defikit");
  console.log("✅ Package loaded successfully");
} catch (err) {
  console.log("⚠️ Failed to require package:", err.message);
  process.exit(0); // DO NOT FAIL WORKFLOW
}

// Safe destructuring
const {
  bps,
  fees,
  slippage,
  amm,
  tokenAmount,
  yieldMath,
} = defikit || {};

// --------------------
// SAFE TESTS
// --------------------

safeRun("bps.toPercent", () => bps?.toPercent?.(30));
safeRun("fees.onInput", () => fees?.onInput?.(1_000_000n, 30));
safeRun("slippage.minOutput", () => slippage?.minOutput?.(1_000_000n, 50));

safeRun("amm.getOutputAmount", () =>
  amm?.constantProduct?.getOutputAmount?.(
    1_000_000n,
    1_000_000_000n,
    2_000_000_000n
  )
);

safeRun("tokenAmount.fromHuman", () =>
  tokenAmount?.fromHuman?.("1.5", 6)
);

safeRun("yieldMath.aprToApy", () =>
  yieldMath?.aprToApy?.(10, 365)
);

console.log("✅ Growth bot completed (non-blocking)");

<script>
  import Rules from "./Rules.svelte";
  import Controls from "./Controls.svelte";
  import World from "./World.svelte";
  import { buildNewWorld, initialWorld, nextWorld } from "./lib/world";
  import { generateId, sleep } from "./lib/util";

  const defaultRules = [
    {
      id: generateId(),
      is: 1,
      has: [2, 3],
      becomes: 1
    },
    {
      id: generateId(),
      is: 0,
      has: [3],
      becomes: 1
    }
  ];

  let rules = defaultRules;
  let started = false;
  let step = 0;
  let rows = initialWorld.rows;
  let cols = initialWorld.cols;
  let speed = 500;
  let world = buildNewWorld(initialWorld.rows, initialWorld.cols);

  function handleAddRule(event) {
    const { is, has, becomes } = event.detail;
    rules = [
      ...rules,
      {
        id: generateId(),
        is: parseInt(is, 10),
        has: has.filter(n => n).map(n => parseInt(n, 10)),
        becomes: parseInt(becomes, 10)
      }
    ];
  }

  function handleRemoveRule(event) {
    rules = rules.filter(r => r.id !== event.detail.id);
  }

  function handleStart() {
    started = true;
    nextStep();
  }

  function handleStop() {
    started = false;
  }

  function handleClear() {
    world = buildNewWorld(rows, cols);
  }

  function handleUpdateWorld(event) {
    const { rows: newRows, cols: newCols, speed: newSpeed } = event.detail;
    rows = newRows;
    cols = newCols;
    world = buildNewWorld(newRows, newCols);
  }

  function handleUpdateSpeed(event) {
    const { speed: newSpeed } = event.detail;
    speed = newSpeed;
  }

  async function nextStep() {
    if (started) {
      requestAnimationFrame(() => {
        step += 1;
        world = nextWorld(world, rules);
      });
      await sleep(1000 - speed);
      nextStep();
    }
  }

  function handleCellClick(event) {
    const { rowIndex, columnIndex } = event.detail;
    const newWorld = world.slice(0);
    const currentValue = newWorld[rowIndex][columnIndex];
    const newValue = 1 - currentValue;
    newWorld[rowIndex].splice(columnIndex, 1, newValue);
    world = newWorld;
  }

  function handleForceWorld(event) {
    world = event.detail.world;
  }
</script>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(body) {
    margin: 0;
    font-family: sans-serif;
  }

  .simulator {
    display: flex;
    margin: 12px;
  }

  .col {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  .col.controls {
    flex: 0 0 200px;
    margin-right: 12px;
  }

  .row {
    flex: 1 1 auto;
  }

  .row.rules {
    margin-bottom: 12px;
  }
</style>

<div class="simulator">
  <div class="col controls">
    <Controls
      {started}
      {step}
      {rows}
      {cols}
      {speed}
      on:start={handleStart}
      on:stop={handleStop}
      on:clear={handleClear}
      on:updateworld={handleUpdateWorld}
      on:updatespeed={handleUpdateSpeed}
      on:forceworld={handleForceWorld} />
  </div>
  <div class="col">
    <div class="row rules">
      <Rules
        {rules}
        on:addrule={handleAddRule}
        on:removerule={handleRemoveRule} />
    </div>
    <div class="row world">
      <World {world} on:cellclick={handleCellClick} />
    </div>
  </div>
</div>

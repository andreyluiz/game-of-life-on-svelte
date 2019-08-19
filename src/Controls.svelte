<script>
  import { template } from "./lib/world";
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  export let step,
    rows = 20,
    cols = 20,
    speed = 500,
    started = false;

  function handleStartStop() {
    if (started) {
      dispatch("stop");
    } else {
      dispatch("start");
    }
  }

  function handleStop() {}

  function handleClear() {
    dispatch("clear");
  }

  function handleRowsChange(e) {
    dispatch("updateworld", {
      speed,
      rows: parseInt(e.target.value, 10),
      cols
    });
  }

  function handleColsChange(e) {
    dispatch("updateworld", {
      speed,
      rows,
      cols: parseInt(e.target.value, 10)
    });
  }

  function handleSpeedChange(e) {
    dispatch("updatespeed", {
      speed: parseInt(e.target.value, 10)
    });
  }

  function handleTemplateClick() {
    dispatch("forceworld", { world: template });
  }
</script>

<style>
  .container {
    border: 1px solid grey;
    padding: 12px;
    display: flex;
    flex-direction: column;
  }

  .row {
    margin-bottom: 12px;
    flex: 1;
  }

  .step {
    background: lightgray;
    border-radius: 4px;
    padding: 4px;
    margin-bottom: 12px;
    text-align: center;
  }

  .step-text {
    color: gray;
  }

  .button {
    background-color: steelblue;
    font-weight: normal;
    outline: none;
    width: 100%;
    color: white;
    border: steelblue;
    border-radius: 4px;
    cursor: pointer;
  }

  .title {
    font-size: 14px;
    margin-bottom: 4px;
  }

  input[type="number"] {
    font-size: 14px;
    padding: 4px;
    width: 100%;
  }

  input[type="range"] {
    width: 100%;
    -webkit-appearance: none;
    outline: none;
    margin: 18px 0;
    width: 100%;
  }

  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: steelblue;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type="range"]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -14px;
  }
  input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #367ebd;
  }
  input[type="range"]::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: steelblue;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }
  input[type="range"]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type="range"]::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type="range"]::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type="range"]::-ms-fill-upper {
    background: steelblue;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }
  input[type="range"]::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 36px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }
  input[type="range"]:focus::-ms-fill-lower {
    background: steelblue;
  }
  input[type="range"]:focus::-ms-fill-upper {
    background: #367ebd;
  }
</style>

<div class="container">
  <div class="row">
    <button class="button" on:click={handleStartStop}>
      {started ? 'Stop' : 'Start'}
    </button>
  </div>
  <div class="row">
    <button class="button" on:click={handleClear}>Reset</button>
  </div>
  <div class="step">
    <span class="step-text">Step {step}</span>
  </div>
  <div class="row">
    <span class="title">Rows</span>
    <input
      name="rows"
      type="number"
      value={rows}
      on:change={handleRowsChange} />
  </div>
  <div class="row">
    <span class="title">Columns</span>
    <input
      name="cols"
      type="number"
      value={cols}
      on:change={handleColsChange} />
  </div>
  <div class="row">
    <span class="title">Speed ({speed})</span>
    <input
      name="speed"
      type="range"
      value={speed}
      on:change={handleSpeedChange}
      min="1"
      max="1001" />
  </div>
  <div class="row">
    <button on:click={handleTemplateClick}>Template</button>
  </div>
</div>

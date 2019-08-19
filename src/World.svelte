<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  export let world;

  function handleCellClick(rowIndex, columnIndex) {
    return function() {
      dispatch("cellclick", {
        rowIndex,
        columnIndex
      });
    };
  }
</script>

<style>
  .row {
    display: flex;
    max-height: 20px;
  }

  .cell {
    flex: 0 0 20px;
    position: relative;
    display: inline-block;
    height: 20px;
    width: 20px;
    margin: 0;
    padding: 0;
    outline: none;
    border: 1px solid black;
  }

  .inner-cell {
    position: absolute;
    top: 1px;
    left: 1px;
    width: 16px;
    height: 16px;
    background-color: white;
  }

  .inner-cell.active {
    background-color: black;
  }
</style>

<div>
  {#each world as row, rowIndex}
    <div class="row">
      {#each row as column, columnIndex}
        <div class="cell" on:click={handleCellClick(rowIndex, columnIndex)}>
          <div class="inner-cell {column === 1 && 'active'}" />
        </div>
      {/each}
    </div>
  {/each}
</div>

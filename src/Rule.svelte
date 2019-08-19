<script>
  const labels = ["Dead", "Alive"];
  export let id, is, has, becomes;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function handleButtonClick() {
    dispatch("removerule", { id });
  }
</script>

<tr>
  <td>{labels[is]}</td>
  <td>{has.join(', ')}</td>
  <td>{labels[becomes]}</td>
  <td>
    <button on:click={handleButtonClick}>x</button>
  </td>
</tr>

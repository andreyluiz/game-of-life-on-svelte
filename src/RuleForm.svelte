<script>
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  let is = 1,
    has = [],
    becomes = 1;

  function handleIsChange(event) {
    is = event.target.value;
  }

  function handleHasChange(event) {
    has = event.target.value.split(",");
  }

  function handleBecomesChange(event) {
    becomes = event.target.value;
  }

  function handleButtonClick() {
    dispatch("addrule", { is, has, becomes });
    has = [];
  }
</script>

<tr>
  <td>
    <select name="is" value={is} on:change={handleIsChange}>
      <option value={1}>Alive</option>
      <option value={0}>Dead</option>
    </select>
  </td>
  <td>
    <input
      name="has"
      type="text"
      value={has.join(',')}
      on:change={handleHasChange} />
  </td>
  <td>
    <select name="becomes" value={becomes} on:change={handleBecomesChange}>
      <option value={1}>Alive</option>
      <option value={0}>Dead</option>
    </select>
  </td>
  <td>
    <button on:click={handleButtonClick}>Add</button>
  </td>
</tr>

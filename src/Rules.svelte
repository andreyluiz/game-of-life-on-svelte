<script>
  import Rule from "./Rule.svelte";
  import RuleForm from "./RuleForm.svelte";
  import { createEventDispatcher } from "svelte";

  let dispatch = createEventDispatcher();

  export let rules;
</script>

<style>
  th {
    text-align: left;
  }
</style>

<table>
  <thead>
    <tr>
      <th>Is</th>
      <th>Has</th>
      <th>Becomes</th>
    </tr>
  </thead>
  <tbody>
    {#each rules as rule}
      <Rule {...rule} on:removerule />
    {/each}
    <RuleForm on:addrule />
  </tbody>
</table>

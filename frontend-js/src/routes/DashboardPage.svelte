<script>
  import { data, test } from '../store/sumber-store.ts'

  async function delay(time, val) {
    return new Promise(resolve => setTimeout(resolve, time, val));
  }

  let x = delay(3000, "Voila");
</script>
  
<h4>Dashboard</h4>

{$data.value.sumber}

<button
  on:click={async () => {
    data.set({value: await test()});
  }}>Coba</button
>

{#await x}
  Loading... (3 detik)
{:then val}
  {val}
{/await}
